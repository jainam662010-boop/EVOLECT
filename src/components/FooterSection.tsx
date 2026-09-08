"use client"

import { motion, useTransform, MotionValue } from "framer-motion"
import GlassCard from "./GlassCard"
import GlowButton from "./GlowButton"
import EmailForm from "./EmailForm"

export default function FooterSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) {
  const opacity = useTransform(scrollProgress, [0.8, 0.9, 1], [0, 1, 1])

  return (
    <motion.section
      className="relative min-h-[130vh] flex flex-col items-center justify-center px-4 py-32"
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
          Early Access
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-bold text-slate-900 text-center mb-6"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Get in before we launch.
      </motion.h2>

      <motion.p
        className="text-lg text-slate-500 max-w-2xl text-center mb-16 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        We are building Evolect with the people who actually experience
        the event industry — organizers, volunteers, event managers, and
        enthusiasts. Join our early community and help shape the platform
        from day one.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full mb-20">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <GlassCard className="text-center h-full flex flex-col items-center justify-center">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Event Organizers
            </h3>
            <p className="text-slate-500 mb-2 text-sm">
              Need volunteers for your next event?
            </p>
            <p className="text-slate-400 mb-6 text-xs">
              Music festivals, charity runs, conferences, workshops — any event, any scale.
            </p>
            <GlowButton>Join as an Organizer</GlowButton>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <GlassCard className="text-center h-full flex flex-col items-center justify-center">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Volunteers
            </h3>
            <p className="text-slate-500 mb-2 text-sm">
              Want to discover events and opportunities?
            </p>
            <p className="text-slate-400 mb-6 text-xs">
              Build your reputation, gain experience, and connect with organizers who value your time.
            </p>
            <GlowButton>Join as a Volunteer</GlowButton>
          </GlassCard>
        </motion.div>
      </div>

      <div className="mb-12">
        <EmailForm />
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <p className="text-3xl font-black text-slate-900 mb-2 tracking-tighter" style={{ fontFamily: "var(--font-display), sans-serif" }}>
          EVOLECT
        </p>
        <p className="text-slate-400 text-sm">Where events meet volunteers</p>
      </motion.div>

      <div className="mt-16 text-center">
        <p className="text-xs text-slate-400">
          dev by <span className="font-semibold text-slate-500">that.jainam</span>
        </p>
      </div>
    </motion.section>
  )
}
