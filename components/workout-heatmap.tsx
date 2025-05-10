"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function WorkoutHeatmap() {
  // Dados para os meses e dias da semana
  const months = ["Jan", "Fev", "Mar", "Abr"]
  const daysOfWeek = ["", "Seg", "", "Qua", "", "Sex", ""]

  // Dados específicos para as primeiras 3 semanas
  const specificWeeks = [
    [
      { level: 0, title: "01 de Jan: Sem treino" },
      { level: 2, title: "02 de Jan: Caminhada Rápida - 40min - FC Média 68% - Esforço 4/10" },
      { level: 1, title: "03 de Jan: Alongamento - 20min - Esforço 2/10" },
      { level: 3, title: "04 de Jan: Corrida Leve - 35min - FC Média 75% - Esforço 6/10" },
      { level: 0, title: "05 de Jan: Sem treino" },
      { level: 4, title: "06 de Jan: Treino de Força (Intenso) - 50min - Esforço 8/10" },
      { level: 2, title: "07 de Jan: Ciclismo Leve - 60min - FC Média 65% - Esforço 4/10" },
    ],
    [
      { level: 0, title: "08 de Jan: Sem treino" },
      { level: 3, title: "09 de Jan: Natação - 45min - Esforço 7/10" },
      { level: 1, title: "10 de Jan: Yoga - 30min - Esforço 3/10" },
      { level: 5, title: "11 de Jan: HIIT - 25min - FC Média 88% - Esforço 9/10" },
      { level: 0, title: "12 de Jan: Sem treino" },
      { level: 3, title: "13 de Jan: Treino Funcional - 45min - Esforço 6/10" },
      { level: 2, title: "14 de Jan: Caminhada Moderada - 50min - FC Média 70% - Esforço 5/10" },
    ],
    [
      { level: 1, title: "15 de Jan: Descanso Ativo - Caminhada leve 20min" },
      { level: 4, title: "16 de Jan: Corrida Intervalada - 30min - FC Média 82% - Esforço 8/10" },
      { level: 0, title: "17 de Jan: Sem treino" },
      { level: 3, title: "18 de Jan: Treino de Força (Moderado) - 60min - Esforço 7/10" },
      { level: 2, title: "19 de Jan: Bicicleta Ergométrica - 40min - FC Média 72% - Esforço 5/10" },
      { level: 0, title: "20 de Jan: Sem treino" },
      { level: 0, title: "21 de Jan: Sem treino" },
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

  // Função para obter a classe de cor baseada no nível
  const getLevelClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-700"
      case 1:
        return "bg-emerald-900/30"
      case 2:
        return "bg-emerald-800/40"
      case 3:
        return "bg-emerald-700/60"
      case 4:
        return "bg-emerald-600/70"
      case 5:
        return "bg-emerald-500/80"
      default:
        return "bg-zinc-700"
    }
  }

  return (
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
                          className={`w-4 h-4 rounded-sm border border-zinc-800/20 cursor-pointer transition-transform hover:scale-115 hover:outline hover:outline-2 hover:outline-emerald-500/50 hover:outline-offset-1 hover:z-10 ${getLevelClass(day.level)}`}
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
  )
}
