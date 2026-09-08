"use client"

import { useRef, useEffect, useCallback } from "react"

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < 100; i++) {
        const sx = (i * 137.5 + t * 0.02) % w
        const sy = (i * 97.3 + t * 0.01) % h
        const sr = 0.5 + Math.sin(i + t * 0.003) * 0.5

        ctx.beginPath()
        ctx.arc(sx, sy, sr + 0.5, 0, Math.PI * 2)
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
