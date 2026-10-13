"use client";

import Image from "next/image";
import { FadeUp, RevealLine } from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-10 py-28 md:py-40 border-t border-line">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <span className="text-xs uppercase tracking-[0.25em] text-rustlight font-mono">01 / About</span>
          <RevealLine className="mt-4" delay={0.05}>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.02]">
              Not just a
              <br />
              developer.
            </h2>
          </RevealLine>

          <FadeUp delay={0.2} className="relative mt-10 w-40 md:w-full max-w-[220px] aspect-[3/4] mx-auto md:mx-0">
            <div
              className="relative h-full w-full overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}
            >
              <Image
                src="/images/about.png"
                alt="Dilshad Ansari"
                fill
                sizes="(max-width: 768px) 160px, 220px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </FadeUp>
        </div>

        <div className="md:col-span-8 md:pt-16">
          <FadeUp delay={0.1}>
            <p className="font-display text-2xl md:text-4xl leading-snug text-bone">
              I&apos;m a <span className="text-muted">B.Sc. Information Technology</span> graduate and{" "}
              <span className="text-rustlight">Full Stack Web Developer</span> — focused on in building
              modern web applications, AI products and interactive experiences that feel considered,
              not templated.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "Focus", value: "Full Stack + AI" },
              { label: "Based in", value: "Mumbai, India" },
              { label: "Education", value: "B.Sc. IT" },
              { label: "Status", value: "Open to work" },
            ].map((item) => (
              <div key={item.label} className="border-t border-line pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted font-mono">{item.label}</p>
                <p className="mt-2 text-sm md:text-base">{item.value}</p>
              </div>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
