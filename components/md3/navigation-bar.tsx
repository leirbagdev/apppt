"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationBarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function NavigationBar({ className, items, ...props }: NavigationBarProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "flex h-20 items-center justify-around",
        "rounded-t-3xl shadow-2xl",
        "safe-area-inset-bottom",
        className,
      )}
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid #1f2937",
      }}
      {...props}
    >
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-full w-full flex-col items-center justify-center space-y-1",
              "transition-all duration-300 ease-out",
              "rounded-2xl mx-1 relative overflow-hidden",
              "active:scale-95",
            )}
            style={{
              backgroundColor: isActive ? "rgba(74, 222, 128, 0.15)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "rgba(74, 222, 128, 0.08)"
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            {/* Indicador ativo com brilho */}
            {isActive && (
              <div
                className="absolute top-2 w-8 h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "#4ade80",
                  boxShadow: "0 0 8px #4ade80, 0 0 16px rgba(74, 222, 128, 0.5)",
                  filter: "drop-shadow(0 0 4px #4ade80)",
                }}
              />
            )}

            {/* Ícone com efeito glow */}
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-xl transition-all duration-300",
                isActive ? "scale-110" : "hover:scale-105",
              )}
              style={{
                color: "#4ade80",
                backgroundColor: isActive ? "rgba(74, 222, 128, 0.2)" : "transparent",
                boxShadow: isActive
                  ? "0 0 12px rgba(74, 222, 128, 0.6), 0 0 24px rgba(74, 222, 128, 0.3), inset 0 0 8px rgba(74, 222, 128, 0.2)"
                  : "none",
                filter: isActive ? "drop-shadow(0 0 6px rgba(74, 222, 128, 0.8))" : "none",
              }}
            >
              {item.icon}
            </div>

            {/* Label com brilho sutil */}
            <span
              className={cn("text-xs transition-all duration-300", isActive ? "font-semibold" : "font-normal")}
              style={{
                color: isActive ? "#4ade80" : "#d1d5db",
                textShadow: isActive ? "0 0 8px rgba(74, 222, 128, 0.8), 0 0 16px rgba(74, 222, 128, 0.4)" : "none",
                filter: isActive ? "drop-shadow(0 0 2px rgba(74, 222, 128, 0.6))" : "none",
              }}
            >
              {item.title}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
