import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build/request time from the site's own palette (rust/void) —
// no external image asset to source or keep in sync with the live design.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08090b",
          backgroundImage:
            "linear-gradient(to right, rgba(236,231,222,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,231,222,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: "#c1440e", marginBottom: 24 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#c1440e", marginRight: 14 }} />
          AVAILABLE FOR WORK
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, fontWeight: 800, color: "#ece7de", lineHeight: 1 }}>
          <span>DILSHAD</span>
          {/* Satori (the engine behind next/og) doesn't render the site's real
              .text-outline trick (transparent fill + -webkit-text-stroke) —
              that's a browser-only CSS combo. A plain dim fill is the
              Satori-safe equivalent that still reads as the same two-tone
              treatment used in the live Hero. */}
          <span style={{ color: "rgba(236,231,222,0.35)" }}>ANSARI</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#8a8d93", marginTop: 28, maxWidth: 760 }}>
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
