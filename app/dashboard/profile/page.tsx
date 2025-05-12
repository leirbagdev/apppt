"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { Award, Calendar, Clock, Users, Briefcase, GraduationCap } from "lucide-react"
import { PersonalInfoForm } from "@/components/profile/PersonalInfoForm"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Profile() {
  const [categories] = useState({
    "Informações Pessoais": [
      {
        id: 1,
        content: <PersonalInfoForm />
      },
    ],
    "Medidas e Avaliações": [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="text-lg font-medium mb-4">Medidas Atuais (07/10/2024)</h3>
              <p className="text-zinc-400">Esta seção seria extraída para um componente separado de medidas.</p>
            </div>
          </div>
        ),
      },
    ],
    "Especialidades": [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="text-lg font-medium mb-4">Especialidades e Certificações</h3>
              <p className="text-zinc-400">Esta seção seria extraída para um componente separado de especialidades.</p>
            </div>
          </div>
        ),
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="pb-5 border-b border-zinc-700">
        <h3 className="text-2xl font-medium leading-6">Perfil Profissional</h3>
        <p className="mt-2 max-w-4xl text-sm text-zinc-400">
          Gerencie suas informações pessoais, credenciais profissionais e especialidades.
        </p>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-800 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-1 ring-offset-emerald-400 focus:outline-none focus:ring-1",
                  selected
                    ? "bg-emerald-600 text-white shadow"
                    : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          {Object.values(categories).map((category, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-zinc-900 p-6",
                "ring-white/60 ring-offset-2 ring-offset-emerald-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="space-y-6">
                {category.map((item) => (
                  <div key={item.id}>{item.content}</div>
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
