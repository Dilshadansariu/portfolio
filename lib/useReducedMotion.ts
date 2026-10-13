"use client";

import { useEffect, useState } from "react";

/**
 * Respects prefers-reduced-motion: reduce. Every non-essential motion effect
 * in this project (parallax, particle field, custom cursor, magnetic pull,
 * scroll-line reveals) checks this and renders its final/neutral state
 * immediately instead of animating, per standard motion-accessibility
 * guidance (matchMedia('(prefers-reduced-motion: reduce)')).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
