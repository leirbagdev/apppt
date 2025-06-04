"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"

interface SwipeOptions {
  threshold?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export function useSwipe(
  ref: React.RefObject<HTMLElement>,
  { threshold = 50, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }: SwipeOptions = {},
) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null)
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }, [])

  const onTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }, [])

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY)

    if (isHorizontalSwipe) {
      if (distanceX > threshold) {
        onSwipeLeft?.()
      } else if (distanceX < -threshold) {
        onSwipeRight?.()
      }
    } else {
      if (distanceY > threshold) {
        onSwipeUp?.()
      } else if (distanceY < -threshold) {
        onSwipeDown?.()
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("touchstart", onTouchStart)
    element.addEventListener("touchmove", onTouchMove)
    element.addEventListener("touchend", onTouchEnd)

    return () => {
      element.removeEventListener("touchstart", onTouchStart)
      element.removeEventListener("touchmove", onTouchMove)
      element.removeEventListener("touchend", onTouchEnd)
    }
  }, [ref, onTouchStart, onTouchMove, onTouchEnd])
}
