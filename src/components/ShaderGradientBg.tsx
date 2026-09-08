"use client"

import { useRef, useEffect, useCallback } from "react"

export default function ShaderGradientBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const img = ctx.createImageData(w, h)
      const time = t * 0.0003

      for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
          const u = x / w
          const v = y / h
          const n1 = Math.sin(u * 4 + time) * Math.cos(v * 3 - time * 0.7)
          const n2 =
            Math.sin((u + v) * 3 + time * 1.3) *
            Math.cos((u - v) * 2 + time * 0.5)
          const n3 = Math.sin(Math.sqrt(u * u + v * v) * 5 + time * 0.8)
          const r = Math.max(0, Math.min(255, 60 + n1 * 80 + n3 * 40))
          const g = Math.max(0, Math.min(255, 100 + n2 * 60 + Math.cos(u * 5 + time) * 50))
          const b = Math.max(0, Math.min(255, 200 + n1 * 30 + n2 * 25))

          for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
              const i = ((y + dy) * w + (x + dx)) * 4
              img.data[i] = r
              img.data[i + 1] = g
              img.data[i + 2] = b
              img.data[i + 3] = 255
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0)
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
