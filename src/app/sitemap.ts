import type { MetadataRoute } from "next";

import { SITE_URL, TEAMS } from "@/data/site";

/**
 * Every page a visitor can reach from the nav or the footer, plus one page per
 * project team. Priorities are relative, not absolute — the home page first,
 * then the pages someone arrives for, then the rest.
 *
 * Each URL ends in a slash to match `trailingSlash` in `next.config.ts`: the
 * export writes `teams/index.html`, so `/teams/` is the address that exists and
 * the one a crawler should be given.
 */
const PAGES: readonly { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/teams", priority: 0.9 },
  { path: "/team", priority: 0.8 },
  { path: "/media", priority: 0.8 },
  { path: "/apply", priority: 0.8 },
  { path: "/sponsor", priority: 0.7 },
  { path: "/hackathons", priority: 0.6 },
  { path: "/resources", priority: 0.6 },
  { path: "/research", priority: 0.5 },
];

/** Built once, into a file: there is no server to regenerate it on request. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // One timestamp for the whole build: the content ships with the site, so
  // "last modified" is the day it was deployed.
  const lastModified = new Date();

  return [
    ...PAGES.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...TEAMS.map((team) => ({
      url: `${SITE_URL}/teams/${team.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
