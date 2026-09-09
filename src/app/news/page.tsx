import type { Metadata } from "next";

import { MovedPage } from "@/components/MovedPage";

export const metadata: Metadata = {
  title: "News moved to Media",
  // Not a noindex: the point is that whatever ranking `/news` earned should end
  // up on `/media`, and a canonical is how that is said.
  alternates: { canonical: "/media/" },
};

/** `/news` was folded into `/media` — see `MovedPage` for why this is a page. */
export default function NewsMoved() {
  return (
    <MovedPage
      to="/media/"
      label="Media"
      what="News and photos are one page now: announcements, competition footage, and shots from the season, in one place."
    />
  );
}
