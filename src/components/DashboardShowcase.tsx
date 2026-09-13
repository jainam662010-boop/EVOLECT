"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

// Mock data for realistic dashboard previews
const mockVolunteers = [
  { name: "Priya Sharma", role: "Medical Team", status: "checked-in", avatar: "PS" },
  { name: "Arjun Mehta", role: "Route Marshal", status: "checked-in", avatar: "AM" },
  { name: "Kavita Reddy", role: "Registration", status: "en-route", avatar: "KR" },
  { name: "Rohan Gupta", role: "AV Support", status: "checked-in", avatar: "RG" },
  { name: "Neha Desai", role: "Logistics", status: "pending", avatar: "ND" },
  { name: "Vikram Singh", role: "First Aid", status: "checked-in", avatar: "VS" },
]

const mockBadges = [
  { name: "Marathon Pro", events: 12, color: "#f59e0b" },
  { name: "First Aid Cert", events: 1, color: "#ef4444" },
  { name: "Team Lead", events: 8, color: "#6366f1" },
  { name: "100+ Hours", events: 0, color: "#10b981" },
  { name: "Community Star", events: 5, color: "#06b6d4" },
  { name: "Logistics Guru", events: 15, color: "#8b5cf6" },
]

const mockShifts = [
  { event: "Mumbai Marathon", date: "Oct 15, 2026", time: "6:00 AM - 2:00 PM", role: "Route Marshal - Zone 3" },
  { event: "Diwali Mela", date: "Oct 22, 2026", time: "9:00 AM - 1:00 PM", role: "Stall Coordinator" },
  { event: "Youth Tech Workshop", date: "Nov 5, 2026", time: "2:00 PM - 5:00 PM", role: "AV Support" },
]

const mockMessages = [
  { sender: "Event Lead", role: "organizer", msg: "All teams: medical station is now at Gate B. Update your routes.", time: "2m ago" },
  { sender: "Priya Sharma", role: "volunteer", msg: "Zone 3 clear. All runners through checkpoint 4.", time: "5m ago" },
  { sender: "Arjun Mehta", role: "volunteer", msg: "Need backup at Zone 5 intersection. Heavy foot traffic.", time: "8m ago" },
  { sender: "Event Lead", role: "organizer", msg: "Backup team dispatched to Zone 5. ETA 3 minutes.", time: "8m ago" },
  { sender: "Rohan Gupta", role: "volunteer", msg: "PA system reset complete. Ready for next announcement.", time: "12m ago" },
]

const mockAnnouncements = [
  { title: "Shift Reminder", msg: "Tomorrow's Diwali Mela starts at 9 AM. Please arrive 15 min early for briefing.", priority: "normal" },
  { title: "Role Update", msg: "You've been assigned as Zone Lead for the Mumbai Marathon. Check your new route map.", priority: "high" },
  { title: "New Opportunity", msg: "Youth Tech Workshop needs AV volunteers — matches your skills!", priority: "normal" },
]

type Tab = "organizer" | "volunteer" | "chat"

const statusColors: Record<string, string> = {
  "checked-in": "bg-[var(--color-accent-success)]",
  "en-route": "bg-[var(--color-accent-amber)]",
  "pending": "bg-[var(--color-text-muted)]",
}

const statusLabels: Record<string, string> = {
  "checked-in": "Checked In",
  "en-route": "En Route",
  "pending": "Pending",
}

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>("organizer")

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "organizer", label: "Organizer Control Center", icon: "⚡" },
    { key: "volunteer", label: "Volunteer Passport", icon: "🪪" },
    { key: "chat", label: "Communication Hub", icon: "💬" },
  ]

  const checkedIn = mockVolunteers.filter(v => v.status === "checked-in").length
  const fulfillmentPct = Math.round((checkedIn / mockVolunteers.length) * 100)

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6" aria-label="Product Preview">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-3">
            See it in action
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-3" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            Your Command Center
          </h2>
          <p className="text-[var(--color-text-body)] max-w-xl mx-auto">
            Manage events or build your portfolio — everything in one place.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap" role="tablist" aria-label="Dashboard preview tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={activeTab === t.key}
              aria-controls={`panel-${t.key}`}
              onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full transition-all min-h-[44px] ${
                activeTab === t.key
                  ? "bg-white text-black"
                  : "bg-white/5 text-[var(--color-text-body)] hover:bg-white/10"
              }`}
            >
              <span aria-hidden="true">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden">{t.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Dashboard panels */}
        <AnimatePresence mode="wait">
          {activeTab === "organizer" && (
            <motion.div
              key="organizer"
              id="panel-organizer"
              role="tabpanel"
              aria-label="Organizer Control Center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-[var(--color-text-primary)] font-bold text-lg">Mumbai Marathon — Volunteer Roster</h3>
                    <p className="text-[var(--color-text-muted)] text-sm">Oct 15, 2026 • 6:00 AM - 2:00 PM</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs text-[var(--color-text-muted)]">Role Fulfillment</div>
                      <div className="text-lg font-black text-[var(--color-text-primary)]">{fulfillmentPct}%</div>
                    </div>
                    <div className="w-20 h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-[var(--color-accent-success)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${fulfillmentPct}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* QR Check-in Preview */}
                <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 11h2v2H3v-2zm0-4h2v2H3V7zm4 4h2v2H7v-2zm0-4h2v2H7V7zm-4-4h2v2H3V3zm8 0h2v2h-2V3zm0 4h2v2h-2V7zm4 0h2v2h-2V7zm0 4h2v2h-2v-2zm0-4h2v2h-2V7zm-8 8h2v2H7v-2zm8 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4-4h2v2h-2v-2zm4 0h2v2h-2v-2zm-4-4h2v2h-2V7zm4 0h2v2h-2V7zm0 4h2v2h-2v-2zm-8 4h2v2H7v-2zm-4 0h2v2H3v-2zm8 0h2v2h-2v-2zm4 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm-4 0h2v2H7v-2zm-4 0h2v2H3v-2z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[var(--color-text-primary)] font-semibold text-sm">1-Click QR Check-in</div>
                    <div className="text-[var(--color-text-muted)] text-xs">Scan volunteer badges for instant attendance</div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-[var(--color-accent-indigo)]/20 text-[var(--color-accent-indigo)] text-xs font-semibold min-h-[44px]">Open Scanner</button>
                </div>

                {/* Roster table */}
                <div className="space-y-2">
                  {mockVolunteers.map((v, i) => (
                    <motion.div
                      key={v.name}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="w-9 h-9 rounded-full bg-[var(--color-accent-indigo)]/20 flex items-center justify-center text-[var(--color-accent-indigo)] text-xs font-bold flex-shrink-0">
                        {v.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[var(--color-text-primary)] font-medium text-sm truncate">{v.name}</div>
                        <div className="text-[var(--color-text-muted)] text-xs">{v.role}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[v.status]} text-black`}>
                        {statusLabels[v.status]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "volunteer" && (
            <motion.div
              key="volunteer"
              id="panel-volunteer"
              role="tabpanel"
              aria-label="Volunteer Passport"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-4 flex-wrap">
                  {/* Credibility Score Ring */}
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                      <motion.circle
                        cx="40" cy="40" r="34" fill="none"
                        stroke="var(--color-accent-success)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - 0.92) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-black text-[var(--color-text-primary)]">92</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[var(--color-text-primary)] font-bold text-lg">Priya Sharma</h3>
                    <p className="text-[var(--color-text-muted)] text-sm">Credibility Score • 92/100</p>
                    <p className="text-[var(--color-accent-success)] text-xs font-semibold">Top 5% of volunteers</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Verified Badges */}
                <div className="mb-6">
                  <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Verified Badges</h4>
                  <div className="flex flex-wrap gap-2">
                    {mockBadges.map((b, i) => (
                      <motion.div
                        key={b.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: b.color }} />
                        <span className="text-[var(--color-text-primary)] text-xs font-medium">{b.name}</span>
                        {b.events > 0 && <span className="text-[var(--color-text-muted)] text-[10px]">×{b.events}</span>}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Shifts */}
                <div>
                  <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Upcoming Shifts</h4>
                  <div className="space-y-2">
                    {mockShifts.map((s, i) => (
                      <motion.div
                        key={s.event}
                        className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="w-1 h-10 rounded-full bg-[var(--color-accent-cyan)]" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[var(--color-text-primary)] font-medium text-sm">{s.event}</div>
                          <div className="text-[var(--color-text-muted)] text-xs">{s.role}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-[var(--color-text-body)] text-xs font-medium">{s.date}</div>
                          <div className="text-[var(--color-text-muted)] text-[10px]">{s.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "chat" && (
            <motion.div
              key="chat"
              id="panel-chat"
              role="tabpanel"
              aria-label="Communication Hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5">
                    <h3 className="text-[var(--color-text-primary)] font-bold text-lg">Mumbai Marathon — Live Feed</h3>
                <p className="text-[var(--color-text-muted)] text-sm">5 participants • Shift in progress</p>
              </div>

              <div className="p-6">
                {/* Announcements */}
                <div className="mb-6">
                  <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Announcements</h4>
                  <div className="space-y-2">
                    {mockAnnouncements.map((a, i) => (
                      <motion.div
                        key={a.title}
                        className={`p-3 rounded-lg border ${
                          a.priority === "high"
                            ? "bg-[var(--color-accent-amber)]/10 border-[var(--color-accent-amber)]/30"
                            : "bg-white/[0.03] border-white/5"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[var(--color-text-primary)] font-semibold text-sm">{a.title}</span>
                          {a.priority === "high" && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[var(--color-accent-amber)]/20 text-[var(--color-accent-amber)]">Urgent</span>
                          )}
                        </div>
                        <p className="text-[var(--color-text-body)] text-xs">{a.msg}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Chat Messages */}
                <div>
                  <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Group Chat</h4>
                  <div className="space-y-3">
                    {mockMessages.map((m, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                          m.role === "organizer"
                            ? "bg-[var(--color-accent-amber)]/20 text-[var(--color-accent-amber)]"
                            : "bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]"
                        }`}>
                          {m.sender.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[var(--color-text-primary)] font-medium text-xs">{m.sender}</span>
                            <span className="text-[var(--color-text-muted)] text-[10px]">{m.time}</span>
                          </div>
                          <p className="text-[var(--color-text-body)] text-xs leading-relaxed">{m.msg}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[var(--color-text-primary)] text-xs placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-indigo)]/50 min-h-[44px]"
                    aria-label="Message input"
                  />
                  <button className="px-4 py-2 rounded-lg bg-[var(--color-accent-indigo)] text-white text-xs font-bold min-h-[44px]">Send</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ==================== LIVE ACTIVITY TICKER ====================
export function LiveActivityTicker() {
  const items = [
    { metric: "1,200", text: "Volunteers matched for Mumbai Marathon in 48 hours" },
    { metric: "98.4%", text: "On-time attendance rate across partner events" },
    { metric: "3,500+", text: "Volunteers registered this month across India" },
    { metric: "₹18L+", text: "Value of volunteer hours tracked on Evolect" },
    { metric: "7", text: "Cities with active Evolect communities" },
  ]

  return (
    <section className="w-full py-12 overflow-hidden" aria-label="Community metrics">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center gap-2 flex-shrink-0 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-lg font-black text-[var(--color-accent-cyan)]" style={{ fontFamily: "var(--font-display), sans-serif" }}>{item.metric}</span>
              <span className="text-[var(--color-text-body)] text-sm whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
