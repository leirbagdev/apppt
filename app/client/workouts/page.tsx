"use client"

import { useState, useEffect } from "react"
import { Play, Clock, BarChart3, CheckCircle, Circle, Calendar, Filter, Search } from "lucide-react"

function Dumbbell({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
    </svg>
  )
}

// Dados simulados dos treinos
const workoutsData = {
  current: [
    {
      id: 1,
      name: "Treino de Força - Membros Superiores",
      type: "Força",
      duration: "45 min",
      exercises: 8,
      difficulty: "Intermediário",
      scheduled: "Hoje, 16:00",
      status: "pending",
      description: "Foco em peito, ombros e tríceps",
      exercises_list: [
        { name: "Supino reto", sets: "4x10", weight: "60kg" },
        { name: "Desenvolvimento", sets: "3x12", weight: "40kg" },
        { name: "Crucifixo", sets: "3x15", weight: "15kg" },
        { name: "Tríceps testa", sets: "3x12", weight: "30kg" },
      ],
    },
    {
      id: 2,
      name: "Cardio HIIT",
      type: "Cardio",
      duration: "30 min",
      exercises: 6,
      difficulty: "Avançado",
      scheduled: "Amanhã, 07:00",
      status: "pending",
      description: "Treino intervalado de alta intensidade",
      exercises_list: [
        { name: "Burpees", sets: "4x30s", weight: "Peso corporal" },
        { name: "Mountain climbers", sets: "4x30s", weight: "Peso corporal" },
        { name: "Jump squats", sets: "4x30s", weight: "Peso corporal" },
        { name: "High knees", sets: "4x30s", weight: "Peso corporal" },
      ],
    },
    {
      id: 3,
      name: "Treino de Pernas",
      type: "Força",
      duration: "50 min",
      exercises: 10,
      difficulty: "Intermediário",
      scheduled: "Sexta, 18:00",
      status: "pending",
      description: "Quadríceps, glúteos e panturrilhas",
      exercises_list: [
        { name: "Agachamento", sets: "4x12", weight: "70kg" },
        { name: "Leg press", sets: "4x15", weight: "120kg" },
        { name: "Stiff", sets: "3x12", weight: "50kg" },
        { name: "Panturrilha", sets: "4x20", weight: "80kg" },
      ],
    },
  ],
  completed: [
    {
      id: 4,
      name: "Funcional",
      type: "Funcional",
      duration: "40 min",
      exercises: 8,
      difficulty: "Intermediário",
      completed_date: "Ontem",
      status: "completed",
      rating: 4,
    },
    {
      id: 5,
      name: "Cardio Moderado",
      type: "Cardio",
      duration: "35 min",
      exercises: 5,
      difficulty: "Iniciante",
      completed_date: "2 dias atrás",
      status: "completed",
      rating: 5,
    },
    {
      id: 6,
      name: "Treino de Costas",
      type: "Força",
      duration: "45 min",
      exercises: 9,
      difficulty: "Avançado",
      completed_date: "3 dias atrás",
      status: "completed",
      rating: 4,
    },
  ],
}

export default function WorkoutsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"current" | "completed">("current")
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante":
        return "text-green-400 bg-green-500/20"
      case "Intermediário":
        return "text-yellow-400 bg-yellow-500/20"
      case "Avançado":
        return "text-red-400 bg-red-500/20"
      default:
        return "text-gray-400 bg-gray-500/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Força":
        return <Dumbbell className="w-4 h-4" />
      case "Cardio":
        return <BarChart3 className="w-4 h-4" />
      case "Funcional":
        return <Circle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Meus Treinos</h1>
            <p className="text-gray-400">Acompanhe seus treinos prescritos e histórico</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Buscar</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
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
            onClick={() => setActiveTab("current")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "current"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Treinos Atuais ({workoutsData.current.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Concluídos ({workoutsData.completed.length})
          </button>
        </div>
      </div>

      {/* Treinos Atuais */}
      {activeTab === "current" && (
        <div
          className={`
          space-y-4
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {workoutsData.current.map((workout, index) => (
            <div
              key={workout.id}
              className="bg-black border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 text-gray-400">
                      {getTypeIcon(workout.type)}
                      <span className="text-sm">{workout.type}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}
                    >
                      {workout.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{workout.name}</h3>
                  <p className="text-gray-400 mb-3">{workout.description}</p>

                  <div className="flex items-center gap-6 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {workout.exercises} exercícios
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {workout.scheduled}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedWorkout(workout)}
                    className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                  <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                    <Play className="w-4 h-4" />
                    Iniciar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Treinos Concluídos */}
      {activeTab === "completed" && (
        <div
          className={`
          space-y-4
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {workoutsData.completed.map((workout, index) => (
            <div
              key={workout.id}
              className="bg-black border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <div>
                    <h3 className="text-lg font-bold text-white">{workout.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{workout.completed_date}</span>
                      <span>{workout.duration}</span>
                      <span>{workout.exercises} exercícios</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${i < workout.rating ? "bg-yellow-400" : "bg-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(workout.difficulty)}`}
                  >
                    {workout.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de detalhes do treino */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-black border border-gray-800 rounded-3xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">{selectedWorkout.name}</h2>
              <button
                onClick={() => setSelectedWorkout(null)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedWorkout.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell className="w-4 h-4" />
                  {selectedWorkout.exercises} exercícios
                </span>
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-medium ${getDifficultyColor(selectedWorkout.difficulty)}`}
                >
                  {selectedWorkout.difficulty}
                </span>
              </div>

              <p className="text-gray-400">{selectedWorkout.description}</p>

              <div>
                <h3 className="text-lg font-bold text-white mb-4">Exercícios</h3>
                <div className="space-y-3">
                  {selectedWorkout.exercises_list?.map((exercise: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                      <div>
                        <h4 className="text-white font-medium">{exercise.name}</h4>
                        <p className="text-gray-400 text-sm">{exercise.sets}</p>
                      </div>
                      <span className="text-green-400 font-medium">{exercise.weight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedWorkout(null)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-colors"
                >
                  Fechar
                </button>
                <button className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" />
                  Iniciar Treino
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
