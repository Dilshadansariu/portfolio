"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const SESSION_KEY = "portfolio-loader-shown";

export default function Loader() {
  // Both start false to match the server-rendered markup exactly (no
  // `window`/`sessionStorage` on the server) — this avoids a hydration
  // mismatch. `skip` is then set synchronously before the browser's first
  // paint via useLayoutEffect, so a returning visitor within the same
  // session never actually sees the loader flash on screen.
  const [skip, setSkip] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      setSkip(true);
      setDone(true);
    }
  }, []);

  useEffect(() => {
    if (skip || done) return;
    document.body.style.overflow = "hidden";
    const start = Date.now();
    let finishTimer: ReturnType<typeof setTimeout> | undefined;
    const id = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / 900) * 100));
      setCount(pct);
      if (pct >= 100) {
        clearInterval(id);
        finishTimer = setTimeout(() => {
          setDone(true);
          sessionStorage.setItem(SESSION_KEY, "1");
        }, 250);
      }
    }, 30);
    return () => {
      clearInterval(id);
      clearTimeout(finishTimer);
      // ALWAYS give scrolling back when this effect is torn down. On a reload
      // within the same session, useLayoutEffect flips `skip` to true right
      // after this effect has already locked the body, which tears the effect
      // down before the 250ms restore timer could ever run — previously that
      // left the page permanently unscrollable.
      document.body.style.overflow = "";
    };
  }, [skip, done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
        >
          <span className="font-display font-extrabold text-6xl md:text-8xl tabular-nums">
            {count}
            <span className="text-rust">.</span>
          </span>
          <span className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">Loading portfolio</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
