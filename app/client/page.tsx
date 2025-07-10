"use client"

import { useState, useEffect } from "react"
import { Play, Calendar, Trophy, Flame, Clock, Target, TrendingUp, CheckCircle, Circle } from "lucide-react"

// Dados simulados
const clientData = {
  name: "Ana Carolina",
  trainer: "Dr. Silva",
  currentStreak: 7,
  totalWorkouts: 45,
  weeklyGoal: 4,
  completedThisWeek: 3,
  achievements: 12,
  nextWorkout: {
    id: 1,
    name: "Treino de Força - Membros Superiores",
    duration: "45 min",
    exercises: 8,
    difficulty: "Intermediário",
    scheduled: "Hoje, 16:00",
  },
  recentWorkouts: [
    { id: 1, name: "Cardio HIIT", date: "Ontem", completed: true, duration: "30 min" },
    { id: 2, name: "Força - Pernas", date: "2 dias atrás", completed: true, duration: "50 min" },
    { id: 3, name: "Funcional", date: "3 dias atrás", completed: true, duration: "40 min" },
  ],
  weeklyGoals: [
    { name: "Treinos Semanais", current: 3, target: 4, icon: Dumbbell },
    { name: "Minutos Ativos", current: 180, target: 240, icon: Clock },
    { name: "Calorias Queimadas", current: 850, target: 1200, icon: Flame },
  ],
}

function Dumbbell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
    </svg>
  )
}

// Subcomponentes extraídos para melhor organização

function Header({ name, trainer }: { name: string; trainer: string }) {
  return (
    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl p-6 border border-green-500/30">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Olá, {name}! 👋</h1>
          <p className="text-gray-300">
            Seu personal trainer <span className="text-green-400 font-medium">{trainer}</span> preparou
            novos treinos para você
          </p>
        </div>
        <div className="hidden sm:block">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCards({ stats }: { stats: Array<{ title: string; value: string | number; icon: any; color: string }> }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 ease-out delay-100">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-black border border-gray-800 rounded-2xl p-4 hover:border-gray-700 transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon
              className={`w-6 h-6 ${
                stat.color === "orange"
                  ? "text-orange-400"
                  : stat.color === "green"
                  ? "text-green-400"
                  : stat.color === "yellow"
                  ? "text-yellow-400"
                  : "text-blue-400"
              }`}
            />
            <div
              className={`w-2 h-2 rounded-full ${
                stat.color === "orange"
                  ? "bg-orange-400"
                  : stat.color === "green"
                  ? "bg-green-400"
                  : stat.color === "yellow"
                  ? "bg-yellow-400"
                  : "bg-blue-400"
              }`}
            />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.title}</div>
        </div>
      ))}
    </div>
  )
}

function NextWorkout({ workout }: { workout: typeof clientData.nextWorkout }) {
  return (
    <div className="bg-black border border-gray-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Próximo Treino</h2>
        <Calendar className="w-5 h-5 text-gray-400" />
      </div>
      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{workout.name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {workout.duration}
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-4 h-4" />
                {workout.exercises} exercícios
              </span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs">
                {workout.difficulty}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-green-400 font-medium text-sm">{workout.scheduled}</div>
          </div>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
          <Play className="w-5 h-5" />
          Iniciar Treino
        </button>
      </div>
    </div>
  )
}

function WeeklyGoals({ goals }: { goals: typeof clientData.weeklyGoals }) {
  return (
    <div className="bg-black border border-gray-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Metas da Semana</h2>
        <Target className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <goal.icon className="w-4 h-4 text-gray-400" />
                  <span className="text-white text-sm font-medium">{goal.name}</span>
                </div>
                <span className="text-gray-300 text-sm">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
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
  )
}

function RecentWorkouts({ workouts }: { workouts: typeof clientData.recentWorkouts }) {
  return (
    <div className="bg-black border border-gray-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Treinos Recentes</h2>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-3">
        {workouts.map((workout) => (
          <div
            key={workout.id}
            className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              {workout.completed ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <h3 className="text-white font-medium">{workout.name}</h3>
                <p className="text-gray-400 text-sm">
                  {workout.date} • {workout.duration}
                </p>
              </div>
            </div>
            <div className="text-right">
              {workout.completed && <span className="text-green-400 text-sm font-medium">Concluído</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientDashboard() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const stats = [
    { title: "Sequência", value: `${clientData.currentStreak} dias`, icon: Flame, color: "orange" },
    { title: "Treinos Totais", value: clientData.totalWorkouts, icon: Dumbbell, color: "green" },
    { title: "Conquistas", value: clientData.achievements, icon: Trophy, color: "yellow" },
    {
      title: "Meta Semanal",
      value: `${clientData.completedThisWeek}/${clientData.weeklyGoal}`,
      icon: Target,
      color: "blue",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header de boas-vindas */}
      <div
        className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <Header name={clientData.name} trainer={clientData.trainer} />
      </div>

      {/* Cards de estatísticas rápidas */}
      <div
        className={`transition-all duration-700 ease-out delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <StatCards stats={stats} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Próximo treino */}
        <div
          className={`lg:col-span-2 transition-all duration-700 ease-out delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <NextWorkout workout={clientData.nextWorkout} />
        </div>
        {/* Metas da semana */}
        <div
          className={`transition-all duration-700 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <WeeklyGoals goals={clientData.weeklyGoals} />
        </div>
      </div>

      {/* Treinos recentes */}
      <div
        className={`transition-all duration-700 ease-out delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <RecentWorkouts workouts={clientData.recentWorkouts} />
      </div>
    </div>
  )
}
