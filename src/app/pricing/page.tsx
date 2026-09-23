import Link from "next/link";
import { InstagramIcon } from "@/components/evolect/icons";
import { Navbar } from "@/components/evolect/Navbar";
import { Footer } from "@/components/evolect/Footer";
import { Reveal } from "@/components/evolect/Reveal";
import { Faq } from "@/components/evolect/interactive";
import { IG_URL } from "@/lib/evolect-data";

const TIERS = [
  { for: "Volunteer", name: "Free", desc: "For individuals discovering and participating in events." },
  { for: "Event Manager", name: "Starter", desc: "For individual event managers running their own events." },
  { for: "Organization", name: "Scale", desc: "For organizations managing multiple events at once." },
];

export default function Pricing() {
  return (
    <>
      <Navbar />
      <main id="main">
        <section className="page-hero">
          <div className="wrap">
            <Reveal>
              <p className="eyebrow">Pricing</p>
              <h1>Built for individuals first.</h1>
              <p className="lede">
                Three tiers are planned around who is using Evolect. The pricing model itself is still being
                worked out.
              </p>
              <p className="tag-line" style={{ marginTop: 16 }}>
                We would rather get the numbers right than rush them out.
              </p>
            </Reveal>
          </div>
        </section>

        <section style={{ paddingTop: 24 }}>
          <div className="wrap">
            <Reveal>
              <div className="pricing-grid">
                {TIERS.map((t) => (
                  <div key={t.name} className="price-card">
                    <p className="price-for">{t.for}</p>
                    <h3>{t.name}</h3>
                    <p className="price-value">Pricing to be announced</p>
                    <p className="price-desc">{t.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <p style={{ marginTop: 28, maxWidth: 640, color: "var(--text-on-black-mute)", fontSize: ".95rem" }}>
                Evolect is designed around a transaction-based model connecting event managers with volunteer
                participation. Details have not been finalized, and nothing here represents current revenue.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section-light">
          <div className="wrap">
            <Reveal>
              <div style={{ maxWidth: 560, marginBottom: 30 }}>
                <p className="eyebrow">Questions</p>
                <h2 style={{ fontSize: "clamp(1.7rem,3.6vw,2.2rem)" }}>A few things people ask.</h2>
              </div>
            </Reveal>
            <Reveal>
              <Faq />
            </Reveal>
          </div>
        </section>

        <section className="final-cta">
          <div className="wrap">
            <Reveal>
              <div className="final-cta-inner" style={{ borderColor: "var(--line-dark)" }}>
                <h2 style={{ color: "var(--text-on-black)" }}>Evolect starts with people who show up.</h2>
                <p className="body" style={{ color: "var(--text-on-black-mute)" }}>
                  Follow along as Evolect is built in the open, from Pune outward.
                </p>
                <div className="final-cta-actions">
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <InstagramIcon className="icon" /> Follow @evolect_page
                  </a>
                  <Link href="/" className="btn btn-outline">
                    Back to home
                  </Link>
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
