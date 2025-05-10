"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { CalendarDaysIcon, ClockIcon, FireIcon, TrophyIcon } from "@heroicons/react/24/outline"
import StressHeatmap from "@/components/stress-heatmap"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Create a forwardRef wrapper for Tab.Group
// const TabGroupWithRef = forwardRef((props, ref) => <Tab.Group {...props} ref={ref} />)
// TabGroupWithRef.displayName = "TabGroupWithRef"

export default function Dashboard() {
  const [categories] = useState({
    "Próximos Treinos": [
      {
        id: 1,
        title: "Mariano - Musculação - Alternado por Segmento",
        date: "Hoje, 18:00",
        description: "Foco em peito, ombros e tríceps",
        trainer: "Ricardo Almeida",
      },
      {
        id: 2,
        title: "Flávio - Musculação - MMSS/MMII",
        date: "Amanhã, 07:30",
        description: "Treino de alta intensidade para queima calórica",
        trainer: "Carla Santos",
      },
      {
        id: 3,
        title: "Leonardo - Natação - Exercício Seco + Fundamentos I",
        date: "Quinta, 18:00",
        description: "Foco em técnica e respiração",
        trainer: "Ricardo Almeida",
      },
    ],
    Lembretes: [
      {
        id: 1,
        title: "Atualizar plano nutricional do Mariano",
        date: "Até amanhã",
        description: "Ajustar macros para fase de definição",
        trainer: "Dra. Juliana Costa",
      },
      {
        id: 2,
        title: "Enviar protocolo de suplementação para Flávio",
        date: "Hoje",
        description: "Incluir recomendações para pré e pós-treino",
        trainer: "Dra. Juliana Costa",
      },
      {
        id: 3,
        title: "Revisar dieta do Leonardo",
        date: "Quinta-feira",
        description: "Ajustar para competição de natação",
        trainer: "Dra. Juliana Costa",
      },
    ],
    "Acompanhamento On-line": [
      {
        id: 1,
        title: "Consultoria Online - Rodrigo",
        date: "2 meses restantes",
        description: "Plano: Premium Trimestral",
        progress: "50% concluído",
      },
      {
        id: 2,
        title: "Consultoria Online - Fernanda",
        date: "3 meses restantes",
        description: "Plano: Básico Semestral",
        progress: "30% concluído",
      },
      {
        id: 3,
        title: "Consultoria Online - Carlos",
        date: "1 mês restante",
        description: "Plano: Premium Mensal",
        progress: "75% concluído",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-emerald-500/10 p-3">
              <CalendarDaysIcon className="h-6 w-6 text-emerald-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Próximo Treino</p>
              <p className="text-xl font-semibold">Hoje, 18:00</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-500/10 p-3">
              <FireIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Calorias Semana</p>
              <p className="text-xl font-semibold">12.450 kcal</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-amber-500/10 p-3">
              <ClockIcon className="h-6 w-6 text-amber-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Tempo de Treino</p>
              <p className="text-xl font-semibold">5h 30min</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-sky-500/10 p-3">
              <TrophyIcon className="h-6 w-6 text-sky-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Metas Concluídas</p>
              <p className="text-xl font-semibold">3 de 5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-zinc-800 p-6">
        <h2 className="mb-6 text-lg font-semibold">Gráficos de Realização</h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          <div className="rounded-lg bg-zinc-700/20 p-4">
            <StressHeatmap title="Estresse Central" colorScheme="purple" />
          </div>
          <div className="rounded-lg bg-zinc-700/20 p-4">
            <StressHeatmap title="Estresse Periférico" colorScheme="blue" />
          </div>
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
          <Tab.Panels className="mt-2">
            {Object.values(categories).map((posts, idx) => (
              <Tab.Panel
                key={idx}
                className={classNames(
                  "rounded-xl bg-zinc-800 p-3",
                  "ring-white/60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                )}
              >
                <ul className="space-y-4">
                  {posts.map((post) => (
                    <li key={post.id} className="rounded-md bg-zinc-700/30 p-3 hover:bg-zinc-700/50">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium leading-5">{post.title}</h3>
                          <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs">{post.date}</span>
                        </div>
                        <p className="text-sm text-zinc-400">{post.description}</p>
                        {post.trainer && (
                          <p className="text-xs text-zinc-500">
                            <span className="font-medium">Treinador:</span> {post.trainer}
                          </p>
                        )}
                        {post.progress && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs">
                              <span>{post.progress}</span>
                            </div>
                            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                              <div
                                className="h-full bg-emerald-500"
                                style={{
                                  width: post.progress.split("%")[0] + "%",
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Métricas de Prospecção de Clientes</h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Novos Clientes</span>
                <span className="text-xs text-zinc-400">+5 no último mês</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-3/4 bg-emerald-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Renovações</span>
                <span className="text-xs text-zinc-400">85% de taxa de renovação</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[85%] bg-emerald-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Cancelamentos</span>
                <span className="text-xs text-zinc-400">-2 no último mês</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-1/6 bg-red-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Leads Qualificados</span>
                <span className="text-xs text-zinc-400">12 aguardando contato</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-1/2 bg-amber-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Próximos Alunos</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-lg bg-zinc-700/30 p-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Mariano</h3>
                <p className="text-sm text-zinc-400">Quinta, 19:00 - 20:00</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-zinc-700/30 p-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Flávio</h3>
                <p className="text-sm text-zinc-400">Sexta, 17:30 - 18:30</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-lg bg-zinc-700/30 p-3">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Leonardo</h3>
                <p className="text-sm text-zinc-400">Sábado, 09:00 - 10:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
