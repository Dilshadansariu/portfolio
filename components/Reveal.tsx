"use client";

import { motion, useInView } from "motion/react";
import { ReactNode, useRef } from "react";

export function RevealLine({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  // IMPORTANT: we measure visibility on this OUTER, unclipped wrapper rather
  // than on the moving child. The child starts translated out of the
  // overflow:hidden mask, which means its own clipped intersection is zero —
  // observing the child directly creates a deadlock where it can never be
  // detected as "in view" because the mask hides it until it's already
  // revealed. Observing the wrapper (which isn't self-clipped) avoids that.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapperRef, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={wrapperRef} className={`reveal-mask ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
