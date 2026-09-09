import Link from "next/link";

import { type Event, type NewsItem } from "@/data/site";

import { LogoMark } from "./LogoMark";

/**
 * The schedule and news rows, shared by the home-page calendar and the news
 * page so the two stay identical. Each row is the whole clickable block; the
 * list item and its reveal stay with the caller.
 *
 * A row carries a mark only when the entry has one — a competition or host
 * whose logo says more than the venue line does.
 */
export function EventRow({ event }: { event: Event }) {
  const row = (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <span className="tele text-gold">{event.when}</span>
        <span className="tele text-[0.5625rem] text-ink-faint">
          {event.kind}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          {event.title}
        </p>
        {event.logo ? <LogoMark logo={event.logo} /> : null}
      </div>
      <p className="mt-1.5 text-sm text-ink-dim">{event.where}</p>
    </>
  );

  return event.href ? (
    <a
      href={event.href}
      className="block py-6 transition-colors duration-500 hover:bg-panel/60"
    >
      {row}
    </a>
  ) : (
    <div className="py-6">{row}</div>
  );
}

/** One news item: the date, the headline, and a single line of fact. */
export function NewsRow({ item }: { item: NewsItem }) {
  const row = (
    <>
      <span className="tele text-ink-faint">{item.date}</span>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold tracking-tight text-ink">
          {item.title}
        </p>
        {item.logo ? <LogoMark logo={item.logo} /> : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">{item.body}</p>
    </>
  );

  if (!item.href) return <div className="py-6">{row}</div>;

  const className =
    "block py-6 transition-colors duration-500 hover:bg-panel/60";

  // An item can point at a page here or at the announcement it is about.
  return item.href.startsWith("http") ? (
    <a href={item.href} target="_blank" rel="noreferrer" className={className}>
      {row}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {row}
    </Link>
  );
}
