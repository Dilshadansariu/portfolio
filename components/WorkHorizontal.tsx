"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import ProjectMedia from "./ProjectMedia";
import ProjectLinks from "./ProjectLinks";

const GRADIENTS = [
  "from-rust/30 via-void to-void",
  "from-indigo-500/20 via-void to-void",
  "from-emerald-500/20 via-void to-void",
  "from-fuchsia-500/20 via-void to-void",
  "from-sky-500/20 via-void to-void",
  "from-amber-500/20 via-void to-void",
];

function Panel({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <div className="w-screen shrink-0 h-screen flex items-center px-10 lg:px-20">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-12 gap-10 items-center">
        <div className="col-span-4">
          <span className="font-mono text-xs text-muted">{project.index}</span>
          <h3 className="font-display font-extrabold text-4xl lg:text-5xl mt-2 leading-tight">
            {project.name}
          </h3>
          <span className="inline-block mt-3 text-[10px] uppercase tracking-[0.2em] text-rustlight font-mono">
            {project.tag}
          </span>
          <p className="mt-4 text-sm text-muted leading-relaxed max-w-sm">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] uppercase tracking-wider border border-line rounded-full px-3 py-1 text-muted">
                {t}
              </span>
            ))}
          </div>

          <ProjectLinks project={project} />
        </div>

        <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setHover(true)} onMouseLeave={onLeave} className="col-span-8" style={{ perspective: 1000 }}>
          <motion.div
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
            className={`relative aspect-[16/9] w-full rounded-2xl border border-line bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} grid-lines overflow-hidden`}
          >
            <div className="absolute inset-x-0 top-0 bottom-12">
              <ProjectMedia project={project} sizes="(max-width: 1280px) 60vw, 760px" />
            </div>
            <motion.div animate={{ opacity: hover ? 1 : 0.4 }} className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {project.tech.slice(0, 2).join(" · ")}
              </span>
              <span className="font-mono text-[10px] text-muted">
                {project.index}/{String(projects.length).padStart(2, "0")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function WorkHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}%`]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative hidden md:block" style={{ height: `${projects.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ x }} className="flex h-full">
          {projects.map((p, i) => (
            <Panel key={p.index} project={p} i={i} />
          ))}
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted pointer-events-none"
        >
          Scroll to explore <ArrowUpRight size={12} className="rotate-90" />
        </motion.div>

        <div className="absolute bottom-8 left-10 right-10 lg:left-20 lg:right-20 h-px bg-line">
          <motion.div style={{ width: progressWidth }} className="h-full bg-rust" />
        </div>
      </div>
    </div>
  );
}
