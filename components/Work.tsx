import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import WorkHorizontal from "./WorkHorizontal";
import { RevealLine } from "./Reveal";

export default function Work() {
  return (
    <section id="work" className="relative">
      <div className="px-6 md:px-10 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-6xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">03 / Selected Work</span>
          <RevealLine delay={0.05} className="mt-4">
            <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">
              Things I&apos;ve
              <br />
              built.
            </h2>
          </RevealLine>
        </div>
      </div>

      {/* Desktop / tablet: cinematic horizontal-scroll gallery (vertical scroll drives horizontal pan) */}
      <WorkHorizontal />

      {/* Mobile: normal stacked vertical cards — a horizontal-scroll page is a poor
          fit for touch devices (fights native vertical scroll, easy to get "stuck"
          mid-gesture), so mobile intentionally gets its own straightforward layout
          rather than a shrunk version of the desktop interaction. */}
      <div className="md:hidden px-6 pb-10">
        <div className="max-w-6xl mx-auto mt-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
