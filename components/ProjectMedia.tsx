"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";
import ProjectVisual from "./ProjectVisual";

/**
 * Single place that decides what fills a project's visual box, so the mobile
 * cards and the desktop horizontal gallery can never drift apart.
 *  - project.image set  -> the real screenshot (optimized by next/image)
 *  - otherwise          -> the illustrated mockup
 */
export default function ProjectMedia({ project, sizes }: { project: Project; sizes: string }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
      </div>
    );
  }
  return <ProjectVisual variant={project.variant} />;
}
