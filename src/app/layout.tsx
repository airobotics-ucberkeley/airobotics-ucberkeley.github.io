import type { Metadata } from "next";
import { Azeret_Mono, Bricolage_Grotesque, Manrope } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import { SITE_URL } from "@/data/site";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const azeret = Azeret_Mono({
  variable: "--font-azeret",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Normally a response header. GitHub Pages sends no headers of ours, and this
  // is the one item of the defensive set that HTML can carry itself.
  referrer: "strict-origin-when-cross-origin",
  title: {
    default: "airobotics@berkeley — applied competitive autonomy",
    template: "%s — airobotics@berkeley",
  },
  description:
    "A UC Berkeley registered student organization working on robot learning: policies trained in simulation, perception, and control, run on real hardware.",
  openGraph: {
    title: "airobotics@berkeley",
    description:
      "Applied competitive autonomy — robot learning at UC Berkeley.",
    type: "website",
    siteName: "airobotics@berkeley",
    // Drawn by `src/app/og.png/route.tsx`, and named here rather than picked up
    // from the `opengraph-image` convention — that convention writes a file with
    // no extension, which GitHub Pages serves as the wrong content type.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "airobotics@berkeley — applied competitive autonomy",
      },
    ],
  },
  // Only asks the networks that support it to show the image large rather than
  // as a thumbnail; the image itself is the one above.
  twitter: {
    card: "summary_large_image",
    title: "airobotics@berkeley",
    description:
      "Applied competitive autonomy — robot learning at UC Berkeley.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${azeret.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
