"use client"

import { motion } from "framer-motion"

interface WaveDividerProps {
  className?: string
  dark?: boolean
}

export default function WaveDivider({ className = "", dark = false }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.svg
        width="100%"
        height="80"
        viewBox="0 0 1400 80"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {dark ? (
          <>
            <path fill="rgba(37, 99, 235, 0.3)" d="M0,40 C350,10 700,70 1400,40 L1400,80 L0,80Z" />
            <path fill="rgba(59, 130, 246, 0.15)" d="M0,55 C350,25 700,70 1400,50 L1400,80 L0,80Z" />
          </>
        ) : (
          <>
            <path fill="rgba(37, 99, 235, 0.12)" d="M0,40 C350,10 700,70 1400,40 L1400,80 L0,80Z" />
            <path fill="rgba(37, 99, 235, 0.06)" d="M0,55 C350,25 700,70 1400,50 L1400,80 L0,80Z" />
          </>
        )}
      </motion.svg>
    </div>
  )
}
