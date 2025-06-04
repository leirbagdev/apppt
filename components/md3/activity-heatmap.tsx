"use client"

import type React from "react"
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Dumbbell } from "lucide-react"
import { Card } from "./card"
import { Tooltip } from "@mui/material"

interface ActivityHeatmapProps {
  title?: string
  icon?: React.ReactNode
  data: {
    date: Date
    value: number
  }[]
  days?: number
  colorScheme?: "green" | "blue" | "purple" | "orange"
  showStreak?: boolean
}

export default function ActivityHeatmap({
  title = "Exercício",
  icon = <Dumbbell className="h-5 w-5 mr-2" />,
  data = [],
  days = 30,
  colorScheme = "green",
  showStreak = true,
}: ActivityHeatmapProps) {
  const today = new Date()
  const startDate = subDays(today, days - 1)

  // Gerar intervalo de dias
  const dateRange = eachDayOfInterval({
    start: startDate,
    end: today,
  })

  // Calcular o streak atual (dias consecutivos até hoje)
  const calculateStreak = () => {
    let streak = 0
    let currentDate = today

    while (true) {
      const hasActivity = data.some((item) => item.value > 0 && isSameDay(item.date, currentDate))

      if (!hasActivity) break

      streak++
      currentDate = subDays(currentDate, 1)
    }

    return streak
  }

  const currentStreak = calculateStreak()

  // Mapear cores com base no esquema de cores
  const getColorScheme = () => {
    switch (colorScheme) {
      case "blue":
        return ["#e6f7ff", "#bae7ff", "#91d5ff", "#69c0ff", "#40a9ff"]
      case "purple":
        return ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de"]
      case "orange":
        return ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940"]
      case "green":
      default:
        return ["#e6f7ec", "#b3e6c9", "#7fd4a4", "#4cc27d", "#2bb158"]
    }
  }

  const colors = getColorScheme()

  // Função para obter a cor com base no valor
  const getColor = (value: number) => {
    if (value === 0) return "bg-gray-800 dark:bg-gray-700"
    if (value < 0.25) return `bg-[${colors[0]}]`
    if (value < 0.5) return `bg-[${colors[1]}]`
    if (value < 0.75) return `bg-[${colors[2]}]`
    if (value < 1) return `bg-[${colors[3]}]`
    return `bg-[${colors[4]}]`
  }

  // Função para obter o estilo inline (para garantir que as cores personalizadas funcionem)
  const getColorStyle = (value: number) => {
    if (value === 0) return {}
    if (value < 0.25) return { backgroundColor: colors[0] }
    if (value < 0.5) return { backgroundColor: colors[1] }
    if (value < 0.75) return { backgroundColor: colors[2] }
    if (value < 1) return { backgroundColor: colors[3] }
    return { backgroundColor: colors[4] }
  }

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center mb-2">
        <div className="flex items-center text-lg font-medium">
          {icon}
          {title}
        </div>
        {showStreak && currentStreak > 0 && (
          <div className="ml-2 text-sm text-muted-foreground">
            {currentStreak} {currentStreak === 1 ? "dia" : "dias"} seguidos
          </div>
        )}
      </div>

      <div className="grid grid-cols-15 md:grid-cols-30 gap-1 mt-2">
        {dateRange.map((date, i) => {
          const activity = data.find((d) => isSameDay(d.date, date))
          const value = activity ? activity.value : 0

          return (
            <Tooltip
              key={i}
              title={`${format(date, "dd 'de' MMMM", { locale: ptBR })}: ${
                value > 0 ? "Atividade realizada" : "Sem atividade"
              }`}
              arrow
            >
              <div
                className={`aspect-square rounded-sm transition-all hover:scale-110 cursor-pointer ${
                  value === 0 ? "bg-gray-800 dark:bg-gray-700" : ""
                }`}
                style={value > 0 ? getColorStyle(value) : {}}
              />
            </Tooltip>
          )
        })}
      </div>

      <div className="flex justify-end mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>Menos</span>
          <div className="bg-gray-800 dark:bg-gray-700 w-3 h-3 rounded-sm"></div>
          {colors.map((color, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }}></div>
          ))}
          <span>Mais</span>
        </div>
      </div>
    </Card>
  )
}

// Exportação nomeada para compatibilidade com código existente
export { ActivityHeatmap }
