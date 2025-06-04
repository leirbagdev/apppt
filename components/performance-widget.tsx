"use client"

import { usePerformance } from "@/hooks/use-performance"
import { Card } from "@/components/md3/card"
import { Clock, Zap, AlertTriangle } from "lucide-react"

export default function PerformanceWidget() {
  const { currentMetrics, averageLoadTime, slowRoutes } = usePerformance()

  if (!currentMetrics) return null

  const getStatusColor = (loadTime: number) => {
    if (loadTime <= 500) return "text-green-600"
    if (loadTime <= 1000) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (loadTime: number) => {
    if (loadTime <= 500) return <Zap className="h-4 w-4 text-green-600" />
    if (loadTime <= 1000) return <Clock className="h-4 w-4 text-yellow-600" />
    return <AlertTriangle className="h-4 w-4 text-red-600" />
  }

  return (
    <Card className="p-4 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon(currentMetrics.loadTime)}
          <div>
            <div className="text-sm font-medium">Performance da Página</div>
            <div className="text-xs text-gray-600">{currentMetrics.route}</div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-lg font-bold ${getStatusColor(currentMetrics.loadTime)}`}>
            {currentMetrics.loadTime}ms
          </div>
          <div className="text-xs text-gray-500">Média: {averageLoadTime}ms</div>
        </div>
      </div>

      {currentMetrics.memoryUsage && (
        <div className="mt-2 pt-2 border-t">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Memória:</span>
            <span>{currentMetrics.memoryUsage}MB</span>
          </div>
        </div>
      )}

      {slowRoutes.length > 0 && (
        <div className="mt-2 pt-2 border-t">
          <div className="flex items-center gap-1 text-xs text-red-600">
            <AlertTriangle className="h-3 w-3" />
            <span>{slowRoutes.length} rota(s) lenta(s) detectada(s)</span>
          </div>
        </div>
      )}
    </Card>
  )
}
