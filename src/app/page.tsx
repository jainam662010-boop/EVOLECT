"use client"

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"

// ==================== REAL DATA ====================
const realStats = [
  { value: "75.7M", label: "Americans volunteered formally in 2023", src: "AmeriCorps" },
  { value: "4.99B", label: "Hours of service contributed", src: "AmeriCorps" },
  { value: "$167.2B", label: "Economic value of volunteer time", src: "AmeriCorps" },
  { value: "87%", label: "Of volunteer orgs grew or held steady", src: "Better Impact 2026" },
]

const problemStats = [
  { value: "28.3%", label: "Of Americans formally volunteer" },
  { value: "5.1pt", label: "Largest increase ever recorded (2022-2023)" },
  { value: "137.5M", label: "Helped neighbors informally" },
  { value: "$36.14", label: "Value per volunteer hour" },
]

const features = [
  { num: "01", title: "Post", desc: "Create detailed event listings with specific role requirements." },
  { num: "02", title: "Connect", desc: "Browse verified events filtered by interest and availability." },
  { num: "03", title: "Manage", desc: "Review applications, build teams, and manage attendance." },
]

const organizerPoints = [
  { title: "Last-Minute Scrambles", desc: "Finding volunteers often happens days before the event, leaving no time to vet candidates." },
  { title: "Chaotic Team Management", desc: "Coordinating large groups through WhatsApp threads creates confusion and duplicated effort." },
  { title: "Unreliable Attendance", desc: "Without a reputation system, organizers cannot tell who will actually show up." },
  { title: "Scattered Communication", desc: "Information gets lost across calls, texts, and group chats." },
]

const volunteerPoints = [
  { title: "Fragmented Opportunities", desc: "Openings scattered across social media, word of mouth, and emails." },
  { title: "No Credibility Tracking", desc: "Past experience has no portable record. Every event starts from zero." },
  { title: "Uncertain Event Quality", desc: "Without reviews, volunteers cannot tell good events from bad ones." },
  { title: "Interest Mismatch", desc: "Finding aligned events requires scrolling through dozens of irrelevant postings." },
]

// testimonials removed — add real user quotes when available

const galleryItems = [
  { title: "City Marathon", vol: 450, cat: "Events", desc: "450 volunteer marshals, medical teams, and route coordinators." },
  { title: "Food Bank Drive", vol: 120, cat: "Impact", desc: "120 volunteers sorting, packing, and distributing meals." },
  { title: "Tech Conference", vol: 80, cat: "Events", desc: "80 volunteers across registration, AV, and logistics." },
  { title: "Park Cleanup", vol: 65, cat: "Community", desc: "65 volunteers across 8 city parks in one weekend." },
  { title: "Music Festival", vol: 300, cat: "Events", desc: "300+ volunteers for food, security, and hospitality." },
  { title: "Youth Mentorship", vol: 35, cat: "Impact", desc: "35 volunteers mentoring 150 students over 6 weeks." },
  { title: "Neighborhood Watch", vol: 42, cat: "Community", desc: "42 residents trained for organized safety patrols." },
  { title: "Blood Donation", vol: 28, cat: "Impact", desc: "28 medical staff organized 4 camps, 200+ units collected." },
  { title: "Tree Planting", vol: 90, cat: "Community", desc: "90 volunteers planted 350 trees in one day." },
]

const timeline = [
  { year: "2024", title: "The Idea", desc: "Frustrated organizers and volunteers came together with a shared frustration." },
  { year: "2025", title: "Building", desc: "Designed from real experience, not assumptions. Every feature solves a real problem." },
  { year: "2026", title: "Launch", desc: "Early access. Shaping the platform from day one." },
  { year: "2027", title: "Scale", desc: "A global network where every event finds the right volunteers." },
]

const values = [
  { icon: "🤝", title: "Trust First", desc: "Every interaction builds reputation. Verified profiles, transparent reviews." },
  { icon: "⚡", title: "Simplicity", desc: "Three steps: Post, Match, Manage. No complexity." },
  { icon: "🌍", title: "Community", desc: "More than an app. A network of people who care about events." },
  { icon: "📈", title: "Growth", desc: "Every event you attend adds up to your portfolio." },
]

const loopSteps = [
  { label: "Discover", desc: "Browse events matching your interests" },
  { label: "Participate", desc: "Apply, get confirmed, show up" },
  { label: "Gain Experience", desc: "Build your portfolio" },
  { label: "Build Credibility", desc: "Earn ratings that follow you" },
]

const organizerBenefits = [
  "Verified volunteer profiles with past event history",
  "One-click team building from pre-screened candidates",
  "Real-time attendance tracking and role assignment",
  "Built-in communication — no scattered WhatsApp",
  "Post-event feedback collection",
]

const volunteerBenefits = [
  "Personalized event recommendations",
  "Transparent event details with organizer verification",
  "Portable reputation that grows with every event",
  "Skill-based matching for roles that fit",
  "Community connections with like-minded volunteers",
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
function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<"organizer" | "volunteer" | "">("")

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div className="relative w-full max-w-md bg-[#111] rounded-2xl border border-white/10 p-8 overflow-hidden" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25 }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {step === 1 && (
              <div>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>Join Evolect</h2>
                <p className="text-white/40 text-sm mb-8">Choose how you want to participate.</p>
                <div className="space-y-3">
                  <button onClick={() => { setRole("organizer"); setStep(2) }} className="w-full p-4 rounded-xl border border-white/10 hover:border-white/20 text-left transition-all">
                    <span className="text-white font-bold block">Event Organizer</span>
                    <span className="text-white/40 text-sm">Post events, find volunteers, manage teams</span>
                  </button>
                  <button onClick={() => { setRole("volunteer"); setStep(2) }} className="w-full p-4 rounded-xl border border-white/10 hover:border-white/20 text-left transition-all">
                    <span className="text-white font-bold block">Volunteer</span>
                    <span className="text-white/40 text-sm">Discover events, build your reputation</span>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <button onClick={() => setStep(1)} className="text-white/30 text-sm mb-4 hover:text-white/60 transition-colors">← Back</button>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>
                  {role === "organizer" ? "Organizer" : "Volunteer"} Signup
                </h2>
                <p className="text-white/40 text-sm mb-6">Quick signup — takes 30 seconds.</p>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(3) }}>
                  <input type="text" placeholder="Full name" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" />
                  <input type="email" placeholder="Email" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" />
                  {role === "volunteer" && (
                    <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm focus:outline-none focus:border-blue-500/50 transition-colors">
                      <option>Skills (optional)</option>
                      <option>Event Management</option>
                      <option>Technical / AV</option>
                      <option>Logistics</option>
                      <option>Marketing</option>
                      <option>First Aid</option>
                    </select>
                  )}
                  <button type="submit" className="w-full py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-colors">Create Account</button>
                </form>
                <p className="text-white/20 text-xs mt-4 text-center">No credit card. Free during early access.</p>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-4">
                <motion.div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}>
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </motion.div>
                <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: "var(--font-display), sans-serif" }}>Welcome!</h2>
                <p className="text-white/40 text-sm mb-6">You are in. We will notify you when we launch.</p>
                <button onClick={onClose} className="px-8 py-3 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-colors">Done</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ==================== MAIN ====================
export default function Home() {
  const [current, setCurrent] = useState(0)
  const [registerOpen, setRegisterOpen] = useState(false)
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
      // Only clear horizontal swipe: deltaX dominant AND large enough
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
    // Only horizontal swipe: dx must be dominant AND large enough
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

  return (
    <div className="relative w-screen h-screen bg-[#0a0a0a] overflow-hidden" style={{ perspective: 1200 }}>
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center"><span className="text-black font-black text-sm">E</span></div>
          <span className="text-white font-black text-lg tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>EVOLECT</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {pageLabels.map((label, i) => (
            <button key={label} onClick={() => goTo(i)} className={`text-sm font-medium transition-all duration-300 ${i === current ? "text-white" : "text-white/30 hover:text-white/60"}`}>{label}</button>
          ))}
        </nav>
        <button onClick={() => setRegisterOpen(true)} className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-white text-black rounded-full hover:bg-white/90 transition-colors">Join</button>
      </header>

      {/* Pages */}
      <AnimatePresence custom={direction} mode="wait">
        <motion.div key={current} custom={direction} variants={pageVariants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 200, damping: 25 }} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {current === 0 && <HomePage onRegister={() => setRegisterOpen(true)} onNavigate={goTo} />}
          {current === 1 && <AboutPage />}
          {current === 2 && <GalleryPage />}
          {current === 3 && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {pageLabels.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6" : "bg-white/20 w-2 hover:bg-white/40"}`} />
        ))}
      </div>
      <div className="fixed bottom-6 right-6 z-50 text-white/20 text-xs hidden md:block">← swipe or arrow keys →</div>

      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} />
    </div>
  )
}

// ==================== HOME ====================
function HomePage({ onRegister, onNavigate }: { onRegister: () => void; onNavigate: (i: number) => void }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 })

  function onMouseMove(e: React.MouseEvent) {
    mouseX.set(e.clientX / window.innerWidth - 0.5)
    mouseY.set(e.clientY / window.innerHeight - 0.5)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 relative overflow-y-auto overflow-x-hidden" onMouseMove={onMouseMove}>
      {/* Premium background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-white/30 block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          Early Access — 2026
        </motion.span>

        {/* 3D Letters with depth */}
        <div className="flex items-center justify-center gap-[3px] md:gap-2 mb-8" style={{ perspective: 800 }}>
          {"EVOLECT".split("").map((letter, i) => (
            <motion.span
              key={i}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white cursor-default relative"
              style={{ fontFamily: "var(--font-display), sans-serif", transformStyle: "preserve-3d", textShadow: "0 0 0 transparent" }}
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

        <motion.p className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-4 font-medium leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          Events need volunteers. Volunteers need opportunities.
        </motion.p>
        <motion.p className="text-sm text-white/30 max-w-xl mx-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          We are building the bridge between event organizers and reliable volunteers.
        </motion.p>

        <motion.div className="flex items-center justify-center gap-4 flex-wrap mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <motion.button onClick={onRegister} className="relative px-8 py-3.5 bg-white text-black font-bold text-sm rounded-full overflow-hidden" whileHover={{ scale: 1.08, boxShadow: "0 0 60px rgba(255,255,255,0.15)" }} whileTap={{ scale: 0.95 }}>
            <span className="relative z-10">Join Early Access</span>
          </motion.button>
          <motion.button onClick={() => onNavigate(1)} className="px-8 py-3.5 border border-white/15 text-white/50 font-medium text-sm rounded-full" whileHover={{ scale: 1.08, borderColor: "rgba(255,255,255,0.4)" }} whileTap={{ scale: 0.95 }}>
            Learn More
            <motion.span className="inline-block ml-2" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </motion.button>
        </motion.div>

        {/* 3D Feature cards with tilt */}
        <div className="grid grid-cols-3 gap-5 max-w-2xl mx-auto" style={{ perspective: 1000 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40, rotateX: -20 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 1.6 + i * 0.15, duration: 0.6 }} style={{ transformStyle: "preserve-3d" }}>
              <Card3D>
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 text-left group relative overflow-hidden backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="text-[10px] font-mono text-white/20 tracking-wider">{f.num}</span>
                  <h3 className="text-white font-bold text-base mt-2 mb-1.5 group-hover:text-white/90 transition-colors">{f.title}</h3>
                  <p className="text-white/25 text-xs leading-relaxed group-hover:text-white/40 transition-colors">{f.desc}</p>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>

        {/* Floating stats preview */}
        <motion.div className="mt-16 flex items-center justify-center gap-8 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          {[
            { val: "75.7M", label: "volunteers" },
            { val: "4.99B", label: "hours" },
            { val: "$167.2B", label: "value" },
          ].map((s, i) => (
            <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 + i * 0.1 }}>
              <div className="text-xl font-black text-white/15" style={{ fontFamily: "var(--font-display), sans-serif" }}>{s.val}</div>
              <div className="text-[10px] text-white/10 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <span className="text-[10px] text-white/15 uppercase tracking-widest">Swipe to explore</span>
        <motion.div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }}>
          <motion.div className="w-1 h-2 bg-white/30 rounded-full" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </div>
  )
}

// ==================== ABOUT (full content) ====================
function AboutPage() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-white/30 block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>About</motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          We are building an <span className="text-blue-400">event community</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mb-12">Not just an app. A network where every interaction builds trust, every event strengthens connections, and every volunteer grows.</p>

        {/* Why this matters - real stats */}
        <h2 className="text-xl font-bold text-white mb-4">Why This Matters</h2>
        <p className="text-white/30 text-sm mb-6">Source: AmeriCorps & Independent Sector, 2023-2025</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {problemStats.map((s, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-2xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-white/40 leading-relaxed">{s.label}</div>
            </div></Card3D>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="text-xl font-bold text-white mb-4">Our Journey</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {timeline.map((t, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10 h-full">
              <span className="text-xs font-mono text-blue-400">{t.year}</span>
              <h3 className="text-white font-bold mt-1 mb-2">{t.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{t.desc}</p>
            </div></Card3D>
          ))}
        </div>

        {/* Values */}
        <h2 className="text-xl font-bold text-white mb-4">Our Values</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {values.map((v, i) => (
            <Card3D key={i}><div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="text-2xl mb-2">{v.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{v.title}</h3>
              <p className="text-white/40 text-xs leading-relaxed">{v.desc}</p>
            </div></Card3D>
          ))}
        </div>

        {/* Loop */}
        <h2 className="text-xl font-bold text-white mb-4">The Loop</h2>
        <div className="flex items-center justify-center gap-3 flex-wrap mb-12">
          {loopSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center w-32">
                <span className="text-white font-semibold text-sm block">{step.label}</span>
                <span className="text-white/30 text-xs">{step.desc}</span>
              </div>
              {i < loopSteps.length - 1 && <span className="text-white/20">→</span>}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <Card3D><div className="p-6 rounded-xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-white font-bold mb-3">For Organizers</h3>
            <ul className="space-y-2 text-sm text-white/40">{organizerBenefits.map((b, i) => <li key={i}>• {b}</li>)}</ul>
          </div></Card3D>
          <Card3D><div className="p-6 rounded-xl bg-white/5 border border-white/10 h-full">
            <h3 className="text-white font-bold mb-3">For Volunteers</h3>
            <ul className="space-y-2 text-sm text-white/40">{volunteerBenefits.map((b, i) => <li key={i}>• {b}</li>)}</ul>
          </div></Card3D>
        </div>

        {/* Team */}
        <h2 className="text-xl font-bold text-white mb-4">The Team</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[{ name: "Eshaan Nahar", role: "Founder", init: "E" }, { name: "Jainam Karnawat", role: "Developer", init: "J" }, { name: "Community", role: "Early Members", init: "C" }].map((m, i) => (
            <Card3D key={i}><div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold mx-auto mb-3">{m.init}</div>
              <h3 className="text-white font-bold">{m.name}</h3>
              <p className="text-white/40 text-sm">{m.role}</p>
            </div></Card3D>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== GALLERY (full content) ====================
function GalleryPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? galleryItems : galleryItems.filter(g => g.cat === filter)

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.span className="text-xs font-semibold tracking-widest uppercase text-white/30 block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Gallery</motion.span>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          Explore <span className="text-blue-400">our impact</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mb-8">Every event tells a story. Every volunteer makes it possible.</p>

        <div className="flex gap-3 mb-8 flex-wrap">
          {["All", "Events", "Impact", "Community"].map((f) => (
            <motion.button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${filter === f ? "bg-white text-black" : "bg-white/5 text-white/40 hover:bg-white/10"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{f}</motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div key={item.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: i * 0.05 }}>
                <Card3D>
                  <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">{item.cat}</span>
                      <span className="text-xs text-white/20">{item.vol} vol</span>
                    </div>
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors mb-1">{item.title}</h3>
                    <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Community stats */}
        <h2 className="text-2xl font-bold text-white mb-6">The opportunity</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { val: "22%", label: "Growth in formal volunteering (2022-2023) — largest ever recorded" },
            { val: "$36.14", label: "Value per volunteer hour in 2025 (Independent Sector)" },
            { val: "54%", label: "Of Americans helped neighbors informally in 2023" },
          ].map((s, i) => (
            <Card3D key={i}>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-2xl font-black text-white mb-1">{s.val}</div>
                <p className="text-white/40 text-sm leading-relaxed">{s.label}</p>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== CONTACT (full content) ====================
function ContactPage() {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <motion.span className="text-xs font-semibold tracking-widest uppercase text-white/30 block mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Contact</motion.span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Let&apos;s <span className="text-blue-400">connect</span>
          </h1>
          <p className="text-white/50 mb-8 leading-relaxed">Whether you are an organizer, a volunteer, or just curious — we would love to hear from you.</p>

          <div className="space-y-4 mb-8">
            {["Twitter", "GitHub", "Discord", "LinkedIn"].map((s) => (
              <motion.a key={s} href="#" className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors" whileHover={{ x: 4 }}>
                <span className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-xs font-bold">{s.charAt(0)}</span>
                {s}
              </motion.a>
            ))}
          </div>

          <Card3D>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-2">Early Access</h3>
              <p className="text-white/40 text-sm mb-4">Join the waitlist and be among the first to experience Evolect.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="you@email.com" className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" />
                <button className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-white/90 transition-colors">Join</button>
              </div>
            </div>
          </Card3D>
        </div>

        <Card3D>
          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>
            <p className="text-white/40 text-sm mb-6">We will get back to you within 24 hours.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors" />
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm focus:outline-none focus:border-blue-500/50 transition-colors">
                <option>Event Organizer</option>
                <option>Volunteer</option>
                <option>Just curious</option>
              </select>
              <textarea rows={4} placeholder="Message" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
              <motion.button type="submit" className="w-full py-3 bg-white text-black font-bold text-sm rounded-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Send Message</motion.button>
            </form>
          </div>
        </Card3D>
      </div>
    </div>
  )
}
