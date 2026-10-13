"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Fills the space next to the contact links with an actual photo — not an
 * abstract illustration — using the same angular clip-path + rust glow
 * treatment already established in Hero and About, so this reads as part of
 * the same design system rather than a new, disconnected style.
 */
export default function ContactVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(springX, [-1, 1], [-8, 8]);
  const imgY = useTransform(springY, [-1, 1], [-8, 8]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className="relative h-64 md:h-80 flex items-center justify-center"
    >
      <motion.div
        style={{ x: imgX, y: imgY }}
        className="relative w-44 md:w-52 aspect-[4/5]"
      >
        <div className="absolute -inset-5 rounded-full bg-rust/15 blur-2xl pointer-events-none" />
        <div
          className="relative h-full w-full overflow-hidden"
          style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)" }}
        >
          <Image
            src="/images/spare-portrait.png"
            alt="Dilshad Ansari working at his desk"
            fill
            sizes="(max-width: 768px) 176px, 208px"
            className="object-cover object-top grayscale-[0.5] brightness-[0.75] contrast-110 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
        </div>
        <div
          className="absolute -bottom-2 -right-2 h-full w-full border border-rust/30 -z-10"
          style={{ clipPath: "polygon(18% 0%, 100% 0%, 100% 82%, 82% 100%, 0% 100%, 0% 18%)" }}
        />
      </motion.div>

      <span className="absolute bottom-0 text-[10px] uppercase tracking-[0.2em] text-muted font-mono">
        Currently building something
      </span>
    </div>
  );
}
