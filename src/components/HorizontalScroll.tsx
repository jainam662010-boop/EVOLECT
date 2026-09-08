"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface CardData {
  title: string
  description: string
  icon: React.ReactNode
}

interface HorizontalScrollProps {
  cards: CardData[]
}

export default function HorizontalScroll({ cards }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  return (
    <div ref={containerRef} className="relative h-[50vh] overflow-hidden">
      <motion.div
        className="flex gap-6 absolute top-1/2 -translate-y-1/2 pl-8"
        style={{ x }}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="flex-shrink-0 w-72 h-48 rounded-2xl p-6 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-sm flex flex-col justify-between"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(37, 99, 235, 0.3)",
            }}
          >
            <div>
              <div className="text-blue-500 mb-3">{card.icon}</div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {card.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
