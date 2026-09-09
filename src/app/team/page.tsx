import type { Metadata } from "next";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { TeamCard } from "@/components/TeamCard";
import { APPLY_HREF } from "@/data/site";
import { ADVISORS, LEADERSHIP, MEMBERS, PAST, type Person } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The students, advisors, and researchers behind airobotics@berkeley.",
};

const GROUPS: { title: string; people: Person[] }[] = [
  { title: "Members", people: MEMBERS },
  // Leadership and advisors read as one group: the split was a distinction
  // without a difference at this size.
  { title: "Leadership & Advisors", people: [...LEADERSHIP, ...ADVISORS] },
  { title: "Past Members", people: PAST },
];

export default function TeamPage() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        {/* ---------------------------------------------------------- head */}
        <section className="relative isolate overflow-hidden border-b border-hairline pb-8 pt-20 md:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.28),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[15ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">Members.</span>
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

        {/* -------------------------------------------------------- groups */}
        {GROUPS.map((group) => (
          <section
            key={group.title}
            className="mx-auto w-full max-w-[1080px] px-6 py-8 md:py-10"
          >
            <SectionHead title={group.title} />

            {group.people.length === 0 ? (
              <p className="mt-6 text-sm text-ink-dim">
                No past members listed yet.
              </p>
            ) : null}

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {group.people.map((person, i) => (
                <Reveal
                  key={person.slug}
                  delay={Math.min(i, 5) * 0.05}
                  className="h-full"
                >
                  <TeamCard person={person} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-8">
              <p className="tele text-ink-faint">Members</p>
              <a
                href="https://github.com/airobotics-ucberkeley/airobotics-berkeley-website/blob/main/docs/add-yourself.md"
                target="_blank"
                rel="noreferrer"
                className="tele group inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-gold"
              >
                Add or fix your entry
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand title="Join the team." action="Apply" href={APPLY_HREF} />
        </section>
      </main>

      <Footer />
    </>
  );
}
