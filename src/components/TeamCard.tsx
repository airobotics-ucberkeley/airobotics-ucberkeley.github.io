import Image from "next/image";

import { initials, type Person } from "@/data/team";

/**
 * Roster tile. Every card carries the same rows in the same order, so the grid
 * reads as one set:
 *
 *   1. photo, or a monogram for anyone we have no photo of, beside the name
 *      (+ known-by name) and team role, from the vocabulary in `team.ts`
 *   2. degree and lab
 *   3. profiles — LinkedIn, GitHub, a site
 *
 * The photo is a quarter of the card's width rather than a banner across the
 * top: a roster reads as names first, and the small square keeps a member
 * without a photo from leaving a hole in the grid.
 *
 * The degree row holds its slot when empty, which keeps names and links aligned
 * across a row of cards. Nothing here is inferred: an unset field renders as
 * nothing rather than a guess, and profile links are suppressed for `unknown`
 * confidence matches.
 */
export function TeamCard({ person }: { person: Person }) {
  // "PhD, EECS · BAIR" — degree first, then lab. Either half may be missing.
  const degree = [person.year, person.major].filter(Boolean).join(", ");
  const study = [degree || null, person.lab].filter(Boolean).join(" · ");

  const links = [
    person.confidence !== "unknown" && person.linkedin
      ? { label: "LinkedIn", href: person.linkedin }
      : null,
    person.twitter ? { label: "X", href: person.twitter } : null,
    person.website ? { label: "Site", href: person.website } : null,
    person.scholar ? { label: "Scholar", href: person.scholar } : null,
    person.github ? { label: "GitHub", href: person.github } : null,
  ].filter((l): l is { label: string; href: string } => l !== null);

  return (
    <article
      id={person.slug}
      className="group flex h-full flex-col scroll-mt-28 rounded-lg border border-hairline bg-panel/40 p-5 transition-colors duration-500 hover:bg-panel-hi/60"
    >
      {/* --------------------------------------------------- photo and name */}
      <div className="flex items-start gap-3">
        {/* A quarter of the card wide, square, and the monogram fills the
            same box so the rows line up whether or not there is a photo. */}
        <div className="relative aspect-square w-1/4 shrink-0 overflow-hidden rounded-sm border border-hairline bg-void">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              fill
              sizes="(min-width: 1280px) 64px, (min-width: 640px) 12vw, 24vw"
              className="object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
            />
          ) : (
            <span className="tele absolute inset-0 flex items-center justify-center text-[0.5625rem] text-ink-faint transition-colors group-hover:text-gold">
              {initials(person)}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-ink">
            {person.name}
          </h3>
          {person.alias ? (
            <p className="tele mt-1 text-[0.5625rem] text-ink-faint">
              “{person.alias}”
            </p>
          ) : null}
          <p className="tele mt-1.5 text-[0.5625rem] text-gold">
            {person.role}
          </p>
        </div>
      </div>

      {/* ----------------------------------------------------------- degree */}
      <p className="tele mt-4 min-h-[0.875rem] text-[0.5rem] leading-relaxed text-ink-faint">
        {study}
      </p>

      {/* ------------------------------------------------------------ links */}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="tele text-[0.5rem] text-ink-dim transition-colors hover:text-gold"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </article>
  );
}
