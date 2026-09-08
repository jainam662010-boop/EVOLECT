"use client"

import { useScroll, useSpring } from "framer-motion"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"
import ProblemSection from "@/components/ProblemSection"
import SolutionSection from "@/components/SolutionSection"
import WhySection from "@/components/WhySection"
import FooterSection from "@/components/FooterSection"
import InteractiveCursor from "@/components/InteractiveCursor"
import WaveDivider from "@/components/WaveDivider"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div className="relative bg-white text-slate-900 min-h-screen selection:bg-blue-500/20 selection:text-slate-900">
      <InteractiveCursor />
      <Navbar />

      <main className="relative z-10">
        <section id="hero">
          <HeroSection scrollProgress={smoothProgress} />
        </section>
        <WaveDivider />
        <section id="problem">
          <ProblemSection scrollProgress={smoothProgress} />
        </section>
        <WaveDivider className="rotate-180" />
        <section id="solution">
          <SolutionSection scrollProgress={smoothProgress} />
        </section>
        <WaveDivider />
        <section id="why">
          <WhySection scrollProgress={smoothProgress} />
        </section>
        <WaveDivider className="rotate-180" />
        <section id="early-access">
          <FooterSection scrollProgress={smoothProgress} />
        </section>
      </main>
    </div>
  )
}
