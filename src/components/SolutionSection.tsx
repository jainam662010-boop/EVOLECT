"use client"

import {
  motion,
  useTransform,
  MotionValue,
  useMotionValue,
  useSpring,
} from "framer-motion"
import GlassCard from "./GlassCard"
import GradientText from "./GradientText"
import { useRef } from "react"

const features = [
  {
    number: "01",
    title: "Post",
    subtitle: "Share What You Need",
    description:
      "Organizers create detailed event listings with specific role requirements, time commitments, and skill needs. No more vague WhatsApp messages.",
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-200",
  },
  {
    number: "02",
    title: "Connect",
    subtitle: "Discover Opportunities",
    description:
      "Volunteers browse verified events filtered by interest, location, and availability. Apply with one tap. Get matched based on your profile and past experience.",
    color: "from-blue-400/10 to-blue-400/5",
    borderColor: "border-blue-200",
  },
  {
    number: "03",
    title: "Manage",
    subtitle: "From Selection to Attendance",
    description:
      "Organizers review applications, build teams, assign roles, and manage attendance — all from a single dashboard. Volunteers receive confirmations and schedules instantly.",
    color: "from-blue-500/10 to-blue-500/5",
    borderColor: "border-blue-200",
  },
]

function TiltCard({
  number,
  title,
  subtitle,
  description,
  color,
  borderColor,
}: {
  number: string
  title: string
  subtitle: string
  description: string
  color: string
  borderColor: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    { stiffness: 200, damping: 25 }
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    { stiffness: 200, damping: 25 }
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className="perspective-[1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <GlassCard className={`text-left h-full bg-gradient-to-b ${color} border ${borderColor}`}>
        <div className="mb-4">
          <span className="text-xs font-mono text-slate-400 tracking-wider">
            {number}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm font-bold text-blue-600 mb-4">
          {subtitle}
        </p>
        <p className="text-slate-500 text-sm leading-relaxed font-normal">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  )
}

export default function SolutionSection({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>
}) {
  const opacity = useTransform(
    scrollProgress,
    [0.4, 0.5, 0.65, 0.75],
    [0, 1, 1, 0]
  )

  return (
    <motion.section
      className="relative min-h-[140vh] flex flex-col items-center justify-center px-4 py-32"
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
          The Solution
        </span>
      </motion.div>

      <motion.h2
        className="text-4xl md:text-5xl font-bold text-slate-900 text-center mb-6 max-w-4xl"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        One place. Two sides. <GradientText>One easier way</GradientText> to
        make events happen.
      </motion.h2>

      <motion.p
        className="text-lg text-slate-500 max-w-2xl text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Evolect brings event organizers and volunteers together on one
        platform. Three simple steps replace the chaos with clarity.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.2,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <TiltCard {...feature} />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 max-w-2xl text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="text-slate-400 text-sm leading-relaxed">
          Whether you are organizing a music festival, a charity run, a
          corporate conference, or a community workshop — Evolect handles
          the volunteer side so you can focus on the event itself.
        </p>
      </motion.div>
    </motion.section>
  )
}
