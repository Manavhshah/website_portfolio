import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#faf9f6",
          color: "#1f1c18",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7a746b",
            fontFamily: "monospace",
          }}
        >
          {site.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 84, lineHeight: 1.02, letterSpacing: -1 }}>
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, lineHeight: 1.15, color: "#b8632a", maxWidth: 900 }}>
            {site.tagline}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#7a746b", fontFamily: "monospace" }}>
          {site.location}
        </div>
      </div>
    ),
    size,
  );
}
