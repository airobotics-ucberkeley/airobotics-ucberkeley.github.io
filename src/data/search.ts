import {
  PLATFORMS,
  HACKATHON,
  NEWS,
  PARTNERSHIPS,
  RESOURCE_GROUPS,
  SPONSOR_TIERS,
  SUPPORT_WAYS,
  SPONSORS,
  TEAMS,
} from "@/data/site";
import { MEDIA } from "@/data/media";
import { TEAM } from "@/data/team";

/**
 * Site search. The index is built at module load from the same data the pages
 * render, so a new person, team, or news item is searchable the moment it is
 * added — nothing here is a second copy of the copy.
 *
 * Only the routes below are hand-written, because a page's own subject matter
 * is not something the data files know: `keywords` is the vocabulary someone
 * might search for that does not appear in the visible title.
 */
export type SearchKind =
  "Page" | "Team" | "Member" | "News" | "Resource" | "Sponsor";

export type SearchDoc = {
  title: string;
  href: string;
  kind: SearchKind;
  /** Short detail shown beside the title — a role, a date, a status. */
  meta?: string;
  /** Extra text matched against, never displayed. Lowercased. */
  keywords: string;
};

const PAGES: SearchDoc[] = [
  {
    title: "Mission",
    href: "/#mission",
    kind: "Page",
    keywords:
      "about who we are applied competitive autonomy robot learning student organization rso berkeley pillars compete research educate",
  },
  {
    title: "Projects",
    href: "/teams",
    kind: "Page",
    keywords: `projects competition teams sponsored projects drone humanoid platforms wanted ${PLATFORMS.map(
      (p) => `${p.name} ${p.kind} ${p.source.name}`,
    ).join(" ")}`,
  },
  {
    title: "Members",
    href: "/team",
    kind: "Page",
    keywords: "roster people who is on the team leadership advisors members",
  },
  {
    title: "Resources",
    href: "/resources",
    kind: "Page",
    keywords:
      "courses classes reading tryouts assessment eecs cs berkeley syllabus lectures",
  },
  {
    title: "Hackathons",
    href: "/hackathons",
    kind: "Page",
    keywords: `hackathon weekend build event ${HACKATHON.cadence} ${HACKATHON.timing} ${HACKATHON.blurb}`,
  },
  {
    title: "Contact",
    href: "/sponsor",
    kind: "Page",
    keywords: `contact support get in touch email reach us sponsor sponsorship donation donate give giving gift tiers funding partners companies matching employer press collaboration ${SUPPORT_WAYS.map(
      (w) => `${w.name} ${w.body}`,
    ).join(" ")} ${SPONSOR_TIERS.map(
      (t) => `${t.name} ${t.amount} ${t.audience}`,
    ).join(" ")}`,
  },
  {
    title: "Media",
    href: "/media",
    kind: "Page",
    keywords: `photos gallery pictures images workshop competitions updates announcements news events calendar ${MEDIA.map(
      (m) => m.caption,
    ).join(" ")}`,
  },
  {
    title: "Apply",
    href: "/apply",
    kind: "Page",
    keywords: "join recruiting tryout application interest form get involved",
  },
  {
    title: "Research",
    href: "/research",
    kind: "Page",
    keywords: "thrusts directions papers perception control learning",
  },
];

const TEAM_DOCS: SearchDoc[] = TEAMS.map((team) => ({
  title: team.name,
  href: `/teams/${team.slug}`,
  kind: "Team",
  meta: team.kind,
  keywords: [
    team.summary,
    team.body,
    team.points.join(" "),
    team.status,
    team.sponsor?.name ?? "",
    team.logos?.map((l) => l.name).join(" ") ?? "",
  ].join(" "),
}));

const PEOPLE_DOCS: SearchDoc[] = TEAM.map((person) => ({
  title: person.name,
  href: `/team#${person.slug}`,
  kind: "Member",
  meta: person.role,
  keywords: [
    person.alias ?? "",
    person.blurb ?? "",
    person.major ?? "",
    person.year ?? "",
    person.lab ?? "",
    person.group,
  ].join(" "),
}));

const NEWS_DOCS: SearchDoc[] = NEWS.map((item) => ({
  title: item.title,
  href: item.href ?? "/media",
  kind: "News",
  meta: item.date,
  keywords: item.body,
}));

const RESOURCE_DOCS: SearchDoc[] = RESOURCE_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    title: item.name,
    href: item.href,
    kind: "Resource" as const,
    meta: group.heading,
    keywords: `${item.note} ${group.heading}`,
  })),
);

const SPONSOR_DOCS: SearchDoc[] = [
  ...SPONSORS.map((sponsor) => ({
    title: sponsor.name,
    href: "/#sponsors",
    kind: "Sponsor" as const,
    meta: "Sponsor",
    keywords: sponsor.note,
  })),
  ...PARTNERSHIPS.map((logo) => ({
    title: logo.name,
    href: "/#sponsors",
    kind: "Sponsor" as const,
    meta: "Partner",
    keywords: "partner partnership",
  })),
];

const INDEX: SearchDoc[] = [
  ...PAGES,
  ...TEAM_DOCS,
  ...PEOPLE_DOCS,
  ...NEWS_DOCS,
  ...RESOURCE_DOCS,
  ...SPONSOR_DOCS,
].map((doc) => ({ ...doc, keywords: doc.keywords.toLowerCase() }));

/**
 * Every query token has to match somewhere, so "drone racing" narrows rather
 * than widens. A hit in the title outranks one in the body, and a title that
 * starts with the token outranks one that merely contains it.
 */
export function searchSite(query: string, limit = 8): SearchDoc[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const hits: { doc: SearchDoc; score: number }[] = [];

  for (const doc of INDEX) {
    const title = doc.title.toLowerCase();
    const rest = `${(doc.meta ?? "").toLowerCase()} ${doc.keywords}`;
    let score = 0;

    const matched = tokens.every((token) => {
      if (title.startsWith(token)) return (score += 8);
      if (title.includes(` ${token}`)) return (score += 6);
      if (title.includes(token)) return (score += 4);
      if (rest.includes(token)) return (score += 2);
      return false;
    });

    if (matched) hits.push({ doc, score });
  }

  return hits
    .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title))
    .slice(0, limit)
    .map((hit) => hit.doc);
}
