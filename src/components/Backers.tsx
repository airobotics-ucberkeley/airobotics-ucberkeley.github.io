import Image from "next/image";

import { PARTNERSHIPS, SPONSORS, type Logo } from "@/data/site";

import { TREATMENT } from "./LogoMark";

/**
 * Sponsors and partnerships.
 *
 * Sponsors are cards — mark, name, and one line on what the company does — and
 * keep their brand colour on a light chip, because several marks are dark art
 * on transparency and would vanish into the canvas.
 *
 * Partnerships scroll past as a flat monochrome strip, following the reference
 * site's partner row. `treat` picks the filter that gets each source file to
 * white; see the `Logo` type in `data/site.ts`.
 */

function Chip({ logo, className }: { logo: Logo; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center rounded-sm bg-white/90 p-2.5 ${className ?? ""}`}
    >
      <Image
        src={logo.src}
        alt={logo.name}
        width={160}
        height={48}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Backers() {
  return (
    <section id="sponsors" className="scroll-mt-24 border-b border-hairline">
      {/* ---------------------------------------------------------- sponsors */}
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-14 pt-16">
        <div className="border-t border-hairline pt-4">
          <span className="tele text-ink-faint">Sponsors</span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-5 rounded-lg border border-hairline bg-panel/40 p-7 transition-colors duration-500 hover:bg-panel-hi/60"
            >
              <Chip
                logo={sponsor}
                className="h-14 w-20 shrink-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="min-w-0">
                <p className="font-display text-base font-semibold leading-snug tracking-tight text-ink">
                  {sponsor.name}
                </p>{" "}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------- partnerships */}
      <div className="border-t border-hairline py-12">
        <p className="tele mb-9 text-center text-ink-faint">
          Current and past partnerships
        </p>

        <div className="marquee-viewport overflow-hidden">
          <div className="marquee-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                className="flex items-center"
                aria-hidden={copy === 1 || undefined}
              >
                {PARTNERSHIPS.map((logo) => (
                  <a
                    key={`${copy}-${logo.name}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    title={logo.name}
                    className="mx-10 flex h-10 w-32 shrink-0 items-center justify-center"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={160}
                      height={44}
                      className={`h-full w-full object-contain opacity-50 transition-opacity duration-500 hover:opacity-90 ${TREATMENT[logo.treat ?? "mono"]}`}
                    />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
