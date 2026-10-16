import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Clapperboard, Users } from "lucide-react";
import { InstagramIcon } from "@/components/evolect/icons";
import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { PageLinks, VerificationFlow } from "@/components/evolect/interactive";
import {
  CueArrow, ProductShowcase, RoleGallery, SceneProblem, SceneWorkflow, Staged, TrustGrid,
} from "@/components/evolect/scenes";
import { IG_URL, SIDE_CREW, SIDE_ORGANIZER, img } from "@/lib/evolect-data";

export default function EvolectHome() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* ---- Scene 1: cinematic opening ---- */}
        <section className="scene-hero" id="top">
          <div className="scene-hero-media">
            <Image
              src={img("/img/hero-crowd.jpg")}
              alt="A festival crowd face to face with a glowing stage at night"
              fill
              priority
              sizes="100vw"
              quality={82}
            />
          </div>
          <div className="wrap hero-inner">
            <p className="hero-wordmark" aria-hidden="true">EVOLECT</p>
            <h1 className="hero-kicker">
              <Staged text="The people behind every great event." />
            </h1>
            <p className="hero-sub">
              Evolect connects event organizers with the people they need to bring live experiences to
              life — comedy shows, concerts, festivals, college fests and conferences.
            </p>
            <p className="hero-local">
              <span className="dot" aria-hidden="true" />
              <span>Starting in Pune. Building for India.</span>
            </p>
            <a className="hero-cue" href="#challenge">
              <span className="cue-ring"><CueArrow /></span>
              <span>See the problem</span>
            </a>
          </div>
        </section>

        {/* ---- Scene 2: the event problem ---- */}
        <section className="scene" id="challenge">
          <div className="wrap">
            <Reveal>
              <p className="chip-label">The challenge</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                A great event takes more than a great idea.
              </h2>
              <p className="scene-lede">
                From the audience side, a live event looks effortless. Behind the stage, it only works when a
                whole team of people — most of them found in a hurry — shows up and delivers.
              </p>
            </Reveal>
            <Reveal>
              <div className="challenge-cols">
                <div className="challenge-col">
                  <p className="cc-tag gold">For event organizers</p>
                  {[
                    ["Last-minute scrambles", "Crew are chased on WhatsApp the night before doors, and confirmations arrive unreliable."],
                    ["Team management overhead", "Rosters, timings and phone calls eat the time that should go into the event itself."],
                    ["Unreliable attendance", "There is no dependable way to know who will actually be there when doors open."],
                    ["Scattered communication", "Updates, schedules and changes live across chats, calls and spreadsheets."],
                    ["Role mismatch", "Skills, experience and what the role actually needs rarely get checked against each other."],
                  ].map(([t, d]) => (
                    <div key={t} className="cc-item">
                      <span className="cc-dot" aria-hidden="true" />
                      <div><strong>{t}</strong><p>{d}</p></div>
                    </div>
                  ))}
                </div>
                <div className="challenge-col foh">
                  <p className="cc-tag lime">For event crew</p>
                  {[
                    ["Fragmented opportunities", "Roles circulate through personal contacts and scattered social posts with no single list."],
                    ["No credibility that travels", "There is nothing portable that shows which events a person has worked and how it went."],
                    ["Unclear expectations", "Timings, duties and access are often discovered on the day, not before."],
                    ["Signal lost in the noise", "Scrolling endless feeds to find a role that actually fits skills and availability."],
                  ].map(([t, d]) => (
                    <div key={t} className="cc-item">
                      <span className="cc-dot" aria-hidden="true" />
                      <div><strong>{t}</strong><p>{d}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="film-strip">
                <figure>
                  <Image src={img("/img/backstage.jpg") } alt="Backstage tents, rigging and staging built before a festival main stage" fill sizes="(min-width:860px) 33vw, 100vw" quality={78} />
                  <figcaption>Backstage build, hours before doors</figcaption>
                </figure>
                <figure>
                  <Image src={img("/img/crew-lights.jpg") } alt="A stage crew member adjusting a lighting rig before a concert" fill sizes="(min-width:860px) 33vw, 100vw" quality={78} />
                  <figcaption>Crew finishing the light plot</figcaption>
                </figure>
                <figure>
                  <Image src={img("/img/stage-lights.jpg") } alt="Audience and performers under a full rig of night-concert stage lights" fill sizes="(min-width:860px) 33vw, 100vw" quality={78} />
                  <figcaption>Delivered — the show on stage</figcaption>
                </figure>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 56 }}>
                <p className="chip-label lime" style={{ display: "block", marginBottom: 6 }}>Why it breaks down</p>
                <h3 className="scene-title" style={{ fontSize: "clamp(1.5rem,3.4vw,2.1rem)", maxWidth: 560 }}>
                  Four places the connection usually fails.
                </h3>
                <SceneProblem />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 3: the two sides ---- */}
        <section className="scene" id="sides">
          <div className="wrap">
            <Reveal>
              <p className="chip-label lime">The two sides</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                One platform. The people who make events happen.
              </h2>
              <p className="scene-lede">
                Organizers and event crew need each other, but usually find each other by luck. Evolect puts
                both sides in one structured place.
              </p>
            </Reveal>
            <Reveal>
              <div className="sides-stage">
                <div className="sides-track">
                  <div className="sides-col">
                    <p className="sc-tag">Event organizers</p>
                    <h3>Build the team for the event.</h3>
                    <ul>
                      {SIDE_ORGANIZER.map((li) => (
                        <li key={li}><Check className="icon-sm" aria-hidden="true" />{li}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="sides-hub" aria-hidden="true">
                    <span className="hub-core">The<br />event<br />team</span>
                  </div>
                  <div className="sides-col">
                    <p className="sc-tag lime">Event crew</p>
                    <h3>Find the roles that fit.</h3>
                    <ul>
                      {SIDE_CREW.map((li) => (
                        <li key={li}><Check className="icon-sm" aria-hidden="true" />{li}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="show-note" style={{ textAlign: "center", marginTop: 18 }}>
                  Product concept — organized roles on one side, structured applications on the other.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 4: scroll-driven workflow ---- */}
        <section className="scene" id="workflow">
          <div className="wrap">
            <Reveal>
              <p className="chip-label">The workflow</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                From an open role to an event-ready team.
              </h2>
              <p className="scene-lede" style={{ maxWidth: 560 }}>
                Keep scrolling — the five stages below are what organizing a team actually looks like inside
                Evolect.
              </p>
            </Reveal>
            <SceneWorkflow />
          </div>
        </section>

        {/* ---- Scene 5: interactive product showcase ---- */}
        <section className="scene" id="concept">
          <div className="wrap">
            <Reveal>
              <p className="chip-label">Interactive product concept</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                Built around how events actually work.
              </h2>
              <p className="scene-lede">
                Switch between the two sides and try the sample interface. Everything below is a working
                frontend demo with sample data — nothing is sent anywhere.
              </p>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 40 }}>
                <ProductShowcase />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 6: the people behind the event ---- */}
        <section className="scene roles-scene" id="roles">
          <div className="roles-bg" aria-hidden="true">
            <Image src={img("/img/festival-energy.jpg") } alt="" fill sizes="100vw" quality={78} />
          </div>
          <div className="wrap">
            <Reveal>
              <p className="chip-label">The people behind the event</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                Every role matters. Every detail counts.
              </h2>
              <p className="scene-lede">
                Live events are carried by specific responsibilities. Select a role to see what it is
                actually about.
              </p>
            </Reveal>
            <RoleGallery />
            <Reveal>
              <p className="roles-note">
                Role categories Evolect is designed around — their availability in the product grows with it.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 7: trust and accountability ---- */}
        <section className="scene" id="trust">
          <div className="wrap">
            <Reveal>
              <p className="chip-label">Trust &amp; accountability</p>
              <h2 className="scene-title" style={{ marginTop: 16 }}>
                Good teams need clear expectations.
              </h2>
              <p className="scene-lede">
                Evolect is designed so that both sides know exactly what they are walking into — before
                anyone confirms anything.
              </p>
            </Reveal>
            <Reveal>
              <TrustGrid />
            </Reveal>
            <Reveal>
              <div className="verify-grid" style={{ marginTop: 64 }}>
                <div className="verify-copy">
                  <p className="eyebrow">How a person moves through it</p>
                  <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)" }}>
                    Structured from the first interaction.
                  </h2>
                  <p className="body">
                    Verification is part of the workflow design — trust-sensitive actions, like applying for
                    roles or hosting an event, are meant to sit behind a completed profile. Walk the states
                    below; it is a demo, not a real verification.
                  </p>
                </div>
                <VerificationFlow />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 8: starting in Pune ---- */}
        <section className="scene section-light" id="pune">
          <div className="wrap">
            <Reveal>
              <div className="pune-plate">
                <p className="chip-label">Where we are starting</p>
                <h2 style={{ marginTop: 16 }}>Starting in Pune. Building for India.</h2>
                <p className="body" style={{ marginTop: 18, color: "var(--text-on-white-mute)", fontSize: "1.03rem", maxWidth: 560 }}>
                  Pune is where the first events, the first organizers and the first crew meet Evolect. One
                  city, done properly — so the structure holds before it scales.
                </p>
                <div className="arc-field" aria-hidden="true">
                  <span className="arc a1" />
                  <span className="arc a2" />
                  <span className="arc a3" />
                </div>
                <div className="pune-tag-shelf">
                  <span className="pt">Concerts</span>
                  <span className="pt">Comedy shows</span>
                  <span className="pt">College fests</span>
                  <span className="pt">Corporate events</span>
                  <span className="pt">Exhibitions &amp; conferences</span>
                  <span className="pt">Brand activations</span>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ marginTop: 52 }}>
                <PageLinks
                  links={[
                    { tag: "For crew", title: "Find roles that fit you", desc: "See how discovery, applications and tracking are meant to work.", href: "/volunteers" },
                    { tag: "For organizers", title: "Build your event team", desc: "Create events, define roles, review applications and select crew.", href: "/event-managers" },
                  ]}
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---- Scene 9: cinematic close ---- */}
        <section className="scene-close" id="close">
          <div className="close-bg" aria-hidden="true">
            <Image src={img("/img/crowd-night.jpg") } alt="" fill sizes="100vw" quality={78} />
          </div>
          <div className="wrap">
            <Reveal>
              <p className="chip-label" style={{ justifyContent: "center", display: "inline-flex" }}>Early-stage, in the open</p>
              <h2 className="scene-title" style={{ marginTop: 18, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
                The next great event needs the right team.
              </h2>
              <p className="scene-lede" style={{ marginLeft: "auto", marginRight: "auto" }}>
                Evolect is building a simpler way for event organizers and event crew to connect — follow
                along as it gets built from Pune.
              </p>
            </Reveal>
            <Reveal>
              <div className="close-cards">
                <Link href="/event-managers" className="close-card">
                  <span className="cct"><Clapperboard className="icon" aria-hidden="true" /></span>
                  <h3>Organize an event team</h3>
                  <p>See how roles, applications and the run-of-show come together for organizers.</p>
                  <span className="ccl">Explore the organizer side <ArrowUpRight className="icon-sm" aria-hidden="true" /></span>
                </Link>
                <Link href="/volunteers" className="close-card">
                  <span className="cct"><Users className="icon" aria-hidden="true" /></span>
                  <h3>Work the event</h3>
                  <p>See how crew discover opportunities, apply for roles and track event commitments.</p>
                  <span className="ccl">Explore the crew side <ArrowUpRight className="icon-sm" aria-hidden="true" /></span>
                </Link>
              </div>
              <div className="close-ig">
                <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <InstagramIcon className="icon" aria-hidden="true" /> Follow @evolect.in
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
