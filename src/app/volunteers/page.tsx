import { Calendar, Check, MapPin } from "lucide-react";
import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { PhonePreview } from "@/components/evolect/PhonePreview";
import { AppTabs, PageLinks, Tilt, VolunteerFilters } from "@/components/evolect/interactive";
import { VOL_TABS } from "@/lib/evolect-data";

export default function Volunteers() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="page-hero">
          <Tilt className="wrap hero-grid">
            <Reveal>
              <p className="eyebrow">For volunteers</p>
              <h1>Find opportunities that fit you.</h1>
              <p className="lede">
                Set your location, availability and interests, and see events built around them instead of
                scrolling through everything.
              </p>
              <p className="tag-line" style={{ marginTop: 16 }}>
                Your time is limited. Spend it on something that fits.
              </p>
            </Reveal>
            <Reveal>
              <PhonePreview
                group="vol"
                screens={[
                  {
                    topbar: "Explore",
                    cards: [
                      { title: "Example event: community volunteering", meta: "Pune · Example date", pill: "Example requirement", icon: "pin" },
                      { title: "Example event: weekend activity", meta: "Sat · Example time", pill: "Teaching", icon: "cal" },
                    ],
                  },
                  {
                    topbar: "Event details",
                    cards: [
                      { title: "Example event: weekend activity", meta: "Pune · Example location", icon: "pin" },
                      { title: "Skills needed", meta: "Example skills", icon: "users" },
                      { title: "Apply", meta: "Verification required", pill: "Verified only", ghost: true, icon: "check" },
                    ],
                  },
                ]}
              />
            </Reveal>
          </Tilt>
        </section>

        <section>
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 520, marginBottom: 32 }}>
                <p className="eyebrow">Try the concept</p>
                <h2 style={{ fontSize: "clamp(1.7rem,3.6vw,2.2rem)" }}>Set filters, see the idea in action.</h2>
                <p className="lede" style={{ marginTop: 14 }}>
                  This is an interface concept built with example data, not live events.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <VolunteerFilters />
            </Reveal>
          </div>
        </section>

        <section className="section-light">
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 600, marginBottom: 32 }}>
                <p className="eyebrow">The app concept</p>
                <h2>Five destinations, nothing more.</h2>
                <p className="lede" style={{ marginTop: 14 }}>
                  The volunteer side stays focused: Home, Explore, My Events, History and Profile.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <AppTabs tabs={VOL_TABS} note="Example content for volunteers in Pune." />
            </Reveal>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Reveal>
              <div className="two-sides">
                <div className="side">
                  <p className="side-tag">Discover</p>
                  <h3>Filter by what matters to you.</h3>
                  <ul className="side-list">
                    <li><MapPin className="icon icon-sm" aria-hidden="true" /> Location and distance</li>
                    <li><Calendar className="icon icon-sm" aria-hidden="true" /> Date and time commitment</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Skills and interests</li>
                  </ul>
                </div>
                <div className="side">
                  <p className="side-tag">Track</p>
                  <h3>Keep tabs on where you are headed.</h3>
                  <ul className="side-list">
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Applications and their status</li>
                    <li><Calendar className="icon icon-sm" aria-hidden="true" /> Accepted and upcoming events</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Your participation history</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 40 }}>
                <PageLinks
                  links={[
                    { tag: "Process", title: "From profile to participation", desc: "See the five steps end to end.", href: "/how-it-works" },
                    { tag: "The other side", title: "How event managers find you", desc: "Requirements, requests and selection.", href: "/event-managers" },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
