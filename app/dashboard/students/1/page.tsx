"use client"

import { useState, forwardRef } from "react"
import { Tab } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Create a forwardRef wrapper for Tab.Group
const TabGroupWithRef = forwardRef((props, ref) => <Tab.Group {...props} ref={ref} />)
TabGroupWithRef.displayName = "TabGroupWithRef"

// Adicione estes componentes antes da função StudentDetail

// Componente StudentInfo
function StudentInfo({ student }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações Pessoais</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">Data de início</span>
              <span>{student.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Data de nascimento</span>
              <span>{student.birthDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Idade</span>
              <span>{student.age}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Email</span>
              <span>{student.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Telefone</span>
              <span>{student.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Endereço</span>
              <span>{student.address}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Informações Físicas</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-400">Peso</span>
              <span>{student.weight}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Altura</span>
              <span>{student.height}</span>
            </div>
          </div>

          <h3 className="text-lg font-medium mt-6">Objetivos</h3>
          <div className="flex flex-wrap gap-2">
            {student.objectives.map((objective, index) => (
              <span key={index} className="rounded-full bg-zinc-700 px-3 py-1 text-sm">
                {objective}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-medium mt-6">Modalidades</h3>
          <div className="flex flex-wrap gap-2">
            {student.modalities.map((modality, index) => (
              <span key={index} className="rounded-full bg-zinc-700 px-3 py-1 text-sm">
                {modality}
              </span>
            ))}
          </div>

          {student.restrictions.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6">Restrições</h3>
              <div className="flex flex-wrap gap-2">
                {student.restrictions.map((restriction, index) => (
                  <span key={index} className="rounded-full bg-red-900/30 px-3 py-1 text-sm text-red-400">
                    {restriction}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Componente WorkoutsTab
function WorkoutsTab() {
  const workouts = [
    {
      id: 1,
      name: "Treino A - Superior",
      date: "Segunda e Quinta",
      exercises: [
        { name: "Supino Reto", sets: 4, reps: "8-12", rest: "60s" },
        { name: "Puxada Frontal", sets: 4, reps: "8-12", rest: "60s" },
        { name: "Desenvolvimento com Halteres", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Remada Curvada", sets: 3, reps: "10-12", rest: "60s" },
        { name: "Tríceps Corda", sets: 3, reps: "12-15", rest: "45s" },
        { name: "Rosca Direta", sets: 3, reps: "12-15", rest: "45s" },
      ],
    },
    {
      id: 2,
      name: "Treino B - Inferior",
      date: "Terça e Sexta",
      exercises: [
        { name: "Agachamento Livre", sets: 4, reps: "8-10", rest: "90s" },
        { name: "Leg Press 45°", sets: 4, reps: "10-12", rest: "90s" },
        { name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60s" },
        { name: "Mesa Flexora", sets: 3, reps: "12-15", rest: "60s" },
        { name: "Panturrilha em Pé", sets: 4, reps: "15-20", rest: "45s" },
        { name: "Abdominal Infra", sets: 3, reps: "15-20", rest: "45s" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <div key={workout.id} className="rounded-lg bg-zinc-800 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">{workout.name}</h3>
            <span className="text-sm text-zinc-400">{workout.date}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="pb-2 text-left">Exercício</th>
                  <th className="pb-2 text-center">Séries</th>
                  <th className="pb-2 text-center">Repetições</th>
                  <th className="pb-2 text-center">Descanso</th>
                </tr>
              </thead>
              <tbody>
                {workout.exercises.map((exercise, index) => (
                  <tr key={index} className="border-b border-zinc-700/50">
                    <td className="py-2">{exercise.name}</td>
                    <td className="py-2 text-center">{exercise.sets}</td>
                    <td className="py-2 text-center">{exercise.reps}</td>
                    <td className="py-2 text-center">{exercise.rest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente HistoryTab
function HistoryTab() {
  const history = [
    {
      date: "04/02/2025",
      type: "Avaliação Física",
      notes: "Primeira avaliação. Definidos objetivos iniciais e plano de treino.",
    },
    {
      date: "18/02/2025",
      type: "Ajuste de Treino",
      notes: "Aumentada a carga nos exercícios de perna. Aluno relatou adaptação rápida.",
    },
    {
      date: "04/03/2025",
      type: "Avaliação de Progresso",
      notes: "Perda de 2kg. Melhora na resistência cardiovascular.",
    },
    {
      date: "18/03/2025",
      type: "Ajuste de Treino",
      notes: "Incluídos exercícios de HIIT para acelerar perda de gordura.",
    },
    {
      date: "01/04/2025",
      type: "Avaliação Física",
      notes: "Perda de mais 1.5kg. Aumento de massa muscular nos braços e pernas.",
    },
  ]

  return (
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div key={index} className="rounded-lg bg-zinc-800 p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium">{entry.type}</span>
            <span className="text-sm text-zinc-400">{entry.date}</span>
          </div>
          <p className="text-zinc-300">{entry.notes}</p>
        </div>
      ))}
    </div>
  )
}

export default function StudentDetail() {
  const student = {
    id: 1,
    name: "Leandro Silva",
    startDate: "2025-02-04",
    birthDate: "1988-10-03",
    age: "36 anos",
    email: "leandrossilva@gmail.com",
    phone: "(41) 9 9512-3112",
    address: "Av. Anchieta, 3450 (AP 524)",
    weight: "97,00kg",
    height: "1,90m",
    status: "active",
    pendingItems: [],
    modalities: ["Musculação"],
    objectives: ["Perda de peso", "Ganho de massa muscular"],
    restrictions: [],
  }

  const [categories] = useState({
    Informações: [
      {
        id: 1,
        content: <StudentInfo student={student} />,
      },
    ],
    Treinos: [
      {
        id: 1,
        content: <WorkoutsTab />,
      },
    ],
    Histórico: [
      {
        id: 1,
        content: <HistoryTab />,
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/students" className="rounded-full bg-zinc-800 p-2 hover:bg-zinc-700">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold">{student.name}</h2>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">Ativo</span>
      </div>

      <div className="rounded-xl bg-zinc-800 p-4">
        <TabGroupWithRef>
          <Tab.List className="flex space-x-1 rounded-xl bg-zinc-700/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-zinc-100",
                    "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-emerald-500 shadow text-white"
                      : "text-zinc-400 hover:bg-white/[0.12] hover:text-white",
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-zinc-800 p-3",
                  "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                )}
              >
                <ul>
                  {posts.map((post) => (
                    <li key={post.id}>{post.content}</li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </TabGroupWithRef>
      </div>
    </div>
  )
}
