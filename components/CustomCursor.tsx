"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(isFine && !reduced);
    if (!isFine || reduced) return;
    document.body.classList.add("has-cursor");

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    let raf = 0;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);

    const onEnter = () => ringRef.current?.classList.add("scale-[2.2]", "bg-bone/10");
    const onLeave = () => ringRef.current?.classList.remove("scale-[2.2]", "bg-bone/10");
    const interactive = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [reduced]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-rust pointer-events-none will-change-transform"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 z-[70] h-8 w-8 rounded-full border border-bone/40 pointer-events-none transition-transform duration-200 will-change-transform"
      />
    </>
  );
}
