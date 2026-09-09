import type { Metadata } from "next";

import { MovedPage } from "@/components/MovedPage";

export const metadata: Metadata = {
  title: "Donate moved to Sponsor",
  alternates: { canonical: "/sponsor/" },
};

/** `/donate` was folded into `/sponsor` — see `MovedPage` for why this is a page. */
export default function DonateMoved() {
  return (
    <MovedPage
      to="/sponsor/"
      label="Sponsor"
      what="Backing the club and sponsoring a team are the same conversation, so they are on the same page — tiers, what a sponsor gets, and how to reach us."
    />
  );
}
