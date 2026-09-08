"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`relative group rounded-2xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Frosted glass */}
      <div className="absolute inset-0 backdrop-blur-2xl bg-white/60 group-hover:bg-white/80 transition-all duration-500" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-white/20" />

      {/* Border */}
      <div className="absolute inset-0 rounded-2xl border border-slate-200 group-hover:border-blue-200 transition-all duration-500" />

      {/* Top highlight */}
      <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white to-transparent" />

      {/* Inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 p-6 md:p-8">{children}</div>
    </motion.div>
  )
}
