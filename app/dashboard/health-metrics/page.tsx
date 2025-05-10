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
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  Legend,
} from "recharts"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function HealthMetrics() {
  const [categories] = useState({
    "Frequência Cardíaca": [
      {
        id: 1,
        content: <HeartRateChart />,
      },
    ],
    "Atividade Física": [
      {
        id: 1,
        content: <ActivityChart />,
      },
    ],
    Sono: [
      {
        id: 1,
        content: <SleepChart />,
      },
    ],
    Treinos: [
      {
        id: 1,
        content: <WorkoutChart />,
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Métricas de Saúde</h2>
        <div className="flex items-center gap-2">
          <select className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white">
            <option>Últimos 7 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 90 dias</option>
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Média FC Repouso</p>
              <p className="text-xl font-semibold">68 bpm</p>
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
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Passos Diários</p>
              <p className="text-xl font-semibold">8,742</p>
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
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Sono Médio</p>
              <p className="text-xl font-semibold">7h 15min</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-sky-500/10 p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 text-sky-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Calorias Queimadas</p>
              <p className="text-xl font-semibold">2,456 kcal</p>
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

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Comparativo de Atividades</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Musculação", value: 45 },
                    { name: "Cardio", value: 25 },
                    { name: "Natação", value: 15 },
                    { name: "Yoga", value: 10 },
                    { name: "Outros", value: 5 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#ef4444" />
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} minutos`, "Tempo"]}
                  contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-zinc-800 p-6">
          <h2 className="mb-4 text-lg font-semibold">Zonas de Frequência Cardíaca</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Zona 1 (50-60%)", minutes: 120, color: "#10b981" },
                  { name: "Zona 2 (60-70%)", minutes: 95, color: "#3b82f6" },
                  { name: "Zona 3 (70-80%)", minutes: 75, color: "#8b5cf6" },
                  { name: "Zona 4 (80-90%)", minutes: 45, color: "#f59e0b" },
                  { name: "Zona 5 (90-100%)", minutes: 15, color: "#ef4444" },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="name" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  formatter={(value) => [`${value} minutos`, "Tempo"]}
                  contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                />
                <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                  {[
                    { name: "Zona 1 (50-60%)", minutes: 120, color: "#10b981" },
                    { name: "Zona 2 (60-70%)", minutes: 95, color: "#3b82f6" },
                    { name: "Zona 3 (70-80%)", minutes: 75, color: "#8b5cf6" },
                    { name: "Zona 4 (80-90%)", minutes: 45, color: "#f59e0b" },
                    { name: "Zona 5 (90-100%)", minutes: 15, color: "#ef4444" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simplified chart components to avoid the ref forwarding issues
function HeartRateChart() {
  const heartRateData = [
    { time: "00:00", bpm: 62 },
    { time: "03:00", bpm: 58 },
    { time: "06:00", bpm: 65 },
    { time: "09:00", bpm: 85 },
    { time: "12:00", bpm: 78 },
    { time: "15:00", bpm: 92 },
    { time: "18:00", bpm: 130 },
    { time: "21:00", bpm: 75 },
    { time: "24:00", bpm: 68 },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Frequência Cardíaca nas Últimas 24h</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={heartRateData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="time" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                formatter={(value) => [`${value} bpm`, "Frequência Cardíaca"]}
              />
              <Line
                type="monotone"
                dataKey="bpm"
                name="Frequência Cardíaca"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Frequência Cardíaca por Dia da Semana</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { day: "Segunda", rest: 62, average: 98, max: 145 },
                { day: "Terça", rest: 60, average: 95, max: 152 },
                { day: "Quarta", rest: 63, average: 105, max: 168 },
                { day: "Quinta", rest: 65, average: 92, max: 142 },
                { day: "Sexta", rest: 61, average: 100, max: 155 },
                { day: "Sábado", rest: 58, average: 88, max: 135 },
                { day: "Domingo", rest: 60, average: 85, max: 125 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Bar dataKey="rest" name="Repouso" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="average" name="Média" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="max" name="Máxima" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function ActivityChart() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Passos Diários</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { day: "Segunda", steps: 8245, goal: 10000 },
                { day: "Terça", steps: 9120, goal: 10000 },
                { day: "Quarta", steps: 12350, goal: 10000 },
                { day: "Quinta", steps: 7890, goal: 10000 },
                { day: "Sexta", steps: 10230, goal: 10000 },
                { day: "Sábado", steps: 6540, goal: 10000 },
                { day: "Domingo", steps: 5820, goal: 10000 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Bar dataKey="steps" name="Passos" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="goal" name="Meta" stroke="#10b981" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Distância Percorrida (km)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { day: "Segunda", distance: 5.2 },
                { day: "Terça", distance: 6.1 },
                { day: "Quarta", distance: 8.4 },
                { day: "Quinta", distance: 4.9 },
                { day: "Sexta", distance: 6.8 },
                { day: "Sábado", distance: 3.5 },
                { day: "Domingo", distance: 2.9 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Area
                type="monotone"
                dataKey="distance"
                name="Distância"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function SleepChart() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Horas de Sono</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { day: "Segunda", deep: 1.8, light: 4.2, rem: 1.5 },
                { day: "Terça", deep: 2.1, light: 3.9, rem: 1.3 },
                { day: "Quarta", deep: 1.5, light: 4.0, rem: 1.2 },
                { day: "Quinta", deep: 2.3, light: 4.5, rem: 1.7 },
                { day: "Sexta", deep: 1.9, light: 3.8, rem: 1.4 },
                { day: "Sábado", deep: 2.5, light: 4.8, rem: 1.9 },
                { day: "Domingo", deep: 2.2, light: 4.6, rem: 1.8 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Bar dataKey="deep" name="Sono Profundo" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
              <Bar dataKey="light" name="Sono Leve" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
              <Bar dataKey="rem" name="REM" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Qualidade do Sono</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={[
                { day: "Segunda", quality: 78 },
                { day: "Terça", quality: 82 },
                { day: "Quarta", quality: 75 },
                { day: "Quinta", quality: 88 },
                { day: "Sexta", quality: 80 },
                { day: "Sábado", quality: 92 },
                { day: "Domingo", quality: 85 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" domain={[50, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                formatter={(value) => `${value}%`}
              />
              <Line
                type="monotone"
                dataKey="quality"
                name="Qualidade"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function WorkoutChart() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Intensidade dos Treinos</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { day: "Segunda", intensity: 7.2 },
                { day: "Terça", intensity: 8.5 },
                { day: "Quarta", intensity: 6.8 },
                { day: "Quinta", intensity: 9.1 },
                { day: "Sexta", intensity: 8.3 },
                { day: "Sábado", intensity: 5.4 },
                { day: "Domingo", intensity: 4.2 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" domain={[0, 10]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                formatter={(value) => `${value}/10`}
              />
              <Area
                type="monotone"
                dataKey="intensity"
                name="Intensidade"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Duração dos Treinos (minutos)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { day: "Segunda", duration: 45 },
                { day: "Terça", duration: 60 },
                { day: "Quarta", duration: 30 },
                { day: "Quinta", duration: 75 },
                { day: "Sexta", duration: 60 },
                { day: "Sábado", duration: 90 },
                { day: "Domingo", duration: 0 },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Bar dataKey="duration" name="Duração" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
