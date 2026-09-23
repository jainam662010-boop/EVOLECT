"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/evolect/icons";
import { IG_URL, NAV_LINKS } from "@/lib/evolect-data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-nav">
      <div className="wrap nav-row">
        <Link href="/" className="logo">
          EVOLECT
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={pathname === l.href ? "active" : ""}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-right">
          <a className="ig-link" href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Evolect on Instagram">
            <InstagramIcon className="icon" />
          </a>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobileMenu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="icon" aria-hidden="true" /> : <Menu className="icon" aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu${open ? " open" : ""}`} id="mobileMenu">
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
