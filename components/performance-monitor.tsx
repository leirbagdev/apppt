"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Card } from "@/components/md3/card"
import { Button } from "@/components/md3/button"
import { Clock, Zap, AlertTriangle, CheckCircle, BarChart3, RefreshCw } from "lucide-react"
import {
  type PerformanceMetric,
  defaultRoutesToTest,
  simulateRoutePerformance,
  getStatusColor,
  calculatePerformanceStats,
} from "@/lib/performance-utils"

export default function PerformanceMonitor() {
  const router = useRouter()
  const pathname = usePathname()
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string>("")
  const routesToTest = defaultRoutesToTest

  const runPerformanceTest = async () => {
    setIsRunning(true)
    setMetrics([])

    for (const route of routesToTest) {
      setCurrentTest(route.name)

      try {
        const metric = await simulateRoutePerformance(route)
        setMetrics((prev) => [...prev, metric])

        // Pequena pausa entre testes
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Erro ao testar rota ${route.path}:`, error)
      }
    }

    setCurrentTest("")
    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "fast":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "slow":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const { averageLoadTime, fastRoutes, slowRoutes } = calculatePerformanceStats(metrics)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Monitor de Performance</h3>
              <p className="text-sm text-gray-600">Teste a velocidade de carregamento das rotas</p>
            </div>
          </div>

          <Button onClick={runPerformanceTest} disabled={isRunning} className="flex items-center gap-2">
            {isRunning ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Testando...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Iniciar Teste
              </>
            )}
          </Button>
        </div>

        {isRunning && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-blue-800">Testando: {currentTest}</span>
            </div>
          </div>
        )}

        {metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Tempo Médio</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{averageLoadTime}ms</div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium">Rotas Rápidas</span>
              </div>
              <div className="text-2xl font-bold text-green-800">
                {fastRoutes}/{metrics.length}
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium">Rotas Lentas</span>
              </div>
              <div className="text-2xl font-bold text-red-800">
                {slowRoutes}/{metrics.length}
              </div>
            </div>
          </div>
        )}

        {metrics.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800">Resultados Detalhados</h4>

            <div className="space-y-2">
              {metrics.map((metric, index) => {
                const route = routesToTest.find((r) => r.path === metric.route)
                return (
                  <div key={index} className={`p-3 border rounded-lg ${getStatusColor(metric.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(metric.status)}
                        <div>
                          <div className="font-medium">{route?.name || metric.route}</div>
                          <div className="text-sm opacity-75">{metric.route}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold">{metric.loadTime}ms</div>
                        <div className="text-xs opacity-75">Esperado: {route?.expectedLoadTime}ms</div>
                      </div>
                    </div>

                    {metric.renderTime && (
                      <div className="mt-2 pt-2 border-t border-current border-opacity-20">
                        <div className="flex justify-between text-sm">
                          <span>Tempo de Renderização:</span>
                          <span>{metric.renderTime}ms</span>
                        </div>
                        {metric.bundleSize && (
                          <div className="flex justify-between text-sm">
                            <span>Tamanho do Bundle:</span>
                            <span>{metric.bundleSize}KB</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {metrics.length === 0 && !isRunning && (
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Clique em "Iniciar Teste" para medir a performance das rotas</p>
          </div>
        )}
      </Card>

      {metrics.length > 0 && (
        <Card className="p-6">
          <h4 className="font-medium text-gray-800 mb-4">Recomendações de Otimização</h4>

          <div className="space-y-3">
            {slowRoutes > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-red-800">Rotas Lentas Detectadas</div>
                    <div className="text-sm text-red-700 mt-1">
                      {slowRoutes} rota(s) estão carregando mais lentamente que o esperado. Considere implementar lazy
                      loading ou otimizar componentes pesados.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {averageLoadTime > 800 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">Tempo Médio Alto</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      O tempo médio de carregamento está acima de 800ms. Considere otimizar imagens, reduzir bundle size
                      ou implementar cache.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {fastRoutes === metrics.length && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-green-800">Excelente Performance!</div>
                    <div className="text-sm text-green-700 mt-1">
                      Todas as rotas estão carregando dentro do tempo esperado. Continue monitorando para manter a
                      performance.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  )
}
