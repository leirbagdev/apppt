"use client"

import { useState, forwardRef } from "react"
import { Tab } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Create a forwardRef wrapper for Tab.Group
const TabGroupWithRef = forwardRef((props, ref) => <Tab.Group {...props} ref={ref} />)
TabGroupWithRef.displayName = "TabGroupWithRef"

export default function StudentDetail() {
  const student = {
    id: 3,
    name: "Otávio Martins",
    fullName: "Flávio Ferreira Martins",
    startDate: "2021-05-19",
    birthDate: "1946-01-10",
    age: "79 anos",
    email: "otavianomartins@hotmail.com",
    phone: "(41) 9996-88234",
    secondaryPhone: "(41) 3145-7054 (Portaria Condomínio)",
    address: "Av. Visconde de Guarapuava, 56 - Cristo Rei, Curitiba - PR, 80050-160",
    weight: "72kg",
    height: "1,68m",
    status: "active",
    pendingItems: [],
    modalities: ["Musculação", "Fisioterapia"],
    objectives: ["Manutenção da saúde", "Mobilidade"],
    restrictions: ["Hipertensão controlada", "Artrose leve nos joelhos"],
    hasExams: true,
  }

  const [categories] = useState({
    Informações: [
      {
        id: 1,
        content: <StudentInfo student={student} />,
      },
    ],
    Exames: [
      {
        id: 1,
        content: <ExamsReport />,
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
        </TabGroupWithRef>
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
              <span className="font-medium">{student.fullName}</span>
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
            {student.secondaryPhone && (
              <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                <span>Telefone Secundário</span>
                <span className="font-medium">{student.secondaryPhone}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Endereço</span>
              <span className="font-medium text-right max-w-[60%]">{student.address}</span>
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
              <span className="font-medium">25.5 (Sobrepeso)</span>
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
                <div className="h-full w-[65%] bg-emerald-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExamsReport() {
  // Dados do hemograma
  const hemogramaData = [
    { name: "Hematócrito", value: 44.6, min: 41, max: 53, unit: "%" },
    { name: "Hemoglobina", value: 14.8, min: 13, max: 16, unit: "g/dL" },
    { name: "Hemácias", value: 4.76, min: 4.5, max: 5.9, unit: "milhões/μL" },
    { name: "V.C.M", value: 93.8, min: 80, max: 100, unit: "fL" },
    { name: "H.C.M", value: 31.2, min: 26, max: 34, unit: "pg" },
    { name: "C.H.C.M", value: 33.3, min: 31, max: 37, unit: "%" },
    { name: "RDW", value: 14.1, min: 11.5, max: 14.5, unit: "%" },
  ]

  // Dados dos leucócitos e plaquetas
  const celulasData = [
    { name: "Leucócitos", value: 6800, min: 4000, max: 10000, unit: "/mm³" },
    { name: "Plaquetas", value: 225000, min: 140000, max: 400000, unit: "/mm³" },
  ]

  // Dados do perfil lipídico
  const lipidData = [
    { name: "Colesterol Total", value: 135, max: 190, unit: "mg/dL" },
    { name: "HDL", value: 60.5, min: 40, unit: "mg/dL" },
    { name: "LDL", value: 60, max: 130, unit: "mg/dL" },
    { name: "Triglicérides", value: 98, max: 150, unit: "mg/dL" },
  ]

  // Dados da função renal
  const renalData = [
    { name: "Creatinina", value: 0.85, min: 0.8, max: 1.3, unit: "mg/dL" },
    { name: "Ureia", value: 42, min: 17, max: 43, unit: "mg/dL" },
  ]

  // Função para calcular a porcentagem dentro do intervalo de referência
  const calculatePercentage = (value, min, max) => {
    if (!min) min = 0
    if (!max) return ((value - min) / min) * 50 + 50 // Se não tem máximo, considera acima do mínimo como bom

    const range = max - min
    const position = value - min
    return (position / range) * 100
  }

  // Função para determinar a cor com base no valor e intervalo de referência
  const getColorClass = (value, min, max) => {
    if (!min && !max) return "text-emerald-500"
    if (!min) return value <= max ? "text-emerald-500" : "text-red-500"
    if (!max) return value >= min ? "text-emerald-500" : "text-red-500"

    if (value < min || value > max) return "text-red-500"

    // Dentro do intervalo, mas próximo dos limites
    const percentage = calculatePercentage(value, min, max)
    if (percentage < 15 || percentage > 85) return "text-amber-500"
    return "text-emerald-500"
  }

  // Dados para o gráfico de distribuição de células sanguíneas
  const cellDistributionData = [
    { name: "Neutrófilos", value: 53 },
    { name: "Linfócitos", value: 35 },
    { name: "Monócitos", value: 8 },
    { name: "Eosinófilos", value: 3 },
    { name: "Basófilos", value: 1 },
  ]

  // Cores para o gráfico de pizza
  const COLORS = ["#10b981", "#8b5cf6", "#3b82f6", "#f59e0b", "#ef4444"]

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Informações do Exame</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p>
              <span className="font-medium">Paciente:</span> Otávio Martins
            </p>
            <p>
              <span className="font-medium">Data de Nascimento:</span> 10/01/1946
            </p>
            <p>
              <span className="font-medium">Idade:</span> 75 anos
            </p>
          </div>
          <div>
            <p>
              <span className="font-medium">Protocolo:</span> 051-66047-559
            </p>
            <p>
              <span className="font-medium">Médico Responsável:</span> Célia Aleixo Portugal
            </p>
            <p>
              <span className="font-medium">Data do Exame:</span> 15/03/2021
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hemograma</CardTitle>
            <CardDescription>Valores de referência e resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hemogramaData.map((item) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className={`text-sm font-medium ${getColorClass(item.value, item.min, item.max)}`}>
                      {item.value} {item.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                    <div
                      className={`h-full ${getColorClass(item.value, item.min, item.max).replace("text-", "bg-")}`}
                      style={{
                        width: `${Math.min(100, Math.max(0, calculatePercentage(item.value, item.min, item.max)))}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-zinc-400">
                    {item.min && <span>Min: {item.min}</span>}
                    {item.max && <span>Max: {item.max}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leucócitos e Plaquetas</CardTitle>
            <CardDescription>Contagem celular</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer
              config={{
                value: {
                  label: "Valor",
                  color: "hsl(var(--chart-1))",
                },
                min: {
                  label: "Mínimo",
                  color: "hsl(var(--chart-2))",
                },
                max: {
                  label: "Máximo",
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={celulasData.map((item) => ({
                    name: item.name,
                    value: item.value,
                    min: item.min,
                    max: item.max,
                  }))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" scale="log" domain={["auto", "auto"]} />
                  <Tooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name) => [`${value.toLocaleString()}`, name]}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Valor" fill="#10b981" />
                  <Bar dataKey="min" name="Mínimo" fill="#3b82f6" />
                  <Bar dataKey="max" name="Máximo" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Perfil Lipídico</CardTitle>
            <CardDescription>Colesterol e triglicérides</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lipidData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis stroke="#a1a1aa" />
                  <Tooltip
                    formatter={(value) => [`${value} ${lipidData.find((item) => item.value === value)?.unit || ""}`]}
                    contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                  />
                  <Bar dataKey="value" name="Valor">
                    {lipidData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getColorClass(entry.value, entry.min, entry.max)
                          .replace("text-", "#")
                          .replace("emerald-500", "10b981")
                          .replace("amber-500", "f59e0b")
                          .replace("red-500", "ef4444")}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Células Sanguíneas</CardTitle>
            <CardDescription>Neutrófilos, linfócitos e outros</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cellDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cellDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`]}
                  contentStyle={{ backgroundColor: "#27272a", borderColor: "#3f3f46", color: "white" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Função Renal</CardTitle>
            <CardDescription>Creatinina e ureia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {renalData.map((item) => (
                <div key={item.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className={`text-sm font-medium ${getColorClass(item.value, item.min, item.max)}`}>
                      {item.value} {item.unit}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-700">
                    <div
                      className={`h-full ${getColorClass(item.value, item.min, item.max).replace("text-", "bg-")}`}
                      style={{
                        width: `${Math.min(100, Math.max(0, calculatePercentage(item.value, item.min, item.max)))}%`,
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-zinc-400">
                    <span>Min: {item.min}</span>
                    <span>Max: {item.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo do Exame</CardTitle>
            <CardDescription>Análise geral dos resultados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <p>
                Os resultados do hemograma completo de Otávio Martins estão dentro dos valores de referência, indicando
                um quadro hematológico normal para sua idade.
              </p>
              <p>
                O perfil lipídico apresenta valores ótimos, com colesterol total, LDL e triglicérides abaixo dos limites
                de referência, e HDL acima do valor mínimo recomendado, sugerindo um bom controle lipídico.
              </p>
              <p>
                A função renal, avaliada pelos níveis de creatinina e ureia, também se encontra dentro dos parâmetros
                normais, indicando uma boa função dos rins.
              </p>
              <p>
                <span className="font-medium text-emerald-500">Conclusão:</span> Os resultados dos exames laboratoriais
                indicam um bom estado de saúde geral, compatível com um adequado controle das condições pré-existentes
                (hipertensão controlada).
              </p>
            </div>
          </CardContent>
        </Card>
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
              <h4 className="font-medium">Treino A - Membros Superiores</h4>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                Segunda e Quinta
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">Foco em fortalecimento de ombros e braços com cargas leves</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">1.</span> Elevação lateral com halteres - 3x12 (2kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">2.</span> Rosca direta com halteres - 3x12 (3kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">3.</span> Extensão de tríceps na polia - 3x12 (15kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">4.</span> Remada baixa na máquina - 3x12 (20kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">5.</span> Puxada frontal - 3x12 (25kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">6.</span> Rotação externa de ombro - 3x15 (elástico)
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-zinc-800 p-4">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-medium">Treino B - Membros Inferiores</h4>
              <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                Terça e Sexta
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-zinc-400">Foco em mobilidade e fortalecimento de quadril e joelhos</p>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">1.</span> Leg press horizontal - 3x12 (40kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">2.</span> Extensão de joelhos - 3x12 (15kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">3.</span> Flexão de joelhos - 3x12 (10kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">4.</span> Abdução de quadril - 3x15 (15kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">5.</span> Adução de quadril - 3x15 (15kg)
                </div>
                <div className="rounded-md bg-zinc-700/30 p-2 text-sm">
                  <span className="font-medium">6.</span> Panturrilha em pé - 3x15 (peso corporal)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HistoryTab() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Histórico de Treinos</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Treino
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Duração
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Treinador
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Observações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">15/04/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Treino A - Membros Superiores</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">45 min</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Ricardo</td>
                <td className="px-4 py-3 text-sm">Completou todas as séries com boa execução</td>
              </tr>
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">12/04/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Treino B - Membros Inferiores</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">50 min</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Carla</td>
                <td className="px-4 py-3 text-sm">Sentiu leve desconforto no joelho direito</td>
              </tr>
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">10/04/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Treino A - Membros Superiores</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">45 min</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Ricardo</td>
                <td className="px-4 py-3 text-sm">Aumentou carga na remada baixa</td>
              </tr>
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">08/04/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Treino B - Membros Inferiores</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">45 min</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Carla</td>
                <td className="px-4 py-3 text-sm">Pressão arterial: 130/85 mmHg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Histórico de Avaliações</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Peso</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Pressão Arterial
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                  Avaliador
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700">
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">01/04/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Avaliação Física</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">72.0 kg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">130/80 mmHg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Dr. Carlos Mendes</td>
              </tr>
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">01/01/2025</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Avaliação Física</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">73.5 kg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">135/85 mmHg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Dr. Carlos Mendes</td>
              </tr>
              <tr className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm">01/10/2024</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Avaliação Física</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">74.2 kg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">140/85 mmHg</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">Dr. Carlos Mendes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
