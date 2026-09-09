import type { Metadata } from "next";
import Image from "next/image";

import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { EventRow, NewsRow } from "@/components/ScheduleRow";
import { MEDIA } from "@/data/media";
import { APPLY_HREF, EVENTS, NEWS } from "@/data/site";

export const metadata: Metadata = {
  title: "Media",
  description:
    "News, the event calendar, and photos of the team from airobotics@berkeley.",
};

export default function MediaPage() {
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
              <span className="charged">Media.</span>
            </h1>
          </div>
        </section>

        {/* ---------------------------------------------------------- news */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-14 md:py-20">
          <SectionHead title="Updates" />

          {NEWS.length === 0 ? (
            <p className="mt-8 text-sm text-ink-dim">No updates yet.</p>
          ) : (
            <ul className="mt-10 max-w-[62ch]">
              {NEWS.map((item, i) => (
                <Reveal key={item.title} delay={Math.min(i, 6) * 0.04}>
                  <li className="border-b border-hairline">
                    <NewsRow item={item} />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </section>

        {/* ------------------------------------------------------ calendar */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-14 md:pb-20">
          <SectionHead title="Upcoming" />

          {EVENTS.length === 0 ? (
            <p className="mt-8 text-sm text-ink-dim">
              Nothing scheduled right now — check back at the start of the
              semester.
            </p>
          ) : (
            <ul className="mt-10 max-w-[62ch]">
              {EVENTS.map((event, i) => (
                <Reveal key={event.title} delay={Math.min(i, 6) * 0.04}>
                  <li className="border-b border-hairline">
                    <EventRow event={event} />
                  </li>
                </Reveal>
              ))}
            </ul>
          )}
        </section>

        {/* -------------------------------------------------------- gallery */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <SectionHead title="Gallery" />

          {MEDIA.length === 0 ? (
            <p className="mt-8 text-sm text-ink-dim">
              Photos from the season will land here.
            </p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {MEDIA.map((item, i) => (
                <Reveal key={item.src} delay={Math.min(i, 6) * 0.05}>
                  <figure className="group h-full overflow-hidden rounded-lg border border-hairline bg-panel/40">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>

                    {item.credit ? (
                      <figcaption className="tele px-4 py-3 text-[0.5rem] text-ink-faint">
                        {item.credit}
                      </figcaption>
                    ) : null}
                  </figure>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <section className="mx-auto w-full max-w-[1080px] px-6 pb-20 md:pb-24">
          <CTABand
            title="Come build with us."
            action="Apply"
            href={APPLY_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
