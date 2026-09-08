"use client"

import { motion } from "framer-motion"

export default function MorphingSvgBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Central morphing pentagon */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-20"
        viewBox="0 0 170 170"
      >
        <path
          fill="#8b5cf6"
          fillOpacity="0.3"
          stroke="#8b5cf6"
          strokeWidth="1.5"
        >
          <animate
            attributeName="d"
            values="M85,15 L155,70 L140,145 L30,145 L15,70Z;M85,25 L145,75 L130,135 L40,135 L25,75Z;M85,15 L155,70 L140,145 L30,145 L15,70Z"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Left decorative morphing shape */}
      <svg
        className="absolute top-20 left-10 w-32 h-32 opacity-10"
        viewBox="0 0 170 170"
      >
        <path
          fill="#06b6d4"
          fillOpacity="0.4"
          stroke="#06b6d4"
          strokeWidth="1"
        >
          <animate
            attributeName="d"
            values="M85,15 L155,70 L140,145 L30,145 L15,70Z;M85,25 L145,75 L130,135 L40,135 L25,75Z;M85,15 L155,70 L140,145 L30,145 L15,70Z"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Right decorative morphing shape */}
      <svg
        className="absolute bottom-32 right-16 w-24 h-24 opacity-10"
        viewBox="0 0 170 170"
      >
        <path
          fill="#f59e0b"
          fillOpacity="0.4"
          stroke="#f59e0b"
          strokeWidth="1"
        >
          <animate
            attributeName="d"
            values="M85,15 L155,70 L140,145 L30,145 L15,70Z;M85,25 L145,75 L130,135 L40,135 L25,75Z;M85,15 L155,70 L140,145 L30,145 L15,70Z"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  )
}
