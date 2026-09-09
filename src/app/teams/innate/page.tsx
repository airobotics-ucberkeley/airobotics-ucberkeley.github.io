import type { Metadata } from "next";

import { SponsoredProject } from "@/components/SponsoredProject";

export const metadata: Metadata = {
  title: "Innate",
  description:
    "Sponsored project with Innate: manipulation and agent behaviors on MARS, an open general-purpose robot.",
};

export default function InnatePage() {
  return <SponsoredProject slug="innate" />;
}
