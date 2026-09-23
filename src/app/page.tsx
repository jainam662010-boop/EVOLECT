import Link from "next/link";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/evolect/icons";
import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { PhonePreview } from "@/components/evolect/PhonePreview";
import { PageLinks, Tilt } from "@/components/evolect/interactive";
import { FLOWLINE, IG_URL } from "@/lib/evolect-data";

export default function EvolectHome() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="hero" id="top">
          <Tilt className="wrap hero-grid">
            <Reveal>
              <p className="eyebrow">Volunteering, matched properly</p>
              <h1>Find where your time can make a difference.</h1>
              <p className="lede">
                Evolect connects volunteers with events that need them and gives event managers a simpler way to
                find and coordinate people.
              </p>
              <p className="tag-line" style={{ marginTop: 18 }}>
                Show up for something that actually needs you.
              </p>
              <div className="hero-actions">
                <Link href="/how-it-works" className="btn btn-primary">
                  Explore how it works <ArrowUpRight className="icon-sm" aria-hidden="true" />
                </Link>
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  Follow along on Instagram
                </a>
              </div>
              <div className="hero-sub">
                <span className="dot" aria-hidden="true" />
                <span>Starting in Pune. Building for India.</span>
              </div>
            </Reveal>
            <Reveal>
              <PhonePreview
                group="home"
                screens={[
                  {
                    topbar: "Explore",
                    cards: [
                      { title: "Example event: community volunteering", meta: "Pune · Example date", pill: "Example requirement", icon: "pin" },
                      { title: "Example event: weekend activity", meta: "Sat · Example time", pill: "Teaching", icon: "cal" },
                      { title: "Example event: neighborhood drive", meta: "Outdoors · Beginner friendly", icon: "users" },
                    ],
                  },
                  {
                    topbar: "Applied",
                    cards: [
                      { title: "Example event: community volunteering", meta: "Request sent", pill: "Pending", ghost: true, icon: "check" },
                      { title: "Example event: neighborhood drive", meta: "Request sent", pill: "Pending", ghost: true, icon: "check" },
                    ],
                  },
                  {
                    topbar: "Verified",
                    cards: [
                      { title: "Your profile", meta: "Verification complete", pill: "Verified", icon: "shield" },
                      { title: "Participation history", meta: "Events you have been part of", icon: "users" },
                    ],
                  },
                ]}
              />
            </Reveal>
          </Tilt>
        </section>

        <section id="platform">
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 620, marginBottom: 40 }}>
                <p className="eyebrow">The concept</p>
                <h2>One platform. Two sides.</h2>
                <p className="tag-line" style={{ marginTop: 14 }}>
                  Two problems, one place to solve them.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="two-sides">
                <div className="side">
                  <p className="side-tag">Volunteers</p>
                  <h3>Discover events worth showing up for.</h3>
                  <ul className="side-list">
                    <li><MapPin className="icon icon-sm" aria-hidden="true" /> Filter by location, date and category</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Match opportunities to skills and interests</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Apply and track upcoming events in one place</li>
                  </ul>
                </div>
                <div className="side">
                  <p className="side-tag">Event Managers</p>
                  <h3>Find the right people, faster.</h3>
                  <ul className="side-list">
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Set volunteer requirements per event</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Review requests against skills and availability</li>
                    <li><Check className="icon icon-sm" aria-hidden="true" /> Select volunteers and manage the event end to end</li>
                  </ul>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="flowline" aria-label="How the two sides interact">
                <ol>
                  {FLOWLINE.map((f, i) => (
                    <li key={f.name}>
                      <span>
                        <span className="fl-num">0{i + 1}</span>
                        <div className="fl-name">{f.name}</div>
                        <div className="fl-desc">{f.desc}</div>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="fl-note">Product concept showing the intended interaction, not live activity.</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-light" id="pune">
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 640 }}>
                <p className="eyebrow">Where we are starting</p>
                <h2>Starting in Pune. Building for India.</h2>
                <p className="lede" style={{ marginTop: 20 }}>
                  Evolect is starting locally, with the goal of creating a platform that can connect people with
                  meaningful events across India.
                </p>
                <p className="tag-line" style={{ marginTop: 18 }}>
                  One city first, so it actually works before it goes anywhere else.
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 56 }}>
                <PageLinks
                  links={[
                    { tag: "For volunteers", title: "Find opportunities that fit you", desc: "See how discovery, filtering and applying is meant to work.", href: "/volunteers" },
                    { tag: "For event managers", title: "Build your volunteer team", desc: "Create events, review requests, and select the right people.", href: "/event-managers" },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="final-cta section-light">
          <div className="wrap">
            <Reveal>
              <div className="final-cta-inner">
                <h2>Evolect starts with people who show up.</h2>
                <p className="body">Follow along as Evolect is built in the open, from Pune outward.</p>
                <div className="final-cta-actions">
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <InstagramIcon className="icon" /> Follow @evolect_page
                  </a>
                  <a href="#top" className="btn btn-outline">
                    Back to top
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
