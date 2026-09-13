"use client"

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import DashboardShowcase, { LiveActivityTicker } from "@/components/DashboardShowcase"

// ==================== DESIGN TOKENS (Tailwind @theme handles globals, these are inline helpers) ====================
// Accessible contrast ratios on #090d16 base:
//   --text-muted (#94a3b8) = 7.2:1  ✓ AA
//   --text-body  (#cbd5e1) = 11:1   ✓ AA
//   --text-primary (#f8fafc) = 19.8:1 ✓ AAA

// ==================== REAL DATA ====================

const WEB3FORMS_KEY = "072175fd-126a-4720-abfe-6290208380d2"

const problemStats = [
  { value: "5.8Cr", label: "Indians volunteered via NSSO (2022-23)" },
  { value: "15%", label: "Youth engaged in community service (CSDS-Lokniti)" },
  { value: "₹289", label: "Average value per volunteer hour (GiveIndia)" },
  { value: "1.2L+", label: "NGOs actively seeking volunteers across India" },
]

const features = [
  { num: "01", title: "Post", desc: "Create detailed event listings with specific role requirements." },
  { num: "02", title: "Connect", desc: "Browse verified events filtered by interest and availability." },
  { num: "03", title: "Manage", desc: "Review applications, build teams, and manage attendance." },
]

const galleryItems = [
  { title: "Mumbai Marathon", vol: 1200, cat: "Events", desc: "1200 volunteers managing routes, medical aid, hydration, and crowd control." },
  { title: "Tech Conference", vol: 180, cat: "Events", desc: "180 volunteers across registration, AV setup, and speaker logistics." },
  { title: "Music Festival", vol: 500, cat: "Events", desc: "500+ volunteers for food stalls, security, and artist hospitality." },
  { title: "Ganesh Chaturthi", vol: 800, cat: "Festivals", desc: "800 volunteers managing pandal setup, aarti, and visarjan procession." },
  { title: "Diwali Mela", vol: 350, cat: "Festivals", desc: "350 volunteers organizing stalls, lighting, and crowd management." },
  { title: "Durga Puja Pandal", vol: 450, cat: "Festivals", desc: "450 volunteers for pandal decoration, bhog distribution, and security." },
  { title: "Beach Cleanup", vol: 200, cat: "Community", desc: "200 volunteers cleaned 12 km of coastline across Mumbai and Chennai." },
  { title: "Blood Donation Camp", vol: 60, cat: "Community", desc: "60 medical volunteers organized 8 camps, 500+ units collected." },
  { title: "Tree Plantation Drive", vol: 150, cat: "Community", desc: "150 volunteers planted 800 saplings across Delhi NCR parks." },
  { title: "Kumbh Mela", vol: 2000, cat: "Cultural", desc: "2000 volunteers for crowd management, langar, and medical aid." },
  { title: "Temple Festival", vol: 120, cat: "Cultural", desc: "120 volunteers managing prasad distribution, queue, and cleanliness." },
  { title: "Youth Mentorship", vol: 45, cat: "Education", desc: "45 mentors guiding 200 students across 6 cities over 8 weeks." },
  { title: "College Fest", vol: 300, cat: "Education", desc: "300 volunteers running workshops, competitions, and logistics." },
  { title: "Flood Relief", vol: 600, cat: "Relief", desc: "600 volunteers distributing relief kits, shelter setup, and rescue support." },
  { title: "Cyclone Response", vol: 400, cat: "Relief", desc: "400 volunteers deployed for emergency supplies and evacuation aid." },
]

const timeline = [
  { year: "2024", title: "The Idea", desc: "Frustrated organizers and volunteers came together — enough of scattered WhatsApp groups." },
  { year: "2026", title: "Launch", desc: "Early access. Shaping the platform with real organizers and volunteers from day one." },
  { year: "2027", title: "Scale", desc: "Pan-India network where every event finds the right volunteers, city by city." },
]

const values = [
  { icon: "🤝", title: "Bharosa First", desc: "Every interaction builds reputation. Verified profiles, transparent reviews." },
  { icon: "⚡", title: "Seedha Sa", desc: "Three steps: Post, Match, Manage. No drama." },
  { icon: "🌍", title: "Community", desc: "More than an app. A network of people who actually show up." },
  { icon: "📈", title: "Growth", desc: "Every event you do adds to your portfolio. Credibility follows you." },
]

const loopSteps = [
  { label: "Dhoondo", desc: "Browse events matching your interests" },
  { label: "Join", desc: "Apply, get confirmed, show up" },
  { label: "Seekho", desc: "Build your portfolio and skills" },
  { label: "Bharosa", desc: "Earn ratings that follow you everywhere" },
]

const organizerBenefits = [
  "Verified volunteer profiles with past event history",
  "One-click team building from pre-screened candidates",
  "Real-time attendance tracking and role assignment",
  "Built-in communication — no scattered WhatsApp groups",
  "Post-event feedback collection and ratings",
]

const volunteerBenefits = [
  "Personalized event recommendations based on your skills",
  "Transparent event details with organizer verification",
  "Portable reputation that grows with every event",
  "Skill-based matching for roles that actually fit you",
  "Connect with like-minded volunteers across cities",
]

const pageLabels = ["Home", "About", "Gallery", "Contact"]

// ==================== 3D CARD ====================
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 })

  function handleMouse(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() { x.set(0); y.set(0) }

  return (
    <motion.div ref={ref} className={`relative ${className}`} style={{ rotateX, rotateY, transformPerspective: 800 }} onMouseMove={handleMouse} onMouseLeave={handleLeave}>
      {children}
    </motion.div>
  )
}

// ==================== REGISTRATION MODAL ====================
function RegisterModal({ open, onClose, prefillRole }: { open: boolean; onClose: () => void; prefillRole?: "organizer" | "volunteer" | "" }) {
  return (
    <AnimatePresence>
      {open && (
        <RegisterModalInner key={prefillRole || "default"} onClose={onClose} prefillRole={prefillRole} />
      )}
    </AnimatePresence>
  )
}

function RegisterModalInner({ onClose, prefillRole }: { onClose: () => void; prefillRole?: "organizer" | "volunteer" | "" }) {
  const [step, setStep] = useState(prefillRole ? 2 : 1)
  const [role, setRole] = useState<"organizer" | "volunteer" | "">(prefillRole || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus trap + escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return }
      if (e.key !== "Tab" || !modalRef.current) return
      const focusable = modalRef.current.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])")
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKeyDown)
    firstInputRef.current?.focus()
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  function handleClose() {
    onClose()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const data = new FormData(form)
    data.append("form_type", "Join Request")
    data.append("role", role)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })
      if (res.ok) {
        setStep(3)
      } else {
        setError("Kuch gadbad hui. Try again.")
      }
    } catch {
      setError("Network error. Check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Registration"
        className="relative w-full max-w-md bg-[#111] rounded-2xl border border-white/10 p-8 overflow-hidden"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25 }}
      >
            <button onClick={handleClose} aria-label="Close" className="absolute top-4 right-4 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>Evolect mein shamil ho</h2>
                <p className="text-[var(--color-text-body)] text-sm mb-8">Choose how you want to participate.</p>
                <div className="space-y-3">
                  <button onClick={() => { setRole("organizer"); setStep(2) }} className="w-full p-4 rounded-xl border border-white/10 hover:border-[var(--color-accent-amber)]/50 text-left transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-amber)] focus-visible:ring-offset-2">
                    <span className="text-[var(--color-text-primary)] font-bold block">Event Organizer</span>
                    <span className="text-[var(--color-text-body)] text-sm">Apna event post karo, volunteers dhundho</span>
                  </button>
                  <button onClick={() => { setRole("volunteer"); setStep(2) }} className="w-full p-4 rounded-xl border border-white/10 hover:border-[var(--color-accent-cyan)]/50 text-left transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-[var(--color-accent-cyan)] focus-visible:ring-offset-2">
                    <span className="text-[var(--color-text-primary)] font-bold block">Volunteer</span>
                    <span className="text-[var(--color-text-body)] text-sm">Events dhundho, apna portfolio build karo</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} className="text-[var(--color-text-muted)] text-sm mb-4 hover:text-[var(--color-text-primary)] transition-colors min-h-[44px]">← Back</button>
                <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                  {role === "organizer" ? "Organizer" : "Volunteer"} Signup
                </h2>
                <p className="text-[var(--color-text-body)] text-sm mb-6">Bas 30 second lagenge. No credit card needed.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value={`New ${role} Join Request — Evolect`} />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                  <div>
                    <label htmlFor="reg-name" className="sr-only">Full name</label>
                    <input ref={firstInputRef} id="reg-name" name="name" type="text" placeholder="Full name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="reg-email" className="sr-only">Email</label>
                    <input id="reg-email" name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="reg-phone" className="sr-only">Phone</label>
                    <input id="reg-phone" name="phone" type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  {role === "volunteer" && (
                    <div>
                      <label htmlFor="reg-skills" className="sr-only">Skills</label>
                      <select id="reg-skills" name="skills" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-body)] text-sm focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]">
                        <option>Skills (optional)</option>
                        <option>Event Management</option>
                        <option>Technical / AV</option>
                        <option>Logistics</option>
                        <option>Marketing</option>
                        <option>First Aid</option>
                        <option>Crowd Management</option>
                        <option>Photography / Video</option>
                      </select>
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? "Submitting..." : "Create Account"}
                  </button>
                </form>
                {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
                <p className="text-[var(--color-text-muted)] text-xs mt-4 text-center">No credit card. Free during early access.</p>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-4" aria-live="polite">
                <motion.div className="w-16 h-16 rounded-full bg-[var(--color-accent-success)]/20 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                  <svg className="w-8 h-8 text-[var(--color-accent-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </motion.div>
                <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>Welcome!</h2>
                <p className="text-[var(--color-text-body)] text-sm mb-6">You are in. Hum launch hone pe bata denge. 🎉</p>
                <button onClick={handleClose} className="px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-colors min-h-[44px]">Done</button>
              </div>
            )}
          </motion.div>
        </motion.div>
  )
}

// ==================== MAIN ====================
export default function Home() {
  const [current, setCurrent] = useState(0)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [prefillRole, setPrefillRole] = useState<"organizer" | "volunteer" | "">("")
  const touchStart = useRef({ x: 0, y: 0 })
  const switching = useRef(false)
  const cooldown = 1000

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= pageLabels.length || switching.current) return
    switching.current = true
    setCurrent(index)
    setTimeout(() => { switching.current = false }, cooldown)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(current + 1)
      if (e.key === "ArrowLeft") goTo(current - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [current, goTo])

  useEffect(() => {
    function onWheel(e: WheelEvent) {
      if (switching.current) return
      if (Math.abs(e.deltaX) < 10) return
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY) * 1.5) return
      e.preventDefault()
      if (e.deltaX > 0) goTo(current + 1)
      else goTo(current - 1)
    }
    window.addEventListener("wheel", onWheel, { passive: false })
    return () => window.removeEventListener("wheel", onWheel)
  }, [current, goTo])

  function onTouchStart(e: React.TouchEvent) {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (switching.current) return
    const dx = touchStart.current.x - e.changedTouches[0].clientX
    const dy = touchStart.current.y - e.changedTouches[0].clientY
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 2) {
      goTo(current + (dx > 0 ? 1 : -1))
    }
  }

  const [direction, setDirection] = useState(0)
  const prevCurrent = useRef(0)
  useEffect(() => {
    setDirection(current > prevCurrent.current ? 1 : -1)
    prevCurrent.current = current
  }, [current])

  const pageVariants = {
    enter: (d: number) => ({ x: d > 0 ? "50%" : "-50%", opacity: 0, rotateY: d > 0 ? -12 : 12, scale: 0.92 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-50%" : "50%", opacity: 0, rotateY: d > 0 ? 12 : -12, scale: 0.92 }),
  }

  function openRegister(role?: "organizer" | "volunteer") {
    setPrefillRole(role || "")
    setRegisterOpen(true)
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden" style={{ perspective: 1200 }}>
      <a href="#main-content" className="skip-link">Skip to content</a>

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" role="banner">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center"><span className="text-black font-black text-sm">E</span></div>
          <span className="text-[var(--color-text-primary)] font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>EVOLECT</span>
        </div>
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          {pageLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => goTo(i)}
              aria-current={i === current ? "page" : undefined}
              className={`text-sm font-medium transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${i === current ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <button onClick={() => openRegister()} className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black rounded-full hover:bg-white/90 transition-colors min-h-[44px]">Join</button>
      </header>

      {/* Pages */}
      <main id="main-content" role="main">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div key={current} custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 200, damping: 25 }} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {current === 0 && <HomePage onRegister={openRegister} />}
            {current === 1 && <AboutPage />}
            {current === 2 && <GalleryPage />}
            {current === 3 && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2" role="tablist" aria-label="Page navigation">
        {pageLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={label}
            className="p-1 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <span className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6" : "bg-[var(--color-text-muted)] w-2 hover:bg-[var(--color-text-body)]"}`} />
          </button>
        ))}
      </div>
      <div className="fixed bottom-6 right-6 z-50 text-[var(--color-text-muted)] text-xs hidden md:block" aria-hidden="true">← swipe or arrow keys →</div>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} prefillRole={prefillRole} />
    </div>
  )
}

// ==================== HOME ====================
function HomePage({ onRegister }: { onRegister: (role?: "organizer" | "volunteer") => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })

  function onMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX / window.innerWidth - 0.5)
    mouseY.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <section className="w-full min-h-full flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-0 relative overflow-y-auto overflow-x-hidden" onMouseMove={onMouseMove} aria-label="Home">
      {/* Premium background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-[#08090d] via-[#0c0e14] to-[#0a0b10]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        <motion.div className="absolute w-[800px] h-[800px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, rgba(148,163,184,0.08) 0%, transparent 70%)", top: "-20%", left: "-10%" }} animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(203,213,225,0.06) 0%, transparent 70%)", bottom: "-15%", right: "-5%" }} animate={{ x: [0, -50, 0], y: [0, -30, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[400px] h-[400px] rounded-full opacity-25" style={{ background: "radial-gradient(circle, rgba(148,163,184,0.05) 0%, transparent 70%)", top: "30%", right: "20%" }} animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <motion.div className="relative z-10 text-center max-w-5xl" style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}>
        {/* Floating 3D tag */}
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Early Access — 2026
        </motion.span>

        {/* 3D Letters with depth */}
        <div className="flex items-center justify-center gap-[3px] md:gap-2 mb-8" style={{ perspective: 800 }}>
          {"EVOLECT".split("").map((letter, i) => (
            <motion.span
              key={i}
              className="text-[2.2rem] sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter cursor-default relative"
              style={{ fontFamily: "var(--font-display), sans-serif", transformStyle: "preserve-3d", textShadow: "0 0 0 transparent", color: "var(--color-text-primary)" }}
              initial={{ opacity: 0, y: 80, rotateX: -120, z: -200 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -20, rotateX: 25, rotateY: -10, scale: 1.1, z: 50, transition: { duration: 0.3 } }}
            >
              <span className="relative z-10 gradient-text">{letter}</span>
              <span className="absolute inset-0 gradient-text blur-md opacity-40" aria-hidden="true" style={{ transform: "translateZ(-20px)" }}>{letter}</span>
            </motion.span>
          ))}
        </div>

        <motion.div className="mx-auto mb-6 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ width: 0 }} animate={{ width: "180px" }} transition={{ delay: 1.2, duration: 0.8 }} />

        <motion.p className="text-base sm:text-lg md:text-2xl text-[var(--color-text-body)] max-w-2xl mx-auto mb-3 sm:mb-4 font-medium leading-relaxed px-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          Events need volunteers. Volunteers need the right opportunities.
        </motion.p>
        <motion.p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-xl mx-auto mb-8 sm:mb-12 px-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          We are building the bridge between event organizers and reliable volunteers — pan India.
        </motion.p>

        {/* Dual-persona CTAs */}
        <motion.div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-10 sm:mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <motion.button onClick={() => onRegister("organizer")} className="relative px-6 sm:px-8 py-3 bg-[var(--color-accent-amber)] text-black font-bold text-xs sm:text-sm rounded-full min-h-[44px]" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <span className="relative z-10">Apna Event Post Karo →</span>
          </motion.button>
          <motion.button onClick={() => onRegister("volunteer")} className="px-6 sm:px-8 py-3 border border-[var(--color-accent-cyan)]/40 text-[var(--color-accent-cyan)] font-medium text-xs sm:text-sm rounded-full min-h-[44px]" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Volunteer Bano
          </motion.button>
        </motion.div>

        {/* 3D Feature cards with tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 max-w-2xl mx-auto" style={{ perspective: 1000 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 1.6 + i * 0.15, duration: 0.6 }} style={{ transformStyle: "preserve-3d" }}>
              <Card3D>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 text-left group relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] tracking-wider">{f.num}</span>
                  <h3 className="text-[var(--color-text-primary)] font-bold text-base mt-2 mb-1.5 group-hover:text-[var(--color-text-primary)] transition-colors">{f.title}</h3>
                  <p className="text-[var(--color-text-body)] text-xs leading-relaxed">{f.desc}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Interactive Dashboard Showcase */}
        <DashboardShowcase />

        {/* Live Activity Ticker */}
        <LiveActivityTicker />

        {/* Floating stats preview */}
        <motion.div className="mt-10 sm:mt-16 flex items-center justify-center gap-6 sm:gap-8 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          {[
            { val: "5.8Cr", label: "volunteers in India" },
            { val: "1.2L+", label: "NGOs seeking help" },
            { val: "₹289/hr", label: "value per volunteer" },
          ].map((s, i) => (
            <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 + i * 0.1 }}>
              <div className="text-lg sm:text-xl font-black text-[var(--color-text-muted)]" style={{ fontFamily: "var(--font-display), sans-serif" }}>{s.val}</div>
              <div className="text-[9px] sm:text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} aria-hidden="true">
        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Swipe to explore</span>
        <motion.div className="w-5 h-8 rounded-full border border-[var(--color-text-muted)]/30 flex justify-center pt-1.5" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }}>
          <motion.div className="w-1 h-2 bg-[var(--color-text-muted)] rounded-full" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ==================== ABOUT (full content) ====================
function AboutPage() {
  return (
    <section className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24" aria-label="About">
      <div className="max-w-6xl mx-auto">
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>About</motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          We are building an <span className="text-[var(--color-accent-indigo)]">event community</span>
        </h1>
        <p className="text-lg text-[var(--color-text-body)] max-w-2xl mb-12">Not just an app. A network where every interaction builds trust, every event strengthens connections, and every volunteer grows.</p>

        {/* Why this matters - real stats */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Why This Matters</h2>
        <p className="text-[var(--color-text-muted)] text-sm mb-6">Source: NSSO, CSDS-Lokniti, GiveIndia, Ministry of Youth Affairs</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {problemStats.map((s, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-[var(--color-text-primary)] mb-1">{s.value}</div>
              <div className="text-xs text-[var(--color-text-body)] leading-relaxed">{s.label}</div>
            </div></Card3D>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Our Journey</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {timeline.map((t, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10 h-full">
              <span className="text-xs font-mono text-[var(--color-accent-indigo)]">{t.year}</span>
              <h3 className="text-[var(--color-text-primary)] font-bold mt-1 mb-2">{t.title}</h3>
              <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{t.desc}</p>
            </div></Card3D>
          ))}
        </div>

        {/* Values */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Our Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {values.map((v, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="text-[var(--color-text-primary)] font-bold text-sm mb-1">{v.title}</h3>
              <p className="text-[var(--color-text-body)] text-xs leading-relaxed">{v.desc}</p>
            </div></Card3D>
          ))}
        </div>

        {/* Loop */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">The Loop</h2>
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {loopSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center w-32">
                <span className="text-[var(--color-text-primary)] font-semibold text-sm block">{step.label}</span>
                <span className="text-[var(--color-text-muted)] text-xs">{step.desc}</span>
              </div>
              {i < loopSteps.length - 1 && <span className="text-[var(--color-text-muted)]" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card3D><div className="p-6 rounded-xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-[var(--color-text-primary)] font-bold mb-3">For Organizers</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-body)]">{organizerBenefits.map((b, i) => <li key={i}>• {b}</li>)}</ul>
          </div></Card3D>
          <Card3D><div className="p-6 rounded-xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-[var(--color-text-primary)] font-bold mb-3">For Volunteers</h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-body)]">{volunteerBenefits.map((b, i) => <li key={i}>• {b}</li>)}</ul>
          </div></Card3D>
        </div>

        {/* Team */}
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">The Team</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{ name: "Eshaan Nahar", role: "Founder", init: "E" }, { name: "Jainam Karnawat", role: "Developer", init: "J" }, { name: "Community", role: "Early Members", init: "C" }].map((m, i) => (
            <Card3D key={i}><div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-indigo)]/20 flex items-center justify-center text-[var(--color-accent-indigo)] font-bold mx-auto mb-3">{m.init}</div>
              <h3 className="text-[var(--color-text-primary)] font-bold">{m.name}</h3>
              <p className="text-[var(--color-text-body)] text-sm">{m.role}</p>
            </div></Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== GALLERY (full content) ====================
function GalleryPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? galleryItems : galleryItems.filter(g => g.cat === filter)

  return (
    <section className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24" aria-label="Gallery">
      <div className="max-w-6xl mx-auto">
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Gallery</motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          Explore <span className="text-[var(--color-accent-cyan)]">our impact</span>
        </h1>
        <p className="text-lg text-[var(--color-text-body)] max-w-xl mb-8">Every event tells a story. Every volunteer makes it possible.</p>

        <div className="flex gap-3 mb-8 flex-wrap" role="tablist" aria-label="Gallery filter">
          {["All", "Events", "Festivals", "Community", "Education", "Relief"].map((f) => (
            <motion.button key={f} onClick={() => setFilter(f)} role="tab" aria-selected={filter === f} className={`px-4 py-2 text-xs font-semibold rounded-full transition-all min-h-[44px] ${filter === f ? "bg-white text-black" : "bg-white/5 text-[var(--color-text-body)] hover:bg-white/10"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{f}</motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12" role="tabpanel" aria-label="Gallery items">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div key={item.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                <Card3D>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{item.cat}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">{item.vol} vol</span>
                    </div>
                    <h3 className="text-[var(--color-text-primary)] font-bold text-lg group-hover:text-[var(--color-accent-cyan)] transition-colors mb-1">{item.title}</h3>
                    <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Community stats */}
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">The opportunity</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { val: "5.8Cr", label: "Indians volunteered via NSSO in 2022-23 — and it is growing fast" },
            { val: "₹289", label: "Average value per volunteer hour in India (GiveIndia 2024)" },
            { val: "1.2L+", label: "NGOs actively seeking volunteers across India right now" },
          ].map((s, i) => (
            <Card3D key={i}>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-[var(--color-text-primary)] mb-1">{s.val}</div>
                <p className="text-[var(--color-text-body)] text-sm leading-relaxed">{s.label}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  )
}

// ==================== CONTACT (full content) ====================
function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const data = new FormData(form)
    data.append("form_type", "Contact Message")
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError("Kuch gadbad hui. Try again.")
      }
    } catch {
      setError("Network error. Check your connection.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24" aria-label="Contact">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <motion.span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Contact</motion.span>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Let&apos;s <span className="text-[var(--color-accent-cyan)]">connect</span> karein
          </h1>
          <p className="text-[var(--color-text-body)] mb-8 leading-relaxed">Organizer ho, volunteer ho, ya bas curious — humse baat karo, we love hearing from you.</p>

          <div className="space-y-4 mb-8">
            {[
              { name: "Instagram", href: "#", icon: "I" },
              { name: "WhatsApp", href: "#", icon: "W" },
              { name: "LinkedIn", href: "#", icon: "L" },
              { name: "Email", href: "mailto:hello@evolect.in", icon: "E" },
            ].map((s) => (
              <motion.a key={s.name} href={s.href} className="flex items-center gap-3 text-[var(--color-text-body)] hover:text-[var(--color-text-primary)] transition-colors min-h-[44px]" whileHover={{ x: 4 }}>
                <span className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-bold">{s.icon}</span>
                {s.name}
              </motion.a>
            ))}
          </div>

          <Card3D>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-[var(--color-text-primary)] font-bold mb-2">Early Access</h3>
              <p className="text-[var(--color-text-body)] text-sm mb-4">Waitlist mein naam daal do, launch pe sabse pehle access milega.</p>
              <form className="flex gap-2" onSubmit={async (e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data = new FormData(form)
                data.append("form_type", "Waitlist Join")
                try {
                  await fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
                  setSubmitted(true)
                } catch {}
              }}>
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value="New Waitlist Join — Evolect" />
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                <label htmlFor="waitlist-email" className="sr-only">Email</label>
                <input id="waitlist-email" name="email" type="email" placeholder="you@email.com" required className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                <button type="submit" className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors min-h-[44px]">Join</button>
              </form>
            </div>
          </Card3D>
        </div>

        <Card3D>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            {submitted ? (
              <div className="text-center py-8" aria-live="polite">
                <motion.div className="w-16 h-16 rounded-full bg-[var(--color-accent-success)]/20 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                  <svg className="w-8 h-8 text-[var(--color-accent-success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </motion.div>
                <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>Message chala gaya! 🎉</h2>
                <p className="text-[var(--color-text-body)] text-sm">Hum 24 ghante mein reply karenge. Thanks for reaching out!</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Send us a message</h2>
                <p className="text-[var(--color-text-body)] text-sm mb-6">We will get back to you within 24 hours.</p>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                  <input type="hidden" name="subject" value="New Contact Message — Evolect" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Name</label>
                    <input id="contact-name" name="name" type="text" placeholder="Name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input id="contact-email" name="email" type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone</label>
                    <input id="contact-phone" name="phone" type="tel" placeholder="Phone (optional)" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]" />
                  </div>
                  <div>
                    <label htmlFor="contact-role" className="sr-only">I am a</label>
                    <select id="contact-role" name="role" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-body)] text-sm focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors min-h-[44px]">
                      <option>Event Organizer</option>
                      <option>Volunteer</option>
                      <option>Just curious</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea id="contact-message" name="message" rows={4} placeholder="Message" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-sm placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 transition-colors resize-none min-h-[44px]" />
                  </div>
                  <motion.button type="submit" disabled={loading} className="w-full py-3 bg-white text-black font-bold text-sm rounded-full min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }}>
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
                {error && <p className="text-red-400 text-xs mt-3 text-center">{error}</p>}
              </>
            )}
          </div>
        </Card3D>
      </div>
    </section>
  )
}
