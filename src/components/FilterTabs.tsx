"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const tabs = ["All", "Events", "Impact", "Community"]

export default function FilterTabs({
  active,
  onChange,
}: {
  active: string
  onChange: (tab: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
            active === tab
              ? "text-white"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {active === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  )
}
