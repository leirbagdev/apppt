"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationRailProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function NavigationRail({ className, items, ...props }: NavigationRailProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex h-full w-20 flex-col items-center border-r bg-background py-4", className)} {...props}>
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex w-full flex-col items-center justify-center space-y-1 p-2",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.icon}
            <span className="text-xs">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}
