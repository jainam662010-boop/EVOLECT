"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 2500, suffix: "+", label: "Volunteers Registered" },
  { value: 180, suffix: "+", label: "Events Hosted" },
  { value: 12000, suffix: "+", label: "Hours Contributed" },
  { value: 95, suffix: "%", label: "Satisfaction Rate" },
]

export default function StatsStrip() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="text-3xl md:text-4xl font-black text-blue-600 mb-1" style={{ fontFamily: "var(--font-display), sans-serif" }}>
            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-slate-500 text-xs md:text-sm font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
