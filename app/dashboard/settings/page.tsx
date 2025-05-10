"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Settings() {
  const [categories] = useState({
    Conta: [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Alterar Senha</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-zinc-300">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-zinc-300">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-zinc-300">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                  >
                    Atualizar Senha
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Dispositivos Conectados</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-emerald-500/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-emerald-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">iPhone 13 Pro</p>
                      <p className="text-sm text-zinc-400">São Paulo, Brasil • Ativo agora</p>
                    </div>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-zinc-300">Desconectar</button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-emerald-500/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-emerald-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <p className="text-sm text-zinc-400">São Paulo, Brasil • Ativo há 2 dias</p>
                    </div>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-zinc-300">Desconectar</button>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-full bg-emerald-500/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 text-emerald-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Navegador Chrome</p>
                      <p className="text-sm text-zinc-400">Rio de Janeiro, Brasil • Ativo há 1 semana</p>
                    </div>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-zinc-300">Desconectar</button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Sessões Ativas</h3>
              <p className="mb-4 text-sm text-zinc-400">
                Estas são suas sessões ativas no momento. Você pode encerrar qualquer sessão que não reconheça.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                  <div>
                    <p className="font-medium">São Paulo, Brasil</p>
                    <p className="text-sm text-zinc-400">Seu local atual • Iniciado há 2 horas</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                    Atual
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                  <div>
                    <p className="font-medium">Rio de Janeiro, Brasil</p>
                    <p className="text-sm text-zinc-400">Iniciado há 3 dias</p>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-zinc-300">Encerrar</button>
                </div>
              </div>
            </div>
          </div>
        ),
      },
    ],
    Assinatura: [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-medium">Plano Premium</h3>
                  <p className="text-sm text-zinc-400">Renovação em 15/07/2023</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
                  Ativo
                </span>
              </div>
              <div className="mt-4 rounded-lg bg-zinc-800 p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-medium">Detalhes do Plano</p>
                    <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                      <li>• Acesso a todos os treinos</li>
                      <li>• Plano nutricional personalizado</li>
                      <li>• Acompanhamento com personal trainer</li>
                      <li>• Avaliações físicas mensais</li>
                      <li>• Acesso a aulas coletivas</li>
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">
                      R$ 149,90<span className="text-sm text-zinc-400">/mês</span>
                    </p>
                    <p className="text-sm text-zinc-400">Próxima cobrança: 15/07/2023</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Histórico de Pagamentos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-700">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Data
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Descrição
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Valor
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                        Recibo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">15/06/2023</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Assinatura Premium</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">R$ 149,90</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                          Pago
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <button className="text-emerald-500 hover:text-emerald-400">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">15/05/2023</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Assinatura Premium</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">R$ 149,90</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                          Pago
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <button className="text-emerald-500 hover:text-emerald-400">Download</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">15/04/2023</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">Assinatura Premium</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">R$ 149,90</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                          Pago
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm">
                        <button className="text-emerald-500 hover:text-emerald-400">Download</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Método de Pagamento</h3>
              <div className="flex items-center justify-between rounded-lg bg-zinc-800 p-3">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-emerald-500/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-emerald-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Cartão de Crédito</p>
                    <p className="text-sm text-zinc-400">Mastercard terminando em 4321</p>
                  </div>
                </div>
                <button className="text-sm text-emerald-500 hover:text-emerald-400">Alterar</button>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="rounded-md bg-zinc-700 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                Cancelar Assinatura
              </button>
              <button
                type="button"
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
              >
                Alterar Plano
              </button>
            </div>
          </div>
        ),
      },
    ],
    Privacidade: [
      {
        id: 1,
        content: (
          <div className="space-y-6">
            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Configurações de Privacidade</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil Público</p>
                    <p className="text-sm text-zinc-400">Permitir que outros membros vejam seu perfil</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compartilhar Progresso</p>
                    <p className="text-sm text-zinc-400">Permitir que seu treinador compartilhe seu progresso</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Histórico de Treinos</p>
                    <p className="text-sm text-zinc-400">Permitir que outros membros vejam seu histórico de treinos</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Dados e Cookies</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookies Essenciais</p>
                    <p className="text-sm text-zinc-400">Necessários para o funcionamento do site</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked disabled className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookies de Análise</p>
                    <p className="text-sm text-zinc-400">Ajudam a melhorar o site através de estatísticas</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" defaultChecked className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cookies de Marketing</p>
                    <p className="text-sm text-zinc-400">Usados para exibir anúncios relevantes</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/25"></div>
                  </label>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                >
                  Salvar Preferências
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-700/30 p-4">
              <h3 className="mb-4 text-lg font-medium">Exportar Dados</h3>
              <p className="mb-4 text-sm text-zinc-400">
                Você pode solicitar uma cópia de todos os seus dados pessoais que temos armazenados.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-zinc-600 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                >
                  Solicitar Dados
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-red-900/20 p-4">
              <h3 className="mb-4 text-lg font-medium text-red-400">Excluir Conta</h3>
              <p className="mb-4 text-sm text-zinc-400">
                Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser
                desfeita.
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                >
                  Excluir Conta
                </button>
              </div>
            </div>
          </div>
        ),
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Configurações</h2>
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
