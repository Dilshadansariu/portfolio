import { RevealLine } from "./Reveal";

const SKILLS = [
  "React.js", "JavaScript", "Python", "Node.js", "Express.js", "MongoDB",
  "MySQL", "Flask", "REST APIs", "Git", "GitHub", "HTML", "CSS", "C#", "ASP.NET MVC",
];

export default function Skills() {
  const loop = [...SKILLS, ...SKILLS];
  return (
    <section id="skills" className="relative py-28 md:py-32 border-t border-line overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">04 / Skills</span>
        <RevealLine delay={0.05} className="mt-4 mb-14">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl leading-[0.95]">Tools I reach for.</h2>
        </RevealLine>
      </div>

      <div className="marquee-track">
        {loop.map((s, i) => (
          <span
            key={i}
            className="font-display font-extrabold text-[9vw] md:text-[4.5vw] leading-none px-6 whitespace-nowrap text-outline hover:text-bone hover:[-webkit-text-stroke:0px] transition-all duration-300"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="marquee-track mt-4" style={{ animationDirection: "reverse", animationDuration: "34s" }}>
        {loop
          .slice()
          .reverse()
          .map((s, i) => (
            <span
              key={i}
              className="font-display font-extrabold text-[9vw] md:text-[4.5vw] leading-none px-6 whitespace-nowrap text-bone/20 hover:text-rustlight transition-all duration-300"
            >
              {s}
            </span>
          ))}
      </div>
    </section>
  );
}
