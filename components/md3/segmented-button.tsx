"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface SegmentedButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  onValueChange: (value: string) => void
  options: {
    value: string
    label: string
    icon?: React.ReactNode
  }[]
}

export function SegmentedButton({ className, value, onValueChange, options, ...props }: SegmentedButtonProps) {
  return (
    <div className={cn("inline-flex rounded-full border p-1", className)} {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={cn(
            "flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors",
            value === option.value ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
          )}
          onClick={() => onValueChange(option.value)}
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {option.label}
        </button>
      ))}
    </div>
  )
}
