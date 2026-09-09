/**
 * Roster for airobotics@berkeley.
 *
 * MEMBERS: to add or fix your entry, copy PERSON_TEMPLATE below, fill it in,
 * and open a pull request. Instructions: docs/add-yourself.md
 *
 * Cards are uniform: name, team role, headline, major · year, links. Roles come
 * from one controlled vocabulary (RSO President, Vice President, Advisor, then
 * Perception / Controls / Learning / Software / Hardware / Aerospace / Design /
 * Research / Policy & data / Member) so the column reads as a set rather than
 * free text. Headlines are the member's own LinkedIn headline, trimmed to its
 * first segment. Fields are
 * optional and are left unset rather than guessed: a blank line is better than
 * a wrong one. `year` is unset for almost everyone because only the member
 * knows it.
 *
 * `confidence` records how sure we are that `linkedin` points at the right
 * person; links render only for `confirmed` and `likely` matches, never for
 * `unknown`.
 *
 * `photo` is a path under `public/team/`. LinkedIn images cannot be fetched
 * programmatically (auth wall + signed, expiring URLs), so drop a square image
 * in that folder and set the field; anyone without one gets a monogram tile.
 */

export type Confidence = "confirmed" | "likely" | "unknown";

export type Group = "leadership" | "advisors" | "members" | "past";

export type Person = {
  slug: string;
  name: string;
  /** Preferred/known-by name, when it differs from the legal first name. */
  alias?: string;
  /** Subsystem or title on the team. */
  role: string;
  /**
   * One short line on what they work on — read off a public profile, and meant
   * to add to the degree line rather than repeat it. Unset rather than guessed.
   */
  blurb?: string;
  group: Group;
  email: string;
  /**
   * Course of study. Department abbreviations Berkeley itself uses — EECS, ME —
   * otherwise written out: "Cognitive Science + Data Science".
   */
  major?: string;
  /** Standing: "'27", "MS", "MEng", "PhD", "Postdoc". */
  year?: string;
  /** Lab affiliation, e.g. "BAIR". */
  lab?: string;
  linkedin?: string;
  /** X/Twitter profile. Only set where the account was verified as theirs. */
  twitter?: string;
  website?: string;
  scholar?: string;
  github?: string;
  confidence: Confidence;
  photo?: string;
};

/**
 * Copy this, fill it in, and add it to TEAM below. Delete any line you do not
 * want on the site — everything except slug, name, role, group, email, and
 * confidence is optional.
 */
export const PERSON_TEMPLATE: Person = {
  slug: "first-last", // lowercase, hyphenated, unique
  name: "First Last",
  // alias: "Nickname",
  role: "Subsystem or title", // e.g. "Perception", "Controls"
  //   blurb: "One line on what you work on",
  group: "members", // "leadership" | "advisors" | "members" | "past"
  email: "you@berkeley.edu",
  //   major: "EECS",
  //   year: "'27",
  // lab: "BAIR",
  //   linkedin: "https://www.linkedin.com/in/you/",
  // twitter: "https://x.com/you",
  //   website: "https://you.example",
  // scholar: "https://scholar.google.com/citations?user=...",
  // github: "https://github.com/you",
  // photo: "/team/first-last.jpg", // square image in public/team/
  confidence: "confirmed",
};

export const TEAM: Person[] = [
  // ---------------------------------------------------------------- leadership
  {
    slug: "ck-wolfe",
    name: "C.K. Wolfe",
    role: "RSO President",
    blurb: "AI robotics at BAIR; co-founder of Tensr.",
    group: "leadership",
    email: "ckwolfe@berkeley.edu",
    major: "EECS",
    year: "PhD",
    lab: "BAIR",
    linkedin: "https://www.linkedin.com/in/ckwolfe/",
    twitter: "https://x.com/ckwolfeofficial",
    website: "https://ckwolfe.org/",
    github: "https://github.com/ckwolfe",
    confidence: "confirmed",
    photo: "/team/ck-wolfe.jpg",
  },
  {
    slug: "mingliang-tang",
    name: "Mingliang Tang",
    alias: "Miller",
    role: "Vice President",
    blurb: "Robotic survey.",
    group: "leadership",
    email: "mingliang.tang@berkeley.edu",
    major: "Civil Engineering",
    year: "PhD",
    linkedin: "https://www.linkedin.com/in/miller-tang",
    // The account's own name is "Miller Tang", the name he goes by here.
    github: "https://github.com/MillerTang0549",
    confidence: "confirmed",
    photo: "/team/mingliang-tang.jpg",
  },

  // ------------------------------------------------------------------ advisors
  {
    slug: "addison-kalanther",
    name: "Addison Kalanther",
    role: "Advisor",
    blurb: "Reinforcement learning for multi-agent games.",
    group: "advisors",
    email: "addikala@berkeley.edu",
    major: "EECS",
    year: "PhD",
    lab: "BAIR",
    linkedin: "https://www.linkedin.com/in/addikala",
    twitter: "https://x.com/addikala",
    website: "https://www.addikala.com/",
    scholar: "https://scholar.google.com/citations?user=Krt5pnwAAAAJ&hl=en",
    confidence: "confirmed",
    photo: "/team/addison-kalanther.jpg",
  },
  {
    slug: "chams-eddine-mballo",
    name: "Chams Eddine Mballo",
    role: "Advisor",
    group: "advisors",
    email: "cmballo@berkeley.edu",
    major: "EECS",
    year: "Postdoc",
    linkedin: "https://www.linkedin.com/in/chams-eddine-m-6bba4688/",
    scholar: "https://scholar.google.com/citations?user=iOlwamYAAAAJ&hl=en",
    // Same handle as the berkeley.edu address above, and the account's own name.
    github: "https://github.com/cmballo",
    confidence: "confirmed",
    photo: "/team/chams-eddine-mballo.jpg",
  },
  {
    slug: "george-ma",
    name: "George Ma",
    role: "Advisor",
    blurb: "Graph learning, advised by Somayeh Sojoudi.",
    group: "advisors",
    email: "george_ma@berkeley.edu",
    major: "EECS",
    year: "PhD",
    website: "https://georgemlp.github.io/",
    // Same person as the site above — that account's blog field is this URL.
    github: "https://github.com/GeorgeMLP",
    confidence: "likely",
    photo: "/team/george-ma.jpg",
  },
  {
    slug: "eric-berndt",
    name: "Eric Kort Berndt",
    role: "Advisor",
    blurb: "Co-founder and CEO of Tensr.",
    group: "advisors",
    email: "eric@tensr.com",
    major: "EECS",
    year: "MS",
    linkedin: "https://www.linkedin.com/in/ekberndt/",
    github: "https://github.com/ekberndt",
    confidence: "confirmed",
    photo: "/team/eric-berndt.jpg",
  },
  {
    slug: "ezenbaatar-batjargal",
    name: "Ezenbaatar Batjargal",
    role: "Advisor",
    group: "advisors",
    email: "ezenbaatar.b@berkeley.edu",
    major: "ME + Physics",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/ezenbaatar/",
    confidence: "confirmed",
    photo: "/team/ezenbaatar-batjargal.jpg",
  },

  {
    slug: "zhihao-deng",
    name: "Zhihao Deng",
    role: "Advisor",
    blurb: "Perception for autonomous racing. Now at NXP Semiconductors.",
    group: "advisors",
    email: "zhdeng@berkeley.edu",
    major: "EECS",
    year: "MEng",
    linkedin: "https://www.linkedin.com/in/zhihao-deng-b49173216/",
    github: "https://github.com/CuteCake",
    confidence: "confirmed",
    photo: "/team/zhihao-deng.jpg",
  },

  // ------------------------------------------------------------------- members
  {
    slug: "alejandro-municio",
    name: "Alejandro Municio",
    role: "Member",
    blurb: "Aerospace engineering; NASA research.",
    group: "members",
    email: "alejandromunicio@berkeley.edu",
    major: "ME",
    year: "MEng",
    linkedin: "https://www.linkedin.com/in/alejandro-municio-aerospace/",
    github: "https://github.com/alexmunicio",
    confidence: "confirmed",
    photo: "/team/alejandro-municio.jpg",
  },
  {
    slug: "ben-finch",
    name: "Ben Finch",
    role: "Member",
    blurb: "Robotics and controls engineering.",
    group: "members",
    email: "benfinch@berkeley.edu",
    major: "ME",
    year: "MEng",
    linkedin: "https://www.linkedin.com/in/ben--finch/",
    github: "https://github.com/benjfinc",
    confidence: "confirmed",
    photo: "/team/ben-finch.jpg",
  },
  // Off the roster for now — kept here so the entry does not have to be rebuilt.
  // {
  //   slug: "alexia-gallon",
  //   name: "Alexia Gallon",
  //   role: "Member",
  //   blurb: "Research apprentice at the Berkeley Risk and Security Lab.",
  //   group: "members",
  //   email: "gallon_alexia@berkeley.edu",
  //   major: "Political Science + Data Science",
  //   year: "BS",
  //   linkedin: "https://www.linkedin.com/in/alexia-gallon/",
  //   website: "https://alexiagallon.com/",
  //   github: "https://github.com/GalaxieNolla",
  //   confidence: "confirmed",
  // },
  {
    slug: "grant-luo",
    name: "Grant Luo",
    role: "Member",
    group: "members",
    email: "grantluo@berkeley.edu",
    major: "EECS",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/grantluo12138/",
    github: "https://github.com/Grant12138",
    // Matched by handle: Grant12138 contributes to our perception repos and the
    // LinkedIn slug carries the same suffix. Likely, not proven.
    confidence: "likely",
    photo: "/team/grant-luo.jpg",
  },
  {
    slug: "jiayi-zhu",
    name: "Jiayi Zhu",
    role: "Member",
    group: "members",
    email: "dongc_1@berkeley.edu",
    major: "EECS",
    year: "BS",
    // The org's fork traces to dongc1, whose site names them and states the
    // Berkeley EECS major; LinkedIn supplied directly.
    linkedin: "https://www.linkedin.com/in/jyzzh/",
    website: "https://dongc1.github.io/",
    github: "https://github.com/dongc1",
    confidence: "confirmed",
  },
  {
    slug: "kevin-ying",
    name: "Kevin Ying",
    alias: "Serious",
    role: "Member",
    blurb: "Robotics, computer vision, and industrial design.",
    group: "members",
    email: "yingk@berkeley.edu",
    major: "EECS",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/yingk888/",
    github: "https://github.com/YingK8",
    confidence: "confirmed",
    photo: "/team/kevin-ying.jpg",
  },
  // Off the roster for now — kept here so the entry does not have to be rebuilt.
  // {
  //   slug: "matt-damgen",
  //   name: "Matt Damgen",
  //   role: "Member",
  //   group: "members",
  //   // TODO: Matt's berkeley.edu address — left empty rather than guessed.
  //   email: "",
  //   linkedin: "https://www.linkedin.com/in/matt-damgen/",
  //   github: "https://github.com/mdamgen01",
  //   confidence: "confirmed",
  // },
  {
    slug: "richik-pal",
    name: "Richik Pal",
    role: "Member",
    blurb: "Agent observability research at BAIR; Amazon.",
    group: "members",
    email: "richik.pal@berkeley.edu",
    major: "EECS + MCB",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/richikpal/",
    github: "https://github.com/richik-p",
    confidence: "confirmed",
    photo: "/team/richik-pal.jpg",
  },
  {
    slug: "rohan-gulati",
    name: "Rohan Gulati",
    role: "Member",
    blurb: "Berkeley AI Research; NVIDIA.",
    group: "members",
    email: "rohangulati@berkeley.edu",
    major: "EECS",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/rohangul/",
    scholar: "https://scholar.google.com/citations?user=jmr5wZUAAAAJ&hl=en",
    github: "https://github.com/Rohan1215",
    confidence: "confirmed",
    photo: "/team/rohan-gulati.jpg",
  },
  {
    slug: "samhita-ghosh",
    name: "Samhita Ghosh",
    role: "Member",
    photo: "/team/samhita-ghosh.jpg",
    blurb: "Software engineering; Berkeley Codeology.",
    group: "members",
    email: "samhita.ghosh@berkeley.edu",
    major: "Mathematics + EECS",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/samhita-ghosh/",
    // Handle supplied by the club rather than matched: the account sets no name.
    github: "https://github.com/samhitag3",
    confidence: "confirmed",
  },
  {
    slug: "di-tian",
    name: "Di Tian",
    role: "Member",
    blurb: "Controls; previously AI Racing Tech.",
    group: "members",
    email: "tian_di@berkeley.edu",
    major: "ME",
    year: "MS",
    linkedin: "https://www.linkedin.com/in/fieldditian/",
    website: "https://fieldditian.top",
    github: "https://github.com/FieldDiTian",
    confidence: "confirmed",
    photo: "/team/di-tian.jpg",
  },
  {
    slug: "timothy-park",
    name: "Timothy Park",
    alias: "Timmy",
    role: "Member",
    blurb: "Mechanical and perception; previously AI Racing Tech.",
    group: "members",
    email: "timmypark@berkeley.edu",
    major: "Cognitive Science + Data Science",
    year: "BS",
    linkedin: "https://www.linkedin.com/in/timothyypark/",
    github: "https://github.com/timothyypark",
    confidence: "confirmed",
    photo: "/team/timothy-park.jpg",
  },
];

/**
 * The roster order the club keeps, as one list.
 *
 * Groups still render apart — members in one block, advisors in another — and
 * this only decides the order inside each of them, so a name may be listed here
 * beside people it never appears next to on the page. Anyone missing from the
 * list follows the ones named, alphabetically, rather than dropping off.
 */
const ROSTER_ORDER = [
  "ck-wolfe",
  "ben-finch",
  "alejandro-municio",
  "grant-luo",
  "zhihao-deng",
  "kevin-ying",
  "mingliang-tang",
  "rohan-gulati",
  "samhita-ghosh",
  "eric-berndt",
  "timothy-park",
  "di-tian",
  "jiayi-zhu",
  "ezenbaatar-batjargal",
  "richik-pal",
];

const byName = (a: Person, b: Person) => a.name.localeCompare(b.name);

/** Listed people in the club's order, then the rest by name. */
const rostered = (group: Group) => {
  const people = TEAM.filter((p) => p.group === group);
  const rank = (p: Person) => ROSTER_ORDER.indexOf(p.slug);

  return [
    ...people.filter((p) => rank(p) !== -1).sort((a, b) => rank(a) - rank(b)),
    ...people.filter((p) => rank(p) === -1).sort(byName),
  ];
};

export const LEADERSHIP = rostered("leadership");
/** Alumni. Move someone here by changing their `group` to "past". */
export const PAST = rostered("past");
export const ADVISORS = rostered("advisors");
export const MEMBERS = rostered("members");

export function initials(person: Person): string {
  return person.name
    .replace(/[^A-Za-z.\s]/g, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
