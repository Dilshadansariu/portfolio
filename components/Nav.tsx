"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-colors duration-500 ${
        scrolled ? "bg-void/70 backdrop-blur-md border-b border-line" : ""
      }`}
    >
      <a href="#home" data-cursor-hover className="font-display font-extrabold text-sm tracking-widest">
        DA<span className="text-rust">.</span>
      </a>

      <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-cursor-hover className="hover:text-bone transition-colors duration-300">
            {l.label}
          </a>
        ))}
      </nav>

      <a
        href="#contact"
        data-cursor-hover
        className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border border-line rounded-full px-4 py-2 hover:border-rust hover:text-rustlight transition-colors duration-300"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-rust animate-pulse" />
        Available
      </a>

      <button
        onClick={() => setOpen((o) => !o)}
        className="md:hidden flex flex-col gap-1.5 z-50"
        aria-label="Toggle menu"
      >
        <span className={`block h-px w-6 bg-bone transition-transform ${open ? "rotate-45 translate-y-[3px]" : ""}`} />
        <span className={`block h-px w-6 bg-bone transition-transform ${open ? "-rotate-45 -translate-y-[3px]" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-void flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display font-bold text-3xl"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
