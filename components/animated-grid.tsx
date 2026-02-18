"use client"

import { useEffect, useRef } from "react"

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      time += 0.002
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 60
      const cols = Math.ceil(canvas.width / gridSize) + 1
      const rows = Math.ceil(canvas.height / gridSize) + 1

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize
          const y = j * gridSize
          const distFromCenter = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) +
            Math.pow(y - canvas.height / 2, 2)
          )
          const maxDist = Math.sqrt(
            Math.pow(canvas.width / 2, 2) +
            Math.pow(canvas.height / 2, 2)
          )
          const normalizedDist = distFromCenter / maxDist
          const opacity = Math.max(0, 0.07 - normalizedDist * 0.04 + Math.sin(time + i * 0.3 + j * 0.3) * 0.025)

          ctx.beginPath()
          ctx.arc(x, y, 1, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(52, 211, 153, ${opacity})`
          ctx.fill()
        }
      }

      // Draw subtle emerald grid lines
      for (let i = 0; i < cols; i++) {
        const x = i * gridSize
        const opacity = 0.02 + Math.sin(time + i * 0.5) * 0.012
        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let j = 0; j < rows; j++) {
        const y = j * gridSize
        const opacity = 0.02 + Math.sin(time + j * 0.5) * 0.012
        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
