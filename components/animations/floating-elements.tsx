"use client"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-pulse"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            transform: `translate(${mousePosition.x * (0.02 + i * 0.01)}px, ${mousePosition.y * (0.02 + i * 0.01)}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      {/* Gradient Blobs */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
        style={{
          left: "10%",
          top: "20%",
          transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />

      <div
        className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/10 to-green-500/10 rounded-full blur-3xl"
        style={{
          right: "10%",
          bottom: "20%",
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)`,
          transition: "transform 0.5s ease-out",
        }}
      />
    </div>
  )
}
