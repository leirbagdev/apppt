"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const chipVariants = cva(
  "inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 border-[var(--primary)]",
        secondary: "bg-[var(--secondary)] text-[var(--on-secondary)] hover:opacity-90 border-[var(--secondary)]",
        outline:
          "text-[var(--on-surface)] border-[var(--outline)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
        assist:
          "bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] border-[var(--outline-variant)] hover:bg-[var(--surface-container-highest)] hover:text-[var(--on-surface)]",
      },
      size: {
        sm: "px-2 py-1 text-xs h-6",
        md: "px-3 py-1.5 text-xs h-7",
        lg: "px-4 py-2 text-sm h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  onDelete?: () => void
}

function Chip({ className, variant, size, onDelete, ...props }: ChipProps) {
  return (
    <div className={cn(chipVariants({ variant, size }), className)} {...props}>
      <span className="mr-1">{props.children}</span>
      {onDelete && (
        <button
          type="button"
          onClick={onDelete}
          className="ml-1 rounded-lg p-0.5 hover:bg-background/20 transition-colors"
        >
          <X className="h-3 w-3" />
          <span className="sr-only">Remove</span>
        </button>
      )}
    </div>
  )
}

export { Chip, chipVariants }
