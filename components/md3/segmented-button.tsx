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
        <div
          key={option.value}
          role="button"
          tabIndex={0}
          className={cn(
            "flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors cursor-pointer",
            value === option.value ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent",
          )}
          onClick={() => onValueChange(option.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onValueChange(option.value);
            }
          }}
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          {typeof option.label === 'string' ? option.label.toLowerCase() : option.label}
        </div>
      ))}
    </div>
  )
}
