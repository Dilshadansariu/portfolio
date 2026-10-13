"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/lib/projects";
import ProjectMedia from "./ProjectMedia";
import ProjectLinks from "./ProjectLinks";
import { projects } from "@/lib/projects";

const GRADIENTS = [
  "from-rust/30 via-void to-void",
  "from-indigo-500/20 via-void to-void",
  "from-emerald-500/20 via-void to-void",
  "from-fuchsia-500/20 via-void to-void",
  "from-sky-500/20 via-void to-void",
  "from-amber-500/20 via-void to-void",
];

export default function ProjectCard({ project, i }: { project: Project; i: number }) {
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
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-line py-10 md:py-14 grid md:grid-cols-12 gap-6 md:gap-10 items-center"
    >
      <div className="md:col-span-4 order-2 md:order-1">
        <span className="font-mono text-xs text-muted">{project.index}</span>
        <h3 className="font-display font-extrabold text-3xl md:text-4xl mt-2 leading-tight">{project.name}</h3>
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

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        className="md:col-span-8 order-1 md:order-2"
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
          className={`relative aspect-square sm:aspect-[16/10] w-full rounded-2xl border border-line bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} grid-lines overflow-hidden`}
        >
          <div className="absolute inset-x-0 top-0 bottom-12">
            <ProjectMedia project={project} sizes="(max-width: 768px) 100vw, 700px" />
          </div>
          <motion.div
            animate={{ opacity: hover ? 1 : 0.4 }}
            className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {project.tech.slice(0, 2).join(" · ")}
            </span>
            <span className="font-mono text-[10px] text-muted">{project.index}/{String(projects.length).padStart(2, "0")}</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
