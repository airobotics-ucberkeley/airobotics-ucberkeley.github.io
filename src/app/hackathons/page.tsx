import type { Metadata } from "next";
import Image from "next/image";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { HACKATHON, SPONSOR_HREF } from "@/data/site";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "Two robotics hackathons a year at UC Berkeley, and how a company can sponsor one.",
};

export default function HackathonsPage() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden border-b border-hairline pb-16 pt-20 md:pb-20 md:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            {/* A weekend of building, behind the words for it. Held well back
                so the headline still carries the section. */}
            <Image
              src="/media/photos/workshop-wiring.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-void/40" />
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.24),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">Hackathons.</span>
            </h1>
          </div>
        </section>

        {/* --------------------------------------------------------- facts */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-16 md:py-20">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HACKATHON.facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-6">
                  <dt className="tele text-[0.5625rem] text-ink-faint">
                    {fact.label}
                  </dt>
                  <dd className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                    {fact.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* ----------------------------------------------------- sponsorship */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <SectionHead title="Sponsor a hackathon" />

          <dl className="mt-10">
            {HACKATHON.sponsorship.map((item) => (
              <div
                key={item.name}
                className="grid gap-1 border-t border-hairline py-4 md:grid-cols-[12rem_1fr] md:gap-6"
              >
                <dt className="tele pt-0.5 text-ink">{item.name}</dt>
                <dd className="text-sm leading-relaxed text-ink-dim">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-20 md:pb-24">
          <CTABand
            title="Back a hackathon."
            action="Sponsor"
            href={SPONSOR_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
