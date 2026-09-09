import type { Metadata } from "next";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { TeamTabs } from "@/components/TeamTabs";
import Image from "next/image";

import { APPLY_HREF, PROGRAMS, TEAMS } from "@/data/site";

export const metadata: Metadata = {
  title: "Drone team",
  description:
    "The autonomous drone racing team at airobotics@berkeley — AI Grand Prix and A2RL, and the subsystems behind them.",
};

export default function DroneRacingPage() {
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
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.28),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">Drone racing.</span>
            </h1>

            <p className="lede mt-7 max-w-[52ch]">
              Autonomous drone racing, in simulation and on hardware.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {(TEAMS.find((t) => t.slug === "drone-racing")?.logos ?? []).map(
                (logo) => (
                  <a
                    key={logo.name}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    title={logo.name}
                  >
                    <span className="flex h-12 w-20 items-center justify-center rounded-sm bg-white/90 p-2 opacity-85 transition-opacity duration-500 hover:opacity-100">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={120}
                        height={48}
                        className="h-full w-full object-contain"
                      />
                    </span>
                  </a>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- programs */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-14 md:py-20">
          <SectionHead title="Two competitions" />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {PROGRAMS.map((program, i) => (
              <Reveal key={program.name} delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-8 transition-colors duration-500 hover:bg-panel-hi/60">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="tele text-ink-faint">{program.kind}</span>
                    {program.status ? (
                      <span className="tele text-[0.5625rem] text-gold">
                        {program.status}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                    {program.logos.map((logo) => (
                      <a
                        key={logo.name}
                        href={logo.href}
                        target="_blank"
                        rel="noreferrer"
                        title={logo.name}
                        className="flex h-7 items-center"
                      >
                        <Image
                          src={logo.src}
                          alt={logo.name}
                          width={160}
                          height={36}
                          className="h-full w-auto max-w-[7rem] object-contain opacity-60 brightness-0 invert transition-opacity duration-500 hover:opacity-100"
                        />
                      </a>
                    ))}
                  </div>

                  <h2 className="display mt-7 text-[clamp(1.45rem,2.6vw,1.9rem)]">
                    {program.name}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-ink-dim">
                    {program.body}
                  </p>

                  <dl className="mt-8">
                    {program.rounds.map((round) => (
                      <div
                        key={round.where + round.when}
                        className="flex items-baseline justify-between gap-4 border-t border-hairline py-3"
                      >
                        <dt className="text-sm text-ink-dim">{round.where}</dt>
                        <dd className="tele text-[0.5625rem] text-ink-faint">
                          {round.when}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <a
                    href={program.href}
                    target="_blank"
                    rel="noreferrer"
                    className="tele mt-7 inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-gold"
                  >
                    Event page ↗
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand
            title="Join the drone team."
            action="Apply"
            href={APPLY_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
