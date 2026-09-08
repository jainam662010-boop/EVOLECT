"use client"

import { motion } from "framer-motion"

interface NeonGlowProps {
  text: string
  className?: string
}

export default function NeonGlow({ text, className = "" }: NeonGlowProps) {
  return (
    <motion.div
      className={`text-4xl md:text-6xl font-black text-center ${className}`}
      style={{
        fontFamily: "var(--font-display), sans-serif",
        color: "#fff",
        textShadow:
          "0 0 10px rgba(37, 99, 235, 0.8), 0 0 20px rgba(37, 99, 235, 0.6), 0 0 40px rgba(37, 99, 235, 0.4), 0 0 80px rgba(124, 58, 237, 0.3)",
        animation: "neonPulse 2s ease-in-out infinite alternate",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {text}
    </motion.div>
  )
}
