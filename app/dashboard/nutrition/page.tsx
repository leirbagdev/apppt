"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Nutrition() {
  const [categories] = useState({
    "Plano Alimentar": [
      {
        id: 1,
        meal: "Café da Manhã",
        time: "07:00",
        foods: [
          { name: "Ovos mexidos", quantity: "2 unidades", calories: 140 },
          { name: "Pão integral", quantity: "2 fatias", calories: 120 },
          { name: "Abacate", quantity: "1/2 unidade", calories: 160 },
          { name: "Café preto", quantity: "1 xícara", calories: 5 },
        ],
        totalCalories: 425,
        macros: { protein: "20g", carbs: "30g", fat: "22g" },
      },
      {
        id: 2,
        meal: "Lanche da Manhã",
        time: "10:00",
        foods: [
          { name: "Iogurte grego", quantity: "200g", calories: 130 },
          { name: "Granola", quantity: "30g", calories: 120 },
          { name: "Banana", quantity: "1 unidade", calories: 105 },
        ],
        totalCalories: 355,
        macros: { protein: "15g", carbs: "45g", fat: "10g" },
      },
      {
        id: 3,
        meal: "Almoço",
        time: "13:00",
        foods: [
          { name: "Peito de frango grelhado", quantity: "150g", calories: 165 },
          { name: "Arroz integral", quantity: "100g", calories: 110 },
          { name: "Brócolis", quantity: "100g", calories: 55 },
          { name: "Azeite de oliva", quantity: "1 colher", calories: 120 },
        ],
        totalCalories: 450,
        macros: { protein: "35g", carbs: "40g", fat: "15g" },
      },
    ],
    Suplementação: [
      {
        id: 1,
        name: "Whey Protein",
        timing: "Pós-treino",
        dosage: "30g (1 scoop)",
        purpose: "Recuperação muscular e síntese proteica",
        instructions: "Consumir até 30 minutos após o treino",
      },
      {
        id: 2,
        name: "Creatina",
        timing: "Diariamente",
        dosage: "5g",
        purpose: "Aumento de força e desempenho em treinos de alta intensidade",
        instructions: "Pode ser consumida a qualquer momento do dia",
      },
      {
        id: 3,
        name: "Multivitamínico",
        timing: "Manhã",
        dosage: "1 cápsula",
        purpose: "Prevenção de deficiências nutricionais",
        instructions: "Consumir após o café da manhã",
      },
    ],
    Recomendações: [
      {
        id: 1,
        title: "Hidratação",
        description: "Consumir pelo menos 3 litros de água por dia, aumentando em dias de treino intenso.",
      },
      {
        id: 2,
        title: "Refeições",
        description: "Realizar 5-6 refeições por dia, com intervalo de 3-4 horas entre elas.",
      },
      {
        id: 3,
        title: "Pré-treino",
        description: "Consumir carboidratos de rápida absorção 30-60 minutos antes do treino para maximizar a energia.",
      },
      {
        id: 4,
        title: "Pós-treino",
        description: "Consumir proteínas e carboidratos até 30 minutos após o treino para otimizar a recuperação.",
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nutrição</h2>
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
          Solicitar Ajuste
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
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
                  d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Calorias Diárias</p>
              <p className="text-xl font-semibold">2.200 kcal</p>
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
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Distribuição de Macros</p>
              <p className="text-xl font-semibold">40P / 30C / 30G</p>
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
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Objetivo Atual</p>
              <p className="text-xl font-semibold">Definição</p>
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
            <Tab.Panel className="rounded-xl bg-zinc-800 p-3">
              <div className="space-y-6">
                {categories["Plano Alimentar"].map((meal) => (
                  <div key={meal.id} className="rounded-lg bg-zinc-700/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{meal.meal}</h3>
                        <p className="text-sm text-zinc-400">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{meal.totalCalories} kcal</p>
                        <p className="text-xs text-zinc-400">
                          P: {meal.macros.protein} | C: {meal.macros.carbs} | G: {meal.macros.fat}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {meal.foods.map((food, index) => (
                        <div key={index} className="flex items-center justify-between border-b border-zinc-700 pb-2">
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-zinc-400">{food.quantity}</p>
                          </div>
                          <p className="text-sm">{food.calories} kcal</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-zinc-800 p-3">
              <div className="space-y-4">
                {categories["Suplementação"].map((supplement) => (
                  <div key={supplement.id} className="rounded-lg bg-zinc-700/30 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-medium">{supplement.name}</h3>
                      <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs">{supplement.timing}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Dosagem:</span> {supplement.dosage}
                      </p>
                      <p>
                        <span className="font-medium">Finalidade:</span> {supplement.purpose}
                      </p>
                      <p>
                        <span className="font-medium">Instruções:</span> {supplement.instructions}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className="rounded-xl bg-zinc-800 p-3">
              <div className="space-y-4">
                {categories["Recomendações"].map((recommendation) => (
                  <div key={recommendation.id} className="rounded-lg bg-zinc-700/30 p-4">
                    <h3 className="mb-2 text-lg font-medium">{recommendation.title}</h3>
                    <p className="text-sm text-zinc-300">{recommendation.description}</p>
                  </div>
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}
