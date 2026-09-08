"use client"

import { motion } from "framer-motion"

interface GradientTextProps {
  children: string
  className?: string
}

export default function GradientText({ children, className = "" }: GradientTextProps) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{
        background: "linear-gradient(90deg, #2563eb, #7c3aed, #2563eb, #06b6d4, #2563eb)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "gradientShift 3s ease infinite",
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.span>
  )
}
