"use client"

import { useState, Suspense, lazy } from "react"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"

// Lazy loading de componentes pesados
const HeavyChart = lazy(() => import("@/components/md3/activity-chart"))
const HeavyTable = lazy(() => import("@/components/heavy-table"))
const HeavyForm = lazy(() => import("@/components/heavy-form"))

const ComponentSkeleton = ({ height = "400px" }: { height?: string }) => (
  <div className="bg-muted rounded-lg animate-pulse flex items-center justify-center" style={{ height }}>
    <div className="text-muted-foreground">Carregando componente...</div>
  </div>
)

export default function CodeSplittingDemo() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)

  const components = [
    { id: "chart", name: "Gráfico Pesado", component: HeavyChart },
    { id: "table", name: "Tabela Pesada", component: HeavyTable },
    { id: "form", name: "Formulário Pesado", component: HeavyForm },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Demonstração de Code Splitting</h3>

      <div className="flex gap-2 mb-6">
        {components.map((comp) => (
          <Button
            key={comp.id}
            variant={activeComponent === comp.id ? "filled" : "outlined"}
            onClick={() => setActiveComponent(comp.id)}
          >
            {comp.name}
          </Button>
        ))}
        <Button variant="text" onClick={() => setActiveComponent(null)}>
          Limpar
        </Button>
      </div>

      <div className="min-h-[400px]">
        {activeComponent === "chart" && (
          <Suspense fallback={<ComponentSkeleton />}>
            <HeavyChart
              data={[
                { name: "Jan", value: 100 },
                { name: "Fev", value: 200 },
                { name: "Mar", value: 150 },
              ]}
              type="bar"
              dataKey="value"
              xAxisKey="name"
              color="#3b82f6"
              height="400px"
            />
          </Suspense>
        )}

        {activeComponent === "table" && (
          <Suspense fallback={<ComponentSkeleton />}>
            <HeavyTable />
          </Suspense>
        )}

        {activeComponent === "form" && (
          <Suspense fallback={<ComponentSkeleton />}>
            <HeavyForm />
          </Suspense>
        )}

        {!activeComponent && (
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Selecione um componente para carregar dinamicamente
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Como funciona:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Componentes são carregados apenas quando necessário</li>
          <li>• Reduz o bundle inicial da aplicação</li>
          <li>• Melhora o tempo de carregamento inicial</li>
          <li>• Suspense boundaries mostram loading states</li>
        </ul>
      </div>
    </Card>
  )
}
