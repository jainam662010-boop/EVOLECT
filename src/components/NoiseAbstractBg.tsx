"use client"

import { useRef, useEffect, useCallback } from "react"

export default function NoiseAbstractBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const img = ctx.createImageData(w, h)

      for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
          const n =
            Math.sin(x * 0.02 + t * 0.0005) *
            Math.cos(y * 0.02 + t * 0.00035) *
            Math.sin((x + y) * 0.015 + t * 0.00025)
          const v = (n + 1) / 2

          for (let dy = 0; dy < 3; dy++) {
            for (let dx = 0; dx < 3; dx++) {
              const i = ((y + dy) * w + (x + dx)) * 4
              img.data[i] = Math.min(255, 220 + v * 35)
              img.data[i + 1] = Math.min(255, 230 + v * 20)
              img.data[i + 2] = Math.min(255, 245 + v * 10)
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
