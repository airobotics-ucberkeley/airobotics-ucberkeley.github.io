import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

/**
 * Shared section opener: a hairline rule, a display headline, and an optional
 * lede. No kicker label — the headline says what the section is.
 */
export function SectionHead({
  title,
  lede,
  align = "left",
}: {
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : undefined}>
      <div className="border-t border-hairline pt-4" />
      <h2
        className={`display mt-3 text-[clamp(1.7rem,3.6vw,2.75rem)] ${
          centered ? "mx-auto max-w-[20ch]" : "max-w-[18ch]"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p className={`lede mt-6 max-w-[62ch] ${centered ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </Reveal>
  );
}
