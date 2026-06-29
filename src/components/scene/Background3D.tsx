import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NeoGraph from "./NeoGraph";

/**
 * Full-bleed 3D background canvas, fixed behind all content. Renders the
 * knowledge-graph scene plus a dark "scrim" overlay so foreground text always
 * stays readable over the motion.
 *
 * Performance choices:
 *  - dpr capped at [1, 1.6] so retina screens don't render 4x pixels.
 *  - small geometry counts.
 *  - pointer-events: none → never blocks reading or clicking.
 *  - lazy-loaded + capability-gated in App.tsx (content first, 3D second).
 */
export default function Background3D() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 12], fov: 55 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <NeoGraph />
          {/* Soft fog fades distant geometry into the dark background. */}
          <fog attach="fog" args={["#05060a", 10, 24]} />
        </Suspense>
      </Canvas>

      {/* Readability scrim — three stacked layers, all behind page content:
          1. a gentle global wash so nothing in the canvas reads at full brightness;
          2. a CENTER "safe zone" that darkens heavily where the hero text sits and
             fades out toward the edges, so decorations frame the content instead of
             sitting on top of it;
          3. a soft edge vignette that grounds the whole scene.
          Tune the opacities here if you want it brighter/dimmer. */}
      <div className="absolute inset-0 bg-ink-900/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 44%, rgba(5,6,10,0.9) 0%, rgba(5,6,10,0.62) 38%, rgba(5,6,10,0) 72%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 50%, rgba(5,6,10,0) 55%, rgba(5,6,10,0.6) 100%)",
        }}
      />
    </div>
  );
}
