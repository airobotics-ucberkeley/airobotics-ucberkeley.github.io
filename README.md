# airobotics-berkeley-website

Team website for **airobotics@berkeley** — applied competitive autonomy.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · framer-motion.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where things live

| Path | What |
| --- | --- |
| `src/app/page.tsx` | Home — hero, mission, programs, research rows, team preview, CTAs |
| `src/app/team/page.tsx` | Roster, grouped by leadership / advisors / members |
| `src/app/teams/` | Project teams: index, drone racing, Tensr, Innate |
| `src/app/resources/page.tsx` | Recommended courses and the tryout process |
| `src/app/globals.css` | Design system: color tokens, type scale, and every keyframe |
| `src/data/site.ts` | Site copy — nav, pillars, feature rows, partner strip, footer |
| `src/data/team.ts` | Roster. Add people here, not in JSX |
| `src/components/` | Nav, Hero, Marquee, FeatureRow, FeatureVisual, TeamCard, CTABand, Footer |

### Editing content

Almost all copy lives in `src/data/site.ts` and `src/data/team.ts`. Changing a
headline, adding a partner, or updating the roster should not require touching a
component.

**Adding a team member:** see [`docs/add-yourself.md`](docs/add-yourself.md) —
copy `PERSON_TEMPLATE` from `src/data/team.ts`, fill it in, drop a square photo
in `public/team/`, and open a PR. Cards show name, role, major, year, lab, and
links; unset fields simply do not render.

**Headline numbers** on the home page are counted from the roster where possible
so they cannot drift out of date. The two hardcoded ones (`3` research thrusts,
`10 TB` telemetry) are in `STATS` at the top of `src/app/page.tsx`.

## Design

The layout follows the structure of the reference Framer site (nav → hero →
partner strip → gradient band → eyebrow'd feature sections → CTA → deep footer),
rendered on a carbon canvas instead of white:

- **Color** — near-black `--void` ground, Berkeley blue and California gold as
  the only accents. The two CTA bands are the deliberate light break in the page.
- **Type** — Bricolage Grotesque for display, Manrope for body, Azeret Mono for
  the uppercase "telemetry" labels (`.tele`).
- **Motifs** — corner-bracket cards (`.bracket`), a 64px engineering grid
  (`.gridfield`), and section rules carrying an index and kicker.
- **Motion** — a perspective ground plane, drifting gate rings, and a radar
  sweep in the hero; small scroll reveals elsewhere. Everything is disabled
  under `prefers-reduced-motion`.

Diagrams in the research rows are inline SVG (`src/components/FeatureVisual.tsx`)
rather than photography — no image pipeline, and they stay sharp at any size.

### Hero footage

The hero plays `public/video/hero.mp4` behind the headline if the file exists
(add `hero-poster.jpg` beside it for the first frame). With no file there, the
component removes itself and the planning-graph canvas carries the hero alone.
Keep the clip short, muted, and under a few MB — it is atmosphere at 25%
opacity, not a showreel, and it must be footage we have the right to use.

## Deploy

Static-friendly: every route prerenders. Vercel works with no configuration
(`npm run build`); any host that can serve a Next.js standalone build works too.
