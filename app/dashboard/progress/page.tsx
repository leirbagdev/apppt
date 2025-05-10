"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { CheckCircleIcon, TrophyIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Progress() {
  const [categories] = useState({
    "Medidas Corporais": [
      {
        id: 1,
        content: <BodyMeasurements />,
      },
    ],
    Desempenho: [
      {
        id: 1,
        content: <PerformanceMetrics />,
      },
    ],
    Metas: [
      {
        id: 1,
        content: <Goals />,
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Progresso</h2>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option>Últimos 3 meses</option>
            <option>Últimos 6 meses</option>
            <option>Último ano</option>
            <option>Todo o histórico</option>
          </select>
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Exportar Dados
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-emerald-500/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-emerald-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Peso Atual</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold">68.5 kg</p>
                <span className="ml-2 flex items-center text-xs text-emerald-500">
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                  2.3 kg
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-500/10 p-3">
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
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">% de Gordura</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold">22.4%</p>
                <span className="ml-2 flex items-center text-xs text-emerald-500">
                  <ArrowDownIcon className="mr-1 h-3 w-3" />
                  1.6%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-amber-500/10 p-3">
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
                  d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Massa Muscular</p>
              <div className="flex items-center">
                <p className="text-xl font-semibold">28.2 kg</p>
                <span className="ml-2 flex items-center text-xs text-emerald-500">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  1.8 kg
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-sky-500/10 p-3">
              <TrophyIcon className="h-6 w-6 text-sky-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Metas Alcançadas</p>
              <p className="text-xl font-semibold">7 de 10</p>
            </div>
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

      <div className="rounded-xl bg-zinc-800 p-6">
        <h2 className="mb-4 text-lg font-semibold">Histórico de Treinos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Duração
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Calorias
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Treinador
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Avaliação
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {[
                {
                  date: "15/04/2025",
                  type: "Musculação",
                  duration: "60 min",
                  calories: "320 kcal",
                  trainer: "Ricardo",
                  rating: 5,
                },
                {
                  date: "13/04/2025",
                  type: "Cardio",
                  duration: "45 min",
                  calories: "450 kcal",
                  trainer: "Carla",
                  rating: 4,
                },
                {
                  date: "10/04/2025",
                  type: "Funcional",
                  duration: "50 min",
                  calories: "380 kcal",
                  trainer: "Ricardo",
                  rating: 5,
                },
                {
                  date: "08/04/2025",
                  type: "Musculação",
                  duration: "60 min",
                  calories: "340 kcal",
                  trainer: "Ricardo",
                  rating: 4,
                },
                {
                  date: "06/04/2025",
                  type: "Natação",
                  duration: "40 min",
                  calories: "320 kcal",
                  trainer: "Marcos",
                  rating: 5,
                },
              ].map((workout, index) => (
                <tr key={index} className="hover:bg-zinc-700/30">
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.date}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.type}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.duration}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.calories}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{workout.trainer}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`h-4 w-4 ${i < workout.rating ? "text-amber-500" : "text-zinc-600"}`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function BodyMeasurements() {
  const weightData = [
    { month: "Jan", weight: 72.5 },
    { month: "Fev", weight: 71.8 },
    { month: "Mar", weight: 70.6 },
    { month: "Abr", weight: 69.7 },
    { month: "Mai", weight: 69.2 },
    { month: "Jun", weight: 68.5 },
  ]

  const measurementsData = [
    { date: "Janeiro", chest: 95, waist: 82, hips: 98, thigh: 58, arm: 32 },
    { date: "Fevereiro", chest: 94, waist: 81, hips: 97, thigh: 57, arm: 32 },
    { date: "Março", chest: 94, waist: 79, hips: 96, thigh: 56, arm: 33 },
    { date: "Abril", chest: 93, waist: 78, hips: 95, thigh: 56, arm: 33 },
    { date: "Maio", chest: 93, waist: 77, hips: 94, thigh: 55, arm: 34 },
    { date: "Junho", chest: 92, waist: 76, hips: 93, thigh: 55, arm: 34 },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Evolução do Peso</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weightData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" domain={[65, 75]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                formatter={(value) => [`${value} kg`, "Peso"]}
              />
              <Area type="monotone" dataKey="weight" name="Peso" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Medidas Corporais (cm)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={measurementsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="date" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Line
                type="monotone"
                dataKey="chest"
                name="Peitoral"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="waist"
                name="Cintura"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="hips"
                name="Quadril"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="thigh"
                name="Coxa"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="arm"
                name="Braço"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Composição Corporal</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Gordura Corporal</span>
                <span className="text-xs text-zinc-400">22.4%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[22.4%] bg-purple-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Massa Muscular</span>
                <span className="text-xs text-zinc-400">41.2%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[41.2%] bg-emerald-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Água</span>
                <span className="text-xs text-zinc-400">55.8%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[55.8%] bg-sky-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Massa Óssea</span>
                <span className="text-xs text-zinc-400">4.1%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[4.1%] bg-amber-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Última Avaliação</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Data</span>
              <span className="font-medium">10/04/2025</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Peso</span>
              <span className="font-medium">68.5 kg</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>IMC</span>
              <span className="font-medium">23.7</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>% de Gordura</span>
              <span className="font-medium">22.4%</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Massa Muscular</span>
              <span className="font-medium">28.2 kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Avaliador</span>
              <span className="text-sm text-zinc-400">Dr. Ricardo Almeida</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PerformanceMetrics() {
  const strengthData = [
    { exercise: "Supino", jan: 60, fev: 65, mar: 70, abr: 75, mai: 80, jun: 85 },
    { exercise: "Agachamento", jan: 80, fev: 85, mar: 90, abr: 95, mai: 100, jun: 105 },
    { exercise: "Levantamento Terra", jan: 100, fev: 105, mar: 110, abr: 115, mai: 120, jun: 125 },
    { exercise: "Remada", jan: 55, fev: 60, mar: 65, abr: 70, mai: 75, jun: 80 },
    { exercise: "Desenvolvimento", jan: 40, fev: 42.5, mar: 45, abr: 47.5, mai: 50, jun: 52.5 },
  ]

  const cardioData = [
    { month: "Jan", running: 5.2, cycling: 15.5, swimming: 1.2 },
    { month: "Fev", running: 5.5, cycling: 16.0, swimming: 1.3 },
    { month: "Mar", running: 5.8, cycling: 16.8, swimming: 1.4 },
    { month: "Abr", running: 6.0, cycling: 17.2, swimming: 1.5 },
    { month: "Mai", running: 6.3, cycling: 17.8, swimming: 1.6 },
    { month: "Jun", running: 6.5, cycling: 18.5, swimming: 1.7 },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Evolução de Força (kg)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Exercício
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Jan</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Fev</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Mar</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Abr</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Mai</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Jun</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Progresso
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              {strengthData.map((exercise) => (
                <tr key={exercise.exercise} className="hover:bg-zinc-700/30">
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{exercise.exercise}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.jan}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.fev}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.mar}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.abr}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.mai}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">{exercise.jun}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    <div className="flex items-center">
                      <span className="mr-2 text-emerald-500">+{exercise.jun - exercise.jan}kg</span>
                      <span className="text-xs text-zinc-400">
                        ({(((exercise.jun - exercise.jan) / exercise.jan) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Desempenho Cardiovascular</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cardioData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Bar dataKey="running" name="Corrida (km)" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cycling" name="Ciclismo (km)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="swimming" name="Natação (km)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Resistência</h3>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Corrida (5km)</span>
                <span className="text-xs text-zinc-400">25:30 min</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[75%] bg-emerald-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Ciclismo (20km)</span>
                <span className="text-xs text-zinc-400">42:15 min</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[80%] bg-purple-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Natação (1km)</span>
                <span className="text-xs text-zinc-400">22:40 min</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[65%] bg-sky-500"></div>
              </div>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">Corda (10 min)</span>
                <span className="text-xs text-zinc-400">950 saltos</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                <div className="h-full w-[70%] bg-amber-500"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Flexibilidade e Mobilidade</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Sentar e Alcançar</span>
              <span className="font-medium">+8 cm</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Rotação de Ombro</span>
              <span className="font-medium">Excelente</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Mobilidade de Quadril</span>
              <span className="font-medium">Bom</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
              <span>Mobilidade de Tornozelo</span>
              <span className="font-medium">Regular</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Ponte</span>
              <span className="font-medium">Excelente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Goals() {
  const goals = [
    {
      id: 1,
      title: "Perder 5kg",
      category: "Peso",
      target: "65kg",
      current: "68.5kg",
      deadline: "30/06/2025",
      progress: 70,
      status: "Em andamento",
    },
    {
      id: 2,
      title: "Reduzir percentual de gordura",
      category: "Composição Corporal",
      target: "20%",
      current: "22.4%",
      deadline: "30/06/2025",
      progress: 60,
      status: "Em andamento",
    },
    {
      id: 3,
      title: "Aumentar carga no supino",
      category: "Força",
      target: "90kg",
      current: "85kg",
      deadline: "31/07/2025",
      progress: 85,
      status: "Em andamento",
    },
    {
      id: 4,
      title: "Correr 10km",
      category: "Resistência",
      target: "10km",
      current: "8km",
      deadline: "15/08/2025",
      progress: 80,
      status: "Em andamento",
    },
    {
      id: 5,
      title: "Completar 30 dias de treino consecutivos",
      category: "Consistência",
      target: "30 dias",
      current: "30 dias",
      deadline: "01/04/2025",
      progress: 100,
      status: "Concluído",
    },
    {
      id: 6,
      title: "Melhorar flexibilidade (sentar e alcançar)",
      category: "Flexibilidade",
      target: "+10cm",
      current: "+8cm",
      deadline: "30/09/2025",
      progress: 80,
      status: "Em andamento",
    },
    {
      id: 7,
      title: "Participar de uma corrida de 5km",
      category: "Evento",
      target: "Completar",
      current: "Inscrito",
      deadline: "15/05/2025",
      progress: 50,
      status: "Em andamento",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Metas Atuais</h3>
        <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium text-white hover:bg-emerald-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Nova Meta
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="rounded-lg bg-zinc-700/30 p-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">{goal.title}</h4>
                  {goal.status === "Concluído" && <CheckCircleIcon className="ml-2 h-5 w-5 text-emerald-500" />}
                </div>
                <p className="text-sm text-zinc-400">
                  {goal.category} • Meta: {goal.target} • Atual: {goal.current}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-sm">
                  <div className="font-medium">{goal.progress}%</div>
                  <div className="text-xs text-zinc-400">Prazo: {goal.deadline}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-700">
              <div
                className={`h-full ${goal.status === "Concluído" ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Metas Concluídas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">Completar 30 dias de treino consecutivos</h4>
                  <CheckCircleIcon className="ml-2 h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-zinc-400">Consistência • Concluído em 01/04/2025</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">Aprender a nadar crawl</h4>
                  <CheckCircleIcon className="ml-2 h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-zinc-400">Habilidade • Concluído em 15/03/2025</p>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium">Fazer 10 flexões completas</h4>
                  <CheckCircleIcon className="ml-2 h-5 w-5 text-emerald-500" />
                </div>
                <p className="text-sm text-zinc-400">Força • Concluído em 28/02/2025</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-700/30 p-4">
          <h3 className="mb-4 text-lg font-medium">Sugestões de Metas</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <h4 className="font-medium">Participar de uma aula de yoga</h4>
                <p className="text-sm text-zinc-400">Flexibilidade • Recomendado pelo treinador</p>
              </div>
              <button className="rounded-full bg-zinc-700 p-1 text-zinc-400 hover:bg-zinc-600 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <h4 className="font-medium">Completar 100 abdominais em uma sessão</h4>
                <p className="text-sm text-zinc-400">Resistência • Recomendado pelo treinador</p>
              </div>
              <button className="rounded-full bg-zinc-700 p-1 text-zinc-400 hover:bg-zinc-600 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md bg-zinc-800 p-3">
              <div>
                <h4 className="font-medium">Reduzir o tempo de descanso entre séries</h4>
                <p className="text-sm text-zinc-400">Condicionamento • Recomendado pelo sistema</p>
              </div>
              <button className="rounded-full bg-zinc-700 p-1 text-zinc-400 hover:bg-zinc-600 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
