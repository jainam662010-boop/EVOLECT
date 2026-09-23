"use client";
import { useEffect, useRef, useState } from "react";
import { Calendar, Check, MapPin, ShieldCheck, Users } from "lucide-react";
import { useSwipe } from "@/components/evolect/interactive";

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

// ponytail: CSS views + dots, autoplay with reduced-motion opt-out. Tilt = pointer vars, no lib.
export function PhonePreview({ group, screens, caption = "Interface concept · not a live event" }: { group: string; screens: PhoneScreen[]; caption?: string }) {
  const [idx, setIdx] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  const swipe = useSwipe(
    () => setIdx((i) => (i + 1) % screens.length),
    () => setIdx((i) => (i - 1 + screens.length) % screens.length)
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || screens.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % screens.length), 3600);
    return () => clearInterval(t);
  }, [screens.length, idx]); // ponytail: clock restarts on manual swipe too, same cadence

  return (
    <div>
      <div
        className="phone-stage"
        ref={stage}
        onPointerMove={(e) => {
          const el = stage.current;
          if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          if (raf.current) return;
          const cx = e.clientX;
          const cy = e.clientY;
          raf.current = requestAnimationFrame(() => {
            raf.current = 0;
            const r = el.getBoundingClientRect();
            el.style.setProperty("--tx", `${(((cx - r.left) / r.width - 0.5) * 20).toFixed(1)}deg`);
            el.style.setProperty("--ty", `${(-((cy - r.top) / r.height - 0.5) * 14).toFixed(1)}deg`);
          });
        }}
        onPointerLeave={() => {
          stage.current?.style.setProperty("--tx", "0deg");
          stage.current?.style.setProperty("--ty", "0deg");
        }}
      >
        <div className="phone">
          <div className="phone-notch" aria-hidden="true" />
          <div className="phone-screen" {...swipe}>
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
