import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SPONSOR_TIERS, SUPPORT_WAYS } from "@/data/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Sponsor or donate to airobotics@berkeley — hardware, compute, and getting a student team and its robots to competitions.",
};

/**
 * One page for sponsoring and donating. They were two pages with two forms and
 * one inbox; a company and an individual are answering the same questions, so
 * they now fill in the same form.
 */
const FIELDS: readonly Field[] = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "organization",
    label: "Company",
    type: "text",
    placeholder: "Leave blank if you are giving as an individual",
  },
  {
    name: "provides",
    label: "What you can provide",
    type: "checkboxes",
    options: ["Funding", "Hardware", "Cloud compute", "Mentorship", "Travel"],
  },
  {
    name: "amount",
    label: "Amount or item",
    type: "text",
    placeholder: "$250, a monthly amount, two Jetsons",
  },
  {
    name: "message",
    label: "What you want in return",
    type: "textarea",
    required: true,
    placeholder: "Logo placement, a hackathon, recruiting, or nothing at all.",
  },
];

const AUDIENCES = ["Companies", "Individuals"] as const;

export default function SupportPage() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        {/* The form is the page. Everything else sits under it. */}
        <section
          id="inquiry"
          className="relative isolate overflow-hidden scroll-mt-24 border-b border-hairline pb-16 pt-20 md:pt-24"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,181,21,0.16),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">Support.</span>
            </h1>

            <div className="mt-10">
              <InquiryForm
                fields={FIELDS}
                subject="Support — airobotics@berkeley"
                action="Send"
              />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------- ways */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-16 md:py-20">
          <SectionHead title="Ways to give" />

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {SUPPORT_WAYS.map((way, i) => (
              <Reveal key={way.name} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-7">
                  <dt className="tele text-gold">{way.name}</dt>
                  <dd className="mt-4 text-sm leading-relaxed text-ink-dim">
                    {way.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* --------------------------------------------------------- tiers */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-16 md:pb-20">
          <SectionHead title="Tiers" />

          {AUDIENCES.map((audience) => (
            <div key={audience} className="mt-12">
              <p className="tele border-b border-hairline pb-4 text-ink-faint">
                {audience}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SPONSOR_TIERS.filter((tier) => tier.audience === audience).map(
                  (tier, i) => (
                    <Reveal key={tier.name} delay={i * 0.05} className="h-full">
                      <div className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-7">
                        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                          {tier.name}
                        </h3>

                        <p className="tele mt-4 text-gold">{tier.amount}</p>

                        <p className="mt-6 border-t border-hairline pt-4 text-sm leading-relaxed text-ink-dim">
                          {tier.promise}
                        </p>
                      </div>
                    </Reveal>
                  ),
                )}
              </div>
            </div>
          ))}

          <p className="mt-10 max-w-[62ch] text-sm leading-relaxed text-ink-faint">
            We are a registered student organization, not a 501(c)(3). Ask us
            about tax treatment before you give.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
