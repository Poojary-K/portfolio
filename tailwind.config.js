/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep, near-black canvas with navy/charcoal layers.
        ink: {
          900: "#05060a", // page background
          800: "#0a0c14", // raised surfaces
          700: "#11141f", // cards
          600: "#1a1f2e", // borders / hovered cards
        },
        // Accent palette — electric blue, cyan, violet. Used sparingly.
        accent: {
          cyan: "#22d3ee",
          blue: "#3b82f6",
          violet: "#8b5cf6",
          green: "#34d399",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(120deg, #22d3ee 0%, #3b82f6 45%, #8b5cf6 100%)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(5,6,10,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(59,130,246,0.45)",
        "glow-violet": "0 0 50px -12px rgba(139,92,246,0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
