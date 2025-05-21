"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useState, useEffect } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  Bars3Icon,
  ChartBarIcon,
  ClockIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  UserIcon,
  VideoCameraIcon,
  XMarkIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { supabase } from "../../lib/supabaseClient"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Alunos", href: "/dashboard/students", icon: UserIcon },
  { name: "Treinos", href: "/dashboard/workouts", icon: VideoCameraIcon },
  { name: "Agendamento", href: "/dashboard/schedule", icon: ClockIcon },
  { name: "Pagamentos", href: "/dashboard/payments", icon: CreditCardIcon },
]

const userNavigation = [
  { name: "Meu Perfil", href: "/dashboard/profile", icon: UserIcon },
  { name: "Configurações", href: "/dashboard/settings", icon: Cog6ToothIcon },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    })
  }, [router])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Erro ao fazer logout:", error.message)
    } else {
      router.push("/login")
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>
  }

  return (
    <div className="h-full bg-zinc-900 text-white">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Fechar menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-800 px-6 pb-4 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <h2 className="text-xl font-bold text-emerald-500">appt - for trainers</h2>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                  pathname === item.href
                                    ? "bg-zinc-700 text-white"
                                    : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                }`}
                              >
                                <item.icon
                                  className={`h-6 w-6 shrink-0 ${
                                    pathname === item.href ? "text-emerald-500" : "text-zinc-400 group-hover:text-white"
                                  }`}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-zinc-400">Sua conta</div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {userNavigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                  pathname === item.href
                                    ? "bg-zinc-700 text-white"
                                    : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                }`}
                              >
                                <item.icon
                                  className={`h-6 w-6 shrink-0 ${
                                    pathname === item.href ? "text-emerald-500" : "text-zinc-400 group-hover:text-white"
                                  }`}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="mt-auto">
                        <button
                          onClick={handleSignOut}
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-700 hover:text-white w-full"
                        >
                          <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0 text-zinc-400 group-hover:text-white" />
                          Sair
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-800 px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-bold text-emerald-500">appt - for trainers</h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                          pathname === item.href
                            ? "bg-zinc-700 text-white"
                            : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            pathname === item.href ? "text-emerald-500" : "text-zinc-400 group-hover:text-white"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="text-xs font-semibold leading-6 text-zinc-400">Sua conta</div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {userNavigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                          pathname === item.href
                            ? "bg-zinc-700 text-white"
                            : "text-zinc-400 hover:bg-zinc-700 hover:text-white"
                        }`}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 ${
                            pathname === item.href ? "text-emerald-500" : "text-zinc-400 group-hover:text-white"
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={handleSignOut}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-zinc-400 hover:bg-zinc-700 hover:text-white w-full"
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0 text-zinc-400 group-hover:text-white" />
                  Sair
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-700 bg-zinc-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-zinc-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Abrir menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg font-semibold">
                {pathname === "/dashboard"
                  ? "Dashboard"
                  : pathname === "/dashboard/students"
                    ? "Alunos"
                    : pathname === "/dashboard/workouts"
                      ? "Treinos"
                      : pathname === "/dashboard/health-metrics"
                          ? "Métricas de Saúde"
                          : pathname === "/dashboard/schedule"
                            ? "Agendamento"
                            : pathname === "/dashboard/progress"
                              ? "Progresso"
                              : pathname === "/dashboard/payments"
                                ? "Pagamentos"
                                : pathname === "/dashboard/profile"
                                  ? "Meu Perfil"
                                  : pathname === "/dashboard/settings"
                                    ? "Configurações"
                                    : ""}
              </h1>
            </div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button type="button" className="-m-2.5 p-2.5 text-zinc-400 hover:text-zinc-300">
                <span className="sr-only">Ver notificações</span>
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-zinc-700" aria-hidden="true" />

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div className="relative flex-shrink-0">
                  <div className="flex rounded-full bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-800">
                    <span className="sr-only">Abrir menu do usuário</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                </div>
                <span className="hidden lg:flex lg:items-center">
                  <span className="text-sm font-semibold leading-6 text-white" aria-hidden="true">
                    Ana Silva
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
