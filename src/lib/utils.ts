/** Tiny className joiner — keeps conditional classes readable without a dep. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Local monospace font for in-canvas 3D text (Drei <Text>). Shipped in
 * /public/fonts so labels/code render reliably even offline — Drei's default
 * font would otherwise depend on a CDN. Swap the file to restyle 3D text.
 */
export const MONO_FONT = "/fonts/JetBrainsMono-Regular.woff";

/** Map an accent key to its hex value (used for inline styles / 3D). */
export const accentHex: Record<"cyan" | "blue" | "violet" | "green", string> = {
  cyan: "#22d3ee",
  blue: "#3b82f6",
  violet: "#8b5cf6",
  green: "#34d399",
};

/**
 * Map an accent key to Tailwind utility groups.
 * IMPORTANT: every value is a *complete literal* class string so Tailwind's
 * JIT compiler can find them when scanning this file. Never build these by
 * string concatenation in components — the compiler won't generate them.
 */
export const accentClasses: Record<
  "cyan" | "blue" | "violet" | "green",
  {
    text: string;
    border: string;
    bg: string;
    dot: string; // solid background for small dots
    glow: string; // translucent background for blur glows
    groupHoverBorder: string;
  }
> = {
  cyan: {
    text: "text-accent-cyan",
    border: "border-accent-cyan/40",
    bg: "bg-accent-cyan/10",
    dot: "bg-accent-cyan",
    glow: "bg-accent-cyan/30",
    groupHoverBorder: "group-hover:border-accent-cyan/40",
  },
  blue: {
    text: "text-accent-blue",
    border: "border-accent-blue/40",
    bg: "bg-accent-blue/10",
    dot: "bg-accent-blue",
    glow: "bg-accent-blue/30",
    groupHoverBorder: "group-hover:border-accent-blue/40",
  },
  violet: {
    text: "text-accent-violet",
    border: "border-accent-violet/40",
    bg: "bg-accent-violet/10",
    dot: "bg-accent-violet",
    glow: "bg-accent-violet/30",
    groupHoverBorder: "group-hover:border-accent-violet/40",
  },
  green: {
    text: "text-accent-green",
    border: "border-accent-green/40",
    bg: "bg-accent-green/10",
    dot: "bg-accent-green",
    glow: "bg-accent-green/30",
    groupHoverBorder: "group-hover:border-accent-green/40",
  },
};
