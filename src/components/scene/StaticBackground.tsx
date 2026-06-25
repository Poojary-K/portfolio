/**
 * CSS-only fallback shown instead of the 3D canvas when the user prefers
 * reduced motion, is on a low-power / mobile device, or WebGL is unavailable.
 * Keeps the premium dark + glow mood with zero GPU cost.
 */
export default function StaticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-accent-blue/20 blur-[120px]" />
      <div className="absolute right-[-10rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-accent-violet/20 blur-[120px]" />
      <div className="absolute bottom-[-12rem] left-1/3 h-[28rem] w-[28rem] rounded-full bg-accent-cyan/10 blur-[120px]" />
      {/* Subtle grid for a technical feel. */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
