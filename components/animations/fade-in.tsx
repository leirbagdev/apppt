"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import type { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, direction = "up", delay = 0, duration = 600, className = "" }: FadeInProps) {
  const { ref, isVisible } = useScrollAnimation()

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0)"

    switch (direction) {
      case "up":
        return "translate3d(0, 40px, 0)"
      case "down":
        return "translate3d(0, -40px, 0)"
      case "left":
        return "translate3d(40px, 0, 0)"
      case "right":
        return "translate3d(-40px, 0, 0)"
      default:
        return "translate3d(0, 40px, 0)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
