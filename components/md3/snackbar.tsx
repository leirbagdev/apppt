"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const snackbarVariants = cva(
  "fixed bottom-6 left-6 right-6 z-50 flex items-center justify-between rounded-2xl border bg-background p-4 shadow-lg sm:left-auto sm:right-6 sm:w-full sm:max-w-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive bg-destructive text-destructive-foreground",
        success: "border-green-500 bg-green-50 text-green-900 dark:bg-green-900 dark:text-green-50",
        warning: "border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof snackbarVariants> {
  open?: boolean
  onClose?: () => void
  action?: React.ReactNode
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({ className, variant, open, onClose, action, ...props }, ref) => {
    if (!open) return null

    return (
      <div ref={ref} className={cn(snackbarVariants({ variant }), className)} {...props}>
        <div className="flex-1 text-sm font-medium">{props.children}</div>
        <div className="flex items-center gap-2 ml-4">
          {action}
          {onClose && (
            <button onClick={onClose} className="rounded-xl p-1.5 hover:bg-background/20 transition-colors">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          )}
        </div>
      </div>
    )
  },
)
Snackbar.displayName = "Snackbar"

export { Snackbar }
