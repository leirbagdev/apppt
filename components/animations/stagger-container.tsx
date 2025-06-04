"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { type ReactNode, Children, cloneElement, isValidElement, useMemo } from "react"

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 100, className = "" }: StaggerContainerProps) {
  const { ref, isVisible } = useScrollAnimation()

  const staggeredChildren = useMemo(() => {
    return Children.map(children, (child, index) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ...child.props,
          className: `${child.props.className || ""} transition-all duration-600 ease-out`,
          style: {
            ...child.props.style,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 30px, 0)",
            transitionDelay: `${index * staggerDelay}ms`,
            willChange: "transform, opacity",
          },
        })
      }
      return child
    })
  }, [children, isVisible, staggerDelay])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        contain: "layout style paint",
        transform: "translateZ(0)", // Force hardware acceleration
      }}
    >
      {staggeredChildren}
    </div>
  )
}
