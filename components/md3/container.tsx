"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "none"
  disableGutters?: boolean
  fixed?: boolean
}

export function Container({
  className,
  maxWidth = "lg",
  disableGutters = false,
  fixed = false,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        {
          "px-4 sm:px-6 md:px-8": !disableGutters,
          "max-w-screen-sm": maxWidth === "xs",
          "max-w-screen-md": maxWidth === "sm",
          "max-w-screen-lg": maxWidth === "md",
          "max-w-screen-xl": maxWidth === "lg",
          "max-w-screen-2xl": maxWidth === "xl",
          "max-w-full": maxWidth === "full" || maxWidth === "none",
          "w-full": fixed,
        },
        className,
      )}
      {...props}
    />
  )
}
