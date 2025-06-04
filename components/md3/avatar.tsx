"use client"

import type React from "react"
import { User } from "lucide-react"

interface AvatarProps {
  src?: string
  alt?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  children?: React.ReactNode
}

export function Avatar({ src, alt, size = "md", className = "", children }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-xl",
  }

  const baseClasses = `
    relative inline-flex items-center justify-center
    rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600
    text-white font-medium overflow-hidden
    ${sizeClasses[size]}
    ${className}
  `

  if (src) {
    return (
      <div className={baseClasses}>
        <img
          src={src || "/placeholder.svg"}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback para ícone se a imagem falhar
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML = `<svg class="w-1/2 h-1/2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
            }
          }}
        />
      </div>
    )
  }

  return <div className={baseClasses}>{children || <User className="w-1/2 h-1/2" />}</div>
}

export default Avatar
