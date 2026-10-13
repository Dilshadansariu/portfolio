import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#08090b",
        surface: "#0f1114",
        line: "#1e2126",
        bone: "#ece7de",
        rust: "#c1440e",
        rustlight: "#e8672f",
        muted: "#8a8d93",
        danger: "#f87171",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest2: "-0.05em",
      },
    },
  },
  plugins: [],
};
export default config;
