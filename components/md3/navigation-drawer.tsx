"use client"

import type * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationDrawerProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
  header?: React.ReactNode
}

export function NavigationDrawer({ className, items, header, ...props }: NavigationDrawerProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex h-full w-64 flex-col border-r bg-background rounded-r-3xl", className)} {...props}>
      {header && <div className="border-b p-6 rounded-tr-3xl">{header}</div>}
      <div className="flex-1 overflow-auto py-4 px-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 rounded-2xl px-6 py-3 mb-2 transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "text-foreground hover:bg-accent hover:shadow-sm hover:-translate-y-0.5",
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
