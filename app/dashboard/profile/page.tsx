"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import { Award, Calendar, Clock, Users, Briefcase, GraduationCap } from "lucide-react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Profile() {
  const [categories] = useState({
    "Informações Pessoais": [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
              <div className="relative h-24 w-24 overflow-hidden rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                />
                <button className="absolute bottom-0 right-0 rounded-full bg-emerald-600 p-1 text-white hover:bg-emerald-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V13.14c0 .48.159.935.44 1.302M9.75 20.25c3.75 0 7.5-1.5 7.5-6a3 3 0 00-3-3H6.75a3 3 0 00-3 3c0 4.5 3.75 6 7.5 6zM9 11.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold">Gabriel Maciel</h3>
                <p className="text-zinc-400">CREF 030307-PR</p>
                <p className="text-zinc-400">gabriel@email.com</p>
                <p className="text-zinc-400">Membro desde Janeiro 2018</p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue="Gabriel Maciel"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    defaultValue="gabriel@email.com"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    defaultValue="(41) 9 9969-6969"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="cref" className="block text-sm font-medium text-zinc-300">
                    CREF
                  </label>
                  <input
                    type="text"
                    id="cref"
                    defaultValue="030307-PR"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="birthdate" className="block text-sm font-medium text-zinc-300">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    defaultValue="1996-03-23"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-zinc-300">
                    Gênero
                  </label>
                  <select
                    id="gender"
                    defaultValue="male"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="female">Feminino</option>
                    <option value="male">Masculino</option>
                    <option value="other">Outro</option>
                    <option value="prefer-not-to-say">Prefiro não informar</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="emergency-contact" className="block text-sm font-medium text-zinc-300">
                    Contato de Emergência
                  </label>
                  <input
                    type="text"
                    id="emergency-contact"
                    defaultValue="Maria Maciel - (41) 99876-5432"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-300">
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    defaultValue="Rua das Flores, 123 - Curitiba, PR"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Estatísticas Profissionais</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
                  <Users className="mb-2 h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold">28</span>
                  <span className="text-sm text-zinc-400">Alunos Ativos</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
                  <Calendar className="mb-2 h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold">6</span>
                  <span className="text-sm text-zinc-400">Anos de Experiência</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
                  <Clock className="mb-2 h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold">42</span>
                  <span className="text-sm text-zinc-400">Horas Semanais</span>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
                  <Award className="mb-2 h-8 w-8 text-emerald-500" />
                  <span className="text-2xl font-bold">8</span>
                  <span className="text-sm text-zinc-400">Certificações</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        ),
      },
    ],
    "Medidas e Avaliações": [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-zinc-700/30 p-4">
                <h3 className="mb-4 text-lg font-medium">Medidas Atuais (07/10/2024)</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Peso</span>
                    <span className="font-medium">79.0 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Altura</span>
                    <span className="font-medium">181.5 cm</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>IMC</span>
                    <span className="font-medium">24.0</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>% de Gordura</span>
                    <span className="font-medium">7.0%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Massa Muscular</span>
                    <span className="font-medium">41.4 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Água Corporal</span>
                    <span className="font-medium">53.7 L</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Proteína</span>
                    <span className="font-medium">14.8 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Minerais</span>
                    <span className="font-medium">4.98 kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontuação InBody</span>
                    <span className="font-medium text-emerald-500">92</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-700/30 p-4">
                <h3 className="mb-4 text-lg font-medium">Medidas Anteriores (01/08/2018)</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Peso</span>
                    <span className="font-medium">66.7 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Altura</span>
                    <span className="font-medium">181 cm</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>IMC</span>
                    <span className="font-medium">20.8</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>% de Gordura</span>
                    <span className="font-medium">9.8%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Massa Muscular</span>
                    <span className="font-medium">34.9 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Água Corporal</span>
                    <span className="font-medium">45.0 L</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Proteína</span>
                    <span className="font-medium">12.2 kg</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-zinc-700 pb-2">
                    <span>Minerais</span>
                    <span className="font-medium">4.18 kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Pontuação InBody</span>
                    <span className="font-medium text-emerald-500">76</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Comparativo de Evolução (2018-2024)</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-md font-medium">Composição Corporal</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Peso (kg)</span>
                        <span className="text-xs text-emerald-500">+12.3 kg</span>
                      </div>
                      <div className="h-10 w-full rounded-md bg-zinc-800 p-2">
                        <div className="flex h-full items-center">
                          <div className="h-full bg-blue-500" style={{ width: "84%" }}></div>
                          <div className="h-full bg-emerald-500" style={{ width: "16%" }}></div>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>66.7 kg (2018)</span>
                        <span>79.0 kg (2024)</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">% de Gordura</span>
                        <span className="text-xs text-emerald-500">-2.8%</span>
                      </div>
                      <div className="h-10 w-full rounded-md bg-zinc-800 p-2">
                        <div className="flex h-full items-center">
                          <div className="h-full bg-purple-500" style={{ width: "71%" }}></div>
                          <div className="h-full bg-emerald-500" style={{ width: "29%" }}></div>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>9.8% (2018)</span>
                        <span>7.0% (2024)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-md font-medium">Massa Muscular</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Massa Muscular (kg)</span>
                        <span className="text-xs text-emerald-500">+6.5 kg</span>
                      </div>
                      <div className="h-10 w-full rounded-md bg-zinc-800 p-2">
                        <div className="flex h-full items-center">
                          <div className="h-full bg-amber-500" style={{ width: "84%" }}></div>
                          <div className="h-full bg-emerald-500" style={{ width: "16%" }}></div>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>34.9 kg (2018)</span>
                        <span>41.4 kg (2024)</span>
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">Pontuação InBody</span>
                        <span className="text-xs text-emerald-500">+16 pontos</span>
                      </div>
                      <div className="h-10 w-full rounded-md bg-zinc-800 p-2">
                        <div className="flex h-full items-center">
                          <div className="h-full bg-emerald-700" style={{ width: "83%" }}></div>
                          <div className="h-full bg-emerald-500" style={{ width: "17%" }}></div>
                        </div>
                      </div>
                      <div className="mt-1 flex justify-between text-xs">
                        <span>76 (2018)</span>
                        <span>92 (2024)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Análise Segmentar (07/10/2024)</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-md font-medium">Massa Muscular Segmentar</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Braço Direito</span>
                      <div className="flex items-center">
                        <span className="font-medium">4.40 kg</span>
                        <span className="ml-2 text-xs text-emerald-500">(124.6%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "124.6%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Braço Esquerdo</span>
                      <div className="flex items-center">
                        <span className="font-medium">4.41 kg</span>
                        <span className="ml-2 text-xs text-emerald-500">(124.8%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "124.8%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Tronco</span>
                      <div className="flex items-center">
                        <span className="font-medium">27.7 kg</span>
                        <span className="ml-2 text-xs text-emerald-500">(116.1%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "116.1%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Perna Direita</span>
                      <div className="flex items-center">
                        <span className="font-medium">10.96 kg</span>
                        <span className="ml-2 text-xs text-emerald-500">(111.6%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "111.6%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Perna Esquerda</span>
                      <div className="flex items-center">
                        <span className="font-medium">10.97 kg</span>
                        <span className="ml-2 text-xs text-emerald-500">(111.7%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "111.7%" }}></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 text-md font-medium">Gordura Segmentar</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Braço Direito</span>
                      <div className="flex items-center">
                        <span className="font-medium">0.5 kg</span>
                        <span className="ml-2 text-xs text-amber-500">(52.4%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "52.4%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Braço Esquerdo</span>
                      <div className="flex items-center">
                        <span className="font-medium">0.5 kg</span>
                        <span className="ml-2 text-xs text-amber-500">(52.4%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "52.4%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Tronco</span>
                      <div className="flex items-center">
                        <span className="font-medium">2.4 kg</span>
                        <span className="ml-2 text-xs text-amber-500">(52.4%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "52.4%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Perna Direita</span>
                      <div className="flex items-center">
                        <span className="font-medium">0.9 kg</span>
                        <span className="ml-2 text-xs text-amber-500">(47.4%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "47.4%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Perna Esquerda</span>
                      <div className="flex items-center">
                        <span className="font-medium">0.9 kg</span>
                        <span className="ml-2 text-xs text-amber-500">(47.7%)</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800">
                      <div className="h-2 rounded-full bg-amber-500" style={{ width: "47.7%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Avaliações InBody</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Data
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Tipo
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Local
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Pontuação
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">07/10/2024</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">InBody 270</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Academia Carpe Diem</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                          92/100
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <button className="text-emerald-500 hover:text-emerald-400">Ver relatório</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">01/08/2018</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">InBody 120</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Academia Carpe Diem</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                          76/100
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <button className="text-emerald-500 hover:text-emerald-400">Ver relatório</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ),
      },
    ],
    Qualificações: [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Formação Acadêmica</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-emerald-600/20 p-2">
                    <GraduationCap className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Bacharelado em Educação Física</h4>
                    <p className="text-sm text-zinc-400">Universidade Federal do Paraná</p>
                    <p className="text-sm text-zinc-400">2014 - 2018</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-emerald-600/20 p-2">
                    <GraduationCap className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Especialização em Fisiologia do Exercício</h4>
                    <p className="text-sm text-zinc-400">Universidade Positivo</p>
                    <p className="text-sm text-zinc-400">2019 - 2020</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-emerald-600/20 p-2">
                    <GraduationCap className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Mestrado em Ciências do Esporte</h4>
                    <p className="text-sm text-zinc-400">Universidade Federal do Paraná</p>
                    <p className="text-sm text-zinc-400">2021 - 2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Certificações</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-purple-600/20 p-2">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Certificação em Treinamento Funcional</h4>
                    <p className="text-sm text-zinc-400">FunctionalTraining Brasil</p>
                    <p className="text-sm text-zinc-400">2019</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-purple-600/20 p-2">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Certificação em Nutrição Esportiva</h4>
                    <p className="text-sm text-zinc-400">Instituto de Nutrição Esportiva</p>
                    <p className="text-sm text-zinc-400">2020</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-purple-600/20 p-2">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Certificação em Treinamento de Força</h4>
                    <p className="text-sm text-zinc-400">Strength Academy</p>
                    <p className="text-sm text-zinc-400">2021</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-purple-600/20 p-2">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Certificação em Avaliação Física</h4>
                    <p className="text-sm text-zinc-400">ISAK Nível 1</p>
                    <p className="text-sm text-zinc-400">2022</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-purple-600/20 p-2">
                    <Award className="h-6 w-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Certificação em Reabilitação Esportiva</h4>
                    <p className="text-sm text-zinc-400">Sports Rehab Institute</p>
                    <p className="text-sm text-zinc-400">2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Experiência Profissional</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-blue-600/20 p-2">
                    <Briefcase className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personal Trainer</h4>
                    <p className="text-sm text-zinc-400">Academia Carpe Diem</p>
                    <p className="text-sm text-zinc-400">2018 - Presente</p>
                    <p className="mt-1 text-sm">
                      Treinamento personalizado para mais de 30 clientes, com foco em hipertrofia, emagrecimento e
                      reabilitação.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-blue-600/20 p-2">
                    <Briefcase className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Consultor de Treinamento</h4>
                    <p className="text-sm text-zinc-400">FitLife Consultoria</p>
                    <p className="text-sm text-zinc-400">2020 - Presente</p>
                    <p className="mt-1 text-sm">
                      Desenvolvimento de programas de treinamento para academias e estúdios de personal training.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-md bg-blue-600/20 p-2">
                    <Briefcase className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Professor de Educação Física</h4>
                    <p className="text-sm text-zinc-400">Colégio São José</p>
                    <p className="text-sm text-zinc-400">2018 - 2020</p>
                    <p className="mt-1 text-sm">
                      Ministração de aulas de educação física para ensino fundamental e médio.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">Hipertrofia</span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">Emagrecimento</span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">Reabilitação</span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Treinamento Funcional
                </span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Avaliação Física
                </span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Nutrição Esportiva
                </span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Periodização de Treino
                </span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Treinamento para Idosos
                </span>
                <span className="rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-500">
                  Preparação Física
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
    Preferências: [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Preferências de Notificação</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Lembretes de Treino</p>
                    <p className="text-sm text-zinc-400">Receba lembretes antes dos seus treinos agendados</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações de Plano</p>
                    <p className="text-sm text-zinc-400">Seja notificado quando seu plano de treino for atualizado</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mensagens dos Alunos</p>
                    <p className="text-sm text-zinc-400">Receba notificações de mensagens dos seus alunos</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atualizações de Nutrição</p>
                    <p className="text-sm text-zinc-400">Seja notificado sobre atualizações nos planos nutricionais</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Novidades e Promoções</p>
                    <p className="text-sm text-zinc-400">Receba informações sobre novos serviços e promoções</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Preferências de Trabalho</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="training-days" className="block text-sm font-medium text-zinc-300">
                    Dias Disponíveis para Atendimento
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked={["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].includes(day)}
                          className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="ml-2 text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="training-time" className="block text-sm font-medium text-zinc-300">
                    Horário Preferido
                  </label>
                  <select
                    id="training-time"
                    defaultValue="all"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="morning">Manhã (6h - 12h)</option>
                    <option value="afternoon">Tarde (12h - 18h)</option>
                    <option value="evening">Noite (18h - 22h)</option>
                    <option value="all">Todos os horários</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="max-clients" className="block text-sm font-medium text-zinc-300">
                    Número Máximo de Alunos
                  </label>
                  <input
                    type="number"
                    id="max-clients"
                    defaultValue="30"
                    min="1"
                    max="50"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        ),
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Perfil do Personal</h2>
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
