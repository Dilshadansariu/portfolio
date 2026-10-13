"use client";

import { useRef, useState, ReactNode, MouseEvent } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return; // no magnetic pull for reduced-motion users
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * 0.35, y: relY * 0.35 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      onClick={onClick}
      data-cursor-hover
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
