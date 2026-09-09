import Image from "next/image";
import Link from "next/link";

import { FOOTER_LINKS, SITE } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto w-full max-w-[1080px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/brand/airobotics-logo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-sm"
              />
              <span className="font-display text-lg font-bold tracking-tight">
                airobotics<span className="text-ink-faint">@berkeley</span>
              </span>
            </div>
            <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-ink-dim">
              A registered student organization at the University of California,
              Berkeley working on robot learning.
            </p>
            <p className="tele mt-7 text-[0.5625rem] text-ink-faint">
              {SITE.tagline}
            </p>
          </div>

          {FOOTER_LINKS.map((column) => (
            <div key={column.heading}>
              <p className="tele text-ink-faint">{column.heading}</p>
              <ul className="mt-6 space-y-3.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="link-draw text-sm text-ink-dim transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="tele text-[0.5625rem] text-ink-faint">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="max-w-[62ch] text-[0.6875rem] leading-relaxed text-ink-faint">
            A registered student organization with the University of California,
            Berkeley. The views and content on this site are our own and do not
            reflect those of the University.
          </p>
        </div>
      </div>
    </footer>
  );
}
