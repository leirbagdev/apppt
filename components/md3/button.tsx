"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled: "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 shadow-sm active:scale-95",
        tonal: "bg-[var(--secondary-container)] text-[var(--on-secondary-container)] hover:opacity-90",
        outlined: "border border-[var(--outline)] bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/10",
        text: "bg-transparent text-[var(--primary)] hover:bg-[var(--primary)]/10",
        elevated: "bg-[var(--surface-container-high)] text-[var(--on-surface)] shadow-md hover:shadow-lg",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-10 px-6 py-2",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
