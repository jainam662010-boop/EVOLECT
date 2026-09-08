"use client"

import { useRef, useEffect, useState } from "react"

interface Particle {
  x: number
  y: number
  life: number
}

export default function ParticleTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setParticles((prev) => [
        ...prev.slice(-50),
        { x, y, life: 1 },
      ])
    }

    container.addEventListener("mousemove", handleMouseMove)
    return () => container.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.02, y: p.y + 0.5 }))
          .filter((p) => p.life > 0)
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{ cursor: "crosshair" }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: p.x - 2.5,
            top: p.y - 2.5,
            width: 5 * p.life,
            height: 5 * p.life,
            opacity: p.life,
          }}
        />
      ))}
    </div>
  )
}
