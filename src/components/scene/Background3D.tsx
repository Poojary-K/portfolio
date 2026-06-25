import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import NodeNetwork from "./NodeNetwork";

/**
 * Full-bleed 3D background canvas, fixed behind all content.
 *
 * Performance choices:
 *  - dpr capped at [1, 1.6] so retina screens don't render 4x pixels.
 *  - `powerPreference: high-performance` but small geometry counts.
 *  - Rendered behind content with pointer-events: none, so it never blocks
 *    reading or clicking. It is also lazy-loaded + gated by reduced-motion
 *    and a mobile check in App.tsx (progressive enhancement: content first).
 */
export default function Background3D() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 12], fov: 55 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <NodeNetwork />
          {/* Soft fog fades distant nodes into the dark background. */}
          <fog attach="fog" args={["#05060a", 10, 22]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
