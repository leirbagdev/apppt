"use client"

import { useState, Fragment, useRef } from "react"
import Link from "next/link"
import { UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Dialog, Transition } from "@headlessui/react"

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Gabriel Pereira",
      age: "31 anos",
      modalities: ["Musculação"],
      status: "active",
      startDate: "01/03/2024",
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    age: "",
    modalities: "",
    status: "active",
    startDate: "",
  })
  const cancelButtonRef = useRef(null)

  const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleAddStudent(e: React.FormEvent) {
    e.preventDefault()
    setStudents((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: form.name,
        age: form.age,
        modalities: form.modalities.split(",").map((m) => m.trim()),
        status: form.status,
        startDate: form.startDate,
      },
    ])
    setForm({ name: "", age: "", modalities: "", status: "active", startDate: "" })
    setIsModalOpen(false)
  }

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
          <button
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
            onClick={() => setIsModalOpen(true)}
          >
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

      {/* Modal de novo aluno */}
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white mb-4">
                    Novo Aluno
                  </Dialog.Title>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-200">Nome</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-200">Idade</label>
                      <input
                        type="text"
                        name="age"
                        required
                        value={form.age}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="Ex: 36 anos"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-200">Modalidades</label>
                      <input
                        type="text"
                        name="modalities"
                        required
                        value={form.modalities}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                        placeholder="Separe por vírgula, ex: Musculação, Natação"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-200">Status</label>
                      <select
                        name="status"
                        value={form.status}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="active">Ativo</option>
                        <option value="pending">Pendente</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-200">Data de Início</label>
                      <input
                        type="date"
                        name="startDate"
                        required
                        value={form.startDate}
                        onChange={handleInputChange}
                        className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        type="button"
                        className="rounded-lg bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600"
                        onClick={() => setIsModalOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500"
                      >
                        Adicionar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
