import type { MetadataRoute } from "next";

import { SITE_URL } from "@/data/site";

/** Everything on the site is public, so crawlers get all of it. */
/** Built once, into a file: there is no server to regenerate it on request. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
