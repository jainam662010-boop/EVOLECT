"use client"

import { motion, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import GlowButton from "./GlowButton"
import GradientText from "./GradientText"
import LiquidGlassBg from "./LiquidGlassBg"

export default function HeroSection({
  scrollProgress,
}: {
  scrollProgress: import("framer-motion").MotionValue<number>
}) {
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.2], [1, 1, 0])
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const letters = "EVOLECT".split("")

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ opacity }}
    >
      <LiquidGlassBg />
      {/* EVOLECT Title */}
      <div className="relative z-10 flex items-center gap-[1px] md:gap-1 mb-4">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter select-none text-white"
            style={{
              fontFamily: "var(--font-display), sans-serif",
              textShadow: "0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)",
            }}
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: isMobile ? 0 : 0.2 + i * 0.05,
              ease: "easeOut",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Tagline */}
      <motion.p
        className="relative z-10 text-base sm:text-lg md:text-2xl text-blue-900 max-w-4xl mb-3 font-medium leading-relaxed"
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: isMobile ? 0 : 0.5 }}
      >
        Events need volunteers. Volunteers need opportunities.
        <br />
        <GradientText>We are building the bridge.</GradientText>
      </motion.p>

      {/* Description */}
      <motion.p
        className="relative z-10 text-xs sm:text-sm md:text-base text-blue-800 max-w-xl mb-8 leading-relaxed px-2"
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: isMobile ? 0 : 0.7 }}
      >
        Evolect is a platform connecting event organizers with reliable
        volunteers — making it easier to find the right volunteer, manage
        teams, and create better events.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: isMobile ? 0 : 0.9 }}
      >
        <GlowButton>Join the Early Community</GlowButton>
      </motion.div>

      {/* Scroll indicator */}
      <div className="relative z-10 absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-5 h-8 border-2 border-blue-900/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-blue-900/40 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </motion.section>
  )
}
