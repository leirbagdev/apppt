// Utilitários para monitoramento de performance

export interface PerformanceMetric {
  route: string
  loadTime: number
  timestamp: number
  status: "fast" | "medium" | "slow"
  renderTime?: number
  bundleSize?: number
}

export interface RouteTest {
  path: string
  name: string
  expectedLoadTime: number
}

// Rotas padrão para teste
export const defaultRoutesToTest: RouteTest[] = [
  { path: "/dashboard", name: "Dashboard", expectedLoadTime: 500 },
  { path: "/dashboard/students", name: "Lista de Alunos", expectedLoadTime: 800 },
  { path: "/dashboard/students/1", name: "Detalhes Aluno 1", expectedLoadTime: 600 },
  { path: "/dashboard/workouts", name: "Treinos", expectedLoadTime: 900 },
  { path: "/dashboard/exercise-library", name: "Biblioteca", expectedLoadTime: 1000 },
  { path: "/dashboard/health-metrics", name: "Métricas", expectedLoadTime: 1200 },
  { path: "/dashboard/habituario", name: "Habituário", expectedLoadTime: 800 },
  { path: "/dashboard/settings", name: "Configurações", expectedLoadTime: 500 },
]

// Simular medição de performance para uma rota
export const simulateRoutePerformance = async (route: RouteTest): Promise<PerformanceMetric> => {
  return new Promise((resolve) => {
    // Calcular o tempo de carregamento simulado com base na complexidade da rota
    const complexityFactor = route.path.includes("library")
      ? 1.2
      : route.path.includes("metrics")
        ? 1.3
        : route.path.includes("students")
          ? 1.1
          : 1.0

    const simulatedLoadTime = route.expectedLoadTime * complexityFactor + (Math.random() * 200 - 100)
    const loadTime = Math.round(simulatedLoadTime)

    const status: "fast" | "medium" | "slow" =
      loadTime <= route.expectedLoadTime ? "fast" : loadTime <= route.expectedLoadTime * 1.5 ? "medium" : "slow"

    setTimeout(
      () => {
        resolve({
          route: route.path,
          loadTime,
          renderTime: Math.round(loadTime * 0.8),
          timestamp: Date.now(),
          status,
          bundleSize: Math.round(Math.random() * 500 + 100), // Simulado
        })
      },
      Math.max(50, Math.min(simulatedLoadTime, 300)),
    ) // Limitar o tempo de simulação para melhor UX
  })
}

// Obter cor de status baseada no tempo de carregamento
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "fast":
      return "text-green-600 bg-green-50 border-green-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "slow":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

// Calcular estatísticas de performance
export const calculatePerformanceStats = (metrics: PerformanceMetric[]) => {
  if (metrics.length === 0) {
    return {
      averageLoadTime: 0,
      fastRoutes: 0,
      slowRoutes: 0,
      mediumRoutes: 0,
    }
  }

  return {
    averageLoadTime: Math.round(metrics.reduce((sum, m) => sum + m.loadTime, 0) / metrics.length),
    fastRoutes: metrics.filter((m) => m.status === "fast").length,
    mediumRoutes: metrics.filter((m) => m.status === "medium").length,
    slowRoutes: metrics.filter((m) => m.status === "slow").length,
  }
}
