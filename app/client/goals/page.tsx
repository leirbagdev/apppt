"use client"

import { useState, useEffect } from "react"
import { Target, Trophy, Calendar, TrendingUp, CheckCircle, Clock, Flame } from "lucide-react"

function Dumbbell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
    </svg>
  )
}

// Dados simulados das metas
const goalsData = {
  active: [
    {
      id: 1,
      title: "Treinos Semanais",
      description: "Complete 4 treinos por semana",
      type: "weekly",
      current: 3,
      target: 4,
      deadline: "Domingo",
      icon: Dumbbell,
      color: "green",
      progress: 75,
    },
    {
      id: 2,
      title: "Sequência de 30 Dias",
      description: "Mantenha uma sequência de 30 dias consecutivos",
      type: "streak",
      current: 7,
      target: 30,
      deadline: "23 dias restantes",
      icon: Flame,
      color: "orange",
      progress: 23,
    },
    {
      id: 3,
      title: "Minutos Ativos Mensais",
      description: "Acumule 1000 minutos de atividade no mês",
      type: "monthly",
      current: 680,
      target: 1000,
      deadline: "15 dias restantes",
      icon: Clock,
      color: "blue",
      progress: 68,
    },
    {
      id: 4,
      title: "Perda de Peso",
      description: "Perder 3kg até o final do mês",
      type: "weight",
      current: 1.5,
      target: 3,
      deadline: "15 dias restantes",
      icon: TrendingUp,
      color: "purple",
      progress: 50,
    },
  ],
  completed: [
    {
      id: 5,
      title: "Primeira Semana Completa",
      description: "Complete 4 treinos na primeira semana",
      completedDate: "Semana passada",
      icon: CheckCircle,
      color: "green",
      reward: "Badge de Iniciante",
    },
    {
      id: 6,
      title: "10 Treinos Totais",
      description: "Complete seus primeiros 10 treinos",
      completedDate: "2 semanas atrás",
      icon: Trophy,
      color: "yellow",
      reward: "Badge de Dedicação",
    },
    {
      id: 7,
      title: "Sequência de 7 Dias",
      description: "Mantenha 7 dias consecutivos de treino",
      completedDate: "1 semana atrás",
      icon: Flame,
      color: "orange",
      reward: "Badge de Consistência",
    },
  ],
}

// Badges/Conquistas
const badges = [
  { id: 1, name: "Iniciante", description: "Primeiro treino completo", icon: "🎯", rarity: "common", unlocked: true },
  { id: 2, name: "Dedicação", description: "10 treinos completados", icon: "💪", rarity: "common", unlocked: true },
  { id: 3, name: "Consistência", description: "7 dias consecutivos", icon: "🔥", rarity: "rare", unlocked: true },
  {
    id: 4,
    name: "Guerreiro",
    description: "30 dias consecutivos",
    icon: "⚔️",
    rarity: "epic",
    unlocked: false,
    progress: 23,
  },
  {
    id: 5,
    name: "Lenda",
    description: "100 treinos completados",
    icon: "👑",
    rarity: "legendary",
    unlocked: false,
    progress: 45,
  },
  {
    id: 6,
    name: "Maratonista",
    description: "1000 minutos mensais",
    icon: "🏃",
    rarity: "rare",
    unlocked: false,
    progress: 68,
  },
]

export default function GoalsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "badges">("active")

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "blue":
        return "text-blue-400 bg-blue-500/20 border-blue-500/30"
      case "orange":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "purple":
        return "text-purple-400 bg-purple-500/20 border-purple-500/30"
      case "yellow":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 bg-gray-500/20"
      case "rare":
        return "text-blue-400 bg-blue-500/20"
      case "epic":
        return "text-purple-400 bg-purple-500/20"
      case "legendary":
        return "text-yellow-400 bg-yellow-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Metas & Conquistas</h1>
            <p className="text-gray-400">Acompanhe seu progresso e desbloqueie conquistas</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className={`
        transition-all duration-700 ease-out delay-100
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      >
        <div className="flex bg-gray-900 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "active"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Metas Ativas ({goalsData.active.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Concluídas ({goalsData.completed.length})
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "badges"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Badges ({badges.filter((b) => b.unlocked).length}/{badges.length})
          </button>
        </div>
      </div>

      {/* Metas Ativas */}
      {activeTab === "active" && (
        <div
          className={`
          grid md:grid-cols-2 gap-6
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {goalsData.active.map((goal, index) => (
            <div
              key={goal.id}
              className={`bg-black border rounded-3xl p-6 hover:scale-105 transition-all duration-300 ${getColorClasses(goal.color)}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <goal.icon className={`w-6 h-6 ${getColorClasses(goal.color).split(" ")[0]}`} />
                  <div>
                    <h3 className="text-white font-bold text-lg">{goal.title}</h3>
                    <p className="text-gray-400 text-sm">{goal.description}</p>
                  </div>
                </div>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">
                    {goal.current} / {goal.target}
                    {goal.type === "weekly" && " treinos"}
                    {goal.type === "streak" && " dias"}
                    {goal.type === "monthly" && " min"}
                    {goal.type === "weight" && " kg"}
                  </span>
                  <span className={`text-sm ${getColorClasses(goal.color).split(" ")[0]}`}>{goal.progress}%</span>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getColorClasses(goal.color).split(" ")[1]}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Prazo: {goal.deadline}</span>
                  {goal.progress >= 75 && <span className="text-green-400 font-medium">Quase lá! 🎯</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Metas Concluídas */}
      {activeTab === "completed" && (
        <div
          className={`
          space-y-4
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {goalsData.completed.map((goal, index) => (
            <div key={goal.id} className={`bg-black border rounded-3xl p-6 ${getColorClasses(goal.color)}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <goal.icon className={`w-6 h-6 ${getColorClasses(goal.color).split(" ")[0]}`} />
                  <div>
                    <h3 className="text-white font-bold text-lg">{goal.title}</h3>
                    <p className="text-gray-400">{goal.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-medium">✓ Concluída</div>
                  <div className="text-gray-400 text-sm">{goal.completedDate}</div>
                  <div className="text-yellow-400 text-sm">🏆 {goal.reward}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Badges */}
      {activeTab === "badges" && (
        <div
          className={`
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge, index) => (
              <div
                key={badge.id}
                className={`
                  bg-black border border-gray-800 rounded-2xl p-4 text-center transition-all duration-300
                  ${badge.unlocked ? "hover:scale-105 hover:border-gray-600" : "opacity-60"}
                `}
              >
                <div className="text-4xl mb-3 filter">
                  {badge.unlocked ? (
                    <span style={{ filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))" }}>{badge.icon}</span>
                  ) : (
                    <span className="grayscale">{badge.icon}</span>
                  )}
                </div>

                <h3 className={`font-bold mb-1 ${badge.unlocked ? "text-white" : "text-gray-500"}`}>{badge.name}</h3>

                <p className={`text-xs mb-3 ${badge.unlocked ? "text-gray-400" : "text-gray-600"}`}>
                  {badge.description}
                </p>

                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                  {badge.rarity === "common" && "Comum"}
                  {badge.rarity === "rare" && "Raro"}
                  {badge.rarity === "epic" && "Épico"}
                  {badge.rarity === "legendary" && "Lendário"}
                </span>

                {!badge.unlocked && badge.progress && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${(badge.progress / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{badge.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
