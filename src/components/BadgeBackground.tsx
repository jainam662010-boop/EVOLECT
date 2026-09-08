"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export default function BadgeBackground() {
  const { scrollYProgress } = useScroll()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [6, -6]), {
    stiffness: 50,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-10, 10]), {
    stiffness: 50,
    damping: 20,
  })

  // Scroll: badge slides from right side across to left
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [200, 80, -40, -160, -300])
  // Vertical float
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 60])
  // Rotation on scroll
  const rotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-6, 3, -8])
  // Fade in then out
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [0, 0.85, 0.85, 0])
  // Scale
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 0.95, 0.8])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed inset-0 z-[2] pointer-events-none flex items-start justify-end pt-[12vh]"
      style={{ opacity }}
    >
      <motion.div
        className="mr-[2vw] md:mr-[6vw]"
        style={{
          x,
          y,
          rotateX,
          rotateY,
          rotateZ,
          scale,
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Soft shadow beneath badge */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-8 bg-slate-900/5 blur-2xl rounded-full" />

        <img
          src="/badge.svg"
          alt="Evolect Volunteer Badge"
          className="w-[200px] sm:w-[260px] md:w-[320px] drop-shadow-[0_20px_40px_rgba(37,99,235,0.12)]"
          style={{ transformStyle: "preserve-3d" }}
        />
      </motion.div>
    </motion.div>
  )
}
