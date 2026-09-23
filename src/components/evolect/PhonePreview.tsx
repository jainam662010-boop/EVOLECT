"use client";
import { useEffect, useState } from "react";
import { Calendar, Check, MapPin, ShieldCheck, Users } from "lucide-react";

export type PhoneCard = { title: string; meta: string; pill?: string; ghost?: boolean; icon?: "pin" | "cal" | "users" | "check" | "shield" };
export type PhoneScreen = { topbar: string; cards: PhoneCard[] };

function CardIcon({ kind }: { kind: NonNullable<PhoneCard["icon"]> }) {
  const cls = "icon icon-sm";
  if (kind === "pin") return <MapPin className={cls} aria-hidden="true" />;
  if (kind === "cal") return <Calendar className={cls} aria-hidden="true" />;
  if (kind === "users") return <Users className={cls} aria-hidden="true" />;
  if (kind === "shield") return <ShieldCheck className={cls} aria-hidden="true" />;
  return <Check className={cls} aria-hidden="true" />;
}

// ponytail: CSS views + dots, autoplay with reduced-motion opt-out. No tilt lib.
export function PhonePreview({ group, screens, caption = "Interface concept · not a live event" }: { group: string; screens: PhoneScreen[]; caption?: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || screens.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % screens.length), 3600);
    return () => clearInterval(t);
  }, [screens.length]);

  return (
    <div>
      <div className="phone-stage">
        <div className="phone">
          <div className="phone-notch" aria-hidden="true" />
          <div className="phone-screen">
            {screens.map((s, i) => (
              <div key={s.topbar} className={`phone-view${i === idx ? " active" : ""}`} aria-hidden={i !== idx}>
                <div className="phone-topbar">{s.topbar}</div>
                {s.cards.map((c) => (
                  <div key={c.title} className="phone-card">
                    <span className="pc-title">{c.title}</span>
                    <span className="pc-meta">
                      {c.icon && <CardIcon kind={c.icon} />} {c.meta}
                    </span>
                    {c.pill && <span className={`phone-pill${c.ghost ? " ghost" : ""}`}>{c.pill}</span>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {screens.length > 1 && (
        <div className="phone-dots" role="tablist" aria-label={`${group} preview screens`}>
          {screens.map((s, i) => (
            <button
              key={s.topbar}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Show ${s.topbar} screen`}
              className={`phone-dot${i === idx ? " active" : ""}`}
              onClick={() => setIdx(i)}
            />
          ))}
        </div>
      )}
      <p className="phone-caption">{caption}</p>
    </div>
  );
}
