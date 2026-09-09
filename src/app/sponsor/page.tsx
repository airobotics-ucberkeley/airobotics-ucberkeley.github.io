import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SPONSOR_TIERS, SUPPORT_WAYS } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with airobotics@berkeley — sponsorship, hardware, compute, and getting a student team and its robots to competitions.",
};

/**
 * The contact page, and the only way in other than applying. Sponsoring and
 * donating were two pages with two forms and one inbox; a company, an
 * individual and someone with a general question are all answering the same
 * questions, so they now fill in the same form.
 *
 * "Contact" rather than "Support" on the nav because that is what someone
 * scans for when they want to reach us, and everything the old label promised
 * — ways to give, tiers — is still on the page under the form.
 *
 * The form is general: a name, an address to answer, a subject, and a blank
 * box. The subject list stands in for the pages that used to have forms of
 * their own — sponsoring, donating, press — so one inbox still knows what a
 * message is about.
 */
const FIELDS: readonly Field[] = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "subject",
    label: "Subject",
    type: "select",
    required: true,
    options: [
      "General question",
      "Sponsorship",
      "Donation",
      "Hardware or compute",
      "Joining the club",
      "Press",
      "Something else",
    ],
  },
  { name: "message", label: "Message", type: "textarea", required: true },
];

const AUDIENCES = ["Companies", "Individuals"] as const;

export default function ContactPage() {
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
              <span className="charged">Contact.</span>
            </h1>

            <div className="mt-10">
              <InquiryForm
                fields={FIELDS}
                subject="Contact — airobotics@berkeley"
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
