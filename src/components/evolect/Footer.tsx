import Link from "next/link";
import { BUILDER_URL, IG_URL, NAV_LINKS } from "@/lib/evolect-data";

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="logo">EVOLECT</span>
            <p>Connecting volunteers with meaningful events and event managers with the people they need.</p>
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
      </div>
    </footer>
  );
}
