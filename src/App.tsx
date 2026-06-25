import { Suspense, lazy, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StaticBackground from "./components/scene/StaticBackground";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

// Lazy-load the heavy 3D bundle so it NEVER blocks first paint / content.
const Background3D = lazy(() => import("./components/scene/Background3D"));

/** Cheap WebGL capability check — if it fails, we fall back to CSS visuals. */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    // Decide AFTER mount so content paints first (progressive enhancement).
    // Skip 3D on reduced-motion, no WebGL, small screens, or low core counts.
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const lowCore = (navigator.hardwareConcurrency ?? 4) <= 4;
    const ok = !reducedMotion && supportsWebGL() && !isSmall && !lowCore;
    setEnable3D(ok);
  }, [reducedMotion]);

  return (
    <>
      {/* Background layer: 3D when capable, otherwise tasteful CSS glow. */}
      {enable3D ? (
        <Suspense fallback={<StaticBackground />}>
          <Background3D />
        </Suspense>
      ) : (
        <StaticBackground />
      )}

      {/* Skip link for keyboard users. */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-gradient focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-900"
      >
        Skip to projects
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
