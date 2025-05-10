"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { PlayCircleIcon } from "@heroicons/react/24/solid"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Workouts() {
  const [categories] = useState({
    "Treinos Recentes": [
      {
        id: 1,
        title: "Treino de Força - Superior",
        duration: "45 min",
        level: "Intermediário",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Ricardo Almeida",
      },
      {
        id: 2,
        title: "HIIT - Queima Calórica",
        duration: "30 min",
        level: "Avançado",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Carla Santos",
      },
      {
        id: 3,
        title: "Treino de Força - Inferior",
        duration: "50 min",
        level: "Intermediário",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Ricardo Almeida",
      },
    ],
    "Treinos Recomendados": [
      {
        id: 1,
        title: "Treino Funcional",
        duration: "40 min",
        level: "Iniciante",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Marcos Oliveira",
      },
      {
        id: 2,
        title: "Mobilidade e Alongamento",
        duration: "25 min",
        level: "Todos os níveis",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Juliana Costa",
      },
      {
        id: 3,
        title: "Core e Abdômen",
        duration: "20 min",
        level: "Intermediário",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Ricardo Almeida",
      },
    ],
    Programas: [
      {
        id: 1,
        title: "Hipertrofia - 8 Semanas",
        duration: "8 semanas",
        level: "Intermediário/Avançado",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Ricardo Almeida",
        progress: "25%",
      },
      {
        id: 2,
        title: "Emagrecimento - 12 Semanas",
        duration: "12 semanas",
        level: "Todos os níveis",
        thumbnail: "/placeholder.svg?height=200&width=350",
        trainer: "Carla Santos",
        progress: "50%",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Meus Treinos</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar treinos..."
            className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>
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
            {Object.values(categories).map((workouts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-zinc-800",
                  "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                )}
              >
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="overflow-hidden rounded-lg bg-zinc-700/30">
                      <div className="relative">
                        <img
                          src={workout.thumbnail || "/placeholder.svg"}
                          alt={workout.title}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                          <button className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
                            <PlayCircleIcon className="h-5 w-5" />
                            Iniciar Treino
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{workout.title}</h3>
                        <div className="mt-2 flex items-center justify-between text-sm text-zinc-400">
                          <span>{workout.duration}</span>
                          <span>{workout.level}</span>
                        </div>
                        <div className="mt-1 text-xs text-zinc-500">
                          <span>Treinador: {workout.trainer}</span>
                        </div>
                        {workout.progress && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-xs">
                              <span>Progresso</span>
                              <span>{workout.progress}</span>
                            </div>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
                              <div className="h-full bg-emerald-500" style={{ width: workout.progress }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="rounded-xl bg-zinc-800 p-6">
        <h2 className="mb-4 text-xl font-semibold">Categorias de Treino</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="rounded-lg bg-zinc-700/30 p-4 text-center hover:bg-zinc-700/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-emerald-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-medium">Força</h3>
            <p className="mt-1 text-sm text-zinc-400">28 treinos</p>
          </div>
          <div className="rounded-lg bg-zinc-700/30 p-4 text-center hover:bg-zinc-700/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-purple-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
              </svg>
            </div>
            <h3 className="font-medium">Cardio</h3>
            <p className="mt-1 text-sm text-zinc-400">16 treinos</p>
          </div>
          <div className="rounded-lg bg-zinc-700/30 p-4 text-center hover:bg-zinc-700/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-amber-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <h3 className="font-medium">Flexibilidade</h3>
            <p className="mt-1 text-sm text-zinc-400">12 treinos</p>
          </div>
          <div className="rounded-lg bg-zinc-700/30 p-4 text-center hover:bg-zinc-700/50">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-sky-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium">HIIT</h3>
            <p className="mt-1 text-sm text-zinc-400">8 treinos</p>
          </div>
        </div>
      </div>
    </div>
  )
}
