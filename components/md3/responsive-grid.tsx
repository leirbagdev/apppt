"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  spacing?: number
  rowSpacing?: number
  columnSpacing?: number
}

export function ResponsiveGrid({
  className,
  columns = { xs: 1, sm: 2, md: 3, lg: 4, xl: 4 },
  spacing = 4,
  rowSpacing,
  columnSpacing,
  ...props
}: ResponsiveGridProps) {
  const rowGap = rowSpacing !== undefined ? rowSpacing : spacing
  const columnGap = columnSpacing !== undefined ? columnSpacing : spacing

  return (
    <div
      className={cn(
        "grid w-full",
        {
          "grid-cols-1": columns.xs === 1,
          "grid-cols-2": columns.xs === 2,
          "grid-cols-3": columns.xs === 3,
          "grid-cols-4": columns.xs === 4,
          "sm:grid-cols-1": columns.sm === 1,
          "sm:grid-cols-2": columns.sm === 2,
          "sm:grid-cols-3": columns.sm === 3,
          "sm:grid-cols-4": columns.sm === 4,
          "md:grid-cols-1": columns.md === 1,
          "md:grid-cols-2": columns.md === 2,
          "md:grid-cols-3": columns.md === 3,
          "md:grid-cols-4": columns.md === 4,
          "lg:grid-cols-1": columns.lg === 1,
          "lg:grid-cols-2": columns.lg === 2,
          "lg:grid-cols-3": columns.lg === 3,
          "lg:grid-cols-4": columns.lg === 4,
          "xl:grid-cols-1": columns.xl === 1,
          "xl:grid-cols-2": columns.xl === 2,
          "xl:grid-cols-3": columns.xl === 3,
          "xl:grid-cols-4": columns.xl === 4,
          "gap-1": rowGap === 1 && columnGap === 1,
          "gap-2": rowGap === 2 && columnGap === 2,
          "gap-3": rowGap === 3 && columnGap === 3,
          "gap-4": rowGap === 4 && columnGap === 4,
          "gap-5": rowGap === 5 && columnGap === 5,
          "gap-6": rowGap === 6 && columnGap === 6,
          "gap-8": rowGap === 8 && columnGap === 8,
          "gap-10": rowGap === 10 && columnGap === 10,
          "gap-12": rowGap === 12 && columnGap === 12,
          "gap-16": rowGap === 16 && columnGap === 16,
          "gap-20": rowGap === 20 && columnGap === 20,
          "gap-24": rowGap === 24 && columnGap === 24,
          "gap-32": rowGap === 32 && columnGap === 32,
          "gap-y-1": rowGap === 1 && columnGap !== rowGap,
          "gap-y-2": rowGap === 2 && columnGap !== rowGap,
          "gap-y-3": rowGap === 3 && columnGap !== rowGap,
          "gap-y-4": rowGap === 4 && columnGap !== rowGap,
          "gap-y-5": rowGap === 5 && columnGap !== rowGap,
          "gap-y-6": rowGap === 6 && columnGap !== rowGap,
          "gap-y-8": rowGap === 8 && columnGap !== rowGap,
          "gap-y-10": rowGap === 10 && columnGap !== rowGap,
          "gap-y-12": rowGap === 12 && columnGap !== rowGap,
          "gap-y-16": rowGap === 16 && columnGap !== rowGap,
          "gap-y-20": rowGap === 20 && columnGap !== rowGap,
          "gap-y-24": rowGap === 24 && columnGap !== rowGap,
          "gap-y-32": rowGap === 32 && columnGap !== rowGap,
          "gap-x-1": columnGap === 1 && rowGap !== columnGap,
          "gap-x-2": columnGap === 2 && rowGap !== columnGap,
          "gap-x-3": columnGap === 3 && rowGap !== columnGap,
          "gap-x-4": columnGap === 4 && rowGap !== columnGap,
          "gap-x-5": columnGap === 5 && rowGap !== columnGap,
          "gap-x-6": columnGap === 6 && rowGap !== columnGap,
          "gap-x-8": columnGap === 8 && rowGap !== columnGap,
          "gap-x-10": columnGap === 10 && rowGap !== columnGap,
          "gap-x-12": columnGap === 12 && rowGap !== columnGap,
          "gap-x-16": columnGap === 16 && rowGap !== columnGap,
          "gap-x-20": columnGap === 20 && rowGap !== columnGap,
          "gap-x-24": columnGap === 24 && rowGap !== columnGap,
          "gap-x-32": columnGap === 32 && rowGap !== columnGap,
        },
        className,
      )}
      {...props}
    />
  )
}
