"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  outlined?: boolean
  filled?: boolean
  fullWidth?: boolean
  size?: "lg" | "xl" | "2xl"
}

export function Card({
  className,
  elevation = 1,
  outlined = false,
  filled = false,
  fullWidth = false,
  size = "2xl",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-colors bg-black text-white border border-gray-800",
        {
          "border border-gray-800": outlined,
          "bg-black text-white": !filled,
          "bg-gray-900 text-white": filled,
          "w-full": fullWidth,
          "shadow-sm": elevation === 1,
          shadow: elevation === 2,
          "shadow-md": elevation === 3,
          "shadow-lg": elevation === 4,
          "shadow-xl": elevation === 5,
          "rounded-lg": size === "lg",
          "rounded-xl": size === "xl",
          "rounded-2xl": size === "2xl",
        },
        className,
      )}
      {...props}
    />
  )
}

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  subtitle?: React.ReactNode
  action?: React.ReactNode
  avatar?: React.ReactNode
  compact?: boolean
}

export function CardHeader({ className, title, subtitle, action, avatar, compact = false, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start gap-4 p-6 text-white", compact && "p-4", className)} {...props}>
      {avatar && <div className="flex-shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        <h3 className={cn("font-medium text-lg leading-none", compact && "text-base")}>{title}</h3>
        {subtitle && <p className={cn("theme-text-secondary mt-1", compact && "text-sm")}>{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0 ml-auto">{action}</div>}
    </div>
  )
}

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean
}

export function CardContent({ className, compact = false, ...props }: CardContentProps) {
  return <div className={cn("p-6 text-white", compact && "p-4", className)} {...props} />
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean
}

export function CardFooter({ className, compact = false, ...props }: CardFooterProps) {
  return <div className={cn("p-6 pt-0", compact && "p-4 pt-0", className)} {...props} />
}

interface CardActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  disableSpacing?: boolean
  compact?: boolean
}

export function CardActions({ className, disableSpacing = false, compact = false, ...props }: CardActionsProps) {
  return (
    <div
      className={cn("p-6 pt-0 flex items-center", !disableSpacing && "gap-2", compact && "p-4 pt-0", className)}
      {...props}
    />
  )
}

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string
  alt?: string
  height?: number | string
  aspectRatio?: "16/9" | "4/3" | "1/1" | "2/1" | "21/9"
}

export function CardMedia({ className, image, alt, height, aspectRatio = "16/9", ...props }: CardMediaProps) {
  const style: React.CSSProperties = {}
  if (height) {
    style.height = typeof height === "number" ? `${height}px` : height
  }

  return (
    <div
      className={cn(
        "bg-cover bg-center bg-no-repeat",
        {
          "aspect-video": aspectRatio === "16/9",
          "aspect-[4/3]": aspectRatio === "4/3",
          "aspect-square": aspectRatio === "1/1",
          "aspect-[2/1]": aspectRatio === "2/1",
          "aspect-[21/9]": aspectRatio === "21/9",
        },
        className,
      )}
      style={{
        ...style,
        backgroundImage: image ? `url(${image})` : undefined,
      }}
      role={image && alt ? "img" : undefined}
      aria-label={image && alt ? alt : undefined}
      {...props}
    />
  )
}
