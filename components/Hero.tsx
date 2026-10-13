"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { RevealLine } from "./Reveal";
import ParticleField from "./ParticleField";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 60, damping: 20 });
  const springY = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(springX, [-1, 1], [-14, 14]);
  const imgY = useTransform(springY, [-1, 1], [-14, 14]);
  const glowX = useTransform(springX, [-1, 1], [-40, 40]);
  const glowY = useTransform(springY, [-1, 1], [-40, 40]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return; // skip parallax tracking entirely for reduced motion
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMove}
      className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 pt-28 pb-16 overflow-hidden grid-lines"
    >
      <ParticleField />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-2 mb-6 text-xs uppercase tracking-[0.25em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse" />
            Available for work · Mumbai, IN
          </motion.div>

          <h1 className="font-display font-extrabold leading-[0.92] tracking-tightest2">
            <RevealLine delay={0.05}>
              <span className="block text-[15vw] md:text-[6.4vw]">DILSHAD</span>
            </RevealLine>
            <RevealLine delay={0.15}>
              <span className="block text-[15vw] md:text-[6.4vw] text-outline">ANSARI</span>
            </RevealLine>
          </h1>

          <RevealLine delay={0.3}>
            <p className="mt-6 max-w-md text-sm md:text-base text-muted leading-relaxed">
              I build modern web applications, AI-powered products and interactive
              digital experiences. B.Sc. Information Technology graduate & Full Stack
              Web Developer.
            </p>
          </RevealLine>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#work" className="group relative inline-flex items-center gap-2 bg-bone text-void font-display font-bold text-sm uppercase tracking-widest px-7 py-3.5 rounded-full">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" className="inline-flex items-center gap-2 border border-line text-bone text-sm uppercase tracking-widest px-7 py-3.5 rounded-full hover:border-rust hover:text-rustlight transition-colors">
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          style={{ x: imgX, y: imgY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto md:mx-0 w-[62%] md:w-full max-w-[340px] aspect-[4/5]"
        >
          <motion.div
            style={{ x: glowX, y: glowY }}
            className="absolute -inset-6 rounded-full bg-rust/20 blur-3xl"
          />
          <div
            className="relative h-full w-full overflow-hidden"
            style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }}
          >
            <Image
              src="/images/hero.png"
              alt="Dilshad Ansari"
              fill
              priority
              sizes="(max-width: 768px) 62vw, 340px"
              className="object-cover grayscale-[0.3] contrast-110 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-3 -right-3 h-full w-full border border-rust/40 -z-10" style={{ clipPath: "polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)" }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 max-w-6xl mx-auto w-full flex justify-between items-end mt-14 md:mt-20"
      >
        <div className="hidden md:flex gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted">
          {["React", "Next.js", "TypeScript", "AI"].map((t) => (
            <span key={t} className="border border-line rounded-full px-3 py-1">
              {t}
            </span>
          ))}
        </div>
        <motion.a
          href="#about"
          data-cursor-hover
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted ml-auto"
        >
          Scroll <ArrowDown size={14} />
        </motion.a>
      </motion.div>
    </section>
  );
}
