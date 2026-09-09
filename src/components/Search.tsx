"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { searchSite, type SearchDoc } from "@/data/search";

/**
 * Site search. The index is small enough to live in the bundle, so matching is
 * synchronous and there is no request behind the results.
 *
 * Two shapes, one behaviour: `bar` is the nav pill that expands on focus and
 * drops results beneath it; `panel` is the full-width field inside the mobile
 * menu, where results sit inline rather than floating.
 */
export function Search({
  variant = "bar",
  onNavigate,
}: {
  variant?: "bar" | "panel";
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchSite(query), [query]);
  const open = engaged && query.trim().length > 0;

  // A new query starts the highlight back at the top result. Adjusting during
  // render rather than in an effect keeps it to a single pass.
  const [activeFor, setActiveFor] = useState(query);
  if (activeFor !== query) {
    setActiveFor(query);
    setActive(0);
  }

  // ⌘K from anywhere puts the cursor in the nav field.
  useEffect(() => {
    if (variant !== "bar") return;
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant]);

  // Dismiss on a click outside — not on blur, which would fire before the
  // click on a result registers.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setEngaged(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const go = (doc: SearchDoc) => {
    setQuery("");
    setEngaged(false);
    inputRef.current?.blur();
    onNavigate?.();

    if (doc.href.startsWith("http")) {
      window.open(doc.href, "_blank", "noopener,noreferrer");
    } else {
      router.push(doc.href);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setQuery("");
      setEngaged(false);
      inputRef.current?.blur();
      return;
    }
    if (!open || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active]!);
    }
  };

  const bar = variant === "bar";

  return (
    <div ref={rootRef} className={bar ? "relative" : "relative mt-5"}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[0.8125rem] leading-none text-ink-faint"
      >
        ⌕
      </span>

      <input
        ref={inputRef}
        type="search"
        value={query}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label="Search the site"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setEngaged(true)}
        onKeyDown={onKeyDown}
        className={`rounded-full border border-hairline-strong bg-transparent py-2.5 pl-9 pr-4 text-[0.8125rem] text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none [&::-webkit-search-cancel-button]:appearance-none ${
          bar
            ? "w-36 transition-[width,border-color] duration-300 focus:w-56"
            : "w-full py-3"
        }`}
      />

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-label="Search results"
          className={`overflow-hidden rounded-lg border border-hairline bg-void/95 backdrop-blur-xl ${
            bar
              ? "absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[22rem]"
              : "mt-2 w-full"
          }`}
        >
          {results.length === 0 ? (
            <li className="px-4 py-4 text-sm text-ink-faint">
              Nothing matches “{query.trim()}”.
            </li>
          ) : (
            results.map((doc, i) => (
              <li key={`${doc.kind}-${doc.href}-${doc.title}`} role="none">
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => go(doc)}
                  className={`flex w-full items-baseline justify-between gap-4 border-b border-hairline px-4 py-3 text-left transition-colors last:border-b-0 ${
                    i === active ? "bg-panel-hi/60" : ""
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink">
                      {doc.title}
                    </span>
                    {doc.meta ? (
                      <span className="mt-1 block truncate text-xs text-ink-faint">
                        {doc.meta}
                      </span>
                    ) : null}
                  </span>
                  <span className="tele shrink-0 text-[0.5625rem] text-ink-faint">
                    {doc.kind}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
