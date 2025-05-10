"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { PlusIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon, BookmarkIcon } from "@heroicons/react/24/outline"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function ExerciseLibrary() {
  const [categories] = useState({
    Exercícios: [
      {
        id: 1,
        content: <ExercisesTab />,
      },
    ],
    "Treinos Prontos": [
      {
        id: 1,
        content: <WorkoutsTab />,
      },
    ],
    "Meus Treinos": [
      {
        id: 1,
        content: <MyWorkoutsTab />,
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Biblioteca de Exercícios</h2>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            <PlusIcon className="h-4 w-4" />
            Novo Treino
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar exercícios, treinos, músculos..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-700">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
          Filtros
        </button>
      </div>

      <div className="rounded-xl bg-zinc-800 p-4">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-zinc-700/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                    "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-emerald-600 text-white shadow"
                      : "text-zinc-400 hover:bg-zinc-700/30 hover:text-white",
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-zinc-800 p-3",
                  "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                )}
              >
                {posts[0].content}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

function ExercisesTab() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [selectedDifficulty, setSelectedDifficulty] = useState("Todos")
  const [selectedEquipment, setSelectedEquipment] = useState("Todos")

  const categories = [
    "Todos",
    "Peito",
    "Costas",
    "Pernas",
    "Ombros",
    "Braços",
    "Abdômen",
    "Glúteos",
    "Cardio",
    "Alongamento",
  ]

  const difficulties = ["Todos", "Iniciante", "Intermediário", "Avançado"]

  const equipments = ["Todos", "Sem Equipamento", "Halteres", "Barras", "Máquinas", "Elásticos", "Kettlebell"]

  const exercises = [
    {
      id: 1,
      name: "Supino Reto",
      category: "Peito",
      difficulty: "Intermediário",
      equipment: "Barras",
      muscles: ["Peitoral", "Tríceps", "Deltóide Anterior"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: true,
    },
    {
      id: 2,
      name: "Agachamento",
      category: "Pernas",
      difficulty: "Intermediário",
      equipment: "Barras",
      muscles: ["Quadríceps", "Glúteos", "Isquiotibiais"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: true,
    },
    {
      id: 3,
      name: "Puxada Alta",
      category: "Costas",
      difficulty: "Iniciante",
      equipment: "Máquinas",
      muscles: ["Latíssimo do Dorso", "Bíceps", "Rombóides"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 4,
      name: "Desenvolvimento com Halteres",
      category: "Ombros",
      difficulty: "Intermediário",
      equipment: "Halteres",
      muscles: ["Deltóide", "Trapézio", "Tríceps"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 5,
      name: "Rosca Direta",
      category: "Braços",
      difficulty: "Iniciante",
      equipment: "Barras",
      muscles: ["Bíceps", "Antebraço"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: true,
    },
    {
      id: 6,
      name: "Prancha",
      category: "Abdômen",
      difficulty: "Iniciante",
      equipment: "Sem Equipamento",
      muscles: ["Abdômen", "Lombar", "Ombros"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 7,
      name: "Elevação Pélvica",
      category: "Glúteos",
      difficulty: "Iniciante",
      equipment: "Sem Equipamento",
      muscles: ["Glúteos", "Isquiotibiais", "Lombar"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 8,
      name: "Corrida na Esteira",
      category: "Cardio",
      difficulty: "Intermediário",
      equipment: "Máquinas",
      muscles: ["Quadríceps", "Isquiotibiais", "Panturrilha"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 9,
      name: "Alongamento de Isquiotibiais",
      category: "Alongamento",
      difficulty: "Iniciante",
      equipment: "Sem Equipamento",
      muscles: ["Isquiotibiais", "Lombar"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 10,
      name: "Flexão de Braço",
      category: "Peito",
      difficulty: "Intermediário",
      equipment: "Sem Equipamento",
      muscles: ["Peitoral", "Tríceps", "Deltóide Anterior"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: true,
    },
    {
      id: 11,
      name: "Leg Press",
      category: "Pernas",
      difficulty: "Intermediário",
      equipment: "Máquinas",
      muscles: ["Quadríceps", "Glúteos", "Isquiotibiais"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
    {
      id: 12,
      name: "Remada Curvada",
      category: "Costas",
      difficulty: "Avançado",
      equipment: "Barras",
      muscles: ["Latíssimo do Dorso", "Trapézio", "Rombóides"],
      image: "/placeholder.svg?height=150&width=200",
      favorite: false,
    },
  ]

  const filteredExercises = exercises.filter((exercise) => {
    return (
      (selectedCategory === "Todos" || exercise.category === selectedCategory) &&
      (selectedDifficulty === "Todos" || exercise.difficulty === selectedDifficulty) &&
      (selectedEquipment === "Todos" || exercise.equipment === selectedEquipment)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-400">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-400">Dificuldade</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-400">Equipamento</label>
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {equipments.map((equipment) => (
              <option key={equipment} value={equipment}>
                {equipment}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="overflow-hidden rounded-lg bg-zinc-700/30">
            <div className="relative">
              <img
                src={exercise.image || "/placeholder.svg"}
                alt={exercise.name}
                className="h-40 w-full object-cover"
              />
              <button
                className={`absolute right-2 top-2 rounded-full p-1 ${
                  exercise.favorite ? "bg-amber-500 text-white" : "bg-zinc-800/80 text-zinc-400"
                }`}
              >
                <BookmarkIcon className="h-5 w-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                <span className="rounded-full bg-zinc-800/80 px-2 py-1 text-xs font-medium">{exercise.category}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium">{exercise.name}</h3>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs">{exercise.difficulty}</span>
                <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs">{exercise.equipment}</span>
              </div>
              <div className="mt-2">
                <p className="text-xs text-zinc-400">Músculos: {exercise.muscles.join(", ")}</p>
              </div>
              <div className="mt-3 flex justify-between">
                <button className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700">
                  Ver Detalhes
                </button>
                <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <div className="rounded-lg bg-zinc-700/30 p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-12 w-12 text-zinc-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium">Nenhum exercício encontrado</h3>
          <p className="mt-1 text-sm text-zinc-400">Tente ajustar os filtros para encontrar o que procura.</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          Mostrando {filteredExercises.length} de {exercises.length} exercícios
        </div>
        <div className="flex items-center space-x-2">
          <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-700">
            Anterior
          </button>
          <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-700">
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}

function WorkoutsTab() {
  const workouts = [
    {
      id: 1,
      name: "Iniciante - Full Body",
      description: "Treino completo para iniciantes focado em adaptação muscular",
      level: "Iniciante",
      duration: "45-60 min",
      frequency: "3x por semana",
      exercises: 8,
      image: "/placeholder.svg?height=150&width=200",
      category: "Musculação",
    },
    {
      id: 2,
      name: "Intermediário - Upper/Lower Split",
      description: "Divisão de treino para parte superior e inferior do corpo",
      level: "Intermediário",
      duration: "60-75 min",
      frequency: "4x por semana",
      exercises: 12,
      image: "/placeholder.svg?height=150&width=200",
      category: "Musculação",
    },
    {
      id: 3,
      name: "Avançado - Push/Pull/Legs",
      description: "Divisão clássica para hipertrofia e força",
      level: "Avançado",
      duration: "75-90 min",
      frequency: "6x por semana",
      exercises: 18,
      image: "/placeholder.svg?height=150&width=200",
      category: "Musculação",
    },
    {
      id: 4,
      name: "HIIT - Queima Calórica",
      description: "Treino intervalado de alta intensidade para queima de gordura",
      level: "Intermediário",
      duration: "30 min",
      frequency: "3-4x por semana",
      exercises: 10,
      image: "/placeholder.svg?height=150&width=200",
      category: "Cardio",
    },
    {
      id: 5,
      name: "Mobilidade e Recuperação",
      description: "Foco em alongamento e mobilidade para recuperação muscular",
      level: "Todos os níveis",
      duration: "30-45 min",
      frequency: "2-3x por semana",
      exercises: 12,
      image: "/placeholder.svg?height=150&width=200",
      category: "Mobilidade",
    },
    {
      id: 6,
      name: "Core e Estabilidade",
      description: "Fortalecimento do core e melhora da estabilidade",
      level: "Intermediário",
      duration: "45 min",
      frequency: "2-3x por semana",
      exercises: 10,
      image: "/placeholder.svg?height=150&width=200",
      category: "Funcional",
    },
    {
      id: 7,
      name: "Treino para Idosos",
      description: "Exercícios adaptados para a terceira idade",
      level: "Iniciante",
      duration: "30-45 min",
      frequency: "3x por semana",
      exercises: 8,
      image: "/placeholder.svg?height=150&width=200",
      category: "Especial",
    },
    {
      id: 8,
      name: "Treino para Gestantes",
      description: "Exercícios seguros para gestantes",
      level: "Todos os níveis",
      duration: "30-45 min",
      frequency: "2-3x por semana",
      exercises: 10,
      image: "/placeholder.svg?height=150&width=200",
      category: "Especial",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500">Todos</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Musculação</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Cardio</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Funcional</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Mobilidade</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Especial</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {workouts.map((workout) => (
          <div key={workout.id} className="flex overflow-hidden rounded-lg bg-zinc-700/30">
            <div className="h-auto w-1/3">
              <img
                src={workout.image || "/placeholder.svg"}
                alt={workout.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-2/3 flex-col p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-medium">{workout.name}</h3>
                <span className="rounded-full bg-zinc-800 px-2 py-1 text-xs">{workout.category}</span>
              </div>
              <p className="mb-2 text-sm text-zinc-300">{workout.description}</p>
              <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-zinc-400">
                <div>
                  <span className="font-medium">Nível:</span> {workout.level}
                </div>
                <div>
                  <span className="font-medium">Duração:</span> {workout.duration}
                </div>
                <div>
                  <span className="font-medium">Frequência:</span> {workout.frequency}
                </div>
                <div>
                  <span className="font-medium">Exercícios:</span> {workout.exercises}
                </div>
              </div>
              <div className="mt-auto flex justify-between">
                <button className="rounded-lg bg-zinc-800 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-700">
                  Ver Detalhes
                </button>
                <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
                  Usar Treino
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MyWorkoutsTab() {
  const myWorkouts = [
    {
      id: 1,
      name: "Treino A - Mariano",
      description: "Foco em peito, ombros e tríceps",
      client: "Mariano",
      lastUpdated: "10/04/2025",
      exercises: 8,
      status: "Ativo",
    },
    {
      id: 2,
      name: "Treino B - Mariano",
      description: "Foco em costas e bíceps",
      client: "Mariano",
      lastUpdated: "10/04/2025",
      exercises: 7,
      status: "Ativo",
    },
    {
      id: 3,
      name: "Treino C - Mariano",
      description: "Foco em pernas e abdômen",
      client: "Mariano",
      lastUpdated: "10/04/2025",
      exercises: 9,
      status: "Ativo",
    },
    {
      id: 4,
      name: "Treino A - Flávio",
      description: "Full body para iniciante",
      client: "Flávio",
      lastUpdated: "08/04/2025",
      exercises: 10,
      status: "Ativo",
    },
    {
      id: 5,
      name: "Treino B - Flávio",
      description: "Full body para iniciante",
      client: "Flávio",
      lastUpdated: "08/04/2025",
      exercises: 10,
      status: "Ativo",
    },
    {
      id: 6,
      name: "Treino Natação - Leonardo",
      description: "Técnica e resistência",
      client: "Leonardo",
      lastUpdated: "05/04/2025",
      exercises: 6,
      status: "Ativo",
    },
    {
      id: 7,
      name: "Treino Antigo - Ana",
      description: "Treino de adaptação",
      client: "Ana",
      lastUpdated: "15/02/2025",
      exercises: 8,
      status: "Arquivado",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button className="rounded-lg bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500">
          Todos os Treinos
        </button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Ativos</button>
        <button className="rounded-lg bg-zinc-700 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-600">Arquivados</button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Nome do Treino
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Cliente
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Descrição
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Exercícios
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Última Atualização
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {myWorkouts.map((workout) => (
              <tr key={workout.id} className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{workout.name}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.client}</td>
                <td className="px-4 py-3 text-sm">{workout.description}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.exercises}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.lastUpdated}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      workout.status === "Ativo" ? "bg-emerald-500/10 text-emerald-500" : "bg-zinc-500/10 text-zinc-500"
                    }`}
                  >
                    {workout.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <div className="flex space-x-2">
                    <button className="rounded-lg bg-zinc-700 p-1 text-zinc-300 hover:bg-zinc-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <button className="rounded-lg bg-zinc-700 p-1 text-zinc-300 hover:bg-zinc-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <button className="rounded-lg bg-zinc-700 p-1 text-zinc-300 hover:bg-zinc-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                        />
                      </svg>
                    </button>
                    <button className="rounded-lg bg-red-900/20 p-1 text-red-400 hover:bg-red-900/40">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-6">
        <h3 className="mb-4 text-lg font-medium">Criar Novo Treino</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="workout-name" className="block text-sm font-medium text-zinc-300">
              Nome do Treino
            </label>
            <input
              type="text"
              id="workout-name"
              placeholder="Ex: Treino A - Hipertrofia"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-zinc-300">
              Cliente
            </label>
            <select
              id="client"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option>Selecione um cliente</option>
              <option>Mariano</option>
              <option>Flávio</option>
              <option>Leonardo</option>
              <option>Ana</option>
              <option>Carlos</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-zinc-300">
              Descrição
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Descreva o objetivo e foco do treino"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            ></textarea>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Criar e Adicionar Exercícios
          </button>
        </div>
      </div>
    </div>
  )
}

function ExerciseDetail() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-zinc-800 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Supino Reto</h2>
          <button className="rounded-full bg-zinc-700 p-2 text-zinc-400 hover:bg-zinc-600 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Supino Reto"
              className="h-64 w-full rounded-lg object-cover"
            />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-lg bg-zinc-700/50 p-3 text-center">
                <p className="text-xs text-zinc-400">Categoria</p>
                <p className="font-medium">Peito</p>
              </div>
              <div className="rounded-lg bg-zinc-700/50 p-3 text-center">
                <p className="text-xs text-zinc-400">Dificuldade</p>
                <p className="font-medium">Intermediário</p>
              </div>
              <div className="rounded-lg bg-zinc-700/50 p-3 text-center">
                <p className="text-xs text-zinc-400">Equipamento</p>
                <p className="font-medium">Barra</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-medium">Músculos Trabalhados</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                  Peitoral (Primário)
                </span>
                <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium">Tríceps</span>
                <span className="rounded-full bg-zinc-700 px-3 py-1 text-xs font-medium">Deltóide Anterior</span>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Instruções</h3>
              <ol className="list-decimal space-y-2 pl-5 text-sm">
                <li>Deite-se em um banco plano com os pés apoiados no chão.</li>
                <li>Segure a barra com as mãos um pouco mais afastadas que a largura dos ombros.</li>
                <li>Desça a barra controladamente até tocar levemente o peito.</li>
                <li>Empurre a barra para cima até que os braços estejam estendidos.</li>
                <li>Repita o movimento pelo número de repetições desejado.</li>
              </ol>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Dicas</h3>
              <ul className="list-disc space-y-2 pl-5 text-sm">
                <li>Mantenha os cotovelos em um ângulo de aproximadamente 45° em relação ao corpo.</li>
                <li>Mantenha os ombros para trás e o peito elevado durante todo o movimento.</li>
                <li>Não arquee excessivamente as costas.</li>
                <li>Respire corretamente: inspire ao descer a barra e expire ao subir.</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-medium">Variações</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-zinc-700 px-3 py-1 text-xs">Supino Inclinado</span>
                <span className="rounded-lg bg-zinc-700 px-3 py-1 text-xs">Supino Declinado</span>
                <span className="rounded-lg bg-zinc-700 px-3 py-1 text-xs">Supino com Halteres</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600">
            Editar Exercício
          </button>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Adicionar ao Treino
          </button>
        </div>
      </div>
    </div>
  )
}
