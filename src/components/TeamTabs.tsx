"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TEAMS } from "@/data/site";

/**
 * Sub-navigation for the Projects section: an "All projects" link plus one tab per
 * team, with the current one marked. Sits directly under the masthead on every
 * /teams page so the section reads as a group of tabs rather than loose pages.
 */
export function TeamTabs() {
  const pathname = usePathname();

  const tabs = [
    { href: "/teams", label: "All projects" },
    ...TEAMS.map((team) => ({
      href: `/teams/${team.slug}`,
      label: team.name,
    })),
  ];

  return (
    <div className="sticky top-16 z-40 border-b border-hairline bg-void/85 backdrop-blur-xl sm:top-18">
      <nav
        aria-label="Projects"
        className="mx-auto flex w-full max-w-[1080px] gap-1 overflow-x-auto px-6"
      >
        {tabs.map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`tele -mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-4 transition-colors ${
                active
                  ? "border-gold text-ink"
                  : "border-transparent text-ink-faint hover:text-ink-dim"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
