"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function InteractiveCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 350, damping: 25 })
  const springY = useSpring(cursorY, { stiffness: 350, damping: 25 })
  const [isHovering, setIsHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const onHoverStart = useCallback(() => setIsHovering(true), [])
  const onHoverEnd = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: coarse)").matches) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    const attach = () => {
      document.querySelectorAll("button, a, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onHoverEnd)
        el.removeEventListener("mouseleave", onHoverStart)
        el.addEventListener("mouseenter", onHoverStart)
        el.addEventListener("mouseleave", onHoverEnd)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      obs.disconnect()
    }
  }, [cursorX, cursorY, onHoverStart, onHoverEnd])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-[6px] h-[6px] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background: "white",
          mixBlendMode: "difference",
        }}
        animate={{
          scale: isHovering ? 4 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: visible ? 0.4 : 0,
          borderColor: isHovering
            ? "rgba(37,99,235,0.5)"
            : "rgba(0,0,0,0.15)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  )
}
