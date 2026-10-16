"use client";
import { useEffect, useRef, useState } from "react";
import {
  AudioLines, Briefcase, Check, ChevronDown, Clapperboard, ClipboardCheck,
  SlidersHorizontal, Star, Truck, UserCheck, Users,
} from "lucide-react";
import Image from "next/image";
import {
  img, PROBLEM_BEATS, ROLE_GALLERY, SHOWCASE_APPLICATIONS, SHOWCASE_EVENT,
  SHOWCASE_FILTERS, SHOWCASE_OPPORTUNITIES, SHOWCASE_ROLES, TRUST_POINTS,
  WORKFLOW_STAGES,
} from "@/lib/evolect-data";

/* ---------- staged headline: server-renderable word reveal ---------- */
export function Staged({
  text, accentFrom = Infinity, className = "", start = 120, step = 70,
}: { text: string; accentFrom?: number; className?: string; start?: number; step?: number }) {
  const words = text.split(" ");
  return (
    <span className={`st ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          className={`w${i >= accentFrom ? " hl" : ""}`}
          style={{ "--d": `${start + i * step}ms` } as React.CSSProperties}
          aria-hidden="true"
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/* ---------- scroll hook: which block is in the center band ---------- */
function useCenterBand(count: number) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const els = document.querySelectorAll("[data-band]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setIdx(Number((e.target as HTMLElement).dataset.band));
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);
  return idx;
}

/* ---------- Scene 2: the problem (sticky crossfading visual) ---------- */
export function SceneProblem() {
  const idx = useCenterBand(PROBLEM_BEATS.length);
  const reduced = useRef(false);
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  const beat = PROBLEM_BEATS[idx];
  return (
    <div className="problem-grid">
      <div className="problem-visual" aria-hidden="true">
        {PROBLEM_BEATS.map((b, i) => (
          <Image
            key={b.id}
            src={img(b.img)}
            alt=""
            fill
            sizes="(min-width:960px) 46vw, 100vw"
            quality={76}
            className={`pb${i === idx ? " active" : ""}`}
          />
        ))}
        <div className="pb-veil" />
        <div className="pb-caption" key={beat.id}>
          <span className="pb-cap-num">0{idx + 1}/04</span>
          {beat.title}
        </div>
      </div>
      <div className="problem-steps">
        {PROBLEM_BEATS.map((b, i) => (
          <div key={b.id} data-band={i} className={`pb-block${i === idx ? " active" : ""}`}>
            <span className="pb-num">0{i + 1}</span>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Scene 4: scroll-driven workflow ---------- */
function StageVisual({ stage }: { stage: string }) {
  if (stage === "create") {
    return (
      <div className="stage-visual">
        <div className="sv active">
          <div className="sp-section-label">Event draft</div>
          <div className="mini-row"><div><b style={{ fontSize: ".86rem" }}>Sample event — Pune open-air concert</b>
            <div style={{ fontSize: ".74rem", color: "var(--text-on-black-mute)", marginTop: 2 }}>Pune · Sample date · Sample venue</div></div>
            <span className="mini-tag">Draft</span></div>
          <div className="mini-grid">
            <div className="mini-tile"><b>Operations</b><span className="mini-count">×2</span></div>
            <div className="mini-tile"><b>Registration</b><span className="mini-count">×3</span></div>
            <div className="mini-tile"><b>Front-of-house</b><span className="mini-count">×4</span></div>
            <div className="mini-tile"><b>Backstage</b><span className="mini-count">×2</span></div>
            <div className="mini-tile"><b>Logistics</b><span className="mini-count">×1</span></div>
            <div className="mini-tile"><b>Hospitality</b><span className="mini-count">×2</span></div>
          </div>
        </div>
      </div>
    );
  }
  if (stage === "discover") {
    return (
      <div className="stage-visual">
        <div className="sv active">
          <div className="sp-section-label">Open roles · viewing as crew</div>
          <div className="mini-grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {["Operations lead", "Registration & check-in", "Front-of-house", "Backstage coordination"].map((r) => (
              <div key={r} className="mini-tile" style={{ textAlign: "left" }}><b>{r}</b>Pune · Sample dates</div>
            ))}
          </div>
          <div className="mini-row"><span style={{ fontSize: ".8rem" }}>Crew apply with structured applications</span>
            <span className="mini-tag lime">Apply</span></div>
        </div>
      </div>
    );
  }
  if (stage === "review") {
    return (
      <div className="stage-visual">
        <div className="sv active">
          <div className="sp-section-label">Application queue · 04 sample applications</div>
          {[["Crew applicant 01", "Pending"], ["Crew applicant 02", "Shortlisted"], ["Crew applicant 03", "Pending"], ["Crew applicant 04", "Confirmed"]].map(([n, s]) => (
            <div key={n} className="mini-row"><span>{n}</span><span className={`mini-tag${s === "Confirmed" ? "" : s === "Shortlisted" ? " lime" : " mini-ghost"}`}>{s}</span></div>
          ))}
        </div>
      </div>
    );
  }
  if (stage === "coordinate") {
    return (
      <div className="stage-visual">
        <div className="sv active">
          <div className="sp-section-label">Roster & schedule</div>
          {[["Operations lead", "Crew applicant 04"], ["Registration desk", "Crew applicant 02"], ["Front-of-house", "3 confirmed"]] .map(([role, who]) => (
            <div key={role} className="mini-row"><span>{role}</span><span className="mini-tag lime">{who}</span></div>
          ))}
          <div className="show-schedule" style={{ border: "none", padding: 0, marginTop: 4 }}>
            {["Load-in", "Doors", "Show", "Load-out"].map((c) => <span key={c} className="ss-chip">{c}</span>)}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="stage-visual">
      <div className="sv active">
        <div className="sp-section-label">Show day</div>
        {["Load-in complete", "Doors open", "Show running", "Load-out wrapped"].map((c, i) => (
          <div key={c} className="mini-row"><span><Check className="icon-sm" aria-hidden="true" style={{ color: i === 3 ? "var(--text-on-black-mute)" : "var(--lime)", display: "inline", marginRight: 6 }} />{c}</span>
            <span className={`mini-tag${i === 3 ? " mini-ghost" : " lime"}`}>{i === 3 ? "Upcoming" : "Done"}</span></div>
        ))}
      </div>
    </div>
  );
}

export function SceneWorkflow() {
  const idx = useCenterBand(WORKFLOW_STAGES.length);
  const stage = WORKFLOW_STAGES[idx];
  return (
    <div className="wf-grid">
      <div className="wf-sticky">
        <div
          className="wf-panel"
          aria-live="polite"
        >
          <div key={stage.key} className="wf-panel-inner">
            <p className="eyebrow">Stage {stage.n} of 05 — {stage.title}</p>
            <StageVisual stage={stage.key} />
          </div>
        </div>
        <div className="wf-rail" aria-hidden="true">
          {WORKFLOW_STAGES.map((s, i) => (
            <span key={s.key} className={i <= idx ? "fill" : ""} />
          ))}
        </div>
      </div>
      <div className="wf-steps">
        {WORKFLOW_STAGES.map((s, i) => (
          <div key={s.key} data-band={i} className={`wf-step${i === idx ? " active" : ""}`}>
            <div className="wf-step-block">
              <span className="ws-num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {/* mobile fallback: stage content inline, no pinning */}
              <div className="wf-step-mobile" aria-hidden={i !== idx || undefined} style={{ marginTop: 16 }}>
                <StageVisual stage={s.key} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Scene 5: interactive product showcase ---------- */
const ROLE_DETAIL: Record<string, string> = {
  o1: "Runs the event floor: sections, flow and blockers between doors and load-out.",
  o2: "Guest lists, wristbands and queue flow at the entry desks.",
  o3: "Guides the audience through walkways, viewing sections and help points.",
  o4: "Keeps backstage orderly: artist movement, props and crew access.",
  o5: "Moves kit, vendors and crew around the venue quietly and on time.",
};

export function ProductShowcase() {
  const [view, setView] = useState<"organizers" | "crew">("organizers");
  // organizer demo state
  const [apps, setApps] = useState(SHOWCASE_APPLICATIONS);
  // crew demo state
  const [filter, setFilter] = useState<(typeof SHOWCASE_FILTERS)[number]>("All");
  const [selected, setSelected] = useState<string | null>(null);
  const [applied, setApplied] = useState<string[]>([]);

  const shortlist = (name: string) =>
    setApps((p) => p.map((a) => (a.name === name ? { ...a, status: a.status === "shortlisted" ? "pending" : "shortlisted" } : a)));
  const confirm = (name: string) =>
    setApps((p) => p.map((a) => (a.name === name ? { ...a, status: "confirmed" } : a)));

  const visible = SHOWCASE_OPPORTUNITIES.filter((o) => filter === "All" || o.kind === filter);
  const sel = SHOWCASE_OPPORTUNITIES.find((o) => o.id === selected);

  return (
    <div className="show-shell">
      <div className="show-top">
        <div className="show-seg" role="tablist" aria-label="Product view">
          <button role="tab" aria-selected={view === "organizers"} className={view === "organizers" ? "active" : ""} onClick={() => setView("organizers")}>
            For organizers
          </button>
          <button role="tab" aria-selected={view === "crew"} className={view === "crew" ? "active" : ""} onClick={() => setView("crew")}>
            For event crew
          </button>
        </div>
        <span className="show-note">Interactive concept · sample data only</span>
      </div>

      {view === "organizers" ? (
        <div className="show-body show-pane active">
          <div className="show-cols">
            <div className="roles-panel">
              <div className="sp-section-label">Event overview</div>
              <div className="sp-card selected" style={{ cursor: "default" }}>
                <div className="spc-name">{SHOWCASE_EVENT.title}</div>
                <div className="spc-meta">{SHOWCASE_EVENT.meta}</div>
                <div className="spc-meta">{SHOWCASE_EVENT.audience}</div>
              </div>
              <div className="sp-section-label" style={{ marginTop: 10 }}>Roles required</div>
              {SHOWCASE_ROLES.map((r) => (
                <div key={r.id} className="sp-card" style={{ cursor: "default" }}>
                  <div className="spc-name"><span>{r.name}</span><span className="pill-status confirmed">{r.need}</span></div>
                  <div className="spc-meta">{r.detail}</div>
                </div>
              ))}
            </div>
            <div className="apps-panel">
              <div className="sp-section-label">Applications · sample crew</div>
              {apps.map((a) => (
                <div key={a.name} className="sp-app-row">
                  <div>
                    <div className="spr-name">{a.name}</div>
                    <div className="spr-role">{a.role} · {a.note}</div>
                  </div>
                  <span className={`pill-status${a.status === "shortlisted" ? " shortlisted" : a.status === "confirmed" ? " confirmed" : ""}`}>{a.status}</span>
                  <div className="sp-actions">
                    <button className="btn-mini" onClick={() => shortlist(a.name)}>
                      {a.status === "shortlisted" ? "Unshortlist" : "Shortlist"}
                    </button>
                    <button className="btn-mini gold" disabled={a.status === "confirmed"} onClick={() => confirm(a.name)}>
                      {a.status === "confirmed" ? "Confirmed" : "Confirm"}
                    </button>
                  </div>
                </div>
              ))}
              <p className="show-note" style={{ marginTop: 10 }}>
                Local demo — status changes stay on this screen. No application is real.
              </p>
              <button className="btn-mini" style={{ marginTop: 4 }} onClick={() => setApps(SHOWCASE_APPLICATIONS)}>
                Reset sample queue
              </button>
            </div>
          </div>
          <div className="show-schedule">
            <span className="sp-section-label" style={{ width: "100%", marginBottom: 0 }}>Event schedule concept</span>
            {SHOWCASE_EVENT.schedule.map((s) => <span key={s} className="ss-chip">{s}</span>)}
          </div>
        </div>
      ) : (
        <div className="show-body show-pane active">
          <div className="chip-set" role="group" aria-label="Filter sample opportunities">
            {SHOWCASE_FILTERS.map((f) => (
              <button key={f} aria-pressed={filter === f} className={`chip${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="show-cols">
            <div className="roles-panel">
              <div className="sp-section-label">{visible.length} sample {visible.length === 1 ? "role" : "roles"} · Pune area</div>
              {visible.map((o) => (
                <button key={o.id} className={`sp-card${selected === o.id ? " selected" : ""}`} onClick={() => setSelected(o.id)} aria-expanded={selected === o.id}>
                  <div className="spc-name"><span>{o.title}</span><span className="pill-status">{o.slots}</span></div>
                  <div className="spc-meta">{o.kind} · {o.meta}</div>
                </button>
              ))}
            </div>
            <div>
              <div className="sp-section-label">Role details</div>
              {sel ? (
                <div className="sp-detail" key={sel.id}>
                  <h4>{sel.title}</h4>
                  <p>{ROLE_DETAIL[sel.id]}</p>
                  <p style={{ fontSize: ".8rem" }}>{sel.meta} · {sel.slots}</p>
                  {applied.includes(sel.id) ? (
                    <span className="demo-confirm"><Check className="icon-sm" aria-hidden="true" /> Demo application recorded — nothing was sent anywhere.</span>
                  ) : (
                    <button className="btn-mini gold" onClick={() => setApplied((p) => [...p, sel.id])}>
                      Apply (demo)
                    </button>
                  )}
                </div>
              ) : (
                <p className="show-note">Select a role on the left to see what it involves.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Scene 6: role gallery ---------- */
const ROLE_ICONS: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  ops: SlidersHorizontal, reg: ClipboardCheck, foh: Users, back: Clapperboard,
  log: Truck, prod: AudioLines, guest: UserCheck, artist: Star,
};

export function RoleGallery() {
  const [active, setActive] = useState(ROLE_GALLERY[0].id);
  const role = ROLE_GALLERY.find((r) => r.id === active) ?? ROLE_GALLERY[0];
  return (
    <div className="roles-layout">
      <div className="role-list" role="tablist" aria-label="Event roles">
        {ROLE_GALLERY.map((r) => {
          const Icon = ROLE_ICONS[r.id] ?? Briefcase;
          return (
            <button key={r.id} role="tab" aria-selected={active === r.id} className={`role-btn${active === r.id ? " active" : ""}`} onClick={() => setActive(r.id)}>
              <span className="rl-icon"><Icon className="icon-sm" /></span>
              <span><b>{r.name}</b><span className="rl-sub">{r.sub}</span></span>
            </button>
          );
        })}
      </div>
      <div className="role-detail" aria-live="polite">
        <div className="rd-img" key={role.id}>
          {/* ponytail: key remount retriggers the CSS fade below */}
          <Image src={img(role.img)} alt={role.alt} fill sizes="(min-width:900px) 55vw, 100vw" quality={78} />
        </div>
        <div className="rd-body" key={`b-${role.id}`}>
          <h4>{role.name}</h4>
          <p>{role.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- small bits ---------- */
export function CueArrow() {
  return <ChevronDown className="icon" aria-hidden="true" />;
}

export function TrustGrid() {
  return (
    <div className="trust-points">
      {TRUST_POINTS.map((t) => (
        <div key={t.title} className="trust-point">
          <Check className="icon-sm" aria-hidden="true" />
          <div><b>{t.title}</b><p>{t.desc}</p></div>
        </div>
      ))}
    </div>
  );
}
