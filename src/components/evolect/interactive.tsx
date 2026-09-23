"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  EXAMPLE_EVENTS,
  FILTER_GROUPS,
  HOW_STEPS,
  MANAGER_TABS,
  VERIFY_STATES,
  VOL_TABS,
} from "@/lib/evolect-data";

// ponytail: touch-only swipe; buttons/dots stay the mouse + a11y path. No lib.
export function useSwipe(onNext: () => void, onPrev: () => void) {
  const x = useRef<number | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      x.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (x.current == null) return;
      const dx = e.changedTouches[0].clientX - x.current;
      x.current = null;
      if (Math.abs(dx) < 40) return;
      if (dx < 0) onNext();
      else onPrev();
    },
  };
}

// ponytail: exit+entry overlap without a lib. Prev pane overlays, unmounts after 380ms.
export function useStepTransition(len: number, initial = 0) {
  const [active, setActive] = useState(initial);
  const [prev, setPrev] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const go = (n: number) => {
    const c = Math.max(0, Math.min(len - 1, n));
    if (c === active) return;
    setDir(c > active ? 1 : -1);
    setPrev(active);
    setActive(c);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPrev(null), 380);
  };
  return { active, prev, dir, go };
}

// ponytail: pointer parallax only (fine pointer, no reduced-motion). No lib.
export function Tilt({ children, className, max = 8 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (raf.current) return;
        const cx = e.clientX;
        const cy = e.clientY;
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--px", `${(((cx - r.left) / r.width - 0.5) * 2 * max).toFixed(1)}px`);
          el.style.setProperty("--py", `${(((cy - r.top) / r.height - 0.5) * 2 * max).toFixed(1)}px`);
        });
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--px", "0px");
        el.style.setProperty("--py", "0px");
      }}
      style={{ transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)" }}
    >
      {children}
    </div>
  );
}

export function PageLinks({ links }: { links: { tag: string; title: string; desc: string; href: string }[] }) {
  return (
    <div className="page-links">
      {links.map((l) => (
        <Link key={l.href} className="page-link-card" href={l.href}>
          <span className="plc-tag">{l.tag}</span>
          <h4>{l.title}</h4>
          <p>{l.desc}</p>
          <span className="plc-arrow">
            <ArrowUpRight className="icon-sm" aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function HowSteps() {
  const { active, prev, dir, go } = useStepTransition(HOW_STEPS.length);
  const swipe = useSwipe(
    () => go(active + 1),
    () => go(active - 1)
  );
  const pane = (s: (typeof HOW_STEPS)[number]) => (
    <>
      <p className="eyebrow">Step {s.n}</p>
      <h3 style={{ fontSize: "1.5rem" }}>{s.title}</h3>
      <p style={{ marginTop: 14, color: "var(--text-on-black-mute)", fontSize: ".98rem", maxWidth: 420 }}>
        {s.desc}
      </p>
    </>
  );
  const tdx = { "--tdx": `${dir * 28}px` } as React.CSSProperties;
  return (
    <div {...swipe}>
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${((active + 1) / HOW_STEPS.length) * 100}%` }} />
      </div>
      <div className="stepper">
        <div className="step-nav" role="tablist" aria-label="How it works steps">
          {HOW_STEPS.map((s, i) => (
            <button
              key={s.n}
              role="tab"
              aria-selected={i === active}
              className={`step-btn${i === active ? " active" : ""}`}
              onClick={() => go(i)}
            >
              <span className="s-num">{s.n}</span>
              <span>
                <span className="s-title">{s.title}</span>
                <span className="s-desc">{s.desc}</span>
              </span>
            </button>
          ))}
        </div>
        <div className="tab-wrap">
          {prev !== null && (
            <div key={`x${prev}`} className="step-visual tab-exit" aria-hidden="true" inert={true} style={tdx}>
              {pane(HOW_STEPS[prev])}
            </div>
          )}
          <div key={active} className="step-visual tab-enter" role="tabpanel" aria-live="polite" style={tdx}>
            {pane(HOW_STEPS[active])}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VerificationFlow() {
  const { active: idx, prev, dir, go } = useStepTransition(VERIFY_STATES.length);
  const swipe = useSwipe(
    () => go(idx + 1),
    () => go(idx - 1)
  );
  const pane = (s: (typeof VERIFY_STATES)[number], i: number) => (
    <>
      <h4>{s.title}</h4>
      <p>{s.desc}</p>
      <div className="vactions">
        <button className="btn btn-outline" disabled={i === 0} onClick={() => go(i - 1)}>
          Back
        </button>
        <button
          className="btn btn-primary"
          disabled={i === VERIFY_STATES.length - 1}
          onClick={() => go(i + 1)}
        >
          {i === VERIFY_STATES.length - 1 ? "Verified" : "Continue"}
        </button>
      </div>
    </>
  );
  const tdx = { "--tdx": `${dir * 28}px` } as React.CSSProperties;
  return (
    <div {...swipe}>
      <p className="eyebrow">Interactive product preview</p>
      <div className="vsteps" role="tablist" aria-label="Verification states">
        {VERIFY_STATES.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === idx}
            className={`vstep${i === idx ? " active" : ""}${i < idx ? " done" : ""}`}
            onClick={() => go(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="tab-wrap">
        {prev !== null && (
          <div key={`x${prev}`} className="vstate tab-exit" aria-hidden="true" inert={true} style={tdx}>
            {pane(VERIFY_STATES[prev], prev)}
          </div>
        )}
        <div key={idx} className="vstate tab-enter" role="tabpanel" aria-live="polite" style={tdx}>
          {pane(VERIFY_STATES[idx], idx)}
        </div>
      </div>
    </div>
  );
}

export function VolunteerFilters() {
  const [sel, setSel] = useState<Record<string, string[]>>({ location: ["Pune"], date: ["This weekend"], skills: ["Teaching"], category: ["Community"] });
  const toggle = (g: string, o: string) =>
    setSel((p) => {
      const cur = p[g] ?? [];
      return { ...p, [g]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] };
    });
  const count = Object.values(sel).flat().length;
  const visible = EXAMPLE_EVENTS.slice(0, Math.max(1, Math.min(3, count === 0 ? 3 : count > 4 ? 3 : count)));

  return (
    <div className="filter-demo">
      {FILTER_GROUPS.map((g) => (
        <div key={g.id} className="filter-group">
          <span className="fg-label" id={`fg-${g.id}`}>
            {g.label}
          </span>
          <div className="chip-row" role="group" aria-labelledby={`fg-${g.id}`}>
            {g.options.map((o) => (
              <button key={o} aria-pressed={(sel[g.id] ?? []).includes(o)} className={`chip${(sel[g.id] ?? []).includes(o) ? " active" : ""}`} onClick={() => toggle(g.id, o)}>
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="app-body" style={{ padding: "22px 0 0" }} aria-live="polite">
        {visible.map((e) => (
          <div key={e.title} className="phone-card">
            <span className="pc-title">{e.title}</span>
            <span className="pc-meta">{e.meta}</span>
            <span className="phone-pill ghost">{e.need}</span>
          </div>
        ))}
      </div>
      <div className="filter-result">
        <span className="fr-count">{count === 0 ? "Showing every example event" : `${count} filter${count > 1 ? "s" : ""} applied to the example set`}</span>
        <span className="fr-note">Example filters, for illustration</span>
      </div>
    </div>
  );
}

export function ManagerTabs() {
  const { active, prev, dir, go } = useStepTransition(MANAGER_TABS.length);
  const swipe = useSwipe(
    () => go(active + 1),
    () => go(active - 1)
  );
  const pane = (t: (typeof MANAGER_TABS)[number], i: number) => (
    <>
      <div>
        <p className="eyebrow">Step {i + 1}</p>
        <h4>{t.title}</h4>
        <p>{t.desc}</p>
      </div>
      <div>
        {t.rows.map(([left, status]) => (
          <div key={left} className="manager-row">
            <div className="m-left">{left}</div>
            <span className="m-status">{status}</span>
          </div>
        ))}
      </div>
    </>
  );
  const tdx = { "--tdx": `${dir * 28}px` } as React.CSSProperties;
  return (
    <div {...swipe}>
      <div className="workflow-tabs" role="tablist" aria-label="Event manager workflow">
        {MANAGER_TABS.map((t, i) => (
          <button key={t.title} role="tab" aria-selected={i === active} className={`wtab${i === active ? " active" : ""}`} onClick={() => go(i)}>
            {t.title}
          </button>
        ))}
      </div>
      <div className="tab-wrap">
        {prev !== null && (
          <div key={`x${prev}`} className="wpanel active tab-exit" aria-hidden="true" inert={true} style={tdx}>
            {pane(MANAGER_TABS[prev], prev)}
          </div>
        )}
        <div key={active} className="wpanel active tab-enter" role="tabpanel" aria-live="polite" style={tdx}>
          {pane(MANAGER_TABS[active], active)}
        </div>
      </div>
    </div>
  );
}

export function ManagerForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("Pune");
  const [date, setDate] = useState("");
  const [need, setNeed] = useState("");
  const [skills, setSkills] = useState("Logistics");
  const [desc, setDesc] = useState("");
  const [preview, setPreview] = useState(false);
  const inputCls = "mgr-field";

  return (
    <div>
      <p className="eyebrow">Interactive product preview</p>
      <form
        className="mgr-form"
        onSubmit={(e) => {
          e.preventDefault();
          setPreview(true);
        }}
      >
        <div className={inputCls}>
          <label htmlFor="mgr-name">Event name</label>
          <input id="mgr-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Example: weekend volunteer drive" autoComplete="off" />
        </div>
        <div className="mgr-2col">
          <div className={inputCls}>
            <label htmlFor="mgr-loc">Location</label>
            <select id="mgr-loc" value={location} onChange={(e) => setLocation(e.target.value)}>
              <option>Pune</option>
              <option>Nearby Pune</option>
            </select>
          </div>
          <div className={inputCls}>
            <label htmlFor="mgr-date">Date</label>
            <input id="mgr-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
        <div className="mgr-2col">
          <div className={inputCls}>
            <label htmlFor="mgr-need">Volunteer requirements</label>
            <input id="mgr-need" value={need} onChange={(e) => setNeed(e.target.value)} placeholder="Example: 10 volunteers" autoComplete="off" />
          </div>
          <div className={inputCls}>
            <label htmlFor="mgr-skills">Skills</label>
            <select id="mgr-skills" value={skills} onChange={(e) => setSkills(e.target.value)}>
              <option>Logistics</option>
              <option>Teaching</option>
              <option>Design</option>
              <option>First aid</option>
            </select>
          </div>
        </div>
        <div className={inputCls}>
          <label htmlFor="mgr-desc">Description</label>
          <textarea id="mgr-desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Example: what volunteers will do on the day" />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button type="submit" className="btn btn-primary">
            Preview Event
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              setName(""); setLocation("Pune"); setDate(""); setNeed(""); setSkills("Logistics"); setDesc(""); setPreview(false);
            }}
          >
            Reset
          </button>
        </div>
      </form>
      {preview && (
        <div className="mgr-preview" aria-live="polite" style={{ marginTop: 18 }}>
          <span className="phone-pill ghost">Local demo preview · nothing was published</span>
          <span className="mp-title">{name || "Example event name"}</span>
          <span className="mp-meta">
            {location}
            {date ? ` · ${date}` : " · Example date"} · {need || "Example requirement"} · {skills}
          </span>
          <span className="mp-meta">{desc || "Example description of the event."}</span>
          <span className="mp-note">Product concept with example content.</span>
        </div>
      )}
    </div>
  );
}

export function AppTabs({ tabs, note }: { tabs: string[]; note: string }) {
  const items = tabs.length ? tabs : VOL_TABS;
  const { active, prev, dir, go } = useStepTransition(items.length, 1);
  const swipe = useSwipe(
    () => go(active + 1),
    () => go(active - 1)
  );
  const screen = (i: number) => (
    <>
      <div className="phone-card">
        <span className="pc-title">{items[i]} · example view</span>
        <span className="pc-meta">{note}</span>
        <span className="phone-pill ghost">Example content</span>
      </div>
      <div className="phone-card">
        <span className="pc-title">Example event</span>
        <span className="pc-meta">Pune · Example date</span>
        <span className="phone-pill ghost">Example requirement</span>
      </div>
    </>
  );
  const tdx = { "--tdx": `${dir * 28}px` } as React.CSSProperties;
  return (
    <div className="app-preview" {...swipe}>
      <p className="eyebrow" style={{ padding: "18px 24px 0" }}>
        Interactive product preview
      </p>
      <div className="app-tabs" role="tablist" aria-label="App destinations">
        {items.map((t, i) => (
          <button key={t} role="tab" aria-selected={i === active} className={`app-tab${i === active ? " active" : ""}`} onClick={() => go(i)}>
            {t}
          </button>
        ))}
      </div>
      <div className="app-body" role="tabpanel" aria-live="polite">
        <div className="tab-wrap">
          {prev !== null && (
            <div key={`x${prev}`} className="app-screen tab-exit" aria-hidden="true" inert={true} style={tdx}>
              {screen(prev)}
            </div>
          )}
          <div key={active} className="app-screen tab-enter" style={tdx}>
            {screen(active)}
          </div>
        </div>
      </div>
    </div>
  );
}
