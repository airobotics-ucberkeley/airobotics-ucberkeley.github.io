"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Search } from "@/components/Search";
import { NAV } from "@/data/site";

/**
 * Sticky masthead. Transparent over the hero, then fogs into a hairline-bottomed
 * bar once the page scrolls — so the nav never competes with the headline.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-hairline bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-6 sm:h-18">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/brand/airobotics-logo.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-sm"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[0.9375rem] font-bold tracking-tight text-ink">
              airobotics
            </span>
            <span className="tele mt-1 text-[0.5625rem] text-ink-faint transition-colors group-hover:text-gold">
              @berkeley
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-draw text-[0.9375rem] text-ink-dim transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Search />
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center border border-hairline text-ink-dim transition-colors hover:text-ink lg:hidden"
        >
          <span className="flex flex-col gap-[5px]">
            <span
              className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-hairline bg-void/95 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[1080px] flex-col px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 text-ink-dim transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Search variant="panel" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
