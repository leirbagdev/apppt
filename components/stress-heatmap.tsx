"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface StressHeatmapProps {
  title: string
  colorScheme: "purple" | "blue" // Esquemas de cores disponíveis
}

export default function StressHeatmap({ title, colorScheme }: StressHeatmapProps) {
  // Dados para os meses e dias da semana
  const months = ["Jan", "Fev", "Mar", "Abr"]
  const daysOfWeek = ["", "Seg", "", "Qua", "", "Sex", ""]

  // Dados específicos para as primeiras 3 semanas
  const specificWeeks = [
    [
      { level: 0, title: "01 de Jan: Sem estresse significativo" },
      { level: 2, title: "02 de Jan: Estresse moderado - Treino de média intensidade" },
      { level: 1, title: "03 de Jan: Estresse leve - Recuperação ativa" },
      { level: 3, title: "04 de Jan: Estresse elevado - Treino intenso" },
      { level: 0, title: "05 de Jan: Sem estresse significativo" },
      { level: 4, title: "06 de Jan: Estresse muito elevado - Treino de alta intensidade" },
      { level: 2, title: "07 de Jan: Estresse moderado - Treino de média intensidade" },
    ],
    [
      { level: 0, title: "08 de Jan: Sem estresse significativo" },
      { level: 3, title: "09 de Jan: Estresse elevado - Treino intenso" },
      { level: 1, title: "10 de Jan: Estresse leve - Recuperação ativa" },
      { level: 5, title: "11 de Jan: Estresse máximo - Treino de intensidade máxima" },
      { level: 0, title: "12 de Jan: Sem estresse significativo" },
      { level: 3, title: "13 de Jan: Estresse elevado - Treino intenso" },
      { level: 2, title: "14 de Jan: Estresse moderado - Treino de média intensidade" },
    ],
    [
      { level: 1, title: "15 de Jan: Estresse leve - Recuperação ativa" },
      { level: 4, title: "16 de Jan: Estresse muito elevado - Treino de alta intensidade" },
      { level: 0, title: "17 de Jan: Sem estresse significativo" },
      { level: 3, title: "18 de Jan: Estresse elevado - Treino intenso" },
      { level: 2, title: "19 de Jan: Estresse moderado - Treino de média intensidade" },
      { level: 0, title: "20 de Jan: Sem estresse significativo" },
      { level: 0, title: "21 de Jan: Sem estresse significativo" },
    ],
  ]

  // Função para gerar dados de exemplo para o restante das semanas
  const generateHeatmapData = () => {
    const data = [...specificWeeks]

    // Gerar semanas aleatórias para o restante
    for (let i = 0; i < 13; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        const level = Math.floor(Math.random() * 6) // 0-5
        week.push({ level, title: "Exemplo" })
      }
      data.push(week)
    }

    return data
  }

  const heatmapData = generateHeatmapData()

  // Função para obter a classe de cor baseada no nível e esquema de cor
  const getLevelClass = (level: number) => {
    if (colorScheme === "purple") {
      switch (level) {
        case 0:
          return "bg-zinc-700"
        case 1:
          return "bg-purple-900/30"
        case 2:
          return "bg-purple-800/40"
        case 3:
          return "bg-purple-700/60"
        case 4:
          return "bg-purple-600/70"
        case 5:
          return "bg-purple-500/80"
        default:
          return "bg-zinc-700"
      }
    } else {
      switch (level) {
        case 0:
          return "bg-zinc-700"
        case 1:
          return "bg-blue-900/30"
        case 2:
          return "bg-blue-800/40"
        case 3:
          return "bg-blue-700/60"
        case 4:
          return "bg-blue-600/70"
        case 5:
          return "bg-blue-500/80"
        default:
          return "bg-zinc-700"
      }
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="contribution-graph overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Rótulos dos meses */}
          <div className="flex gap-1 mb-1 pl-8">
            {months.map((month, index) => (
              <div
                key={index}
                className="text-xs text-zinc-400"
                style={{
                  flexBasis: "calc(4 * (16px + 4px))",
                  minWidth: "55px",
                  textAlign: "left",
                }}
              >
                {month}
              </div>
            ))}
          </div>

          <div className="flex">
            {/* Dias da semana */}
            <div
              className="flex flex-col justify-around pr-2 text-xs text-zinc-400 w-6 text-center"
              style={{ height: "calc(7 * (16px + 4px) - 4px)" }}
            >
              {daysOfWeek.map((day, index) => (
                <div key={index} className="h-4 leading-4">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid do heatmap */}
            <div className="flex gap-1">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <TooltipProvider key={dayIndex}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-4 h-4 rounded-sm border border-zinc-800/20 cursor-pointer transition-transform hover:scale-110 hover:outline hover:outline-2 hover:outline-offset-1 hover:z-10 ${getLevelClass(day.level)}`}
                            style={{
                              outlineColor:
                                colorScheme === "purple" ? "rgba(168, 85, 247, 0.5)" : "rgba(59, 130, 246, 0.5)",
                            }}
                          ></div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          {day.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legenda */}
          <div className="flex justify-end items-center gap-1 mt-4 text-xs text-zinc-400">
            <span>Menos Intenso</span>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(0)}`}></div>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(1)}`}></div>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(2)}`}></div>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(3)}`}></div>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(4)}`}></div>
            <div className={`w-4 h-4 rounded-sm ${getLevelClass(5)}`}></div>
            <span>Mais Intenso</span>
          </div>
        </div>
      </div>
    </div>
  )
}
