"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Dumbbell, Target, TrendingUp, User, Settings, Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const navigation = [
  { name: "Início", href: "/client", icon: Home },
  { name: "Treinos", href: "/client/workouts", icon: Dumbbell },
  { name: "Metas", href: "/client/goals", icon: Target },
  { name: "Progresso", href: "/client/progress", icon: TrendingUp },
  { name: "Perfil", href: "/client/profile", icon: User },
]

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img src="/images/apt-logo.svg" alt="APT Logo" className="w-10 h-10" />
              <div>
                <h1 className="text-white font-bold text-lg">APT</h1>
                <p className="text-gray-400 text-xs">Área do Cliente</p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }
                  `}
                  onClick={() => isMobile && setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1">
                <p className="text-white font-medium text-sm">Ana Carolina</p>
                <p className="text-gray-400 text-xs">Personal: Dr. Silva</p>
              </div>
              <Link href="/client/settings" className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`${isMobile ? "ml-0" : "ml-64"} min-h-screen`}>
        {/* Mobile header */}
        {isMobile && (
          <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-sm border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <img src="/images/apt-logo.svg" alt="APT Logo" className="w-8 h-8" />
              <div className="w-10" />
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {/* Mobile bottom navigation com efeito neon refinado */}
      {isMobile && (
        <div
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-800"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
            backdropFilter: "blur(20px)",
            borderTopLeftRadius: "24px",
            borderTopRightRadius: "24px",
            borderTop: "1px solid rgba(74, 222, 128, 0.1)",
            boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.8), 0 0 1px rgba(74, 222, 128, 0.2)",
            position: "relative",
          }}
        >
          {/* Gradiente sutil de fundo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center top, rgba(74, 222, 128, 0.03) 0%, transparent 70%)",
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
            }}
          />

          <div className="flex items-center justify-around py-2 relative z-10">
            {navigation.slice(0, 4).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 relative"
                  style={{
                    background: isActive
                      ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 70%, transparent 100%)"
                      : "transparent",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background =
                        "radial-gradient(circle at center, rgba(74, 222, 128, 0.04) 0%, transparent 70%)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent"
                    }
                  }}
                >
                  {/* Indicador ativo refinado */}
                  {isActive && (
                    <div
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent 0%, #4ade80 50%, transparent 100%)",
                        filter: "blur(0.5px)",
                      }}
                    >
                      <div
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-green-400 rounded-full"
                        style={{ filter: "blur(0px)" }}
                      />
                    </div>
                  )}

                  <div
                    className="p-1.5 rounded-xl transition-all duration-300"
                    style={{
                      background: isActive
                        ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)"
                        : "transparent",
                      filter: isActive
                        ? "drop-shadow(0 0 4px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 8px rgba(74, 222, 128, 0.2))"
                        : "none",
                    }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: "#4ade80" }} />
                  </div>

                  <span
                    className="text-xs font-medium transition-all duration-300"
                    style={{
                      color: isActive ? "#4ade80" : "#d1d5db",
                      fontWeight: isActive ? 600 : 400,
                      textShadow: isActive
                        ? "0 0 4px rgba(74, 222, 128, 0.3), 0 0 8px rgba(74, 222, 128, 0.1)"
                        : "none",
                    }}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
