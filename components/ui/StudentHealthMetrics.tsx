"use client"

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  AreaChart,
  Area
} from "recharts"

export default function StudentHealthMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card FC Repouso */}
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-emerald-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-emerald-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Média FC Repouso</p>
              <p className="text-xl font-semibold">68 bpm</p>
            </div>
          </div>
        </div>
        {/* Card Passos */}
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-purple-500"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Passos Diários</p>
              <p className="text-xl font-semibold">8,742</p>
            </div>
          </div>
        </div>
        {/* Card Sono */}
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-amber-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-amber-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Sono Médio</p>
              <p className="text-xl font-semibold">7h 15min</p>
            </div>
          </div>
        </div>
        {/* Card Calorias */}
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-sky-500/10 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-sky-500"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Calorias Queimadas</p>
              <p className="text-xl font-semibold">2,456 kcal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Frequência Cardíaca */}
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Frequência Cardíaca nas Últimas 24h</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { time: "00:00", bpm: 62 },
              { time: "03:00", bpm: 58 },
              { time: "06:00", bpm: 65 },
              { time: "09:00", bpm: 85 },
              { time: "12:00", bpm: 78 },
              { time: "15:00", bpm: 92 },
              { time: "18:00", bpm: 130 },
              { time: "21:00", bpm: 75 },
              { time: "24:00", bpm: 68 },
            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="time" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} formatter={(value) => [`${value} bpm`, "Frequência Cardíaca"]} />
              <Line type="monotone" dataKey="bpm" name="Frequência Cardíaca" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Passos Diários */}
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Passos Diários</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { day: "Segunda", steps: 8245, goal: 10000 },
              { day: "Terça", steps: 9120, goal: 10000 },
              { day: "Quarta", steps: 12350, goal: 10000 },
              { day: "Quinta", steps: 7890, goal: 10000 },
              { day: "Sexta", steps: 10230, goal: 10000 },
              { day: "Sábado", steps: 6540, goal: 10000 },
              { day: "Domingo", steps: 5820, goal: 10000 },
            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

      {/* Gráfico de Sono */}
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Horas de Sono</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { day: "Segunda", deep: 1.8, light: 4.2, rem: 1.5 },
              { day: "Terça", deep: 2.1, light: 3.9, rem: 1.3 },
              { day: "Quarta", deep: 1.5, light: 4.0, rem: 1.2 },
              { day: "Quinta", deep: 2.3, light: 4.5, rem: 1.7 },
              { day: "Sexta", deep: 1.9, light: 3.8, rem: 1.4 },
              { day: "Sábado", deep: 2.5, light: 4.8, rem: 1.9 },
              { day: "Domingo", deep: 2.2, light: 4.6, rem: 1.8 },
            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

      {/* Gráfico de Calorias */}
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Calorias Queimadas</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[
              { day: "Segunda", calories: 2100 },
              { day: "Terça", calories: 2300 },
              { day: "Quarta", calories: 2500 },
              { day: "Quinta", calories: 2000 },
              { day: "Sexta", calories: 2450 },
              { day: "Sábado", calories: 1800 },
              { day: "Domingo", calories: 1700 },
            ]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="day" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }} />
              <Area type="monotone" dataKey="calories" name="Calorias" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
} 