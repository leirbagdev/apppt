"use client"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

interface PerformanceData {
  route: string
  loadTime: number
  renderTime: number
  timestamp: number
  memoryUsage?: number
}

// Cache para evitar recálculos desnecessários
const performanceCache = new Map<string, PerformanceData>()

export function usePerformance() {
  const pathname = usePathname()
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceData | null>(null)

  const measurePerformance = useCallback(() => {
    // Verificar se já temos dados em cache para esta rota
    if (performanceCache.has(pathname)) {
      const cachedData = performanceCache.get(pathname)!
      setCurrentMetrics(cachedData)
      setPerformanceData((prev) => {
        // Evitar duplicatas
        const filtered = prev.filter((item) => item.route !== pathname)
        return [...filtered, cachedData].slice(-9)
      })
      return
    }

    const startTime = performance.now()

    // Medir quando a página está completamente carregada
    const measureComplete = () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime

      // Medir uso de memória se disponível
      const memoryUsage = (performance as any).memory?.usedJSHeapSize || 0

      const metrics: PerformanceData = {
        route: pathname,
        loadTime: Math.round(loadTime),
        renderTime: Math.round(loadTime), // Simplificado
        timestamp: Date.now(),
        memoryUsage: Math.round(memoryUsage / 1024 / 1024), // MB
      }

      // Armazenar em cache
      performanceCache.set(pathname, metrics)

      setCurrentMetrics(metrics)
      setPerformanceData((prev) => [...prev.slice(-9), metrics]) // Manter últimas 10
    }

    // Usar requestIdleCallback se disponível, senão setTimeout
    if ("requestIdleCallback" in window) {
      requestIdleCallback(measureComplete)
    } else {
      setTimeout(measureComplete, 0)
    }
  }, [pathname])

  useEffect(() => {
    measurePerformance()
  }, [measurePerformance])

  const getAverageLoadTime = useCallback(() => {
    if (performanceData.length === 0) return 0
    return Math.round(performanceData.reduce((sum, data) => sum + data.loadTime, 0) / performanceData.length)
  }, [performanceData])

  const getSlowRoutes = useCallback(() => {
    return performanceData.filter((data) => data.loadTime > 1000)
  }, [performanceData])

  return {
    currentMetrics,
    performanceData,
    averageLoadTime: getAverageLoadTime(),
    slowRoutes: getSlowRoutes(),
    measurePerformance,
  }
}
