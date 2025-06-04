"use client"

import { Suspense, type ReactNode } from "react"

interface LazyRouteWrapperProps {
  children: ReactNode
  fallback?: ReactNode
}

const DefaultFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-muted-foreground">Carregando...</p>
    </div>
  </div>
)

export default function LazyRouteWrapper({ children, fallback = <DefaultFallback /> }: LazyRouteWrapperProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
