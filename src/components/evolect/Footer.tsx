import Link from "next/link";
import { BUILDER_URL, IG_URL, NAV_LINKS } from "@/lib/evolect-data";

// ponytail: photo credits for the CC-licensed event photography in public/img.
const PHOTO_CREDITS = [
  { src: "public/img/hero-crowd.jpg", link: "Sunburn_Festival,_Goa,_Crowd.jpg", label: "Sunburn Festival crowd", credit: "Vyacheslav Argenberg", license: "CC BY 4.0" },
  { src: "public/img/stage-lights.jpg", link: "Musicians_performing_on_stage_at_a_night_concert_featuring_vibrant_lights_and_energetic_atmosphere.jpg", label: "Night concert stage", credit: "Shixart1985", license: "CC BY 2.0" },
  { src: "public/img/backstage.jpg", link: "Main_Stage_backstage,_HF2016.jpg", label: "Backstage at a festival main stage", credit: "Xnatedawgx", license: "CC BY-SA 4.0" },
  { src: "public/img/crew-lights.jpg", link: "A_member_of_the_stage_crew_makes_adjustments_on_lights_for_the_US_Navy_Band's_Silver_Anniversary_Lollipop_Concert_-_DPLA_-_bba9273ee2b50d2a53595243a16342a9.jpeg", label: "Stage crew at a lighting rig", credit: "U.S. Navy / DPLA", license: "Public domain" },
  { src: "public/img/crowd-night.jpg", link: "Beach-Please-2022-crowd-stage-lights-night-performance.jpg", label: "Festival crowd at night", credit: "PinkBeachPlanet", license: "CC BY-SA 4.0" },
  { src: "public/img/festival-energy.jpg", link: "World's_Largest_Garba_Festival.jpg", label: "Indian festival celebration", credit: "Saurabh sirohiya", license: "CC BY-SA 4.0" },
];
const COMMONS = "https://commons.wikimedia.org/wiki/File:";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">EVOLECT</span>
            <p>Connecting event organizers and event crew so that live events can happen properly. Starting in Pune.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Platform</h5>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h5>Elsewhere</h5>
              <ul>
                <li>
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Evolect. Building from Pune.</span>
          <a href={BUILDER_URL} target="_blank" rel="noopener noreferrer">
            Built by @thats.jainam
          </a>
        </div>
        <div className="photo-credit">
          Event photography:{" "}
          {PHOTO_CREDITS.map((c, i) => (
            <span key={c.link}>
              {c.credit} ({c.label}, {c.license}) via{" "}
              <a href={COMMONS + c.link} target="_blank" rel="noopener noreferrer">
                Wikimedia Commons
              </a>
              {i < PHOTO_CREDITS.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
