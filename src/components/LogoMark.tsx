import Image from "next/image";

import { type Logo } from "@/data/site";

/**
 * `treat` picks the filter that gets each source file to white, since the marks
 * arrive as a mix of dark art on transparency, colour art, and white-on-solid.
 */
export const TREATMENT: Record<NonNullable<Logo["treat"]>, string> = {
  mono: "brightness-0 invert",
  flip: "grayscale invert",
  plain: "grayscale",
};

/**
 * A single mark at text scale — for a schedule row or a news item, where the
 * logo sits beside a headline rather than in the partner strip.
 */
export function LogoMark({ logo }: { logo: Logo }) {
  return (
    <Image
      src={logo.src}
      alt={logo.name}
      width={160}
      height={40}
      className={`h-5 w-auto shrink-0 opacity-60 ${TREATMENT[logo.treat ?? "mono"]}`}
    />
  );
}
