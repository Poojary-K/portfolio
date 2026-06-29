import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import * as THREE from "three";
import { MONO_FONT } from "../../lib/utils";
import { navItems } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";

/**
 * "Knowledge graph" theme — a Neo4j-style relationship graph about Karunakar
 * that GROWS AS YOU SCROLL. It starts as a single root node and sprouts the
 * branch that matches the section currently in view:
 *
 *   home       → just the root            (Karunakar)
 *   about      → the 5 core domains       :IN_CATEGORY
 *   skills     → each domain's skills      :HAS_SKILL
 *   projects   → projects + their stack    :WORKED_ON / :USES
 *   experience → the career journey chain  :THEN
 *   contact    → reach-me nodes            :CONTACT
 *
 * Visuals are intentionally restrained (Neo4j browser feel): plain coloured
 * spheres, thin WHITE relationship lines, a few typed edge labels, and a slow
 * idle spin. Nodes/edges simply scale + draw in when their section is reached;
 * a small caption names the current relationship so the story stays legible.
 *
 * Interaction: the graph does NOT follow the cursor (slow idle spin only).
 * VISIBLE nodes are draggable; the canvas stays click-through so page links
 * keep working and empty-space clicks pass straight through.
 */

type GType = "hub" | "category" | "skill" | "project" | "journey" | "contact";

type GNode = {
  label: string;
  base: THREE.Vector3; // initial layout position (local space)
  pos: THREE.Vector3; // live position (mutated by dragging) (local space)
  color: string;
  r: number;
  type: GType;
  stage: number; // scroll stage at which this node appears
};

// ---- Section → stage map ---------------------------------------------------
const STAGE_OF: Record<string, number> = {
  home: 0,
  about: 1,
  skills: 2,
  projects: 3,
  experience: 4,
  contact: 5,
};

// ---- Graph schema ----------------------------------------------------------

const CATEGORIES = ["Frontend", "Backend", "Databases", "GenAI", "DevOps"];

// skill -> category
const SKILLS: [string, string][] = [
  ["Angular", "Frontend"],
  ["React", "Frontend"],
  ["TypeScript", "Frontend"],
  ["Cypress", "Frontend"],
  ["Node.js", "Backend"],
  ["Express", "Backend"],
  ["FastAPI", "Backend"],
  ["JWT Auth", "Backend"],
  ["PostgreSQL", "Databases"],
  ["MongoDB", "Databases"],
  ["Neo4j", "Databases"],
  ["AutoGen", "GenAI"],
  ["RAG", "GenAI"],
  ["Embeddings", "GenAI"],
  ["MCP Tools", "GenAI"],
  ["Docker", "DevOps"],
  ["Kubernetes", "DevOps"],
  ["Prometheus", "DevOps"],
  ["CI/CD", "DevOps"],
];

const PROJECTS = ["For The Society", "Spend Tracker", "GenAI Platform", "Metrics Pkgs", "CI/CD Gates"];

// (Project)-[:USES]->(Skill) cross edges — real facts.
const USES: [string, string][] = [
  ["GenAI Platform", "RAG"],
  ["GenAI Platform", "Neo4j"],
  ["GenAI Platform", "FastAPI"],
  ["GenAI Platform", "AutoGen"],
  ["GenAI Platform", "MCP Tools"],
  ["GenAI Platform", "Embeddings"],
  ["For The Society", "Angular"],
  ["For The Society", "Node.js"],
  ["For The Society", "Express"],
  ["For The Society", "JWT Auth"],
  ["For The Society", "PostgreSQL"],
  ["Spend Tracker", "Angular"],
  ["Spend Tracker", "TypeScript"],
  ["Metrics Pkgs", "Docker"],
  ["Metrics Pkgs", "Prometheus"],
  ["Metrics Pkgs", "Node.js"],
  ["CI/CD Gates", "Docker"],
  ["CI/CD Gates", "Kubernetes"],
  ["CI/CD Gates", "CI/CD"],
  ["CI/CD Gates", "Cypress"],
];

// Career chain (experience). Labels kept distinct from the project names so the
// Journey branch tells the timeline story without repeating Projects.
const JOURNEY = ["B.E. CS · '23", "MEAN role", "Prometheus", "RAG · Agents", "Mentoring"];

const CONTACTS = ["GitHub", "LinkedIn", "Email", "Resume"];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#22d3ee",
  Backend: "#3b82f6",
  Databases: "#8b5cf6",
  GenAI: "#34d399",
  DevOps: "#f59e0b",
};
const PROJECT_COLOR = "#f472b6";
const JOURNEY_COLOR = "#fb923c";
const CONTACT_COLOR = "#38bdf8";

type GEdge = { a: number; b: number; type: string; stage: number; labeled: boolean };

// Per-stage caption — a small story signpost in the lower-left corner.
const CHAPTERS = [
  { n: "", title: "Karunakar", rel: "scroll to grow the graph ↓" },
  { n: "01", title: "Core Domains", rel: ":IN_CATEGORY" },
  { n: "02", title: "Skills", rel: ":HAS_SKILL" },
  { n: "03", title: "Projects", rel: ":WORKED_ON · :USES" },
  { n: "04", title: "Journey", rel: ":THEN · 2023 → now" },
  { n: "05", title: "Reach me", rel: ":CONTACT" },
];

// Stable pseudo-random for tiny layout jitter (no Math.random()).
function jitter(seed: number): number {
  const x = Math.sin(seed * 91.7 + 47.3) * 23457.91;
  return (x - Math.floor(x)) * 2 - 1;
}

// Reveal cascade: how long after a stage activates each child waits to grow in.
function delayFor(type: GType, i: number): number {
  if (type === "skill") return i * 0.04;
  if (type === "journey") return i * 0.2; // sequential — reads as a path being drawn
  if (type === "category") return i * 0.08;
  if (type === "project") return i * 0.09;
  if (type === "contact") return i * 0.1;
  return 0;
}

function NeoGraph() {
  const group = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Which section is in view → which stage to grow to.
  const activeId = useActiveSection(useMemo(() => navItems.map((n) => n.id), []));
  const stage = STAGE_OF[activeId] ?? 0;

  // ---- Build nodes + edges once ----
  const { nodes, edges, edgeLabels } = useMemo(() => {
    const nodes: GNode[] = [];
    const index: Record<string, number> = {};
    const add = (label: string, pos: THREE.Vector3, color: string, r: number, type: GType, stage: number) => {
      index[label] = nodes.length;
      nodes.push({ label, base: pos.clone(), pos: pos.clone(), color, r, type, stage });
    };

    // Hub (stage 0).
    add("Karunakar", new THREE.Vector3(0, 0, 0), "#e2e8f0", 0.3, "hub", 0);

    // Categories on a wide ring around the hub (stage 1). The ring is wide so
    // the dense inner cluster never sits behind the centered hero text.
    CATEGORIES.forEach((c, i) => {
      const angle = (i / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 3.5;
      add(
        c,
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.85, jitter(i) * 0.5),
        CATEGORY_COLORS[c],
        0.2,
        "category",
        1
      );
    });

    // Skills clustered around their category node, on a wider ring (stage 2).
    const byCat: Record<string, string[]> = {};
    SKILLS.forEach(([s, c]) => (byCat[c] ??= []).push(s));
    CATEGORIES.forEach((c, ci) => {
      const list = byCat[c] ?? [];
      const baseAngle = (ci / CATEGORIES.length) * Math.PI * 2 - Math.PI / 2;
      list.forEach((s, si) => {
        const spread = ((si - (list.length - 1) / 2) / Math.max(list.length, 1)) * 1.3;
        const angle = baseAngle + spread;
        const radius = 6.4;
        add(
          s,
          new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.85, jitter(ci * 10 + si) * 1.4),
          CATEGORY_COLORS[c],
          0.12,
          "skill",
          2
        );
      });
    });

    // Projects on an outer arc on the right/front (stage 3).
    PROJECTS.forEach((p, i) => {
      const t = i / (PROJECTS.length - 1);
      const angle = Math.PI * (-0.36 + t * 0.72);
      const radius = 8.2;
      add(
        p,
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, 1.5 + jitter(i + 99) * 1.2),
        PROJECT_COLOR,
        0.16,
        "project",
        3
      );
    });

    // Journey — a chain sweeping across the LEFT arc (mirrors Projects), drawn
    // sequentially so it reads as a timeline (stage 4).
    JOURNEY.forEach((j, i) => {
      const t = i / (JOURNEY.length - 1);
      const angle = Math.PI * (0.64 + t * 0.72); // ~115° → 245° (left side)
      const radius = 8.0;
      add(
        j,
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.7, -1.4 + jitter(i + 200) * 0.8),
        JOURNEY_COLOR,
        0.15,
        "journey",
        4
      );
    });

    // Contact — a small ring just below the root, front layer (stage 5).
    CONTACTS.forEach((c, i) => {
      const angle = Math.PI + (i / (CONTACTS.length - 1) - 0.5) * 1.4; // fan along the bottom
      const radius = 2.4;
      add(
        c,
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius - 1.0, 1.2 + jitter(i + 300) * 0.5),
        CONTACT_COLOR,
        0.14,
        "contact",
        5
      );
    });

    // Edges. `a` is the parent/earlier node so each edge draws outward a → b.
    const edges: GEdge[] = [];
    const edge = (a: number, b: number, type: string, labeled = false) =>
      edges.push({ a, b, type, stage: Math.max(nodes[a].stage, nodes[b].stage), labeled });

    CATEGORIES.forEach((c, i) => edge(0, index[c], ":IN_CATEGORY", i === 0));
    SKILLS.forEach(([s, c], i) => edge(index[c], index[s], ":HAS_SKILL", i === 1));
    PROJECTS.forEach((p, i) => edge(0, index[p], ":WORKED_ON", i === 2));
    USES.forEach(([p, s], i) => edge(index[p], index[s], ":USES", i < 2));
    JOURNEY.forEach((j, i) => edge(i === 0 ? 0 : index[JOURNEY[i - 1]], index[j], ":THEN", i === 1));
    CONTACTS.forEach((c, i) => edge(0, index[c], ":CONTACT", i === 0));

    const edgeLabels = edges
      .filter((e) => e.labeled)
      .map((e) => ({ a: e.a, b: e.b, text: e.type, stage: e.stage }));

    return { nodes, edges, edgeLabels };
  }, []);

  // ---- Live edge geometry (rebuilt each frame so lines follow nodes) ----
  const edgeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(edges.length * 6), 3));
    return geo;
  }, [edges.length]);

  // Refs + animated per-node reveal state.
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const labelRefs = useRef<(THREE.Group | null)[]>([]);
  const rev = useRef<Float32Array>(new Float32Array(nodes.length)); // reveal 0..1

  // Stage tracking for the reveal cascade (advance-on-enter delays).
  const stageRef = useRef(stage);
  const stageEnteredAt = useRef(0);
  const clock = useRef(0);
  useEffect(() => {
    stageRef.current = stage;
    stageEnteredAt.current = clock.current;
  }, [stage]);

  // ---- Dragging via window-level raycast (canvas is click-through) ----
  const dragging = useRef<number | null>(null);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const dragPlane = useMemo(() => new THREE.Plane(), []);
  const ndc = useRef(new THREE.Vector2());
  const hitWorld = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const toNDC = (e: PointerEvent) => {
      ndc.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };

    // Index of the VISIBLE node under the pointer, or null.
    const pick = (): number | null => {
      raycaster.setFromCamera(ndc.current, camera);
      const meshes = nodeRefs.current
        .map((g, i) => (g && rev.current[i] > 0.5 ? { mesh: g.children[0] as THREE.Object3D, i } : null))
        .filter(Boolean) as { mesh: THREE.Object3D; i: number }[];
      const hits = raycaster.intersectObjects(meshes.map((m) => m.mesh), false);
      if (!hits.length) return null;
      const found = meshes.find((m) => m.mesh === hits[0].object);
      return found ? found.i : null;
    };

    const onDown = (e: PointerEvent) => {
      toNDC(e);
      const i = pick();
      if (i == null) return; // not on a node → let the click pass to the page
      dragging.current = i;
      gl.domElement.style.cursor = "grabbing";
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      const worldPos = nodeRefs.current[i]!.getWorldPosition(new THREE.Vector3());
      dragPlane.setFromNormalAndCoplanarPoint(camDir, worldPos);
    };

    const onMove = (e: PointerEvent) => {
      toNDC(e);
      if (dragging.current == null) {
        gl.domElement.style.cursor = pick() != null ? "grab" : "";
        return;
      }
      raycaster.setFromCamera(ndc.current, camera);
      if (!raycaster.ray.intersectPlane(dragPlane, hitWorld)) return;
      const g = group.current;
      const i = dragging.current;
      if (g) nodes[i].pos.copy(g.worldToLocal(hitWorld.clone()));
    };

    const onUp = () => {
      if (dragging.current != null) {
        dragging.current = null;
        gl.domElement.style.cursor = pick() != null ? "grab" : "";
      }
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [camera, gl, raycaster, dragPlane, hitWorld, nodes]);

  // ---- Per-frame: idle spin + reveal-by-stage + sync positions/edges ----
  const spin = useRef(0);
  useFrame((_, delta) => {
    if (!group.current) return;
    const d = Math.min(delta, 0.05);
    clock.current += d;
    const cur = stageRef.current;
    const elapsed = clock.current - stageEnteredAt.current;

    // Slow idle spin, paused while a node is dragged so it feels grabbed.
    if (dragging.current == null) spin.current += d * 0.05;
    group.current.rotation.y += (spin.current - group.current.rotation.y) * 0.06;

    // Reveal: grow nodes in when their section is reached (cascaded per branch).
    nodes.forEach((n, i) => {
      const shown = cur >= n.stage;
      const held = shown && n.stage === cur && elapsed < delayFor(n.type, i);
      const target = shown && !held ? 1 : 0;
      rev.current[i] += (target - rev.current[i]) * (1 - Math.pow(0.0015, d));
      const r = rev.current[i];
      const g = nodeRefs.current[i];
      if (g) {
        g.position.copy(n.pos);
        g.scale.setScalar(Math.max(r, 0.0001));
        g.visible = r > 0.002;
      }
    });

    // Edge lines draw outward from parent → child as the child reveals.
    const arr = edgeGeometry.attributes.position.array as Float32Array;
    edges.forEach((e, i) => {
      const A = nodes[e.a].pos;
      const B = nodes[e.b].pos;
      const f = Math.min(rev.current[e.a], rev.current[e.b]); // 0..1 grow factor
      arr.set(
        [A.x, A.y, A.z, A.x + (B.x - A.x) * f, A.y + (B.y - A.y) * f, A.z + (B.z - A.z) * f],
        i * 6
      );
    });
    edgeGeometry.attributes.position.needsUpdate = true;

    // Typed edge labels — only on the active branch, at the edge midpoint.
    edgeLabels.forEach((l, i) => {
      const lg = labelRefs.current[i];
      if (!lg) return;
      const on = l.stage === cur && rev.current[l.b] > 0.2;
      lg.visible = on;
      if (on) lg.position.copy(nodes[l.a].pos).lerp(nodes[l.b].pos, 0.5);
    });
  });

  const chapter = CHAPTERS[Math.min(stage, CHAPTERS.length - 1)];

  return (
    // Pushed back in depth so the graph reads as a recessed backdrop that frames
    // the hero rather than competing with it (fog dims the far nodes further).
    <group position={[0, 0.3, -2.2]}>
      {/* Chapter caption — small story signpost in the lower-left corner so it
          never overlaps the centered hero / section content. Outside the
          spinning group so it stays readable. */}
      <Billboard position={[-6.4, -3.1, 0.4]}>
        <Text
          font={MONO_FONT}
          fontSize={0.3}
          color="#e2e8f0"
          anchorX="left"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#05060a"
        >
          {chapter.n ? `${chapter.n} · ${chapter.title}` : chapter.title}
        </Text>
        <Text
          font={MONO_FONT}
          fontSize={0.14}
          color="#7c8aa5"
          anchorX="left"
          anchorY="middle"
          position={[0, -0.32, 0]}
          outlineWidth={0.008}
          outlineColor="#05060a"
        >
          {chapter.rel}
        </Text>
      </Billboard>

      {/* The graph — slow idle spin + draggable nodes. */}
      <group ref={group}>
        {/* Relationship edges — thin WHITE connective lines. */}
        <lineSegments geometry={edgeGeometry}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </lineSegments>

        {/* Nodes + name labels. children[0] of each group is the draggable mesh. */}
        {nodes.map((n, i) => (
          <group key={i} ref={(el) => (nodeRefs.current[i] = el)} position={n.base} scale={0.0001}>
            <mesh>
              <sphereGeometry args={[n.r, 20, 20]} />
              <meshBasicMaterial color={n.color} transparent opacity={0.9} toneMapped={false} />
            </mesh>
            <Billboard position={[0, -n.r - 0.22, 0]}>
              <Text
                font={MONO_FONT}
                fontSize={n.type === "hub" ? 0.3 : n.type === "category" ? 0.22 : 0.18}
                color={n.type === "hub" ? "#ffffff" : "#cbd5e1"}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.012}
                outlineColor="#05060a"
              >
                {n.label}
              </Text>
            </Billboard>
          </group>
        ))}

        {/* Relationship-type labels on the active branch (Neo4j-style). */}
        {edgeLabels.map((l, i) => (
          <group key={i} ref={(el) => (labelRefs.current[i] = el)} visible={false}>
            <Billboard>
              <Text
                font={MONO_FONT}
                fontSize={0.13}
                color="#7c8aa5"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.01}
                outlineColor="#05060a"
              >
                {l.text}
              </Text>
            </Billboard>
          </group>
        ))}
      </group>
    </group>
  );
}

export default NeoGraph;
