import Image from "next/image";

import { Reveal } from "./Reveal";

type Feature = {
  id: string;
  image?: string;
  kicker: string;
  title: string;
  body: string;
  points: readonly (readonly [string, string])[];
  href: string;
  cta: string;
};

/** One research direction: heading on the left, detail on the right. */
export function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <div
      id={feature.id}
      className="grid scroll-mt-24 gap-8 border-t border-hairline py-16 md:grid-cols-[1fr_1.2fr] md:gap-16 md:py-20"
    >
      <Reveal>
        {feature.image ? (
          <Image
            src={feature.image}
            alt=""
            width={220}
            height={220}
            className="mb-6 h-28 w-28 rounded-sm object-cover"
          />
        ) : null}

        <span className="tele text-ink-faint">{feature.kicker}</span>

        <h3 className="display mt-6 text-[clamp(1.35rem,2.5vw,1.9rem)]">
          {feature.title}
        </h3>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="lede">{feature.body}</p>

        <dl className="mt-8 space-y-px">
          {feature.points.map(([term, detail]) => (
            <div
              key={term}
              className="group grid grid-cols-[9rem_1fr] gap-4 border-t border-hairline py-4 transition-colors hover:border-gold/40"
            >
              <dt className="tele pt-0.5 text-ink transition-colors group-hover:text-gold">
                {term}
              </dt>
              <dd className="text-sm leading-relaxed text-ink-dim">{detail}</dd>
            </div>
          ))}
        </dl>

        <a
          href={feature.href}
          className="tele group mt-9 inline-flex items-center gap-2 text-ink-dim transition-colors hover:text-gold"
        >
          {feature.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </Reveal>
    </div>
  );
}
