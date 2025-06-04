"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ThemeProvider } from "./theme-provider"

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Usar OLED escuro como padrão durante o carregamento
    return <div style={{ background: "#000000", color: "#FFFFFF", minHeight: "100vh" }}>{children}</div>
  }

  return (
    <ThemeProvider
      onThemeChange={() => {
        setIsChanging(true)
        setTimeout(() => setIsChanging(false), 400)
      }}
    >
      <div className={isChanging ? "theme-transition" : ""}>{children}</div>
    </ThemeProvider>
  )
}
