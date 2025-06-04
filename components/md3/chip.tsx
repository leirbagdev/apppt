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
        default: "bg-green-500 text-black hover:bg-green-400 border-green-500",
        secondary: "bg-blue-500 text-white hover:bg-blue-400 border-blue-500",
        outline: "text-white border-gray-600 hover:border-green-500 hover:text-green-500",
        assist: "bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:text-white",
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
