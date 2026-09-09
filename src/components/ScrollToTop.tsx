"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Every navigation lands at the top of the page.
 *
 * Browsers restore the previous scroll position on reload and back, which drops
 * you into the middle of a page you have not read yet, so restoration is turned
 * off and each route change resets the scroll. Anchor links are left alone —
 * a URL with a hash is asking for a specific place on the page.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
