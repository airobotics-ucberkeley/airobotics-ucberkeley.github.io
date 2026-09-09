import type { Metadata } from "next";
import Image from "next/image";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { APPLY_HREF, RESOURCE_GROUPS, TRYOUT } from "@/data/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Background reading, Berkeley courses, and open courseware for people joining airobotics@berkeley — plus how the tryout assessment works.",
};

export default function ResourcesPage() {
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
            <Image
              src="/media/campus/sather-gate.jpg"
              alt=""
              fill
              priority
              className="object-cover opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_82%)]"
            />
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.24),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              Where to <span className="charged">start.</span>
            </h1>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={APPLY_HREF}
                className="tele group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
              >
                Apply
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------- tryout */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-14 md:py-20">
          <SectionHead title="How joining works" />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRYOUT.steps.map((step, i) => (
              <Reveal key={step.name} delay={i * 0.06} className="h-full">
                <li className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-7">
                  <span className="tele text-[0.5625rem] text-ink-faint">
                    Step {i + 1}
                  </span>
                  <h2 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                    {step.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ------------------------------------------------------ resources */}
        {RESOURCE_GROUPS.map((group) => (
          <section
            key={group.heading}
            className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20"
          >
            <SectionHead title={group.heading} />

            <Reveal>
              <div className="mt-10 overflow-x-auto rounded-lg border border-hairline bg-panel/40">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-hairline">
                      <th className="tele px-6 py-4 text-[0.5625rem] text-ink-faint">
                        Course
                      </th>
                      <th className="tele px-6 py-4 text-[0.5625rem] text-ink-faint">
                        What it covers
                      </th>
                      <th className="w-12 px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item) => (
                      <tr
                        key={item.name}
                        className="group border-b border-hairline transition-colors last:border-b-0 hover:bg-panel-hi/60"
                      >
                        <td className="px-6 py-4 align-top">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="font-display text-[0.9375rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-gold"
                          >
                            {item.name}
                          </a>
                        </td>
                        <td className="px-6 py-4 align-top text-sm leading-relaxed text-ink-dim">
                          {item.note}
                        </td>
                        <td className="px-6 py-4 align-top text-right text-ink-faint transition-colors group-hover:text-gold">
                          ↗
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </section>
        ))}

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand
            title="Express your interest."
            action="Apply"
            href={APPLY_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
