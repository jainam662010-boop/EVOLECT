"use client"

import { motion, useTransform, MotionValue } from "framer-motion"
import GradientText from "./GradientText"

const loopSteps = [
  {
    label: "Discover",
    description: "Browse events that match your interests and availability",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    label: "Participate",
    description: "Apply, get confirmed, and show up on event day",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: "Gain Experience",
    description: "Build your portfolio with every event you contribute to",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  {
    label: "Build Credibility",
    description: "Earn ratings and reviews that follow you to every future event",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
]

const organizerBenefits = [
  "Verified volunteer profiles with past event history and ratings",
  "One-click team building from a pool of pre-screened candidates",
  "Real-time attendance tracking and role assignment",
  "Built-in communication — no more scattered WhatsApp threads",
  "Post-event feedback collection for continuous improvement",
]

const volunteerBenefits = [
  "Personalized event recommendations based on your interests",
  "Transparent event details with organizer verification",
  "Portable reputation that grows with every event",
  "Skill-based matching for roles that fit your strengths",
  "Community connections with like-minded volunteers",
]

export default function WhySection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) {
  const opacity = useTransform(
    scrollProgress,
    [0.65, 0.75, 0.8, 0.9],
    [0, 1, 1, 0]
  )

  return (
    <motion.section
      className="relative min-h-[150vh] flex flex-col items-center justify-center px-4 py-32"
      style={{ opacity }}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-blue-500">
          Why Evolect
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 max-w-4xl leading-tight"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        We are not just building an app.
        <br />
        <GradientText>We are building an event community.</GradientText>
      </motion.h2>

      <motion.p
        className="text-lg text-slate-500 max-w-2xl text-center mb-20 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        A network where every interaction builds trust. Volunteers grow
        their reputation. Organizers build reliable teams. The community
        gets stronger with every event.
      </motion.p>

      <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap max-w-5xl mb-20">
        {loopSteps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-4 md:gap-6"
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
              type: "spring",
              stiffness: 200,
            }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex flex-col items-center rounded-2xl p-6 w-40 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm"
              whileHover={{
                scale: 1.08,
                borderColor: "rgba(37,99,235,0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-blue-500 mb-3">{step.icon}</div>
              <span className="text-slate-900 font-semibold text-sm text-center mb-2">
                {step.label}
              </span>
              <span className="text-slate-400 text-xs text-center leading-relaxed">
                {step.description}
              </span>
            </motion.div>
            {i < loopSteps.length - 1 && (
              <motion.span
                className="text-xl text-blue-300"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.1 }}
                viewport={{ once: true }}
              >
                —
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        <motion.div
          className="rounded-2xl p-8 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-blue-600 mb-4">
            For Organizers
          </h3>
          <ul className="space-y-3">
            {organizerBenefits.map((benefit, i) => (
              <motion.li
                key={i}
                className="text-slate-600 text-sm flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-500 mt-0.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="rounded-2xl p-8 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-blue-600 mb-4">
            For Volunteers
          </h3>
          <ul className="space-y-3">
            {volunteerBenefits.map((benefit, i) => (
              <motion.li
                key={i}
                className="text-slate-600 text-sm flex items-start gap-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <span className="text-blue-500 mt-0.5 shrink-0">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </span>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  )
}
