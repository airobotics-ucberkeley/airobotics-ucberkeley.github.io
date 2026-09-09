import type { Metadata } from "next";

import { CTABand } from "@/components/CTABand";
import { FeatureRow } from "@/components/FeatureRow";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { APPLY_HREF, FEATURES, PILLARS } from "@/data/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "What airobotics@berkeley works on: robot learning, perception, manipulation, and the systems underneath.",
};

export default function ResearchPage() {
  return (
    <>
      <Nav />

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
              What we <span className="charged">work on.</span>
            </h1>
          </div>
        </section>

        {/* ---------------------------------------------------- directions */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-8 pt-4">
          {FEATURES.map((feature) => (
            <FeatureRow key={feature.id} feature={feature} />
          ))}
        </section>

        {/* -------------------------------------------------- how it works */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-14 md:py-20">
          <SectionHead title="Compete, research, build" />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.kicker} delay={i * 0.08} className="h-full">
                <div className="group flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-8 transition-colors duration-500 hover:bg-panel-hi/60">
                  <span className="tele text-ink-faint">{pillar.kicker}</span>

                  <h2 className="display mt-8 text-[1.35rem] leading-[1.15]">
                    {pillar.title}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-ink-dim">
                    {pillar.body}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2 pt-2">
                    {pillar.points.map((point) => (
                      <li
                        key={point}
                        className="tele rounded-full border border-hairline px-3 py-1.5 text-[0.5625rem] text-ink-dim transition-colors group-hover:border-hairline-strong"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand title="Pick a direction." action="Apply" href={APPLY_HREF} />
        </section>
      </main>

      <Footer />
    </>
  );
}
