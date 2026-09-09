import { ImageResponse } from "next/og";

import { SITE } from "@/data/site";

/**
 * The card that shows up when a link to the site is pasted anywhere.
 *
 * Drawn rather than photographed: a 1200x630 crop of a real photo reads as
 * noise at the size a chat client renders it, and the name has to survive that
 * shrink. Colours are the site's own — `--void`, `--gold`, the blue wash from
 * the page backgrounds — written out literally because this renders outside the
 * stylesheet.
 *
 * No custom font is loaded on purpose: fetching one at build time would make
 * the build depend on a network round trip to produce a picture nobody looks
 * at closely.
 *
 * This is a route handler at `/og.png` rather than the `opengraph-image` file
 * convention, because of where the site is hosted. That convention exports to a
 * file called `opengraph-image` with no extension, and GitHub Pages types a
 * response by its extension — the image would be served as
 * `application/octet-stream`, which the scrapers that fetch it reject. The
 * layout points `openGraph.images` here by hand.
 *
 * Built once, into a file: there is no server to render it on request.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#05070c",
        backgroundImage:
          "radial-gradient(900px 460px at 50% 0%, rgba(31,95,191,0.34), transparent 70%)",
        color: "#f2f5fa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#fdb515",
        }}
      >
        {SITE.org}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -3,
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 40,
            color: "#9fb0c8",
          }}
        >
          {SITE.tagline}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            width: 132,
            height: 6,
            background: "#fdb515",
          }}
        />
        <div style={{ display: "flex", fontSize: 24, color: "#9fb0c8" }}>
          Robot learning, run on real hardware.
        </div>
      </div>
    </div>,
    size,
  );
}
