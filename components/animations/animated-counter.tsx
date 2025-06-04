"use client"

import { useScrollAnimation, useCountUp } from "@/hooks/use-scroll-animation"
import { useEffect } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollAnimation()
  const { count, setIsActive } = useCountUp(end, duration)

  useEffect(() => {
    if (isVisible) {
      setIsActive(true)
    }
  }, [isVisible, setIsActive])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}
