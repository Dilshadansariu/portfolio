"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A soft rust-tinted light that follows the pointer across the whole page,
 * rendered as a radial-gradient positioned via CSS custom properties updated
 * on mousemove (no React re-render per frame — just two CSS vars). Subtle by
 * design: this should read as ambient depth, not a visible "spotlight prop".
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--sx", `${e.clientX}px`);
      el.style.setProperty("--sy", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={
        {
          "--sx": "50%",
          "--sy": "30%",
          background:
            "radial-gradient(600px circle at var(--sx) var(--sy), rgba(193,68,14,0.10), transparent 70%)",
        } as React.CSSProperties
      }
    />
  );
}
