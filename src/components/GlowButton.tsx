"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

export default function GlowButton({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <motion.button
      className={`relative group px-10 py-4 rounded-full font-semibold text-sm md:text-base overflow-hidden cursor-pointer tracking-wide uppercase ${className}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      data-hover
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 group-hover:from-blue-400 group-hover:via-blue-500 group-hover:to-blue-600 transition-all duration-500 rounded-full" />
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[150%] transition-all duration-700 ease-out" />
      </div>
      <div className="absolute -bottom-2 left-[10%] right-[10%] h-6 bg-blue-500/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="relative z-10 text-white font-bold drop-shadow-sm">{children}</span>
    </motion.button>
  )
}
