"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { TrendingUp, Target, BarChart3, Activity, Clock, Flame } from "lucide-react"
import { format, startOfYear, endOfYear, eachDayOfInterval, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"

// Gerar dados de atividade para o cliente
const generateClientActivityData = () => {
  const currentYear = new Date().getFullYear()
  const startDate = startOfYear(new Date(currentYear, 0, 1))
  const endDate = endOfYear(new Date(currentYear, 11, 31))
  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  return allDays.map((date) => ({
    date,
    value: Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0,
    exercises: Math.floor(Math.random() * 8) + 3,
    duration: Math.floor(Math.random() * 60) + 30,
  }))
}

export default function ProgressPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activityData, setActivityData] = useState<any[]>([])
  const [tooltip, setTooltip] = useState<any>({ visible: false, x: 0, y: 0, content: {} })

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    setActivityData(generateClientActivityData())
    return () => clearTimeout(timer)
  }, [])

  const handleMouseEnter = (event: React.MouseEvent, day: any) => {
    if (!day) return

    const rect = event.currentTarget.getBoundingClientRect()
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft
    const scrollY = window.pageYOffset || document.documentElement.scrollTop

    setTooltip({
      visible: true,
      x: rect.left + scrollX + rect.width / 2,
      y: rect.top + scrollY - 10,
      content: {
        date: format(day.date, "dd 'de' MMMM", { locale: ptBR }),
        activities: day.value,
        exercises: day.exercises,
        duration: day.duration,
      },
    })
  }

  const handleMouseLeave = () => {
    setTooltip((prev: any) => ({ ...prev, visible: false }))
  }

  // Organizar dados por semana
  const organizeDataByWeeks = () => {
    const weeks: any[] = []
    let currentWeek: any[] = new Array(7).fill(null)

    activityData.forEach((day, index) => {
      const dayOfWeek = getDay(day.date)
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

      currentWeek[adjustedDayOfWeek] = day

      if (dayOfWeek === 0 || index === activityData.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = new Array(7).fill(null)
      }
    })

    return weeks
  }

  const weeks = organizeDataByWeeks()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"]

  const getColor = (value: number) => {
    switch (value) {
      case 0:
        return "bg-black"
      case 1:
        return "bg-green-900"
      case 2:
        return "bg-green-700"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      default:
        return "bg-black"
    }
  }

  // Calcular estatísticas
  const totalWorkouts = activityData.filter((d) => d.value > 0).length
  const currentStreak = (() => {
    let streak = 0
    for (let i = activityData.length - 1; i >= 0; i--) {
      if (activityData[i].value > 0) streak++
      else break
    }
    return streak
  })()
  const consistency = Math.round((totalWorkouts / activityData.length) * 100)
  const totalMinutes = activityData.reduce((sum, d) => sum + (d.value > 0 ? d.duration : 0), 0)

  return (
    <div className="space-y-6">
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 pointer-events-none transition-opacity duration-200"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-black border border-green-500/30 rounded-xl p-3 shadow-2xl shadow-green-500/20 backdrop-blur-sm max-w-xs">
            <div className="text-white font-semibold text-sm mb-1">{tooltip.content.date}</div>
            {tooltip.content.activities > 0 ? (
              <>
                <div className="text-green-400 font-bold text-lg mb-1">
                  {tooltip.content.activities} {tooltip.content.activities === 1 ? "treino" : "treinos"}
                </div>
                <div className="text-gray-300 text-xs mb-1">{tooltip.content.exercises} exercícios</div>
                <div className="text-gray-400 text-xs">{tooltip.content.duration} minutos</div>
              </>
            ) : (
              <div className="text-gray-400 text-sm">Sem atividade</div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meu Progresso</h1>
            <p className="text-gray-400">Acompanhe sua evolução e consistência</p>
          </div>
        </div>
      </div>

      {/* Cards de estatísticas */}
      <div
        className={`
        grid grid-cols-2 lg:grid-cols-4 gap-4
        transition-all duration-700 ease-out delay-100
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      >
        {[
          { title: "Treinos Totais", value: totalWorkouts, icon: BarChart3, color: "green" },
          { title: "Sequência Atual", value: `${currentStreak} dias`, icon: Flame, color: "orange" },
          { title: "Consistência", value: `${consistency}%`, icon: Target, color: "blue" },
          {
            title: "Minutos Ativos",
            value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
            icon: Clock,
            color: "purple",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-black border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <stat.icon
                className={`w-6 h-6 ${
                  stat.color === "green"
                    ? "text-green-400"
                    : stat.color === "orange"
                      ? "text-orange-400"
                      : stat.color === "blue"
                        ? "text-blue-400"
                        : "text-purple-400"
                }`}
              />
              <div
                className={`w-2 h-2 rounded-full ${
                  stat.color === "green"
                    ? "bg-green-400"
                    : stat.color === "orange"
                      ? "bg-orange-400"
                      : stat.color === "blue"
                        ? "bg-blue-400"
                        : "bg-purple-400"
                }`}
              />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.title}</div>
          </div>
        ))}
      </div>

      {/* Heatmap de atividades */}
      <div
        className={`
        bg-black border border-gray-800 rounded-3xl p-6
        transition-all duration-700 ease-out delay-200
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Atividade do Ano</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-fit mx-auto">
            {/* Cabeçalho dos meses */}
            <div className="flex mb-2">
              <div className="w-8 flex-shrink-0"></div>
              <div className="flex gap-1">
                {months.map((month, index) => (
                  <div key={index} className="text-xs text-gray-400 w-12 text-center">
                    {month}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid principal */}
            <div className="flex">
              {/* Labels dos dias da semana */}
              <div className="flex flex-col mr-2 w-8 flex-shrink-0">
                {weekDays.map((day, index) => (
                  <div key={index} className="h-3 flex items-center mb-1">
                    <span className="text-xs text-gray-400">{day}</span>
                  </div>
                ))}
              </div>

              {/* Grid de atividades */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`
                          w-3 h-3 cursor-pointer transition-all duration-300
                          ${day ? getColor(day.value) : "bg-black"} 
                          hover:scale-125 hover:z-20 relative
                          ${day && day.value > 0 ? "shadow-sm shadow-green-500/30" : ""}
                        `}
                        onMouseEnter={(e) => handleMouseEnter(e, day)}
                        onMouseLeave={handleMouseLeave}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-400">2025</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Menos</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-black"></div>
                  <div className="w-3 h-3 bg-green-900"></div>
                  <div className="w-3 h-3 bg-green-700"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                  <div className="w-3 h-3 bg-green-400"></div>
                </div>
                <span className="text-xs text-gray-400">Mais</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de progresso semanal */}
      <div
        className={`
        bg-black border border-gray-800 rounded-3xl p-6
        transition-all duration-700 ease-out delay-300
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Progresso Semanal</h2>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Últimas 4 semanas */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Últimas 4 Semanas</h3>
            <div className="space-y-3">
              {[
                { week: "Esta semana", workouts: 3, target: 4, progress: 75 },
                { week: "Semana passada", workouts: 4, target: 4, progress: 100 },
                { week: "2 semanas atrás", workouts: 2, target: 4, progress: 50 },
                { week: "3 semanas atrás", workouts: 4, target: 4, progress: 100 },
              ].map((week, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white text-sm">{week.week}</span>
                    <span className="text-gray-300 text-sm">
                      {week.workouts}/{week.target} treinos
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${week.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metas mensais */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Metas do Mês</h3>
            <div className="space-y-4">
              {[
                { name: "Treinos", current: 12, target: 16, unit: "" },
                { name: "Minutos", current: 680, target: 1000, unit: "min" },
                { name: "Calorias", current: 2400, target: 3200, unit: "kcal" },
              ].map((goal, index) => {
                const progress = (goal.current / goal.target) * 100
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white text-sm">{goal.name}</span>
                      <span className="text-gray-300 text-sm">
                        {goal.current}/{goal.target} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400">{Math.round(progress)}% completo</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
