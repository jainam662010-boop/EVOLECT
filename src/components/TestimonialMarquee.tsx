"use client"

import { motion } from "framer-motion"

const testimonials = [
  { name: "Aisha Patel", role: "Event Organizer", text: "Evolect cut my volunteer coordination time in half. The reputation system is a game changer." },
  { name: "Marcus Chen", role: "Volunteer", text: "Finally a platform where my past experience actually matters. I keep getting better opportunities." },
  { name: "Sofia Rodriguez", role: "Community Manager", text: "We run 30+ events a year. Evolect is the single tool that keeps everything organized." },
  { name: "James Okafor", role: "Festival Director", text: "No more WhatsApp chaos. Every volunteer confirmed, every role assigned, all in one place." },
  { name: "Lin Wei", role: "Charity Lead", text: "The matching algorithm found volunteers we never would have reached through our old methods." },
  { name: "Emma Larsson", role: "Volunteer", text: "I love seeing my reputation grow event by event. It motivates me to do better every time." },
]

export default function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <div className="overflow-hidden">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-80 mx-3 p-6 rounded-2xl bg-white/60 backdrop-blur-xl border border-slate-200/60 hover:border-blue-200 transition-colors duration-300"
          >
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-sm">{t.name}</p>
                <p className="text-slate-400 text-xs">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
