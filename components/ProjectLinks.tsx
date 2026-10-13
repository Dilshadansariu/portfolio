"use client";

import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";

const viewCls =
  "inline-flex items-center gap-1.5 text-bone hover:text-rustlight transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void";
const codeCls =
  "inline-flex items-center gap-1.5 text-muted hover:text-bone transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rust/70 focus-visible:ring-offset-2 focus-visible:ring-offset-void";

/**
 * CTA row for a project. When `link` / `github` are set in lib/projects.ts
 * these become real links (opened safely: noopener + noreferrer so the opened
 * page can't reach back into this one via window.opener). Until a URL exists
 * they keep their current look as non-interactive labels, so nothing on the
 * page pretends to go somewhere it doesn't.
 */
export default function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-[0.2em]">
      {project.link ? (
        <a href={project.link} target="_blank" rel="noopener noreferrer" data-cursor-hover className={viewCls}>
          View Project <ArrowUpRight size={14} />
        </a>
      ) : (
        <span className={`${viewCls} cursor-default`}>
          View Project <ArrowUpRight size={14} />
        </span>
      )}
      {project.github ? (
        <a href={project.github} target="_blank" rel="noopener noreferrer" data-cursor-hover className={codeCls}>
          <Github size={14} /> Code
        </a>
      ) : (
        <span className={`${codeCls} cursor-default`}>
          <Github size={14} /> Code
        </span>
      )}
    </div>
  );
}
