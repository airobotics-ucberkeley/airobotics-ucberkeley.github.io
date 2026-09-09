import { Reveal } from "./Reveal";

/**
 * Full-bleed conversion band. The reference site uses a blue-to-gold gradient
 * wedge here; this is the dark-canvas version of it — a conic wash pinned to the
 * lower-left corner so the gradient reads as a light source rather than a fill.
 */
export function CTABand({
  title,
  body,
  action,
  href,
}: {
  title: string;
  body?: string;
  action: string;
  href: string;
}) {
  return (
    <Reveal>
      <div
        className="relative isolate overflow-hidden"
        style={{
          background:
            "linear-gradient(100deg, #1f5fbf 0%, #4d9bff 40%, #ffd166 76%, #fdb515 100%)",
        }}
      >
        {/* Engineering grid, drawn in ink so it reads on the light band. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #05070c 1px, transparent 1px), linear-gradient(to bottom, #05070c 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Corner ticks, matching the bracket motif used on the dark cards. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l border-t border-void/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b border-r border-void/40"
        />

        <div className="relative grid gap-10 p-9 sm:p-14 md:grid-cols-[1.15fr_1fr] md:items-end md:gap-16">
          <div>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(1.6rem,3.4vw,2.5rem)] text-void">
              {title}
            </h2>
          </div>

          <div className="md:pb-2">
            {body ? (
              <p className="ml-auto max-w-[46ch] text-[0.9375rem] font-medium leading-relaxed text-void/80 md:text-right">
                {body}
              </p>
            ) : null}
            <div className="flex md:justify-end">
              <a
                href={href}
                className="tele group inline-flex items-center gap-2 rounded-full bg-void px-7 py-4 text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {action}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
