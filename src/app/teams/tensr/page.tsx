import type { Metadata } from "next";

import { SponsoredProject } from "@/components/SponsoredProject";

export const metadata: Metadata = {
  title: "Tensr",
  description:
    "Design challenge sponsored by Tensr: design and submit an open-source hardware platform.",
};

export default function TensrPage() {
  return <SponsoredProject slug="tensr" />;
}
