"use client"

import { motion } from "framer-motion"

interface WaveDividerProps {
  className?: string
}

export default function WaveDivider({ className = "" }: WaveDividerProps) {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <motion.svg
        width="100%"
        height="100"
        viewBox="0 0 1400 100"
        preserveAspectRatio="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <path
          fill="rgba(37, 99, 235, 0.15)"
          d="M0,50 C350,15 700,85 1400,50 L1400,100 L0,100Z"
        />
        <path
          fill="rgba(37, 99, 235, 0.08)"
          d="M0,65 C350,30 700,85 1400,60 L1400,100 L0,100Z"
        />
      </motion.svg>
    </div>
  )
}
