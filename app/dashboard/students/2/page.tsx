"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { ArrowLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function StudentDetail() {
  const student = {
    id: 2,
    name: "Mario Lenon",
    startDate: "2024-11-15",
    birthDate: "1973-09-23",
    age: "51 anos",
    email: "lenon1973@hotmail.com",
    phone: "(41) 9 9876-5432",
    address: "",
    weight: "85kg",
    height: "1,78m",
    status: "active",
    pendingItems: ["Aguardando avaliações", "Hemograma", "Conectar o Apple Watch para dados Self-Tracking"],
    modalities: ["Musculação", "Natação"],
    objectives: ["Perda de peso (objetivo: 80/81kg)"],
    restrictions: ["Nenhuma restrição nem limitação"],
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
    Pendências: [
      {
        id: 1,
        content: <PendingItemsTab student={student} />,
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

function StudentInfo({ student }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Informações Pessoais</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Nome Completo</span>
              <span className="font-medium">{student.name}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Data de Nascimento</span>
              <span className="font-medium">{new Date(student.birthDate).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Idade</span>
              <span className="font-medium">{student.age}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>E-mail</span>
              <span className="font-medium">{student.email}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Telefone</span>
              <span className="font-medium">{student.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Endereço</span>
              <span className="font-medium text-right max-w-[60%]">{student.address || "Não informado"}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Informações Físicas e Objetivos</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Peso</span>
              <span className="font-medium">{student.weight}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Altura</span>
              <span className="font-medium">{student.height}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>IMC</span>
              <span className="font-medium">26.8 (Sobrepeso)</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Data de Início</span>
              <span className="font-medium">{new Date(student.startDate).toLocaleDateString("pt-BR")}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Modalidades</span>
              <span className="font-medium">{student.modalities.join(", ")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Restrições</span>
              <span className="font-medium text-right max-w-[60%]">{student.restrictions.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Objetivos e Progresso</h3>
        <div className="space-y-4">
          {student.objectives.map((objective, index) => (
            <div key={index}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">{objective}</span>
                <span className="text-xs text-zinc-400">Em andamento</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[10%] bg-emerald-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WorkoutsTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Treinos Atuais</h3>
        <div className="space-y-4">
          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Treino A - Musculação Full Body</h4>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                Segunda, Quarta e Sexta
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">Foco em adaptação e condicionamento geral</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">1.</span> Leg press - 3x15 (80kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">2.</span> Supino máquina - 3x15 (40kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">3.</span> Puxada frontal - 3x15 (50kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">4.</span> Desenvolvimento máquina - 3x15 (30kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">5.</span> Cadeira extensora - 3x15 (40kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">6.</span> Abdominal máquina - 3x20 (30kg)
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Treino B - Natação</h4>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                Terça e Quinta
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">Foco em técnica e resistência cardiorrespiratória</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">1.</span> Aquecimento - 200m nado livre
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">2.</span> Técnica de respiração - 10 min
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">3.</span> Nado crawl - 400m (4x100m)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">4.</span> Nado costas - 200m (4x50m)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">5.</span> Pernada com prancha - 200m
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">6.</span> Relaxamento - 100m nado livre leve
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PendingItemsTab({ student }) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <div className="flex items-center gap-2 text-amber-500">
          <ExclamationCircleIcon className="h-5 w-5" />
          <h3 className="text-lg font-medium">Itens Pendentes</h3>
        </div>

        <div className="mt-4 space-y-4">
          {student.pendingItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <ExclamationCircleIcon className="h-5 w-5 text-amber-500" />
                <span>{item}</span>
              </div>
              <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
                Marcar como Concluído
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="mb-3 font-medium">Adicionar Novo Item Pendente</h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Descrição do item pendente..."
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Próximos Passos</h3>
        <div className="space-y-3">
          <div className="rounded-lg bg-zinc-800 p-4">
            <h4 className="font-medium">Agendar Avaliação Física</h4>
            <p className="mt-2 text-sm text-zinc-400">
              Realizar avaliação física completa para estabelecer linha de base e definir metas específicas.
            </p>
            <button className="mt-3 rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
              Agendar Agora
            </button>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <h4 className="font-medium">Solicitar Exames</h4>
            <p className="mt-2 text-sm text-zinc-400">
              Solicitar hemograma completo e outros exames relevantes para avaliação de saúde.
            </p>
            <button className="mt-3 rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
              Gerar Solicitação
            </button>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <h4 className="font-medium">Configurar Apple Watch</h4>
            <p className="mt-2 text-sm text-zinc-400">
              Auxiliar na configuração do Apple Watch para monitoramento de atividades e integração com o sistema.
            </p>
            <button className="mt-3 rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white hover:bg-emerald-500">
              Ver Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
