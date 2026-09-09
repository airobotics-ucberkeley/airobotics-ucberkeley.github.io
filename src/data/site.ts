/**
 * Site copy and navigation.
 *
 * Everything here is content, not layout — sections import from this file so a
 * non-engineer can edit the words without touching JSX. Roster data lives
 * separately in `team.ts`.
 *
 * House style: plain, factual sentences. Say what the group does and what it
 * runs on; skip the adjectives.
 */

/**
 * Canonical origin, used by the metadata, robots.txt, and the sitemap.
 *
 * This is where the build is actually served: there is no CNAME in `public/`,
 * so GitHub Pages answers on the repo's own domain. If the club is given
 * airobotics.berkeley.edu, add `public/CNAME` with that name and change this
 * line in the same commit — the two have to agree or the sitemap advertises
 * URLs nothing answers.
 */
export const SITE_URL = "https://airobotics-ucberkeley.github.io";

export const SITE = {
  name: "airobotics@berkeley",
  tagline: "applied competitive autonomy",
  org: "UC Berkeley",
  github: "https://github.com/airobotics-ucberkeley",
  /** TODO: create the org on Hugging Face, then drop the real URL in here. */
  huggingface: "https://REPLACE-WITH-HUGGINGFACE-ORG",
} as const;

/**
 * Inquiries are handled on the site, not through a personal inbox: every Apply
 * and Contact button lands on a page with a form.
 *
 * Submissions post as JSON to FormSubmit, which forwards them to the club
 * address below, so the site stays static with no backend of our own.
 *
 * FormSubmit holds the first submission and emails that address a confirmation
 * link — until somebody clicks it nothing is delivered, so send one test
 * inquiry and confirm it before pointing anyone at these forms.
 *
 * TODO: swap in the hashed endpoint FormSubmit mails back after that first
 * submission (`https://formsubmit.co/ajax/<hash>`) so the address is not in the
 * page source for scrapers to read.
 */
export const INQUIRY_EMAIL = "airoboticsberkeley@gmail.com";
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${INQUIRY_EMAIL}`;
/**
 * Whether a URL is real yet.
 *
 * A few links below are stubs waiting on something outside this repo — a store,
 * a challenge brief, an upload folder. A stub must never render as a working
 * link: pages check this and show plain text in its place, so nobody clicks
 * through to a dead domain. Fill the real URL in and the button appears.
 */
export const isLive = (href: string | undefined): href is string =>
  !!href && !href.includes("REPLACE");

export const APPLY_HREF = "/apply";
export const SPONSOR_HREF = "/sponsor";
export const DONATE_HREF = SPONSOR_HREF;
/**
 * Everything that is not an application: sponsorship, donations, research
 * areas, collaboration, press. One inbox, so one page and one form.
 */
export const CONTACT_HREF = SPONSOR_HREF;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Members", href: "/team" },
  { label: "Media", href: "/media" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Resources", href: "/resources" },
  { label: "Projects", href: "/teams" },
  { label: "Contact", href: CONTACT_HREF },
] as const;

/**
 * The three pillars, mirroring the reference site's Industry / Research /
 * Education triptych — recast for a hardware autonomy group.
 */
export const PILLARS = [
  {
    kicker: "Compete",
    title: "We enter competitions",
    body: "Our drone team races in AI Grand Prix and A2RL. The robot flies on its own.",
    points: ["AI Grand Prix", "A2RL", "Simulation qualifiers"],
  },
  {
    kicker: "Research",
    title: "Simulation first, then hardware",
    body: "Robot learning, perception, and control. Trained in simulation before it gets time on hardware.",
    points: ["RL & control", "Manipulation", "Perception"],
  },
  {
    kicker: "Build",
    title: "Members own subsystems",
    body: "New members get a piece of the stack, a simulator seat, and the platform it runs on.",
    points: ["Flight stack", "End effectors", "Field testing"],
  },
] as const;

/**
 * Research directions, rendered as rows on /research.
 */
export const FEATURES = [
  {
    id: "learning",
    image: "/media/tile-humanoid.webp",
    kicker: "Robot learning",
    title: "Learning in simulation, running on hardware",
    body: "Reinforcement and imitation learning for control, trained in simulation and transferred to hardware.",
    points: [
      ["Policy learning", "Reinforcement and imitation learning for control."],
      [
        "Sim-to-real",
        "Randomization and system models that make transfer work.",
      ],
      [
        "Evaluation",
        "Held-out testing, so a result is more than one good run.",
      ],
    ],
    href: "https://github.com/airobotics-ucberkeley",
    cta: "See the repos",
  },
  {
    id: "perception",
    image: "/media/tile-quadruped.webp",
    kicker: "Perception",
    title: "Perception that runs onboard",
    body: "Detection, segmentation, and state estimation, running on the robot's own compute.",
    points: [
      ["Detection", "Models trained on runs we record ourselves."],
      [
        "State estimation",
        "Fusing vision and inertial sensing into a usable state.",
      ],
      ["Data", "Collecting and labeling the runs the models learn from."],
    ],
    href: CONTACT_HREF,
    cta: "Ask about perception",
  },
  {
    id: "manipulation",
    image: "/media/tile-hand.webp",
    kicker: "Manipulation",
    title: "Grasping and contact-rich control",
    body: "Grasping and contact-rich control, run on real end effectors.",
    points: [
      ["Grasping", "Learned grasping, aimed past the training set."],
      ["Contact control", "Control that has to hold up once contact starts."],
      ["End effectors", "The grippers and wrists the policies run on."],
    ],
    href: CONTACT_HREF,
    cta: "Ask about manipulation",
  },
] as const;

/** Sponsors backing the group. Logos, where we have them, live in `public/brand/`. */
export const SPONSORS: (Logo & { note: string })[] = [
  {
    name: "Tensr",
    href: "https://www.tensr.com/",
    src: "/brand/tensr.svg",
    note: "Autonomous robotic factories",
  },
  {
    name: "Aurelius Systems",
    href: "https://www.aureliussystems.com/",
    src: "/brand/aurelius.png",
    note: "Autonomous counter-drone defense",
  },
  {
    name: "OpenAlpha Research",
    href: "https://openalpharesearch.org/",
    src: "/brand/openalpha.png",
    note: "Open research collective backing competitions",
  },
] as const;

/**
 * Logo rows.
 *
 * Sponsors keep their brand colour on a light chip. The partnership strip is
 * monochrome white, which needs one of three treatments depending on how the
 * source file is drawn:
 *   mono  — art on transparency; flatten it to white
 *   flip  — dark art on a white background; inverting drops the background out
 *   plain — already light art on a dark field; leave it alone
 *
 * Anything we cannot source a usable logo for stays off the strip and gets
 * named in the copy instead.
 *
 * TODO: the UC Berkeley wordmark needs to come from brand.berkeley.edu, and
 * RSO logo-usage rules should be checked before it ships.
 */
export type Logo = {
  name: string;
  src: string;
  href: string;
  treat?: "mono" | "flip" | "plain";
};

export const PARTNERSHIPS: Logo[] = [
  {
    name: "Berkeley AI Research",
    src: "/brand/bair.svg",
    href: "https://bair.berkeley.edu/",
    treat: "mono",
  },
  {
    name: "A2RL",
    src: "/brand/a2rl.svg",
    href: "https://a2rl.io/",
    treat: "mono",
  },
  {
    name: "Drone Champions League",
    src: "/brand/dcl.svg",
    href: "https://dcl.aero/",
    treat: "mono",
  },
  {
    name: "AI Racing Tech",
    src: "/brand/airacingtech.png",
    href: "https://www.airacingtech.com/",
    treat: "flip",
  },
  {
    name: "Anduril",
    src: "/brand/anduril-wordmark.svg",
    href: "https://www.anduril.com/",
    treat: "mono",
  },
  {
    name: "Tensr",
    src: "/brand/tensr.svg",
    href: "https://www.tensr.com/",
    treat: "mono",
  },
  {
    // Dark art on transparency, like the Berkeley and A2RL marks.
    name: "Aurelius Systems",
    src: "/brand/aurelius.png",
    href: "https://www.aureliussystems.com/",
    treat: "mono",
  },
  {
    // *-mark.png files are the same logo with its solid background knocked out
    // and the art repainted white, so it sits in a monochrome row.
    name: "OpenAlpha Research",
    src: "/brand/openalpha-mark.png",
    href: "https://openalpharesearch.org/",
    treat: "plain",
  },
  {
    // The shipped mark is a white glyph on solid indigo; innate-mark.png is the
    // same glyph with the field knocked out, so it works in a mono row.
    name: "Innate",
    src: "/brand/innate-mark.png",
    href: "https://www.innate.bot/",
    treat: "plain",
  },
];

/* ----------------------------------------------------------------- tryout */

/**
 * How joining works.
 *
 * TODO: attach the real take-home briefs and the term deadlines once set.
 */
export const TRYOUT = {
  blurb:
    "Tell us what you want to work on, then take a short simulation challenge.",
  steps: [
    {
      name: "Express interest",
      body: "Submit the form. Tell us what you have built.",
    },
    {
      name: "Highlight projects",
      body: "Name the teams and projects you want to work on.",
    },
    {
      name: "Assessment",
      body: "A simulation package with a navigation challenge to complete and return.",
    },
    { name: "Review", body: "We review submissions and follow up." },
  ],
} as const;

/**
 * Platform tiles on the landing page. The renders are the group's own brand
 * set, one per kind of machine the teams work on.
 */
export const TILES = [
  // Every tile goes to the teams index rather than a single team, so the strip
  // reads as one door into the work.
  { name: "Drones", src: "/media/tile-drone.webp", href: "/teams" },
  { name: "Hands", src: "/media/tile-hand.webp", href: "/teams" },
  { name: "Legged", src: "/media/tile-quadruped.webp", href: "/teams" },
  { name: "Humanoids", src: "/media/tile-humanoid.webp", href: "/teams" },
] as const;

/**
 * Hero montage. Short clips of open-source robotics projects, cross-faded
 * behind the headline.
 *
 * Every clip is somebody else's work. Nothing is printed over the montage any
 * more, so the fields below no longer render — they stay as the record of where
 * each file came from. Files live in `public/video/hero/`.
 */
export type HeroClip = {
  /** File at `/video/hero/<slug>.mp4`. */
  slug: string;
  /** Whose footage it is. */
  project: string;
  /** What the clip shows, in a few words. */
  caption: string;
  /** The project it came from. */
  href: string;
};

export const HERO_CLIPS: readonly HeroClip[] = [
  {
    slug: "a2rl",
    project: "A2RL x DCL",
    caption: "Autonomous racing drone, Abu Dhabi",
    href: "https://a2rl.io/autonomous-drone-race",
  },
  {
    slug: "openarm",
    project: "OpenArm",
    caption: "Open-source bimanual manipulation",
    href: "https://openarm.dev/",
  },
  {
    slug: "asimov",
    project: "Asimov 1",
    caption: "Open-source humanoid, walking",
    href: "https://github.com/menloresearch/asimov-1",
  },
  {
    slug: "microduck",
    project: "Microduck",
    caption: "Balance recovery on a tiny biped",
    href: "https://github.com/pollen-robotics/microduck",
  },
  {
    slug: "i2rt",
    project: "I2RT YAM",
    caption: "Backdrivable arm under hand guidance",
    href: "https://i2rt.com/",
  },
  {
    slug: "karting",
    project: "Autonomous Karting Series",
    caption: "A driverless kart on the cone course",
    href: "https://autonomouskartingseries.com/",
  },
] as const;

/* -------------------------------------------------------------- platforms */

/**
 * The machines queued up next, as a short list rather than a pitch.
 *
 * Asimov and OpenArm are paid for; the rest are not. Nothing on the page says
 * so any more — every card shows the same "TBD" pill — but `funded` stays as
 * the record.
 *
 * The footage is the upstream project's own, not ours — we have not built any
 * of these — so each card credits and links the people who did. `clip` is a
 * short silent loop in `public/video/platforms/`, with a poster JPEG of the
 * same name beside it.
 */
export type Platform = {
  slug: string;
  name: string;
  /** What kind of machine it is, in a few words. */
  kind: string;
  /** Hardware is committed and the project has a start date. */
  funded: boolean;
  /** The open-source project the design and the footage come from. */
  source: { name: string; href: string };
  clip: string;
};

export const PLATFORMS: readonly Platform[] = [
  {
    slug: "asimov",
    name: "Asimov",
    kind: "Open-source humanoid",
    funded: true,
    source: {
      name: "Asimov 1, Menlo Research",
      href: "https://github.com/menloresearch/asimov-1",
    },
    clip: "asimov",
  },
  {
    slug: "openarm",
    name: "OpenArm",
    kind: "Bimanual manipulator",
    funded: true,
    source: { name: "OpenArm", href: "https://openarm.dev/" },
    clip: "openarm",
  },
  {
    slug: "arm",
    name: "A bimanual platform",
    kind: "Two backdrivable arms",
    funded: false,
    source: { name: "I2RT YAM", href: "https://i2rt.com/" },
    clip: "yam",
  },
  {
    slug: "microduck",
    name: "Microduck",
    kind: "Palm-sized biped",
    funded: false,
    source: {
      name: "Microduck, Pollen Robotics",
      href: "https://github.com/pollen-robotics/microduck",
    },
    clip: "microduck",
  },
] as const;

/* ------------------------------------------------------------- hackathons */

/**
 * Two hackathons a year, in January and at the end of August. The exact
 * weekend of each is not fixed, so the facts below name the month, not a day.
 */
export const HACKATHON = {
  cadence: "Two a year",
  blurb: "A weekend build sprint on our hardware and simulators.",
  /** Both land in a break rather than mid-term, so the weekend is actually free. */
  timing: "One in January, one at the end of August, while campus is quiet.",
  facts: [
    { label: "How often", value: "Twice a year" },
    { label: "When", value: "January and late August" },
    { label: "Next one", value: "January 2027" },
    { label: "Where", value: "UC Berkeley" },
  ],
  sponsorship: [
    {
      name: "Title sponsor",
      body: "Your name on the event and your challenge as the brief.",
    },
    {
      name: "Prizes",
      body: "Put up the prize pool, or something off your own shelves.",
    },
    {
      name: "Hardware & compute",
      body: "Robots and parts for teams to build on, or the compute to train them.",
    },
    {
      name: "Food and space",
      body: "Coffee, meals, and a room to work in for the weekend.",
    },
  ],
} as const;

/**
 * Ways to back the group. Companies and individuals use the same list and the
 * same form: we have no checkout of our own, so an officer replies with where
 * to send it.
 */
export const SUPPORT_WAYS = [
  {
    name: "Money",
    body: "One-time or recurring. It goes to hardware, compute, and travel.",
  },
  {
    name: "Hardware & compute",
    body: "Platforms to build on, or cloud credit for training.",
  },
  {
    name: "A hackathon",
    body: "Back one we run — prizes, hardware, or the room and the food.",
  },
  {
    name: "Matching gift",
    body: "Many employers match. Tell us who yours is.",
  },
] as const;

/**
 * Sponsorship tiers.
 *
 * `amount` is a floor, not a price: it is what we ask for before promising the
 * placement beside it, and everything above it is the same conversation.
 *
 * `promise` is deliberately only ever logo placement. Anything else a sponsor
 * wants — a hackathon brief, a talk, recruiting — is agreed directly, so the
 * page never commits the team to work it cannot be sure of delivering.
 */
export type SponsorTier = {
  name: string;
  /** A floor — "$10,000+" — or the terms, for in-kind support. */
  amount: string;
  audience: "Companies" | "Individuals";
  /** One line, placement only. */
  promise: string;
};

export const SPONSOR_TIERS: readonly SponsorTier[] = [
  {
    name: "Season",
    amount: "$50,000+",
    audience: "Companies",
    promise: "Your logo on the site and on what we fly",
  },
  {
    name: "Title",
    amount: "$25,000+",
    audience: "Companies",
    promise: "Your logo on the site and on what we fly",
  },
  {
    name: "Partner",
    amount: "$10,000+",
    audience: "Companies",
    promise: "Your logo on the site",
  },
  {
    name: "In kind",
    amount: "Hardware or compute",
    audience: "Companies",
    promise: "Logo placement to match whatever you send our way",
  },
  {
    name: "Patron",
    amount: "$1,000+",
    audience: "Individuals",
    promise: "Your name on the site",
  },
  {
    name: "Supporter",
    amount: "Any amount",
    audience: "Individuals",
    promise: "Our thanks, and a lot of spare parts",
  },
];

/* -------------------------------------------------------------- resources */

/**
 * Reading list for people who want to join. Every link was checked before
 * shipping — prefer stable course or catalogue pages over per-semester sites,
 * which rot every term.
 */
export type Resource = { name: string; href: string; note: string };

export const RESOURCE_GROUPS: {
  heading: string;
  note?: string;
  items: Resource[];
}[] = [
  {
    heading: "Recommended courses for robotics at Berkeley",
    note: "Most of these courses put their materials online, so you can follow along whether or not you are enrolled.",
    items: [
      {
        name: "EECS 106A / 106B — Introduction to Robotics",
        href: "https://guide.berkeley.edu/courses/eecs/",
        note: "Kinematics, dynamics, control, and manipulation.",
      },
      {
        name: "CS 188 — Artificial Intelligence",
        href: "https://inst.eecs.berkeley.edu/~cs188/",
        note: "Search, MDPs, and reinforcement learning.",
      },
      {
        name: "CS 189 — Machine Learning",
        href: "https://guide.berkeley.edu/courses/compsci/",
        note: "The theory behind the models we train.",
      },
      {
        name: "CS 182 — Deep Neural Networks",
        href: "https://guide.berkeley.edu/courses/compsci/",
        note: "Architectures and training.",
      },
      {
        name: "CS 180 — Computer Vision and Computational Photography",
        href: "https://guide.berkeley.edu/courses/compsci/",
        note: "Image formation and the features our perception stack is built on.",
      },
      {
        name: "CS 280 — Computer Vision",
        href: "https://guide.berkeley.edu/courses/compsci/",
        note: "Graduate treatment — detection, segmentation, and 3D vision.",
      },
      {
        name: "EECS 127 — Optimization Models",
        href: "https://guide.berkeley.edu/courses/eecs/",
        note: "Convex optimization, under both control and learning.",
      },
      {
        name: "EECS 126 — Probability and Random Processes",
        href: "https://guide.berkeley.edu/courses/eecs/",
        note: "Estimation and filtering start here.",
      },
      {
        name: "EE 128 — Feedback Control Systems",
        href: "https://guide.berkeley.edu/courses/eecs/",
        note: "Classical control.",
      },
      {
        name: "EECS 149 — Introduction to Embedded Systems",
        href: "https://guide.berkeley.edu/courses/eecs/",
        note: "Real-time software on the hardware that flies and grips.",
      },
      {
        name: "CS 285 — Deep Reinforcement Learning",
        href: "https://rail.eecs.berkeley.edu/deeprlcourse/",
        note: "Graduate course, lectures public.",
      },
      {
        name: "CS 287 — Advanced Robotics",
        href: "https://guide.berkeley.edu/courses/compsci/",
        note: "Planning, control, and RL for robots, past the intro course.",
      },
    ],
  },
  {
    heading: "Online",
    items: [
      {
        name: "Hugging Face — LeRobot robotics course",
        href: "https://huggingface.co/learn/robotics-course",
        note: "Robot learning end to end, built around the LeRobot library.",
      },
    ],
  },
];

/* --------------------------------------------------------- calendar & news */

/**
 * Upcoming events. `when` is free text so an unscheduled item can honestly read
 * "TBA" rather than carrying a made-up date.
 *
 * TODO: replace these with the real semester schedule — dates, rooms, and the
 * signup links.
 */
export type Event = {
  when: string;
  title: string;
  where: string;
  kind: "Recruiting" | "Meeting" | "Test" | "Competition" | "Talk";
  href?: string;
  /** Mark of the competition or host, shown beside the title. */
  logo?: Logo;
};

// Listed in the order they happen — the calendar renders the array as given.
export const EVENTS: Event[] = [
  {
    when: "Sep 15–21, 2026",
    title: "AI Grand Prix — onsite",
    where: "Costa Mesa, California",
    kind: "Competition",
    href: "/teams/drone-racing",
    logo: {
      name: "The AI Grand Prix",
      src: "/brand/aigp.svg",
      href: "https://www.theaigrandprix.com/",
      treat: "mono",
    },
  },
  {
    when: "Oct 15, 2026",
    title: "Applications open",
    where: "Online",
    kind: "Recruiting",
    href: APPLY_HREF,
  },
  {
    // The last week of instruction before the campus Thanksgiving holiday.
    when: "Nov 24, 2026",
    title: "Info session",
    where: "UC Berkeley campus",
    kind: "Recruiting",
    href: APPLY_HREF,
  },
];

/**
 * News. Keep entries short and factual — one line each, newest first.
 */
export type NewsItem = {
  date: string;
  title: string;
  /** One line. This is all the home-page calendar shows. */
  body: string;
  /** The rest of the story, shown only on the news page. */
  href?: string;
  /** Mark of the competition or partner the item is about. */
  logo?: Logo;
};

export const NEWS: NewsItem[] = [
  {
    date: "Aug 2026",
    title: "Hackathon announced",
    body: "Two hackathons a year, the first in January — a weekend to build something that runs.",
    href: "/hackathons",
  },
  {
    date: "Aug 2026",
    title: "8th in the AI Grand Prix simulator",
    body: "Our drone team finished 8th in the AI Grand Prix simulator qualifier.",
    href: "https://www.theaigrandprix.com/",
    logo: {
      name: "The AI Grand Prix",
      src: "/brand/aigp.svg",
      href: "https://www.theaigrandprix.com/",
      treat: "mono",
    },
  },
];

/* ------------------------------------------------------------------- teams */

/**
 * Project teams. Each one gets a page under /teams, and the drone team keeps
 * the competition detail it already had.
 *
 * Sponsored projects are run with a company. `status` is deliberately honest —
 * a project that has not started yet says so rather than implying results, and
 * terms stay TBD until they are actually agreed.
 */
export type Team = {
  slug: string;
  name: string;
  kind: "Competition team" | "Sponsored project";
  status: string;
  /** Sponsor, for sponsored projects: mark, link, and what they build. */
  sponsor?: {
    name: string;
    href: string;
    src: string;
    /** Two or three factual sentences on the company. */
    about: string;
    /** Short facts shown beside the copy. */
    facts?: readonly { label: string; value: string }[];
  };
  summary: string;
  body: string;
  points: readonly string[];
  /** Competition or partner marks shown on the team card and page. */
  logos?: Logo[];
  /**
   * 16:9 image for the card and page header. Where a sponsor has no usable
   * photograph, `tint` renders a brand-coloured tile with their mark instead.
   */
  image?: string;
  tint?: string;
  /** Mark centred on the tinted tile when there is no photograph. */
  mark?: string;
  /** Terms of an open call, where the project runs as one. */
  challenge?: readonly { name: string; body: string }[];
  /**
   * Prompts — images to think against, not products to copy. Treated flat and
   * uncaptioned, so only public-domain, CC0, or our own photographs go here;
   * anything needing a credit line does not fit the treatment.
   */
  challengeImages?: readonly { src: string; alt: string; href?: string }[];
  /** Where the full brief will live. */
  challengeHref?: string;
  /**
   * Where entrants upload a design — a Drive folder, a form, whatever takes
   * files. Until it is a real URL the button says the call is not open, so
   * nobody sends work into nothing.
   */
  challengeUploadHref?: string;
};

export const TEAMS: Team[] = [
  {
    slug: "drone-racing",
    name: "Drone racing",
    kind: "Competition team",
    status: "Active",
    summary: "Autonomous drone racing, in simulation and on hardware.",
    body: "Competes in AI Grand Prix and A2RL. The aircraft flies the course under its own control.",
    points: ["UAV racing", "Autonomy"],
    image: "/media/tile-drone.webp",
    logos: [
      {
        name: "A2RL",
        src: "/brand/a2rl.svg",
        href: "https://a2rl.io/",
        treat: "mono",
      },
      {
        name: "Drone Champions League",
        src: "/brand/dcl.svg",
        href: "https://dcl.aero/",
        treat: "mono",
      },
      {
        name: "Anduril",
        src: "/brand/anduril.png",
        href: "https://www.anduril.com/",
        treat: "flip",
      },
    ],
  },
  {
    slug: "tensr",
    name: "Tensr",
    kind: "Sponsored project",
    status: "Challenge — details TBA",
    sponsor: {
      name: "Tensr",
      href: "https://www.tensr.com/",
      src: "/brand/tensr.svg",
      // Their words, from tensr.com — not our paraphrase of them.
      about:
        "A robotic factory that builds robots, online now in the Bay Area. Tensr is turning manufacturing into an end-to-end learning system, using data from every build to train the models that plan and run production; the end state is a fully autonomous dark factory. The founding team is Berkeley degrees and BAIR PhDs.",
      facts: [
        { label: "Building", value: "Autonomous factories" },
        { label: "Factory", value: "12,000 sq ft, Bay Area" },
        { label: "Roots", value: "Berkeley AI Research" },
      ],
    },
    summary:
      "An open design challenge sponsored by Tensr. Details are still being set.",
    body: "Drones, humanoids, hands — submit an open-source hardware design for an autonomous robot. Nothing about the call is settled yet.",
    points: ["Open hardware", "Design challenge"],
    // Off the page until the brief exists — nothing here was settled, and a
    // list of terms that all read "TBA" promises more than we can stand behind.
    // `SponsoredProject` gates the whole challenge block on this one field, so
    // uncommenting it brings back the heading, the concept images and the
    // buttons as they were.
    // challenge: [
    //   {
    //     name: "What to submit",
    //     body: "An open-source hardware design for an autonomous robot. Any form factor — aerial, legged, wheeled, manipulator.",
    //   },
    //   {
    //     name: "What you win",
    //     body: "Tensr manufactures the winning designs. How many, TBA.",
    //   },
    //   {
    //     name: "Materials",
    //     body: "Covered by the sponsor.",
    //   },
    //   {
    //     name: "Ownership",
    //     body: "The winner owns the finished item.",
    //   },
    //   { name: "Brief", body: "Full brief and deadlines TBA." },
    // ],
    // TODO: point at the brief once it is published.
    challengeImages: [
      {
        src: "/media/concepts/cara-capstan-quadruped.jpg",
        alt: "CARA, a capstan-drive quadruped robot",
        href: "https://www.aaedmusa.com/projects/cara",
      },
      {
        src: "/media/concepts/stanley-capstan-quadruped.jpg",
        alt: "Stanley, a capstan-drive quadruped robot",
        href: "https://hackaday.io/project/176726-stanley-the-capstan-based-quadruped-kit",
      },
      {
        src: "/media/concepts/berkeley-humanoid-lite.jpg",
        alt: "Berkeley Humanoid Lite, an open-source humanoid robot",
        href: "https://github.com/HybridRobotics/Berkeley-Humanoid-Lite",
      },
      {
        src: "/media/concepts/toddlerbot.jpg",
        alt: "Three ToddlerBot humanoid robots",
        href: "https://toddlerbot.github.io/",
      },
      {
        src: "/media/concepts/roboto-origin.jpg",
        alt: "The ROBOTO_ORIGIN robot walking outdoors",
        href: "https://github.com/Roboparty/roboto_origin",
      },
      {
        src: "/media/concepts/agiloped-humanoid.jpg",
        alt: "AGILOped, an open-source humanoid robot, standing after a fall test",
        href: "https://github.com/gficht/AGILOped_model",
      },
      {
        src: "/media/concepts/poppy-humanoid.jpg",
        alt: "Poppy, an open-source 3D-printed humanoid robot",
        href: "https://www.poppy-project.org/en/robots/poppy-humanoid/",
      },
      {
        src: "/media/concepts/inmoov-humanoid.jpg",
        alt: "InMoov, an open-source 3D-printed humanoid robot",
        href: "https://inmoov.fr/",
      },
      {
        src: "/media/concepts/openarm-bimanual-arm.jpg",
        alt: "OpenArm, an open-source bimanual robot arm",
        href: "https://openarm.dev/",
      },
      {
        src: "/media/concepts/asimov-v1-humanoid.jpg",
        alt: "Asimov v1, a humanoid robot",
        href: "https://github.com/asimovinc/asimov-1",
      },
      {
        src: "/media/concepts/salvius-humanoid.jpg",
        alt: "Salvius, an open-source humanoid robot",
        href: "https://salvius.org/",
      },
      {
        src: "/media/concepts/darwin-op.jpg",
        alt: "DARwIn-OP, a small open-source humanoid robot",
        href: "https://en.robotis.com/model/page.php?co_id=prd_op",
      },
      {
        src: "/media/concepts/reachy-mini.jpg",
        alt: "Reachy Mini, a desktop robot",
        href: "https://pollen-robotics.com/reachy-mini/",
      },
      {
        src: "/media/concepts/anyskin-tactile-skin.jpg",
        alt: "AnySkin, a replaceable tactile sensor skin, held in two hands",
        href: "https://any-skin.github.io/",
      },
      {
        src: "/media/concepts/neoracer-v2.jpg",
        alt: "neoracer-v2, an open-source race car",
        href: "https://github.com/Neobotics-Foundation-Inc/NeoRacer-V2",
      },
      {
        src: "/media/concepts/parol6-desktop-arm.jpg",
        alt: "PAROL6, a desktop robot arm",
        href: "https://github.com/Source-Robotics/PAROL6-Desktop-robot-arm",
      },
      {
        src: "/media/concepts/dexumi-exoskeleton.jpg",
        alt: "A person wearing the DexUMI hand exoskeleton",
        href: "https://dex-umi.github.io/",
      },
    ],
    challengeHref: "https://REPLACE-WITH-CHALLENGE-BRIEF",
    // TODO: a Drive upload folder or a form that accepts files.
    challengeUploadHref: "https://REPLACE-WITH-UPLOAD-LINK",
    // The card carries Tensr's mark on their brand colour; the render of what
    // can be entered sits with the challenge terms below.
    tint: "linear-gradient(135deg, #24004E 0%, #6600B5 55%, #310068 100%)",
  },
  {
    slug: "innate",
    name: "Innate",
    kind: "Sponsored project",
    status: "Forming — scope TBA",
    sponsor: {
      name: "Innate",
      href: "https://www.innate.bot/",
      src: "/brand/innate.png",
      about:
        "Innate builds MARS, an open-source general-purpose robot with a full AI stack. Skills run under a programmable agent, BASIC. The platform is open and extendable.",
      facts: [
        { label: "Building", value: "MARS, a personal robot" },
        { label: "Stack", value: "Open source, agent-driven" },
        { label: "Skills", value: "Manipulation and navigation" },
      ],
    },
    summary: "Manipulation and agent behaviors on Innate's MARS robot.",
    body: "MARS is an open general-purpose robot running a full AI stack. Scope and start date are still being set.",
    points: ["Manipulation", "Agents"],
    image: "/brand/innate-mars.webp",
  },
];

/* -------------------------------------------------------- drone team detail */

/**
 * Competition programs the drone team enters.
 *
 * The AI Grand Prix is run by Anduril with the Drone Champions League, so its
 * card carries all three marks. `status` says where we actually are.
 */
export const PROGRAMS: {
  name: string;
  kind: string;
  status?: string;
  body: string;
  /** Where each round is held and when. */
  rounds: readonly { where: string; when: string }[];
  /** The competition's own event page. */
  href: string;
  logos: Logo[];
}[] = [
  {
    name: "AI Grand Prix",
    kind: "Autonomous drone racing",
    body: "Run by Anduril with the Drone Champions League. Teams race in simulation to qualify, then fly the course for real.",
    rounds: [
      { where: "Virtual qualifier", when: "May–Jul 2026" },
      { where: "Costa Mesa, California", when: "Sep 15–21, 2026" },
      { where: "Columbus, Ohio", when: "Nov 2026" },
    ],
    href: "https://www.theaigrandprix.com/",
    logos: [
      {
        name: "The AI Grand Prix",
        src: "/brand/aigp.svg",
        href: "https://www.theaigrandprix.com/",
        treat: "mono",
      },
      {
        name: "Anduril",
        src: "/brand/anduril-wordmark.svg",
        href: "https://www.anduril.com/",
        treat: "mono",
      },
      {
        name: "Drone Champions League",
        src: "/brand/dcl.svg",
        href: "https://dcl.aero/",
        treat: "mono",
      },
    ],
  },
  {
    name: "A2RL",
    kind: "Abu Dhabi Autonomous Racing League",
    status: "Pending",
    body: "Abu Dhabi's autonomous racing league, run by ASPIRE. Aircraft fly a physical course under their own control.",
    rounds: [{ where: "Abu Dhabi", when: "TBA" }],
    href: "https://a2rl.io/autonomous-drone-race",
    logos: [
      {
        name: "A2RL",
        src: "/brand/a2rl.svg",
        href: "https://a2rl.io/",
        treat: "mono",
      },
    ],
  },
];

/** Footer link columns. */
export const FOOTER_LINKS = [
  {
    heading: "Group",
    links: [
      { label: "Mission", href: "/#mission" },
      { label: "Projects", href: "/teams" },
      { label: "Members", href: "/team" },
      { label: "Media", href: "/media" },
      { label: "Hackathons", href: "/hackathons" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Join",
    links: [
      { label: "Apply", href: APPLY_HREF },
      { label: "Contact", href: CONTACT_HREF },
      { label: "GitHub", href: "https://github.com/airobotics-ucberkeley" },
    ],
  },
] as const;
