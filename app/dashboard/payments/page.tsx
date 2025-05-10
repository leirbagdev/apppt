"use client"

import { useState } from "react"
import { Tab } from "@headlessui/react"
import {
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Payments() {
  const [categories] = useState({
    Histórico: [
      {
        id: 1,
        content: <PaymentHistory />,
      },
    ],
    Faturas: [
      {
        id: 1,
        content: <Invoices />,
      },
    ],
    "Métodos de Pagamento": [
      {
        id: 1,
        content: <PaymentMethods />,
      },
    ],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pagamentos</h2>
        <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
          <PlusIcon className="h-4 w-4" />
          Novo Pagamento
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-emerald-500/10 p-3">
              <BanknotesIcon className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Plano Atual</p>
              <p className="text-xl font-semibold">Premium</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-purple-500/10 p-3">
              <DocumentTextIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Próximo Pagamento</p>
              <p className="text-xl font-semibold">15/05/2025</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-zinc-800 p-6">
          <div className="flex items-center">
            <div className="mr-4 rounded-full bg-amber-500/10 p-3">
              <CreditCardIcon className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Valor Mensal</p>
              <p className="text-xl font-semibold">R$ 149,90</p>
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
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-zinc-400">Status</p>
              <p className="text-xl font-semibold">Em dia</p>
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
        <h2 className="mb-4 text-lg font-semibold">Planos Disponíveis</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-700 bg-zinc-700/30 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Básico</h3>
              <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs font-medium">Mensal</span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                R$ 99,90<span className="text-sm text-zinc-400">/mês</span>
              </p>
            </div>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Acesso à academia
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Plano de treino básico
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Avaliação física trimestral
              </li>
              <li className="flex items-center text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-zinc-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Acompanhamento nutricional
              </li>
              <li className="flex items-center text-zinc-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-zinc-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Aulas coletivas
              </li>
            </ul>
            <button className="w-full rounded-lg border border-emerald-600 bg-transparent px-4 py-2 text-sm font-medium text-emerald-500 hover:bg-emerald-600 hover:text-white">
              Selecionar Plano
            </button>
          </div>

          <div className="relative rounded-lg border-2 border-emerald-500 bg-zinc-700/30 p-6">
            <div className="absolute -top-3 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Popular
            </div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">Premium</h3>
              <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs font-medium">Mensal</span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                R$ 149,90<span className="text-sm text-zinc-400">/mês</span>
              </p>
            </div>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Acesso à academia
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Plano de treino personalizado
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Avaliação física mensal
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Acompanhamento nutricional
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Aulas coletivas
              </li>
            </ul>
            <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
              Seu Plano Atual
            </button>
          </div>

          <div className="rounded-lg border border-zinc-700 bg-zinc-700/30 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">VIP</h3>
              <span className="rounded-full bg-zinc-700 px-2 py-1 text-xs font-medium">Mensal</span>
            </div>
            <div className="mb-4">
              <p className="text-3xl font-bold">
                R$ 249,90<span className="text-sm text-zinc-400">/mês</span>
              </p>
            </div>
            <ul className="mb-6 space-y-2 text-sm">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Acesso à academia
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Personal trainer exclusivo
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Avaliação física quinzenal
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Nutricionista exclusivo
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-2 h-4 w-4 text-emerald-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                    clipRule="evenodd"
                  />
                </svg>
                Acesso prioritário às aulas
              </li>
            </ul>
            <button className="w-full rounded-lg border border-emerald-600 bg-transparent px-4 py-2 text-sm font-medium text-emerald-500 hover:bg-emerald-600 hover:text-white">
              Fazer Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentHistory() {
  const payments = [
    {
      id: "INV-2025-042",
      date: "15/04/2025",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: "INV-2025-041",
      date: "15/03/2025",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: "INV-2025-040",
      date: "15/02/2025",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: "INV-2025-039",
      date: "15/01/2025",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: "INV-2024-038",
      date: "15/12/2024",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
    {
      id: "INV-2024-037",
      date: "15/11/2024",
      amount: "R$ 149,90",
      method: "Cartão de Crédito",
      status: "Pago",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Referência
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Data</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Valor</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Método de Pagamento
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Recibo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{payment.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{payment.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{payment.amount}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{payment.method}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
                    {payment.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <button className="flex items-center text-emerald-500 hover:text-emerald-400">
                    <ArrowDownTrayIcon className="mr-1 h-4 w-4" />
                    PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">Mostrando 6 de 24 transações</div>
        <div className="flex items-center space-x-2">
          <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-700">
            Anterior
          </button>
          <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-sm text-zinc-400 hover:bg-zinc-700">
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}

function Invoices() {
  const invoices = [
    {
      id: "INV-2025-043",
      date: "15/05/2025",
      dueDate: "15/05/2025",
      amount: "R$ 149,90",
      status: "Pendente",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-700">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Referência
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Data de Emissão
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">
                Data de Vencimento
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Valor</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-400">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-700">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-zinc-700/30">
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium">{invoice.id}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{invoice.date}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{invoice.dueDate}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">{invoice.amount}</td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-500">
                    {invoice.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm">
                  <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-500">
                    Pagar Agora
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invoices.length === 0 ? (
        <div className="rounded-lg bg-zinc-700/30 p-8 text-center">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-zinc-500" />
          <h3 className="mt-2 text-lg font-medium">Nenhuma fatura pendente</h3>
          <p className="mt-1 text-sm text-zinc-400">Você não possui faturas pendentes no momento.</p>
        </div>
      ) : null}
    </div>
  )
}

function PaymentMethods() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Métodos de Pagamento Salvos</h3>
        <button className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1 text-sm font-medium text-white hover:bg-emerald-500">
          <PlusIcon className="h-4 w-4" />
          Adicionar Método
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-zinc-700/30 p-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
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
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Mastercard terminando em 4321</p>
              <p className="text-sm text-zinc-400">Expira em 05/2027</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-500">
              Padrão
            </span>
            <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 hover:bg-zinc-700">
              Editar
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-zinc-700/30 p-4">
          <div className="flex items-center">
            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-700">
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
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Visa terminando em 7890</p>
              <p className="text-sm text-zinc-400">Expira em 09/2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 hover:bg-zinc-700">
              Definir como padrão
            </button>
            <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1 text-xs text-zinc-400 hover:bg-zinc-700">
              Editar
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Adicionar Novo Método de Pagamento</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-zinc-300">
              Número do Cartão
            </label>
            <input
              type="text"
              id="card-number"
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="card-name" className="block text-sm font-medium text-zinc-300">
              Nome no Cartão
            </label>
            <input
              type="text"
              id="card-name"
              placeholder="Nome completo"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-zinc-300">
              Data de Expiração
            </label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/AA"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-zinc-300">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500">
            Salvar Cartão
          </button>
        </div>
      </div>
    </div>
  )
}
