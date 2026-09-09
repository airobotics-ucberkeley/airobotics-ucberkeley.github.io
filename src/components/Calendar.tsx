import Link from "next/link";

import { EVENTS, NEWS } from "@/data/site";

import { Reveal } from "./Reveal";
import { EventRow, NewsRow } from "./ScheduleRow";
import { SectionHead } from "./SectionHead";

/**
 * Calendar and news, side by side. Both lists are hairline-ruled rows rather
 * than cards — this is reference material, not a pitch, and it should read like
 * a schedule. Each list handles being empty, so an off-season semester with
 * nothing booked degrades to a line of text instead of a broken grid.
 */
export function Calendar() {
  return (
    <section
      id="calendar"
      className="mx-auto w-full max-w-[1080px] scroll-mt-24 px-6 py-14 md:py-20"
    >
      <SectionHead title="What is coming up" />

      <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
        {/* ------------------------------------------------------- calendar */}
        <Reveal>
          <p className="tele border-b border-hairline pb-4 text-ink-faint">
            Upcoming
          </p>

          {EVENTS.length === 0 ? (
            <p className="pt-6 text-sm text-ink-dim">Nothing scheduled.</p>
          ) : (
            <ul>
              {EVENTS.map((event) => (
                <li key={event.title} className="border-b border-hairline">
                  <EventRow event={event} />
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        {/* ----------------------------------------------------------- news */}
        <Reveal delay={0.08}>
          <p className="tele border-b border-hairline pb-4 text-ink-faint">
            News
          </p>

          {NEWS.length === 0 ? (
            <p className="pt-6 text-sm text-ink-dim">No updates yet.</p>
          ) : (
            <ul>
              {NEWS.map((item) => (
                <li key={item.title} className="border-b border-hairline">
                  <NewsRow item={item} />
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>

      <Reveal>
        <Link
          href="/media"
          className="tele group mt-10 inline-flex items-center gap-2 border-b border-hairline pb-2 text-ink-dim transition-colors hover:border-gold hover:text-gold"
        >
          All news and media
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
