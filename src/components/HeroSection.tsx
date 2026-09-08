"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import GlowButton from "./GlowButton"
import GradientText from "./GradientText"
import LiquidGlassBg from "./LiquidGlassBg"

export default function HeroSection({
  scrollProgress,
}: {
  scrollProgress: import("framer-motion").MotionValue<number>
}) {
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 1, 0])
  const y = useTransform(scrollProgress, [0, 0.2], [0, -120])
  const scale = useTransform(scrollProgress, [0, 0.2], [1, 0.95])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), {
    stiffness: 80,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), {
    stiffness: 80,
    damping: 20,
  })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const letters = "EVOLECT".split("")

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ opacity, y, scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <LiquidGlassBg />
      {/* EVOLECT Title */}
      <div className="relative z-10 flex items-center gap-[2px] md:gap-1 mb-6">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter select-none text-white"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              textShadow: "0 0 40px rgba(139, 92, 246, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)",
            }}
            initial={{ opacity: 0, y: 60, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 text-lg sm:text-xl md:text-3xl text-blue-900 max-w-4xl mb-4 font-medium leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.2,
          type: "spring",
          stiffness: 200,
          damping: 10,
        }}
      >
        Events need volunteers. Volunteers need opportunities.
        <br />
        <GradientText>We are building the bridge.</GradientText>
      </motion.p>

      {/* Description */}
      <motion.p
        className="relative z-10 text-sm sm:text-base md:text-lg text-blue-800 max-w-2xl mb-10 leading-relaxed px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        Evolect is a platform connecting event organizers with reliable
        volunteers — making it easier to find the right volunteer, manage
        teams, and create better events.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <GlowButton>Join the Early Community</GlowButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <motion.div
          className="w-5 h-9 border-2 border-white/40 rounded-full flex justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full mt-2"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
