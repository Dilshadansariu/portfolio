"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      const contact = document.getElementById("contact");
      if (!hero || !contact) return;
      const pastHero = window.scrollY > hero.offsetHeight * 0.8;
      const beforeContact = window.scrollY + window.innerHeight < contact.offsetTop + 200;
      setVisible(pastHero && beforeContact);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          data-cursor-hover
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 hidden sm:inline-flex items-center gap-2 bg-bone text-void font-display font-bold text-xs uppercase tracking-widest px-5 py-3.5 rounded-full shadow-2xl hover:bg-rustlight hover:text-void transition-colors"
        >
          Start a Project <ArrowUpRight size={14} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
