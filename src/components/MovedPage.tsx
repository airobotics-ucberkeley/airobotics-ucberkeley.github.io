import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

/**
 * Stand-in for a redirect on a host that cannot send one.
 *
 * On a server we would answer an old URL with a 308 and be done. GitHub Pages
 * serves files, so the move has to live inside the file: the `http-equiv`
 * refresh takes a browser to the new page immediately and works with scripting
 * off, and a crawler reads it as a redirect. The page that uses this declares
 * `alternates.canonical` pointing at the same destination, which is what moves
 * the ranking across.
 *
 * The page is still written for a person, because the refresh can be blocked
 * and a slow connection shows it for a beat either way: it says where they
 * ended up and gives them the link.
 */
export function MovedPage({
  to,
  label,
  what,
}: {
  /** Path of the page that replaced this one, with the trailing slash the
   * export actually writes. */
  to: string;
  /** How the new page is named in the nav. */
  label: string;
  /** One sentence on what happened, in the site's voice. */
  what: string;
}) {
  return (
    <>
      {/* Hoisted into <head> by React. */}
      <meta httpEquiv="refresh" content={`0; url=${to}`} />

      <Nav />

      <main className="flex flex-1 items-center">
        <section className="w-full py-28">
          <div className="mx-auto w-full max-w-[1080px] px-6">
            <p className="tele text-[0.5625rem] text-gold">Moved</p>

            <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              This page is now <span className="charged">{label}.</span>
            </h1>

            <p className="lede mt-7 max-w-[52ch]">{what}</p>

            <Link
              href={to}
              className="tele mt-10 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
            >
              Go to {label}
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
