import type { Metadata } from "next";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { PlatformClip } from "@/components/PlatformClip";
import { TeamPreview } from "@/components/TeamPreview";
import { TeamTabs } from "@/components/TeamTabs";
import { APPLY_HREF, PLATFORMS, TEAMS } from "@/data/site";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Teams at airobotics@berkeley: the drone racing competition team, plus sponsored projects with Tensr and Innate.",
};

const COMPETITION = TEAMS.filter((t) => t.kind === "Competition team");
const SPONSORED = TEAMS.filter((t) => t.kind === "Sponsored project");

export default function TeamsPage() {
  return (
    <>
      <Nav />
      <TeamTabs />

      <main className="flex-1">
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
              <span className="charged">Teams.</span>
            </h1>

            <div className="mt-9">
              <a
                href={APPLY_HREF}
                className="tele group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
              >
                Express interest
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- competition */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-16 md:py-20">
          <SectionHead title="Competition teams" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {COMPETITION.map((team, i) => (
              <Reveal key={team.slug} delay={i * 0.06} className="h-full">
                <TeamPreview team={team} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------- partnerships */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <SectionHead title="Current and past partnerships and projects" />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {SPONSORED.map((team, i) => (
              <Reveal key={team.slug} delay={i * 0.06} className="h-full">
                <TeamPreview team={team} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------- platforms */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <SectionHead title="Upcoming projects" lede="Coming soon." />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PLATFORMS.map((platform, i) => (
              <Reveal key={platform.slug} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-5">
                  <PlatformClip
                    clip={platform.clip}
                    label={`${platform.name} — ${platform.kind}`}
                  />

                  <div className="flex flex-1 flex-col p-2 pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                      <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                        {platform.name}
                      </h3>
                      <span className="tele text-[0.5625rem] text-ink-faint">
                        {platform.kind}
                      </span>
                    </div>

                    {/* One pill on every card, and it says only that nothing
                        is settled yet. */}
                    <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3 pt-5">
                      <span className="tele rounded-full border border-gold/40 px-4 py-2 text-[0.5625rem] text-gold">
                        TBD
                      </span>
                      <a
                        href={platform.source.href}
                        target="_blank"
                        rel="noreferrer"
                        className="tele text-[0.5625rem] text-ink-faint transition-colors hover:text-ink-dim"
                      >
                        {platform.source.name} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand title="Pick a team." action="Apply" href={APPLY_HREF} />
        </section>
      </main>

      <Footer />
    </>
  );
}
