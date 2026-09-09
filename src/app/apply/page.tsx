import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { InquiryForm, type Field } from "@/components/InquiryForm";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { PLATFORMS, TRYOUT } from "@/data/site";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Express interest in joining airobotics@berkeley — tell us what you have built and which team you want to work on.",
};

const FIELDS: readonly Field[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Berkeley email", type: "email", required: true },
  { name: "major", label: "Major", type: "text", placeholder: "EECS" },
  { name: "year", label: "Year", type: "text", placeholder: "'27, MEng, PhD" },
  {
    name: "teams",
    label: "Teams you want to work on",
    type: "checkboxes",
    options: [
      "Drone racing",
      "Tensr design challenge",
      "Innate",
      "Not sure yet",
    ],
  },
  // There is one form on the site, so it has to cover volunteering on an
  // upcoming project as well as trying out for a team. The list is read off
  // `PLATFORMS` so it cannot drift from the cards on `/teams`.
  {
    name: "projects_upcoming",
    label: "Upcoming projects you would volunteer on",
    type: "checkboxes",
    options: [...PLATFORMS.map((p) => p.name), "Wherever you are needed"],
  },
  {
    name: "areas",
    label: "Where you want to work",
    type: "checkboxes",
    options: [
      "Learning",
      "Perception",
      "Controls",
      "Software",
      "Hardware",
      "Design",
    ],
  },
  {
    name: "github",
    label: "GitHub",
    type: "text",
    placeholder: "github.com/you",
  },
  {
    name: "resume",
    label: "Resume link",
    type: "text",
    placeholder: "A link we can open — Drive, Dropbox, your site",
  },
  {
    name: "projects",
    label: "Projects",
    type: "textarea",
    required: true,
    placeholder:
      "What you built, what your part was, and what you would do differently. Links welcome.",
  },
  {
    name: "designs",
    label: "Mechanical or electrical design work",
    type: "textarea",
    placeholder:
      "CAD, PCBs, airframes, machining, wiring — what you designed and whether it got built.",
  },
  {
    name: "software",
    label: "Software and tools you use",
    type: "text",
    placeholder: "Python, C++, ROS 2, IsaacLab, SolidWorks, KiCad, PyTorch",
  },
  {
    name: "hours",
    label: "Hours a week you can commit",
    type: "text",
    placeholder: "6, 10, as many as it takes",
  },
  {
    name: "anything",
    label: "Anything else",
    type: "textarea",
    placeholder: "Optional.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <Nav />

      <main className="flex-1">
        <section className="relative isolate overflow-hidden border-b border-hairline pb-12 pt-20 md:pt-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="gridfield absolute inset-0 opacity-50" />
            <div className="absolute left-1/2 top-0 h-[26rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(31,95,191,0.24),transparent_66%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--void)_92%)]" />
          </div>

          <div className="mx-auto w-full max-w-[1080px] px-6">
            <h1 className="display max-w-[16ch] text-[clamp(2.1rem,5.4vw,4rem)]">
              <span className="charged">Apply.</span>
            </h1>
          </div>
        </section>

        {/* --------------------------------------------------------- steps */}
        <section className="mx-auto w-full max-w-[1080px] px-6 py-16 md:py-20">
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRYOUT.steps.map((step, i) => (
              <Reveal key={step.name} delay={i * 0.05} className="h-full">
                <li className="flex h-full flex-col rounded-lg border border-hairline bg-panel/40 p-6">
                  <span className="tele text-[0.5625rem] text-ink-faint">
                    Step {i + 1}
                  </span>
                  <h2 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                    {step.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------------- form */}
        <section className="mx-auto w-full max-w-[1080px] px-6 pb-20 md:pb-24">
          <SectionHead title="Express interest" />

          <div className="mt-10">
            <InquiryForm
              fields={FIELDS}
              subject="Application — airobotics@berkeley"
              action="Send"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
