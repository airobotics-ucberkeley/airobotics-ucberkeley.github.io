import Image from "next/image";
import Link from "next/link";

import { Backers } from "@/components/Backers";
import { Calendar } from "@/components/Calendar";
import { CTABand } from "@/components/CTABand";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SPONSOR_HREF, TILES } from "@/data/site";

/**
 * Landing page. One call to action per audience, each in one place: students
 * apply from the nav and the hero, companies sponsor from the band under the
 * logos. Detail lives on the tabs, not here.
 */
export default function Home() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        <Hero />
        <Backers />

        {/* ------------------------------------------------------- mission */}
        <section
          id="mission"
          className="mx-auto w-full max-w-[1080px] scroll-mt-24 px-6 pb-12 pt-20 md:pb-16 md:pt-24"
        >
          <SectionHead
            title={
              <>
                Robot learning on{" "}
                <span className="charged">real hardware.</span>
              </>
            }
          />

          {/* the machines each team works on */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {TILES.map((tile, i) => (
              <Reveal key={tile.name} delay={i * 0.05}>
                <Link
                  href={tile.href}
                  aria-label={tile.name}
                  title={tile.name}
                  className="group relative block aspect-square w-32 overflow-hidden rounded-lg border border-hairline sm:w-40"
                >
                  <Image
                    src={tile.src}
                    alt=""
                    fill
                    sizes="160px"
                    quality={90}
                    className="tile-drift object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              href="/teams"
              className="tele group mt-10 inline-flex items-center gap-2 border-b border-hairline pb-2 text-ink-dim transition-colors hover:border-gold hover:text-gold"
            >
              See the teams
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </section>

        <Calendar />

        {/* -------------------------------------------------- sponsor band */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <CTABand
            title="Sponsor the team."
            action="Sponsor us"
            href={SPONSOR_HREF}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
