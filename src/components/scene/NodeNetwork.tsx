import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * An abstract "agent network": glowing nodes connected by faint links,
 * drifting and reacting subtly to the pointer. Evokes agents / API paths /
 * data orbits without being a literal game. Pure Three.js (no per-frame
 * allocations) so it stays light on the GPU.
 */

const NODE_COUNT = 26;
const LINK_DISTANCE = 2.6; // connect nodes closer than this
const SPREAD = 9;

const ACCENTS = [
  new THREE.Color("#22d3ee"),
  new THREE.Color("#3b82f6"),
  new THREE.Color("#8b5cf6"),
  new THREE.Color("#34d399"),
];

function NodeNetwork() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Generate node positions once. Deterministic-ish spread across a slab.
  const { positions, colors } = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    const cols: THREE.Color[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Spherical-ish distribution, flattened on Z for depth-but-readable.
      const x = (Math.cos(i * 2.39996) * (0.4 + (i % 5) / 5)) * SPREAD - SPREAD / 2 + (i % 3);
      const y = (Math.sin(i * 2.39996) * (0.4 + (i % 4) / 4)) * (SPREAD * 0.6) - 2;
      const z = ((i % 7) - 3) * 0.9;
      pos.push(new THREE.Vector3(x, y, z));
      cols.push(ACCENTS[i % ACCENTS.length]);
    }
    return { positions: pos, colors: cols };
  }, []);

  // Precompute link geometry between nearby nodes.
  const linkGeometry = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < LINK_DISTANCE) {
          pts.push(
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          );
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return geo;
  }, [positions]);

  // Gentle rotation + pointer parallax. Lerp toward target to feel smooth.
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.04;
    const targetX = pointer.y * 0.15;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.position.x += (pointer.x * 0.6 - group.current.position.x) * 0.03;
    group.current.position.y += (-pointer.y * 0.4 - group.current.position.y) * 0.03;
  });

  return (
    <group ref={group}>
      {/* Links */}
      <lineSegments geometry={linkGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.16} />
      </lineSegments>

      {/* Nodes */}
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.07 + (i % 3) * 0.03, 16, 16]} />
          <meshBasicMaterial color={colors[i]} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export default NodeNetwork;
