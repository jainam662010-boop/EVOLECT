import { Calendar, Check, ShieldCheck, Users } from "lucide-react";
import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { AppTabs, ManagerForm, ManagerTabs, PageLinks, Tilt } from "@/components/evolect/interactive";
import { MGR_TABS } from "@/lib/evolect-data";

export default function EventManagers() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="page-hero">
          <Tilt className="wrap hero-grid">
            <Reveal>
              <p className="eyebrow">For event organizers</p>
              <h1>Build your event team.</h1>
              <p className="lede">
                Define the roles your event needs — operations, registration, front-of-house, backstage,
                logistics — review who applies against those requirements, and choose your crew.
              </p>
              <p className="tag-line" style={{ marginTop: 16 }}>
                Stop chasing crew over chat. Start choosing them.
              </p>
            </Reveal>
          </Tilt>
        </section>

        <section style={{ paddingTop: 24 }}>
          <div className="wrap">
            <Reveal>
              <ManagerTabs />
            </Reveal>
          </div>
        </section>

        <section className="section-light">
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 560, marginBottom: 32 }}>
                <p className="eyebrow">Try the concept</p>
                <h2 style={{ fontSize: "clamp(1.7rem,3.6vw,2.2rem)" }}>Draft an event, preview it locally.</h2>
                <p className="lede" style={{ marginTop: 14 }}>
                  Fill in the fields and generate a preview. Nothing is submitted or published.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <ManagerForm />
            </Reveal>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 600, marginBottom: 32 }}>
                <p className="eyebrow">The app concept</p>
                <h2 style={{ fontSize: "clamp(1.7rem,3.6vw,2.2rem)" }}>Run events from one place.</h2>
              </div>
            </Reveal>
            <Reveal>
              <AppTabs tabs={MGR_TABS} note="Example role management for organizers in Pune." />
            </Reveal>
            <Reveal>
              <div className="two-sides" style={{ marginTop: 48 }}>
                <div className="side">
                  <p className="side-tag">Set up</p>
                  <h3>Say exactly what you need.</h3>
                  <ul className="side-list">
                    <li><Calendar className="icon icon-sm" aria-hidden="true" /> Date, time and location</li>
                    <li><Users className="icon icon-sm" aria-hidden="true" /> Skills and headcount required</li>
                    <li>
                      <ShieldCheck className="icon-sm" aria-hidden="true" /> Crew profile requirements
                    </li>
                  </ul>
                </div>
                <div className="side">
                  <p className="side-tag">Manage</p>
                  <h3>Run the event from one place.</h3>
                  <ul className="side-list">
                    <li><Users className="icon icon-sm" aria-hidden="true" /> Review and respond to requests</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Track who is confirmed</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Keep a record after the event</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 40 }}>
                <PageLinks
                  links={[
                    { tag: "Process", title: "From profile to participation", desc: "See the five steps end to end.", href: "/how-it-works" },
                    { tag: "The other side", title: "How crew find events", desc: "Discovery, filtering and applying.", href: "/volunteers" },
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
