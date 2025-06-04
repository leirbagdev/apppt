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

  useEffect(() => {
    if (mounted) {
      // Aplicar atributo data-theme no body para CSS customizado
      const body = document.body
      body.setAttribute("data-theme", "light") // será atualizado pelo ThemeProvider
    }
  }, [mounted])

  if (!mounted) {
    return <div style={{ background: "#000000", color: "#ffffff", minHeight: "100vh" }}>{children}</div>
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
