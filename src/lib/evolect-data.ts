// ponytail: neutral example data only, never real events/orgs/people/stats.
export const IG_URL = "https://instagram.com/evolect_page";
export const BUILDER_URL = "https://instagram.com/thats.jainam";

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/volunteers", label: "For Volunteers" },
  { href: "/event-managers", label: "For Event Managers" },
];

export const HOW_STEPS = [
  { n: "01", title: "Create your profile", desc: "Set up as a volunteer or an event manager, with the details relevant to each." },
  { n: "02", title: "Complete verification", desc: "Trust-sensitive actions, like applying to or hosting events, require a verified profile." },
  { n: "03", title: "Discover or create events", desc: "Volunteers browse events that fit them. Event managers list what they need help with." },
  { n: "04", title: "Connect with the right people", desc: "Requests and requirements are reviewed on both sides before anyone is confirmed." },
  { n: "05", title: "Participate", desc: "Show up, take part, and build a history of the events you have been part of." },
];

export const VERIFY_STATES = [
  { id: "profile", label: "Profile", title: "Start with a profile", desc: "Tell Evolect who you are and which side you are on: volunteer or event manager." },
  { id: "verification", label: "Verification", title: "Begin verification", desc: "Share the basic details needed to confirm you are a real person. Product concept: no identity documents are collected here." },
  { id: "review", label: "Under Review", title: "Profile under review", desc: "Your details sit in a review queue. Nothing else is needed from you at this stage." },
  { id: "verified", label: "Verified", title: "Verified", desc: "Verification is complete. Trust-sensitive actions like applying to or hosting events are now available. This is a demo state, not a real verification." },
];

export const FLOWLINE = [
  { name: "Discover", desc: "Volunteers find events that fit location, date and skills." },
  { name: "Apply", desc: "Interested volunteers send a request to take part." },
  { name: "Review", desc: "Event managers review requests against requirements." },
  { name: "Select", desc: "The right volunteers are confirmed for the event." },
  { name: "Participate", desc: "Everyone shows up and the event happens." },
];

export const FILTER_GROUPS = [
  { id: "location", label: "Location", options: ["Pune", "Within 10 km", "Any distance"] },
  { id: "date", label: "Date", options: ["Today", "This weekend", "This month"] },
  { id: "skills", label: "Skills", options: ["Teaching", "Design", "First aid", "Logistics"] },
  { id: "category", label: "Category", options: ["Community", "Environment", "Education", "Health"] },
] as const;

export const EXAMPLE_EVENTS = [
  { title: "Example event: community volunteering", meta: "Pune · Example date", need: "Example requirement" },
  { title: "Example event: weekend activity", meta: "Pune · Example date", need: "Example requirement" },
  { title: "Example event: neighborhood drive", meta: "Pune · Example date", need: "Example requirement" },
];

export const MANAGER_TABS = [
  { title: "Create event", desc: "Describe the event and set out exactly what kind of volunteers it needs.", rows: [["Event created", "Draft"], ["Requirements set", "Example skills listed"]] },
  { title: "Receive requests", desc: "Volunteers who fit apply, and requests come in against your requirements.", rows: [["Volunteer requests", "Reviewing"], ["New applicants", "Since yesterday"]] },
  { title: "Review profiles", desc: "Compare each applicant's profile and verification status against what the event needs.", rows: [["Profiles matched to requirements", "In progress"], ["Verification status", "Checked"]] },
  { title: "Select volunteers", desc: "Confirm the people you want, and manage the event through to the day itself.", rows: [["Volunteers selected", "Pending"], ["Event roster", "Building"]] },
];

export const VOL_TABS = ["Home", "Explore", "My Events", "History", "Profile"];
export const MGR_TABS = ["Home", "Explore", "My Events", "Requests", "Profile"];
