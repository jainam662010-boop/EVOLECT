"use client"

import { motion, useTransform, MotionValue } from "framer-motion"
import GlassCard from "./GlassCard"
import NoiseAbstractBg from "./NoiseAbstractBg"

const organizerPoints = [
  {
    title: "Last-Minute Scrambles",
    desc: "Finding volunteers often happens days before the event, leaving no time to vet candidates or plan assignments properly.",
  },
  {
    title: "Chaotic Team Management",
    desc: "Coordinating large groups through WhatsApp threads and phone calls creates confusion, missed updates, and duplicated effort.",
  },
  {
    title: "Unreliable Attendance",
    desc: "Without a reputation system, organizers cannot tell who will actually show up. No-shows derail carefully planned schedules.",
  },
  {
    title: "Scattered Communication",
    desc: "Information gets lost across multiple platforms — calls, texts, group chats. There is no single source of truth for event day.",
  },
  {
    title: "Mismatched Skill Sets",
    desc: "Matching volunteers to specific roles — technical, creative, logistics — takes time that organizers simply do not have.",
  },
]

const volunteerPoints = [
  {
    title: "Fragmented Opportunities",
    desc: "Volunteer openings are scattered across social media groups, word of mouth, and occasional emails. Nothing is centralized.",
  },
  {
    title: "No Credibility Tracking",
    desc: "Past experience and reliability have no portable record. Every event starts from zero, regardless of your track record.",
  },
  {
    title: "Uncertain Event Quality",
    desc: "Without reviews or verification, volunteers cannot tell legitimate events from disorganized ones until they arrive.",
  },
  {
    title: "Interest Mismatch",
    desc: "Finding events that align with your skills and interests requires scrolling through dozens of irrelevant postings.",
  },
]

export default function ProblemSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) {
  const opacity = useTransform(
    scrollProgress,
    [0.15, 0.25, 0.4, 0.5],
    [0, 1, 1, 0]
  )

  return (
    <motion.section
      className="relative min-h-[140vh] flex flex-col items-center justify-center px-4 py-32"
      style={{ opacity }}
    >
      <NoiseAbstractBg />
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-blue-500">
          The Challenge
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-6xl font-bold text-slate-900 text-center mb-6 max-w-4xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Events are exciting. Finding the right volunteer is not.
      </motion.h2>

      <motion.p
        className="text-lg text-slate-500 max-w-2xl text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Both sides of the equation face real problems. Organizers struggle
        to find reliable help. Volunteers struggle to find meaningful
        opportunities. The result is a broken system that leaves everyone
        frustrated.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <GlassCard className="h-full">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                For Event Organizers
              </span>
            </div>
            <ul className="space-y-5">
              {organizerPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-slate-900 font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {point.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed pl-3 border-l border-blue-200">
                    {point.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <GlassCard className="h-full">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-blue-50 text-blue-600 rounded-full border border-blue-100">
                For Volunteers
              </span>
            </div>
            <ul className="space-y-5">
              {volunteerPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-slate-900 font-bold text-lg mb-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {point.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed pl-3 border-l border-blue-200">
                    {point.desc}
                  </p>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </motion.section>
  )
}
