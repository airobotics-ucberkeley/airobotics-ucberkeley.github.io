# Add yourself to the site

Two minutes, one file, one pull request. Nothing on your card is written by
anyone but you.

## 1. Add your entry

Open [`src/data/team.ts`](../src/data/team.ts). Copy the block below, fill it
in, and paste it into the `TEAM` array in the right group (`leadership`,
`advisors`, or `members`).

```ts
{
  slug: "first-last",              // lowercase, hyphenated, unique
  name: "First Last",
  alias: "Nickname",               // optional — what people call you
  role: "Perception",              // your subsystem or title
  blurb: "One line on what you work on", // optional
  group: "members",                // "leadership" | "advisors" | "members" | "past"
  email: "you@berkeley.edu",
  major: "EECS",                   // optional
  year: "'27",                     // optional — "'27", "MS", "PhD", "Postdoc"
  lab: "BAIR",                     // optional
  linkedin: "https://www.linkedin.com/in/you/",
  twitter: "https://x.com/you",    // optional
  website: "https://you.example",  // optional
  scholar: "https://scholar.google.com/citations?user=...", // optional
  github: "https://github.com/you",// optional
  photo: "/team/first-last.jpg",   // optional — see step 2
  confidence: "confirmed",
},
```

**Delete any line you don't want on the site.** Only `slug`, `name`, `role`,
`group`, `email`, and `confidence` are required. An empty field just doesn't
render — it never falls back to a guess.

`confidence` refers to the LinkedIn link: leave it `"confirmed"` for your own
entry, since you know it's yours.

## 2. Add your photo

Drop a **square** image (400×400 or larger, JPG or PNG) into
[`public/team/`](../public/team) named after your slug — `first-last.jpg` — and
set the `photo` field to `/team/first-last.jpg`.

Without a photo you get a monogram tile, which is fine. Photos render in
greyscale and come up to colour on hover.

## 3. Open a pull request

```bash
git checkout -b add-first-last
git add src/data/team.ts public/team/first-last.jpg
git commit -m "Add First Last to the roster"
git push -u origin add-first-last
```

Then open a PR against `main`. If anything on your current entry is wrong,
change it in the same PR — you don't need to ask.

## What the card shows

Name, role, then your degree (`PhD, EECS · BAIR`), then a one-line blurb on
what you work on, then your links. No bio paragraphs: if it isn't in one of
those fields, it isn't on the site.

## Leaving the team

Change your `group` to `"past"` and you move to the Past Members section.
Nothing else needs to change.

## Checking it locally (optional)

```bash
npm install
npm run dev      # http://localhost:3000/team
```

`npm run build` must pass before the PR merges; a missing comma in `team.ts`
will fail the type check.
