"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const fabVariants = cva(
  "inline-flex items-center justify-center rounded-2xl shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover:shadow-xl hover:-translate-y-1",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        tertiary: "bg-tertiary text-tertiary-foreground hover:bg-tertiary/80",
        surface: "bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        small: "h-12 w-12",
        medium: "h-16 w-16",
        large: "h-24 w-24",
        extended: "h-16 px-8 min-w-[120px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
)

export interface FabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof fabVariants> {
  asChild?: boolean
}

const Fab = React.forwardRef<HTMLButtonElement, FabProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "button"
    return <Comp className={cn(fabVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Fab.displayName = "Fab"

export { Fab, fabVariants }
