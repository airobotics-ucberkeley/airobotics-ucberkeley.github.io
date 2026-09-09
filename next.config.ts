import type { NextConfig } from "next";

/**
 * The site ships as a static export to GitHub Pages, so this file is mostly a
 * list of things a static host cannot do for us.
 *
 * `output: "export"` writes plain HTML/CSS/JS to `out/` at build time. That
 * rules out `redirects()` and `headers()` — both need a server in front of the
 * files, and Pages does not give us one:
 *
 *   - the old `/news` and `/donate` links are handled by real pages that
 *     meta-refresh to `/media` and `/sponsor` instead of a 308; see
 *     `src/app/news/page.tsx`
 *   - of the security headers we would otherwise send, only `Referrer-Policy`
 *     has an HTML equivalent, and it is declared in the root layout. Pages
 *     already forces HTTPS, and the rest (nosniff, frame-deny,
 *     Permissions-Policy) have to wait for a host that can send headers
 *
 * `trailingSlash` makes every route a directory with an `index.html` in it, so
 * Pages resolves `/teams` and `/teams/` alike rather than depending on its
 * extension-guessing fallback. The sitemap writes the same shape.
 *
 * `images.unoptimized` is required: the default loader is a server route, and
 * there is no server. Everything in `public/` is already cropped and sized for
 * where it appears, so nothing is lost.
 *
 * No `basePath`: the repo is `airobotics-ucberkeley.github.io`, an org page,
 * which serves from the domain root rather than a `/repo` subpath.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
