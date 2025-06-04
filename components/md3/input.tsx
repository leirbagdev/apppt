"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled"
  label?: string
  helperText?: string
  error?: boolean
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "outlined", label, helperText, error, startAdornment, endAdornment, ...props }, ref) => {
    const inputId = React.useId()

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors",
              error ? "text-destructive" : "text-foreground",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {startAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{startAdornment}</div>
          )}
          <input
            id={inputId}
            className={cn(
              "flex h-12 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-sm transition-all text-white",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white",
              "placeholder:text-gray-400",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              "disabled:cursor-not-allowed disabled:opacity-50",
              {
                "border-red-500 focus-visible:ring-red-500": error,
                "bg-gray-800/50": variant === "filled",
                "pl-10": startAdornment,
                "pr-10": endAdornment,
              },
              className,
            )}
            ref={ref}
            {...props}
          />
          {endAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">{endAdornment}</div>
          )}
        </div>
        {helperText && (
          <p className={cn("mt-2 text-xs", error ? "text-destructive" : "text-muted-foreground")}>{helperText}</p>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
