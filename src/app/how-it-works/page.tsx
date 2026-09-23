import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { HowSteps, PageLinks, VerificationFlow } from "@/components/evolect/interactive";

export default function HowItWorks() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">The process</p>
              <h1>From profile to participation.</h1>
              <p className="lede">Five steps sit between joining Evolect and actually showing up somewhere.</p>
              <p className="tag-line" style={{ marginTop: 16 }}>
                No step is there to slow you down. Each one exists to earn trust.
              </p>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 24 }}>
          <div className="wrap">
            <Reveal>
              <HowSteps />
            </Reveal>
          </div>
        </section>

        <section className="section-light">
          <div className="wrap">
            <div className="verify-grid">
              <Reveal>
                <div className="verify-copy">
                  <p className="eyebrow">Trust and safety</p>
                  <h2>Trust starts before participation.</h2>
                  <p className="body">
                    Users complete verification before they can access trust-sensitive actions, such as applying
                    to events or hosting one. It is part of how Evolect is designed, not an afterthought.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <VerificationFlow />
              </Reveal>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 560, marginBottom: 16 }}>
                <p className="eyebrow">Next</p>
                <h2 style={{ fontSize: "clamp(1.7rem,3.6vw,2.2rem)" }}>See it from your side.</h2>
              </div>
            </Reveal>
            <Reveal>
              <PageLinks
                links={[
                  { tag: "For volunteers", title: "Find opportunities that fit you", desc: "Filter by location, date, skills and category.", href: "/volunteers" },
                  { tag: "The other side", title: "Build your volunteer team", desc: "Create an event and review who is a fit.", href: "/event-managers" },
                  { tag: "Pricing", title: "What it costs", desc: "Three planned tiers. Pricing to be announced.", href: "/pricing" },
                ]}
              />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
