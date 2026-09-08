"use client"

import { useRef, useEffect, useCallback } from "react"

export default function AuroraBorealis() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)

      // Dark background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, "#050a15")
      bgGrad.addColorStop(0.4, "#0a1628")
      bgGrad.addColorStop(1, "#0f172a")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      const time = t * 0.0006

      // Draw aurora layers
      for (let i = 0; i < 5; i++) {
        const yBase = h * (0.15 + i * 0.08) + Math.sin(time + i) * 30

        ctx.beginPath()
        ctx.moveTo(0, yBase)

        for (let x = 0; x < w; x += 4) {
          const nx = x / w
          const wave =
            Math.sin(nx * 6 + time + i * 0.8) * 25 +
            Math.sin(nx * 12 + time * 1.5) * 12
          ctx.lineTo(x, yBase + wave)
        }

        ctx.lineTo(w, yBase + 80)
        ctx.lineTo(0, yBase + 80)
        ctx.closePath()

        const hue = 140 + i * 25 + Math.sin(time + i) * 10
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${0.08 - i * 0.012})`
        ctx.fill()
      }

      // Stars
      for (let i = 0; i < 50; i++) {
        const sx = (i * 137.5 + t * 0.01) % w
        const sy = (i * 97.3) % h
        const sr = 0.5 + Math.sin(i + t * 0.002) * 0.5

        ctx.beginPath()
        ctx.arc(sx, sy, sr + 0.3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + sr})`
        ctx.fill()
      }
    },
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w: number
    let h: number
    let raf: number

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = canvas.width = parent.offsetWidth
      h = canvas.height = parent.offsetHeight
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    const loop = (t: number) => {
      if (w > 0 && h > 0) draw(ctx, w, h, t)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [draw])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
