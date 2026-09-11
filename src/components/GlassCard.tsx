"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function GlassCard({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <motion.div
      className={`relative group rounded-2xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {dark ? (
        <>
          <div className="absolute inset-0 backdrop-blur-xl bg-slate-800/60 group-hover:bg-slate-800/70 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
          <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-blue-400/30 transition-all duration-500" />
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 backdrop-blur-xl bg-blue-50/80 group-hover:bg-blue-50/95 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-blue-100/20" />
          <div className="absolute inset-0 rounded-2xl border border-blue-100 group-hover:border-blue-300 transition-all duration-500" />
          <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)]" />
        </>
      )}
      <div className="relative z-10 p-6 md:p-8">{children}</div>
    </motion.div>
  )
}
