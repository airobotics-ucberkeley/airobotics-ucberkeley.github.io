import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { APPLY_HREF } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * 404. Keeps the nav and footer so a wrong URL is a detour rather than a dead
 * end, and offers the three places people were most likely heading.
 */
export default function NotFound() {
  const elsewhere = [
    { label: "Projects", href: "/teams" },
    { label: "The roster", href: "/team" },
    { label: "Apply", href: APPLY_HREF },
  ];

  return (
    <>
      <Nav />

      <main className="flex flex-1 items-center">
        <section className="relative isolate w-full overflow-hidden py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <p className="tele text-[0.5625rem] text-gold">Error 404</p>

            <h1 className="display mt-6 max-w-[18ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              Nothing lives at <span className="charged">this address.</span>
            </h1>

            <p className="lede mt-7 max-w-[52ch]">
              The page moved or never existed. Everything else is still where it
              was.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/"
                className="tele inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
              >
                Back to the home page
                <span>→</span>
              </Link>

              {elsewhere.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="tele text-[0.5625rem] text-ink-dim transition-colors hover:text-gold"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
