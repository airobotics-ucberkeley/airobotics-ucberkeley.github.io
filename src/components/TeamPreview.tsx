import Image from "next/image";
import Link from "next/link";

import type { Team } from "@/data/site";

/**
 * Team card used on the Projects index. Every card carries the same parts in the
 * same order — visual, status, name, summary, logo chips, tags — so the
 * competition team and the sponsored projects read as one set.
 *
 * The visual is a 16:9 photograph where the sponsor has one; otherwise a
 * brand-tinted tile with their mark, which keeps the row even.
 */
export function TeamPreview({ team }: { team: Team }) {
  const marks = team.logos ?? (team.sponsor ? [team.sponsor] : []);

  return (
    <Link
      href={`/teams/${team.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-hairline bg-panel/40 transition-colors duration-500 hover:bg-panel-hi/60"
    >
      {/* ------------------------------------------------------------ visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-hairline">
        {team.image ? (
          <Image
            src={team.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        ) : team.tint ? (
          <>
            <div
              className="absolute inset-0"
              style={{ background: team.tint }}
            />
            {(team.mark ?? team.sponsor) ? (
              <Image
                src={team.mark ?? team.sponsor!.src}
                alt=""
                width={160}
                height={64}
                className={`absolute left-1/2 top-1/2 h-12 w-auto max-w-[8rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-90 ${
                  team.mark ? "rounded-sm" : "brightness-0 invert"
                }`}
              />
            ) : null}
          </>
        ) : (
          <div className="gridfield absolute inset-0 bg-void opacity-70" />
        )}
      </div>

      {/* ------------------------------------------------------------- body */}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-baseline justify-between gap-4">
          <span className="tele text-ink-faint">{team.kind}</span>
          <span className="tele text-[0.5625rem] text-ink-faint">
            {team.status}
          </span>
        </div>

        <h3 className="display mt-6 text-[1.3rem] leading-[1.2]">
          {team.name}
        </h3>

        {marks.length > 0 ? (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {marks.map((mark) => (
              <span
                key={mark.name}
                title={mark.name}
                className="flex h-10 w-16 items-center justify-center rounded-sm bg-white/90 p-1.5"
              >
                <Image
                  src={mark.src}
                  alt={mark.name}
                  width={100}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
            ))}
          </div>
        ) : null}

        <ul className="mt-auto flex flex-wrap gap-2 pt-7">
          {team.points.map((point) => (
            <li
              key={point}
              className="tele rounded-full border border-hairline px-3 py-1.5 text-[0.5625rem] text-ink-dim transition-colors group-hover:border-hairline-strong"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
