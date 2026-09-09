import Image from "next/image";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { TeamTabs } from "@/components/TeamTabs";
import { APPLY_HREF, isLive, TEAMS } from "@/data/site";

/**
 * Page body shared by the sponsored project teams. They differ only in data, so
 * the layout lives here and each route passes a slug.
 */
export function SponsoredProject({ slug }: { slug: string }) {
  const team = TEAMS.find((t) => t.slug === slug);

  if (!team) {
    throw new Error(`Unknown team: ${slug}`);
  }

  // Neither button becomes a link until its URL is a real one.
  const uploadOpen = isLive(team.challengeUploadHref);
  const briefOpen = isLive(team.challengeHref);

  return (
    <>
      <Nav />
      <TeamTabs />

      <main className="flex-1">
        {/* ---------------------------------------------------------- head */}
        <section className="relative isolate overflow-hidden border-b border-hairline pb-12 pt-20 md:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.24),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">{team.name}.</span>
            </h1>

            <p className="lede mt-7 max-w-[52ch]">{team.summary}</p>

            <div className="relative mt-10 aspect-[16/9] w-full max-w-[46rem] overflow-hidden rounded-lg border border-hairline">
              {team.image ? (
                <Image
                  src={team.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 46rem"
                  className="object-cover opacity-85"
                  priority
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{ background: team.tint }}
                  />
                  {(team.mark ?? team.sponsor) ? (
                    <Image
                      src={team.mark ?? team.sponsor!.src}
                      alt=""
                      width={220}
                      height={88}
                      className="absolute left-1/2 top-1/2 h-16 w-auto max-w-[12rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 brightness-0 invert"
                    />
                  ) : null}
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="tele rounded-full border border-hairline px-4 py-2 text-ink-dim">
                {team.kind}
              </span>
              <span className="tele rounded-full border border-gold/40 px-4 py-2 text-gold">
                {team.status}
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- overview */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-16 md:py-20">
          <div className="max-w-[58ch]">
            <Reveal>
              <h2 className="display text-[clamp(1.5rem,2.9vw,2.1rem)]">
                The project
              </h2>

              <p className="lede mt-6">{team.body}</p>

              <ul className="mt-8 flex flex-wrap gap-2">
                {team.points.map((point) => (
                  <li
                    key={point}
                    className="tele rounded-full border border-hairline px-3 py-1.5 text-[0.5625rem] text-ink-dim"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------------- challenge */}
        {team.challenge ? (
          <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
            <Reveal>
              <div className="rounded-lg border border-hairline bg-panel/40 p-8 md:p-10">
                <h2 className="display text-[clamp(1.5rem,2.9vw,2.1rem)]">
                  The challenge
                </h2>

                {team.challengeImages?.length ? (
                  <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {team.challengeImages.map((shot) => {
                      const tile = (
                        <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-hairline">
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      );

                      return shot.href ? (
                        <a
                          key={shot.src}
                          href={shot.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={shot.alt}
                        >
                          {tile}
                        </a>
                      ) : (
                        <div key={shot.src}>{tile}</div>
                      );
                    })}
                  </div>
                ) : null}

                <dl className="mt-8">
                  {team.challenge.map((item) => (
                    <div
                      key={item.name}
                      className="grid gap-1 border-t border-hairline py-4 md:grid-cols-[11rem_1fr] md:gap-6"
                    >
                      <dt className="tele pt-0.5 text-ink">{item.name}</dt>
                      <dd className="text-sm leading-relaxed text-ink-dim">
                        {item.body}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  {uploadOpen ? (
                    <a
                      href={team.challengeUploadHref}
                      target="_blank"
                      rel="noreferrer"
                      className="tele group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Upload your design
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="tele inline-flex items-center justify-center rounded-full border border-hairline-strong px-7 py-4 text-ink-faint">
                      Uploads open with the brief
                    </span>
                  )}

                  {briefOpen ? (
                    <a
                      href={team.challengeHref}
                      target="_blank"
                      rel="noreferrer"
                      className="tele group inline-flex items-center justify-center gap-2 rounded-full border border-hairline-strong px-6 py-3 text-ink-dim transition-colors hover:border-gold hover:text-gold"
                    >
                      Read the brief
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="tele inline-flex items-center justify-center rounded-full border border-hairline px-6 py-3 text-ink-faint">
                      Brief — TBA
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        ) : null}

        {/* ------------------------------------------------- about the sponsor */}
        {team.sponsor ? (
          <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
            <Reveal>
              <div className="rounded-lg border border-hairline bg-panel/40 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-5">
                  <span className="flex h-14 w-20 shrink-0 items-center justify-center rounded-sm bg-white/90 p-2.5">
                    <Image
                      src={team.sponsor.src}
                      alt={team.sponsor.name}
                      width={120}
                      height={48}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <div>
                    <p className="tele text-ink-faint">Sponsor</p>
                    <h2 className="display mt-2 text-[clamp(1.5rem,2.9vw,2.1rem)]">
                      {team.sponsor.name}
                    </h2>
                  </div>
                </div>

                <p className="lede mt-8 max-w-[62ch]">{team.sponsor.about}</p>

                {team.sponsor.facts ? (
                  <dl className="mt-9 grid gap-4 sm:grid-cols-3">
                    {team.sponsor.facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="border-t border-hairline py-4 sm:pr-8"
                      >
                        <dt className="tele text-[0.5625rem] text-ink-faint">
                          {fact.label}
                        </dt>
                        <dd className="mt-2 text-sm text-ink-dim">
                          {fact.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                <a
                  href={team.sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="tele group mt-9 inline-flex items-center gap-2 rounded-full border border-hairline-strong px-6 py-3 text-ink-dim transition-colors hover:border-gold hover:text-gold"
                >
                  Visit {team.sponsor.name}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </Reveal>
          </section>
        ) : null}

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand
            title={`Work on ${team.name.toLowerCase()}.`}
            action="Apply"
            href={APPLY_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
