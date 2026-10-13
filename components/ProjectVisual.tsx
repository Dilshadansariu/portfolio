"use client";

import { motion } from "motion/react";
import { Mic, Hand, ShoppingBag, ClipboardList, LayoutGrid, Activity, UserPlus, Search, Heart, type LucideIcon } from "lucide-react";
import type { Project } from "@/lib/projects";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Illustrated app mockups. These are deliberately skeleton-style (bars and
 * blocks, no invented numbers or fake customer data) so they read as realistic
 * product UI without pretending to be a screenshot of a deployed product.
 * To show a real screenshot instead, set `image` on the project in
 * lib/projects.ts — ProjectMedia swaps it in automatically.
 */

const bar = "rounded-full bg-bone/[0.10]";
const card = "rounded-md border border-line bg-bone/[0.03]";

function Sidebar() {
  return (
    <div className="hidden sm:flex w-10 shrink-0 flex-col items-center gap-3 border-r border-line/60 py-4">
      <span className="h-5 w-5 rounded-md bg-rust/50" />
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="h-3.5 w-3.5 rounded-sm bg-bone/[0.10]" />
      ))}
    </div>
  );
}

function Dashboard({ reduced }: { reduced: boolean }) {
  const heights = [40, 62, 34, 78, 52, 70, 46, 84, 58];
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${card} p-2.5 space-y-2`}>
              <div className={`${bar} h-1.5 w-1/2`} />
              <div className="h-3 w-2/3 rounded-sm bg-rust/40" />
            </div>
          ))}
        </div>
        <div className={`${card} p-3`}>
          <div className="flex h-24 items-end gap-1.5">
            {heights.map((h, i) => (
              <motion.div
                key={i}
                style={{ height: `${h}%`, transformOrigin: "bottom" }}
                animate={reduced ? undefined : { scaleY: [0.55, 1, 0.7, 0.95, 0.55] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
                className="flex-1 rounded-sm bg-rust/45"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Voice({ reduced }: { reduced: boolean }) {
  const wave = [8, 20, 14, 32, 22, 40, 18, 28, 12, 24, 16, 34, 10, 22, 14];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        {!reduced &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-rust/50"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 1.2, ease: "easeOut" }}
            />
          ))}
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rust/25 border border-rust/50">
          <Mic size={22} className="text-rustlight" strokeWidth={1.6} />
        </span>
      </div>
      <div className="flex items-center gap-1">
        {wave.map((h, i) => (
          <motion.span
            key={i}
            style={{ height: h }}
            animate={reduced ? undefined : { scaleY: [1, 1.7, 0.6, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
            className="w-1 rounded-full bg-rustlight/70"
          />
        ))}
      </div>
      <div className="hidden w-full max-w-[320px] space-y-2.5 sm:block">
        <div className={`${card} ml-auto w-3/4 p-2`}>
          <div className={`${bar} h-1.5 w-full`} />
        </div>
        <div className={`${card} w-2/3 p-2`}>
          <div className={`${bar} h-1.5 w-full`} />
        </div>
      </div>
    </div>
  );
}

function Vision({ reduced }: { reduced: boolean }) {
  // Hand-landmark style skeleton: wrist + 5 fingers of 3-4 joints each
  const fingers = [
    [[100, 150], [78, 128], [62, 104], [52, 82]],
    [[100, 150], [92, 116], [90, 86], [90, 58]],
    [[100, 150], [104, 114], [108, 82], [110, 52]],
    [[100, 150], [114, 118], [124, 92], [132, 68]],
    [[100, 150], [124, 128], [140, 110], [152, 92]],
  ];
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className="relative h-full max-h-64 aspect-[4/3] rounded-lg border border-line bg-bone/[0.02]">
        {/* viewfinder corner brackets */}
        {["top-1.5 left-1.5 border-t border-l", "top-1.5 right-1.5 border-t border-r", "bottom-1.5 left-1.5 border-b border-l", "bottom-1.5 right-1.5 border-b border-r"].map((c) => (
          <span key={c} className={`absolute h-3 w-3 border-rust/70 ${c}`} />
        ))}
        <svg viewBox="0 0 200 180" className="absolute inset-0 h-full w-full">
          {fingers.map((f, i) => (
            <polyline key={i} points={f.map((p) => p.join(",")).join(" ")} fill="none" stroke="rgba(232,103,47,0.45)" strokeWidth="1.5" />
          ))}
          {fingers.flat().map((p, i) => (
            <motion.circle
              key={i}
              cx={p[0]}
              cy={p[1]}
              r="3"
              fill="#e8672f"
              animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: (i % 4) * 0.18 }}
            />
          ))}
        </svg>
        <span className="absolute bottom-2 left-2 rounded-full border border-rust/50 bg-void/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-rustlight">
          detecting
        </span>
      </div>
    </div>
  );
}

function Ecommerce() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-line/60 px-4 py-2.5">
        <span className="h-3.5 w-8 rounded-sm bg-rust/50" />
        <div className="flex flex-1 items-center gap-2 rounded-full border border-line px-3 py-1">
          <Search size={10} className="text-muted" />
          <span className={`${bar} h-1 w-1/3`} />
        </div>
        <Heart size={12} className="text-muted" />
        <ShoppingBag size={12} className="text-muted" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2 p-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${card} flex flex-col overflow-hidden`}>
            <div className="flex-1 bg-gradient-to-br from-bone/[0.07] to-bone/[0.02]" />
            <div className="space-y-1 p-1.5">
              <div className={`${bar} h-1 w-3/4`} />
              <div className="h-1 w-1/3 rounded-full bg-rust/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 space-y-2 p-4">
        <div className="flex items-center justify-between">
          <div className={`${bar} h-2 w-24`} />
          <span className="flex items-center gap-1 rounded-md bg-rust/40 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-bone/70" />
            <span className="h-1 w-6 rounded-full bg-bone/60" />
          </span>
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`${card} flex items-center gap-2.5 px-2.5 py-1.5`}>
            <span className="h-4 w-4 shrink-0 rounded-full bg-bone/[0.12]" />
            <span className={`${bar} h-1.5 w-1/4`} />
            <span className={`${bar} h-1.5 w-1/5`} />
            <span className={`ml-auto h-3 w-9 rounded-full ${i % 3 === 0 ? "bg-emerald-500/30" : "bg-rust/30"}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-4">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-4 rounded-full border ${i === 0 ? "w-12 border-rust/60 bg-rust/20" : "w-9 border-line"}`} />
        ))}
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className={`${card} flex items-center gap-3 p-2.5`}>
          <span className="h-8 w-8 shrink-0 rounded-md bg-rust/30" />
          <div className="flex-1 space-y-1.5">
            <div className={`${bar} h-1.5 w-2/3`} />
            <div className="h-1.5 w-1/3 rounded-full bg-bone/[0.06]" />
          </div>
          <span className="hidden sm:block h-4 w-12 rounded-full border border-line" />
          <span className="h-5 w-11 rounded-md bg-rust/40" />
        </div>
      ))}
    </div>
  );
}

function Form() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className={`${card} w-full max-w-[300px] space-y-2 p-4 sm:space-y-3 sm:p-5`}>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rust/30">
            <UserPlus size={12} className="text-rustlight" />
          </span>
          <div className={`${bar} h-2 w-20`} />
        </div>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-1 w-10 rounded-full bg-bone/[0.08]" />
            <div className="h-5 w-full rounded-md border border-line bg-void/40" />
          </div>
        ))}
        <div className="h-6 w-full rounded-md bg-rust/50" />
      </div>
    </div>
  );
}

const ICONS: Record<Project["variant"], LucideIcon> = {
  dashboard: Activity,
  voice: Mic,
  vision: Hand,
  ecommerce: ShoppingBag,
  table: ClipboardList,
  cards: LayoutGrid,
  form: UserPlus,
};

export default function ProjectVisual({ variant }: { variant: Project["variant"] }) {
  const reduced = useReducedMotion();
  const Icon = ICONS[variant];

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-line/60 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-bone/15" />
        <span className="h-2 w-2 rounded-full bg-bone/15" />
        <span className="h-2 w-2 rounded-full bg-bone/15" />
        <div className="ml-3 h-3 w-28 rounded-full bg-bone/[0.06]" />
        <Icon size={14} className="ml-auto text-rust/50" strokeWidth={1.5} />
      </div>

      <div className="relative flex-1 overflow-hidden">
        {!reduced && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "300%" }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "linear", delay: 0.4 }}
            className="pointer-events-none absolute inset-x-0 z-10 h-1/4 bg-gradient-to-b from-transparent via-rust/[0.07] to-transparent"
          />
        )}
        {variant === "dashboard" && <Dashboard reduced={reduced} />}
        {variant === "voice" && <Voice reduced={reduced} />}
        {variant === "vision" && <Vision reduced={reduced} />}
        {variant === "ecommerce" && <Ecommerce />}
        {variant === "table" && <Table />}
        {variant === "cards" && <Cards />}
        {variant === "form" && <Form />}
      </div>
    </div>
  );
}
