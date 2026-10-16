// ponytail: neutral example data only, never real events/orgs/people/stats.
// Photos in public/img carry attribution in the footer.

// keep in sync with basePath in next.config.ts — raw <img>/next/image srcs
// are not basePath-prefixed when images.unoptimized is true
export const ASSET_BASE = process.env.__NEXT_ROUTER_BASEPATH ?? "/EVOLECT";
/** Prefix a public/ asset path with the configured basePath. */
export const img = (p: string) => `${ASSET_BASE}${p}`;

export const IG_URL = "https://instagram.com/evolect.in";
export const BUILDER_URL = "https://instagram.com/thats.jainam";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/volunteers", label: "For Crew" },
  { href: "/event-managers", label: "For Organizers" },
];

// ---- Scene 1: cinematic scroll story (sticky camera push) ----
export const STORY_CHIPS = [
  { b: "Registration", s: "Check-in desk" },
  { b: "Guest management", s: "Lists and arrivals" },
  { b: "Backstage", s: "Artist and crew flow" },
  { b: "Operations", s: "Run of show" },
  { b: "Logistics", s: "Gear and transport" },
];

export const STORY_CAPTIONS = [
  {
    side: "l",
    title: "The people behind every great event.",
    lede: "Evolect connects event organizers with the people they need to bring live experiences to life.",
  },
  {
    side: "r",
    title: "Behind every event, a team.",
    lede: "Registration, guest management, backstage, operations and logistics — the work you never see, and the reason the night works.",
  },
  {
    side: "l",
    title: "From scattered details to a coordinated team.",
    lede: "Bring event staffing and team coordination into one structured workflow.",
  },
  {
    side: "r",
    title: "The right people. The right event. One connected workflow.",
    lede: "",
  },
];

// ---- Scene 2: the event problem (scroll beats, sticky visual) ----
export const PROBLEM_BEATS = [
  {
    id: "people",
    img: "/img/stage-lights.jpg",
    alt: "Musicians on a lit stage during a night concert",
    title: "An event needs the right people.",
    desc: "Registration, front-of-house, backstage, logistics — every live event leans on a team working in the background.",
  },
  {
    id: "roles",
    img: "/img/crowd-night.jpg",
    alt: "Festival crowd in front of a lit stage at night",
    title: "Those people need the right roles.",
    desc: "A crew only works when each person knows exactly where they fit — skills, availability and expectations have to line up.",
  },
  {
    id: "together",
    img: "/img/backstage.jpg",
    alt: "Backstage tents, rigging and a stage under construction before doors open",
    title: "The team has to move together.",
    desc: "Chasing responses over group chats and calls turns coordination into the hardest part of the event.",
  },
  {
    id: "time",
    img: "/img/crew-lights.jpg",
    alt: "A stage crew member adjusting lighting before a concert",
    title: "The details must land on time.",
    desc: "Schedules, role assignments and last-minute changes all have to reach the right person at the right moment.",
  },
];

// ---- Scene 3: two sides of the platform ----
export const SIDE_ORGANIZER = [
  "Define the event and the roles it needs",
  "Review applications against clear requirements",
  "Select people and coordinate the team",
];
export const SIDE_CREW = [
  "Discover roles that fit skills and schedule",
  "Understand expectations before applying",
  "Track applications and event commitments",
];

// ---- Scene 4: the scroll-driven workflow ----
export const WORKFLOW_STAGES = [
  {
    n: "01",
    key: "create",
    title: "Create the event",
    desc: "An organizer defines the event, the date and every role the team needs — before season schedules explode.",
  },
  {
    n: "02",
    key: "discover",
    title: "Discover people",
    desc: "Crew discover open roles that match their skills and availability, then apply with the context an organizer actually needs.",
  },
  {
    n: "03",
    key: "review",
    title: "Review and select",
    desc: "The organizer reviews applications against the requirements, compares experience, and selects the right people.",
  },
  {
    n: "04",
    key: "coordinate",
    title: "Coordinate the team",
    desc: "Assignments, schedules and event information live in one place instead of scattered WhatsApp threads.",
  },
  {
    n: "05",
    key: "deliver",
    title: "Deliver the event",
    desc: "The team carries out its responsibilities on the day — and the event records reflect what actually happened.",
  },
];

// ---- Scene 5: interactive showcase (sample data only) ----
export const SHOWCASE_EVENT = {
  title: "Sample event — Pune open-air concert",
  meta: "Pune · Sample date · Sample venue",
  audience: "Example audience: 2,000 guests",
  schedule: [
    "Load-in — morning",
    "Doors — evening",
    "Show — night",
    "Load-out — after show",
  ],
};

export const SHOWCASE_ROLES = [
  { id: "ops", name: "Operations lead", need: "2 needed", status: "Confirmed", detail: "Owns the run-of-show on the ground, keeps sections of the venue moving, and flags blockers early." },
  { id: "reg", name: "Registration & check-in", need: "3 needed", status: "Shortlisted", detail: "Runs the entry desk: guest lists, wristband issue and queue flow at the gates." },
  { id: "foh", name: "Front-of-house", need: "4 needed", status: "Open", detail: "Guides the audience, watches crowd flow in the venue bowl, and answers the questions people always ask." },
  { id: "backsta", name: "Backstage coordination", need: "2 needed", status: "Open", detail: "Keeps the backstage side orderly — artist movement, props and crew access points." },
];

export const SHOWCASE_APPLICATIONS = [
  { name: "Crew applicant 01", role: "Operations lead", status: "pending", note: "Sample profile · 3 past events listed" },
  { name: "Crew applicant 02", role: "Registration & check-in", status: "shortlisted", note: "Sample profile · first-aid certificate claimed" },
  { name: "Crew applicant 03", role: "Front-of-house", status: "pending", note: "Sample profile · weekend availability" },
  { name: "Crew applicant 04", role: "Backstage coordination", status: "pending", note: "Sample profile · verified profile" },
];

export const SHOWCASE_OPPORTUNITIES = [
  { id: "o1", title: "Operations lead", kind: "Concert", meta: "Pune · Sample weekend", slots: "2 roles open" },
  { id: "o2", title: "Registration & check-in", kind: "Concert", meta: "Pune · Sample weekend", slots: "3 roles open" },
  { id: "o3", title: "Front-of-house", kind: "Festival", meta: "Within 20 km of Pune · Sample month", slots: "4 roles open" },
  { id: "o4", title: "Backstage coordinator", kind: "Festival", meta: "Pune · Sample month", slots: "2 roles open" },
  { id: "o5", title: "Logistics support", kind: "Corporate", meta: "Pune · Sample weekday evening", slots: "1 role open" },
];

export const SHOWCASE_FILTERS = ["All", "Concert", "Festival", "Corporate"] as const;

// ---- Scene 6: the people behind the event ----
export const ROLE_GALLERY = [
  { id: "ops", name: "Event operations", sub: "Run-of-show, command & flow", desc: "Operations keep the event moving — schedules, section flow, and the hundred small decisions that happen between doors and load-out.", img: "/img/backstage.jpg", alt: "Staging and rigging behind a festival main stage" },
  { id: "reg", name: "Registration & check-in", sub: "Entry, guest lists, wristbands", desc: "The first ten minutes an attendee experiences. Queue flow, invitation handling and access tiers all live at this desk.", img: "/img/crowd-night.jpg", alt: "Evening festival crowd waiting at the entry side of a stage" },
  { id: "foh", name: "Front-of-house", sub: "Audience guidance & safety", desc: "Front-of-house keeps walkways, viewing sections and help points working so the audience can relax and enjoy.", img: "/img/stage-lights.jpg", alt: "Stage lights over an audience during a night concert" },
  { id: "back", name: "Backstage coordination", sub: "Artists, props & access", desc: "Backstage order makes on-stage magic possible — artist movements, prop paths and controlled access points.", img: "/img/hero-crowd.jpg", alt: "Festival crowd silhouettes against a glowing stage" },
  { id: "log", name: "Logistics", sub: "Crew, kit & vendor movement", desc: "Everything an event needs arrives because logistics quietly choreographs people, gear and vendors behind the scenes.", img: "/img/crew-lights.jpg", alt: "Stage crew adjusting a lighting rig before doors" },
  { id: "prod", name: "Production support", sub: "Sound, light & stage hands", desc: "Production support hands the technical crew what they need, when they need it — cables, cases and an extra pair of hands.", img: "/img/festival-energy.jpg", alt: "A dense festive crowd mid-performance at an Indian festival" },
  { id: "guest", name: "Guest management", sub: "VIPs, partners & hospitality", desc: "Guest handling keeps invited guests, partners and their teams looked after from arrival to the end of the show.", img: "/img/stage-lights.jpg", alt: "Warm lights over a concert stage" },
  { id: "artist", name: "Artist coordination", sub: "Schedules, riders & handlers", desc: "Artists run to a clock no one else sees. Coordinators keep call times, green rooms and handoffs from slipping.", img: "/img/backstage.jpg", alt: "Backstage area between performance days" },
];

// ---- Scene 7: trust & accountability ----
export const TRUST_POINTS = [
  { title: "Clear event information", desc: "What the event is, where, when, and exactly what the role involves — before anyone applies." },
  { title: "Role expectations in writing", desc: "Duties, timings and requirements sit on the role card, so nobody discovers them on the day." },
  { title: "Structured applications", desc: "Applications carry the context an organizer needs, instead of a bare message." },
  { title: "Organizer selection", desc: "The organizer reviews and confirms who takes part — no automatic entry into a team." },
  { title: "Participation records", desc: "After the event, taking part becomes part of a crew member's record on the platform." },
];

// ---- route pages: keep the interactive steppers working ----
export const HOW_STEPS = [
  { n: "01", title: "Create your profile", desc: "Set up as crew or as an organizer, with the details relevant to each side." },
  { n: "02", title: "Complete verification", desc: "Trust-sensitive actions, like applying to roles or hosting events, require a verified profile." },
  { n: "03", title: "Discover or create events", desc: "Crew browse roles that fit them. Organizers list the team their event needs." },
  { n: "04", title: "Connect with the right people", desc: "Applications and requirements are reviewed on both sides before anyone is confirmed." },
  { n: "05", title: "Deliver the event", desc: "Show up, carry out the role, and build a record of the events you have been part of." },
];

export const VERIFY_STATES = [
  { id: "profile", label: "Profile", title: "Start with a profile", desc: "Tell Evolect who you are and which side you are on: crew or organizer." },
  { id: "verification", label: "Verification", title: "Begin verification", desc: "Share the basic details needed to confirm you are a real person. Product concept: no identity documents are collected here." },
  { id: "review", label: "Under Review", title: "Profile under review", desc: "Your details sit in a review queue. Nothing else is needed from you at this stage." },
  { id: "verified", label: "Verified", title: "Verified", desc: "Verification is complete. Trust-sensitive actions like applying to roles or hosting events are now available. This is a demo state, not a real verification." },
];

export const FLOWLINE = [
  { name: "Discover", desc: "Crew find roles that fit location, date and skills." },
  { name: "Apply", desc: "Interested crew send a structured request to take part." },
  { name: "Review", desc: "Organizers review applications against requirements." },
  { name: "Select", desc: "The right people are confirmed for the event team." },
  { name: "Deliver", desc: "Everyone shows up and the event happens." },
];

export const FILTER_GROUPS = [
  { id: "location", label: "Location", options: ["Pune", "Within 10 km", "Any distance"] },
  { id: "date", label: "Date", options: ["This weekend", "This month", "Flexible"] },
  { id: "skills", label: "Skills", options: ["Operations", "Registration", "Guest handling", "Production"] },
  { id: "category", label: "Event type", options: ["Concert", "Comedy show", "College fest", "Corporate"] },
] as const;

// ponytail: neutral placeholders — names never pretend to be real events
export const EXAMPLE_EVENTS = [
  { title: "Example event: open-air concert", meta: "Pune · Example date", need: "Front-of-house roles" },
  { title: "Example event: college cultural fest", meta: "Pune · Example date", need: "Registration desk" },
  { title: "Example event: corporate conference", meta: "Pune · Example date", need: "Guest management" },
];

export const MANAGER_TABS = [
  { title: "Create event", desc: "Describe the event and set out exactly what kind of crew and roles it needs.", rows: [["Event created", "Draft"], ["Roles defined", "Example roles listed"]] },
  { title: "Receive applications", desc: "Crew who fit apply, and applications come in against your role requirements.", rows: [["Crew applications", "Reviewing"], ["New applicants", "Since yesterday"]] },
  { title: "Review profiles", desc: "Compare each applicant's profile and verification status against what the role needs.", rows: [["Profiles matched to roles", "In progress"], ["Verification status", "Checked"]] },
  { title: "Select crew", desc: "Confirm the people you want, and manage the team through to the day itself.", rows: [["Crew selected", "Pending"], ["Event roster", "Building"]] },
];

export const VOL_TABS = ["Home", "Explore", "My Roles", "History", "Profile"];
export const MGR_TABS = ["Home", "Explore", "My Events", "Applications", "Profile"];
