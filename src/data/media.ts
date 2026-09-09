/**
 * Photos.
 *
 * The page renders the array in order, so the newest or best goes first. To add
 * one: put a web-sized JPEG in `public/media/photos/` — long edge around 1800px
 * — and add an entry here. An empty array degrades to a line of text rather
 * than a broken grid.
 *
 * `alt` is what someone hears when they cannot see the photo, so it describes
 * what is in frame. `caption` is not rendered — the grid is photos alone — but
 * it labels the entry here and feeds site search. Nobody is named in either;
 * ask first if you want to start.
 *
 * `when` is unset throughout because the originals carry no capture date. Fill
 * it in where you know it rather than guessing.
 */
export type MediaItem = {
  src: string;
  alt: string;
  caption: string;
  when?: string;
  /** Photographer or source, where one should be named. */
  credit?: string;
};

export const MEDIA: MediaItem[] = [
  // From the studio and flight-space shoot — the only photos here shot on a
  // real camera, so they lead the grid.
  {
    src: "/media/photos/quad-in-hand.jpg",
    alt: "A student holding a racing quadcopter by its arms against a plain backdrop",
    caption: "The airframe, in hand",
  },
  {
    src: "/media/photos/flight-space-crew.jpg",
    alt: "Three students gathered around one workstation in the flight space",
    caption: "Three at one screen",
  },
  {
    src: "/media/photos/quad-lifted.jpg",
    alt: "A student holding a racing quadcopter up at shoulder height",
    caption: "A race build, shoulder height",
  },
  {
    src: "/media/photos/whiteboard-rig.jpg",
    alt: "Two students setting up a test rig beside a whiteboard covered in notes",
    caption: "Setting up a test rig",
  },
  {
    src: "/media/photos/quad-checkout.jpg",
    alt: "A student looking over the wiring of a racing drone held in both hands",
    caption: "Going over the wiring",
  },
  {
    src: "/media/photos/flight-space-desks.jpg",
    alt: "Two students working at monitors in the flight space with drone parts across the desks",
    caption: "An evening in the flight space",
  },
  {
    src: "/media/photos/quad-frame-held.jpg",
    alt: "A student holding a bare racing quadcopter frame with both hands",
    caption: "One of this season's frames",
  },
  {
    src: "/media/photos/flight-space-standup.jpg",
    alt: "Four students around a desk of monitors, one standing and watching the screen",
    caption: "Going through a run together",
  },
  {
    src: "/media/photos/arena-checks.jpg",
    alt: "Three team members crouched around a racing drone inside a netted arena",
    caption: "Race week",
  },
  {
    src: "/media/photos/preflight.jpg",
    alt: "A student sitting beside a racing drone with a laptop showing live telemetry",
    caption: "Last checks before a flight",
  },
  {
    src: "/media/photos/airframe-top.jpg",
    alt: "A carbon fibre quadcopter frame photographed from directly above",
    caption: "The airframe, top down",
  },
  {
    src: "/media/photos/hangar.jpg",
    alt: "Two students working on laptops in a large indoor flight arena",
    caption: "Waiting on the next slot",
  },
  {
    src: "/media/photos/airframe-build.jpg",
    alt: "A racing quadcopter with its wiring and electronics exposed",
    caption: "Built from the frame up",
  },
  {
    src: "/media/photos/workshop-wiring.jpg",
    alt: "Two students wiring a drone at a workshop table",
    caption: "Wiring night",
  },
  {
    src: "/media/photos/workshop-handoff.jpg",
    alt: "One student holding a drone while another reads code from a laptop",
    caption: "Comparing notes",
  },
  {
    src: "/media/photos/desk-build.jpg",
    alt: "A student writing code at a desk with a drone beside the laptop",
    caption: "Writing the autonomy stack",
  },
  {
    src: "/media/photos/flight-space-code.jpg",
    alt: "A student coding at a large monitor with a whiteboard of diagrams behind",
    caption: "A long session at the flight space",
  },
  {
    src: "/media/photos/flight-space-whiteboard.jpg",
    alt: "Two students at a workbench, one at a monitor and one handling a drone",
    caption: "Planning the next run",
  },
  {
    src: "/media/photos/flight-space-repairs.jpg",
    alt: "Two students repairing a drone and a laptop at a table in a warehouse",
    caption: "Repairs between runs",
  },
  {
    src: "/media/photos/team-abroad.jpg",
    alt: "Three team members outside a white stone building in the evening sun",
    caption: "Off the clock",
  },
  {
    src: "/media/photos/abu-dhabi-night.jpg",
    alt: "A domed palace lit up at night with people crossing the courtyard",
    caption: "Abu Dhabi after dark",
  },
];
