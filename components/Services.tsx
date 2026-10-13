"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Rocket, Bot, LayoutTemplate, Blocks, ArrowUpRight } from "lucide-react";
import { FadeUp, RevealLine } from "./Reveal";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

const SERVICES = [
  {
    icon: Rocket,
    title: "Full-Stack Web Applications",
    desc: "From idea to a live, working product. Frontend, backend, database and deployment — built to actually ship, not just demo.",
  },
  {
    icon: Bot,
    title: "AI-Powered Products",
    desc: "Chatbots, automation, and LLM-integrated features that solve a real workflow problem, not a gimmick bolted onto a landing page.",
  },
  {
    icon: Blocks,
    title: "MVPs & Startup Builds",
    desc: "Validate your idea fast. A lean, functional first version you can put in front of real users and real investors within weeks, not months.",
  },
  {
    icon: LayoutTemplate,
    title: "Premium Interfaces",
    desc: "Interfaces that make visitors trust the brand on sight — the same attention to motion and detail you're seeing on this page.",
  },
];

function ServiceRow({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  // Cursor-following light inside the row (the "spotlight card" pattern),
  // driven by two CSS variables so there's no React re-render per mouse move.
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <a
        ref={ref}
        href="#contact"
        onMouseMove={onMove}
        data-cursor-hover
        className={cn(
          "group relative block overflow-hidden border-t border-line",
          "px-0 md:px-4 py-8 md:py-10 transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
        )}
        aria-label={`${s.title} — start a project`}
      >
        {/* accent line that sweeps across the top edge on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-rust transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        {/* cursor spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(193,68,14,0.10), transparent 70%)",
          }}
        />

        <div className="relative grid grid-cols-12 gap-x-6 gap-y-4 items-start md:items-center">
          <div className="col-span-12 md:col-span-2 flex items-center gap-4">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line transition-colors duration-300 group-hover:border-rust/60">
              <s.icon size={19} className="text-rustlight" strokeWidth={1.6} />
            </span>
          </div>

          <h3 className="col-span-12 md:col-span-5 font-display font-bold text-2xl md:text-3xl leading-tight transition-colors duration-300 group-hover:text-rustlight">
            {s.title}
          </h3>

          <p className="col-span-12 md:col-span-4 text-sm text-muted leading-relaxed">{s.desc}</p>

          <ArrowUpRight
            aria-hidden
            size={20}
            className="hidden md:block col-span-1 justify-self-end text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-rustlight"
          />
        </div>
      </a>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative px-6 md:px-10 py-28 md:py-32 border-t border-line overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">
          02 / What I Build
        </span>
        <RevealLine delay={0.05} className="mt-4 mb-4">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">
            Have a project
            <br />
            in mind?
          </h2>
        </RevealLine>
        <FadeUp delay={0.15} className="max-w-lg text-sm md:text-base text-muted mb-14">
          If it involves a web app, an AI feature, or a product that needs to look and feel
          premium — this is exactly the kind of work I do.
        </FadeUp>

        <div className="border-b border-line">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.title} s={s} i={i} />
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse" />
          Currently taking on new projects — usually replies within 24 hours.
        </FadeUp>
      </div>
    </section>
  );
}
