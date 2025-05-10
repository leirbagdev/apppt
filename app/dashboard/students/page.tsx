"use client"

import { useState } from "react"
import Link from "next/link"
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const students = [
    {
      id: 1,
      name: "Leandro Silva",
      age: "36 anos",
      modalities: ["Musculação"],
      status: "active",
      startDate: "04/02/2025",
    },
    {
      id: 2,
      name: "Mario Lenon",
      age: "51 anos",
      modalities: ["Musculação", "Natação"],
      status: "pending",
      startDate: "15/11/2024",
    },
    {
      id: 3,
      name: "Otávio Martins",
      age: "79 anos",
      modalities: ["Musculação", "Fisioterapia"],
      status: "active",
      startDate: "19/05/2021",
    },
  ]

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">Alunos</h2>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar alunos..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Novo Aluno
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <Link
            key={student.id}
            href={`/dashboard/students/${student.id}`}
            className="block rounded-lg bg-zinc-800 p-4 transition-transform hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-700">
                <UserIcon className="h-6 w-6 text-zinc-300" />
              </div>
              <div>
                <h3 className="font-medium">{student.name}</h3>
                <p className="text-sm text-zinc-400">{student.age}</p>
              </div>
              {student.status === "active" ? (
                <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                  Ativo
                </span>
              ) : (
                <span className="ml-auto rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                  Pendente
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Modalidades:</span>
                <span className="text-xs font-medium">{student.modalities.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Início:</span>
                <span className="text-xs font-medium">{student.startDate}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
