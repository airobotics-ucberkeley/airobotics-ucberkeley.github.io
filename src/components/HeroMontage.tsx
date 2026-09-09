"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_CLIPS } from "@/data/site";

/**
 * The hero backdrop: a loop of short clips from open-source robotics projects,
 * cross-faded one into the next. Nothing is printed over it — no credit line,
 * no caption.
 *
 * Two video elements leapfrog each other — one plays while the other holds the
 * clip after it — so a cut is a fade between two already-buffered layers rather
 * than a stall on a fresh download. Only two files are ever in flight.
 *
 * It is atmosphere, not a player: muted, no controls, hidden from assistive
 * tech. If a file is missing the montage skips it, and if everything fails the
 * poster and the gradients carry the hero on their own.
 */

const FADE_MS = 900;
/** A clip is ~5s; if `ended` never arrives, move on anyway. */
const MAX_CLIP_MS = 9000;

const src = (i: number) => `/video/hero/${HERO_CLIPS[i].slug}.mp4`;
const next = (i: number) => (i + 1) % HERO_CLIPS.length;

export function HeroMontage() {
  // Which video element is on top, and the clip each one holds.
  const [front, setFront] = useState(0);
  const [clips, setClips] = useState<[number, number]>([0, 1]);
  const [reduced, setReduced] = useState(false);
  const videos = useRef<(HTMLVideoElement | null)[]>([null, null]);
  const swapping = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /** Bring the back layer forward, then queue the clip after it behind. */
  const advance = useCallback(() => {
    if (swapping.current) return;
    swapping.current = true;

    const back = front === 0 ? 1 : 0;
    const incoming = videos.current[back];
    if (incoming) {
      incoming.currentTime = 0;
      void incoming.play().catch(() => {});
    }
    setFront(back);

    // Load the following clip only once the fade is over, so the download never
    // competes with the cut.
    window.setTimeout(() => {
      setClips((held) => {
        const queued = [...held] as [number, number];
        queued[front] = next(held[back]);
        return queued;
      });
      swapping.current = false;
    }, FADE_MS);
  }, [front]);

  // Safety net for a clip that neither ends nor errors — a stalled download, or
  // a browser that dropped the element when the tab went to the background.
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(advance, MAX_CLIP_MS);
    return () => window.clearTimeout(timer);
  }, [advance, reduced, front]);

  // The first clip is the only one the browser will not have been told to play
  // by a swap, so start it by hand once it can run.
  useEffect(() => {
    if (reduced) return;
    void videos.current[0]?.play().catch(() => {});
  }, [reduced]);

  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element -- decorative backdrop, sized by CSS
          <img
            src="/video/hero/poster.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_82%)]"
          />
        ) : (
          [0, 1].map((layer) => (
            <video
              key={layer}
              ref={(el) => {
                videos.current[layer] = el;
              }}
              src={src(clips[layer])}
              poster="/video/hero/poster.jpg"
              muted
              playsInline
              preload="auto"
              onEnded={advance}
              onError={advance}
              style={{ transitionDuration: `${FADE_MS}ms` }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_82%)] ${
                front === layer ? "opacity-25" : "opacity-0"
              }`}
            />
          ))
        )}
      </div>
    </>
  );
}
