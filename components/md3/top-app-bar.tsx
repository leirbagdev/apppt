"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface TopAppBarProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  variant?: "small" | "medium" | "large" | "center-aligned"
}

export function TopAppBar({ className, title, leading, trailing, variant = "small", ...props }: TopAppBarProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center border-b bg-background text-foreground transition-colors",
        {
          "h-16": variant === "small" || variant === "center-aligned",
          "h-24": variant === "medium",
          "h-32": variant === "large",
        },
        className,
      )}
      {...props}
    >
      {leading && <div className="mr-4">{leading}</div>}
      <div
        className={cn("flex-1", {
          "text-center": variant === "center-aligned",
        })}
      >
        <h1
          className={cn("font-medium text-foreground", {
            "text-xl": variant === "small" || variant === "center-aligned",
            "text-2xl": variant === "medium",
            "text-3xl": variant === "large",
          })}
        >
          {title}
        </h1>
        {variant === "large" && <div className="mt-2 text-sm text-muted-foreground">{props.children}</div>}
      </div>
      {trailing && <div className="ml-4 flex items-center space-x-2">{trailing}</div>}
    </header>
  )
}
