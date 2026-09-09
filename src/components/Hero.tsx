// import { NavigationField } from "@/components/NavigationField";
import { HeroMontage } from "@/components/HeroMontage";
import { APPLY_HREF, SPONSOR_HREF } from "@/data/site";

/**
 * Hero. A montage of open-source robotics footage under two soft gradients,
 * with only as much scrim as the headline needs.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[74svh] flex-col justify-center overflow-hidden pb-16 pt-28">
      {/* ---------------------------------------------------------- backdrop */}
      <HeroMontage />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[46%] h-[46rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.22),transparent_65%)] blur-2xl" />
        <div className="absolute -right-24 top-[58%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(253,181,21,0.07),transparent_68%)] blur-3xl" />
        {/* <NavigationField /> */}
        {/* scrim: only as much as the headline needs to stay legible */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,7,12,0.82)_0%,rgba(5,7,12,0.35)_48%,transparent_78%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,var(--void)_98%)]" />
      </div>

      {/* ----------------------------------------------------------- content */}
      <div className="mx-auto w-full max-w-[1080px] px-6">
        <h1 className="display max-w-[16ch] text-[clamp(2.4rem,6.8vw,5.25rem)]">
          Applied competitive <span className="charged">autonomy.</span>
        </h1>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={APPLY_HREF}
            className="tele inline-flex items-center justify-center rounded-full border border-hairline-strong px-7 py-4 text-ink-dim transition-colors hover:border-ink hover:text-ink"
          >
            Apply
          </a>
          <a
            href={SPONSOR_HREF}
            className="tele group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-void transition-transform duration-300 hover:-translate-y-0.5"
          >
            Sponsor us
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
