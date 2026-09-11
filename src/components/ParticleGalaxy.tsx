"use client"

import { useRef, useEffect } from "react"

export default function ParticleGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext("2d")
    if (!ctx) return
    let w: number, h: number, raf: number

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 1200 - 600,
      z: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: 0.8 + Math.random() * 1.5,
      hue: 220 + Math.random() * 60,
    }))

    const resize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      // Dark gradient bg
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7)
      bg.addColorStop(0, "#141822")
      bg.addColorStop(0.6, "#0c0f18")
      bg.addColorStop(1, "#060810")
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      const time = t * 0.0005
      const cx = w / 2
      const cy = h / 2

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (Math.abs(p.x) > 1000) p.vx *= -1
        if (Math.abs(p.y) > 600) p.vy *= -1

        const scale = 600 / (600 + p.z + 300)
        const px = cx + p.x * scale
        const py = cy + p.y * scale + Math.sin(time + p.x * 0.01) * 5
        const alpha = Math.max(0.1, 1 - p.z * 0.001) * 0.6

        ctx.beginPath()
        ctx.arc(px, py, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue},70%,65%,${alpha})`
        ctx.fill()
      })

      // Connecting lines (every 3rd frame for perf)
      if (Math.floor(t) % 3 === 0) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i]
            const b = particles[j]
            const sa = 600 / (600 + a.z + 300)
            const sb = 600 / (600 + b.z + 300)
            const ax = cx + a.x * sa, ay = cy + a.y * sa
            const bx = cx + b.x * sb, by = cy + b.y * sb
            const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2)
            if (dist < 120) {
              ctx.beginPath()
              ctx.moveTo(ax, ay)
              ctx.lineTo(bx, by)
              ctx.strokeStyle = `rgba(96,165,250,${(1 - dist / 120) * 0.12})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}
