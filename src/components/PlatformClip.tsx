"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The looping clip on a platform card.
 *
 * Four of these share a page, so none of them downloads until it is nearly on
 * screen and each pauses again once it scrolls away — a card that nobody is
 * looking at should not be decoding video. Under `prefers-reduced-motion` the
 * poster stands in and no video is fetched at all.
 *
 * Silent, uncontrolled, and hidden from assistive tech: it is illustration, and
 * the card's own text carries the meaning.
 */
export function PlatformClip({ clip, label }: { clip: string; label: string }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [reduced, setReduced] = useState(false);
  // Set once the card comes near the viewport, and never unset — the file is
  // downloaded by then, so tearing it back out would only cost a second fetch.
  const [near, setNear] = useState(false);

  const poster = `/video/platforms/${clip}.jpg`;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el || reduced) return;

    const watcher = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) setNear(true);

        const player = video.current;
        if (!player) return;
        if (entry.isIntersecting) {
          void player.play().catch(() => {});
        } else {
          player.pause();
        }
      },
      { rootMargin: "200px" },
    );

    watcher.observe(el);
    return () => watcher.disconnect();
  }, [reduced]);

  return (
    <div
      ref={wrap}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-hairline bg-panel"
    >
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element -- decorative still, sized by CSS
        <img
          src={poster}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
      ) : (
        <video
          ref={video}
          src={near ? `/video/platforms/${clip}.mp4` : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity duration-500 hover:opacity-100"
        />
      )}
    </div>
  );
}
