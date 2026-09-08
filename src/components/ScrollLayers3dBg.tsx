"use client"

import { useRef, useEffect, useCallback } from "react"

export default function ScrollLayers3dBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, w, h)

      const time = t * 0.0008
      const cx = w / 2
      const cy = h / 2

      for (let i = 7; i >= 0; i--) {
        const depth = i / 8
        const scale = 1 - depth * 0.4
        const ox = Math.sin(time * (0.3 + i * 0.1) + i) * 30 * (1 + i * 0.3)
        const oy = Math.cos(time * (0.2 + i * 0.08) + i) * 20 * (1 + i * 0.2)
        const pw = (w * 0.3 + i * 20) * scale
        const ph = (h * 0.25 + i * 15) * scale
        const hue = 220 + i * 8

        ctx.fillStyle = `hsla(${hue}, 50%, 50%, ${0.08 + depth * 0.06})`
        ctx.fillRect(cx + ox - pw / 2, cy + oy - ph / 2, pw, ph)

        ctx.strokeStyle = `hsla(${hue}, 60%, 60%, ${0.15 + depth * 0.1})`
        ctx.lineWidth = 1
        ctx.strokeRect(cx + ox - pw / 2, cy + oy - ph / 2, pw, ph)
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
