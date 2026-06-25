import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion at the OS level.
 * Components use this to skip 3D / heavy animation entirely — a core
 * accessibility + performance requirement of this portfolio.
 */
export function usePrefersReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
