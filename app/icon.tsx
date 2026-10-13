import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Reuses the exact "DA." monogram + rust accent already used in the site's
// own nav bar (components/Nav.tsx) — no separate logo asset to keep in sync.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08090b",
          color: "#ece7de",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "sans-serif",
        }}
      >
        DA
        <span style={{ color: "#c1440e" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
