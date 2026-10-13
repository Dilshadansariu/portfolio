import { FadeUp, RevealLine } from "./Reveal";

const TIMELINE = [
  {
    year: "2026",
    title: "Full Stack Web Development / MERN Internship",
    org: "Internship",
  },
  {
    year: "2025",
    title: "B.Sc. Information Technology",
    org: "MVLU College, Mumbai",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 md:px-10 py-28 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">05 / Experience & Education</span>
        <RevealLine delay={0.05} className="mt-4 mb-14">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">Where I&apos;ve been.</h2>
        </RevealLine>

        <div>
          {TIMELINE.map((item, i) => (
            <FadeUp key={item.year} delay={i * 0.1}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-8 border-t border-line group">
                <span className="font-mono text-sm text-muted w-20 shrink-0">{item.year}</span>
                <h3 className="font-display font-bold text-2xl md:text-3xl group-hover:text-rustlight transition-colors duration-300">
                  {item.title}
                </h3>
                <span className="sm:ml-auto text-sm text-muted">{item.org}</span>
              </div>
            </FadeUp>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  );
}
