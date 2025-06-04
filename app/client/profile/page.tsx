"use client"

import { useState, useEffect } from "react"
import { User, Settings, Bell, Shield, Heart, Activity, Calendar, Award, Edit3, Camera } from "lucide-react"

export default function ProfilePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const clientInfo = {
    name: "Ana Carolina",
    email: "ana.carolina@email.com",
    phone: "(11) 99999-9999",
    birthDate: "15/03/1992",
    height: "1.65m",
    weight: "62kg",
    goal: "Perda de peso e tonificação",
    trainer: "Dr. Silva",
    memberSince: "Janeiro 2025",
    totalWorkouts: 45,
    achievements: 12,
    currentStreak: 7,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`
        transition-all duration-700 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
      `}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Meu Perfil</h1>
            <p className="text-gray-400">Gerencie suas informações pessoais</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Informações pessoais */}
        <div
          className={`
          lg:col-span-2
          transition-all duration-700 ease-out delay-100
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        >
          <div className="bg-black border border-gray-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Informações Pessoais</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors">
                <Edit3 className="w-4 h-4" />
                Editar
              </button>
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  AC
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{clientInfo.name}</h3>
                <p className="text-gray-400">Membro desde {clientInfo.memberSince}</p>
                <p className="text-green-400 text-sm">Personal: {clientInfo.trainer}</p>
              </div>
            </div>

            {/* Dados pessoais */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Email</label>
                  <div className="text-white font-medium">{clientInfo.email}</div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Telefone</label>
                  <div className="text-white font-medium">{clientInfo.phone}</div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Data de Nascimento</label>
                  <div className="text-white font-medium">{clientInfo.birthDate}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm">Altura</label>
                  <div className="text-white font-medium">{clientInfo.height}</div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Peso Atual</label>
                  <div className="text-white font-medium">{clientInfo.weight}</div>
                </div>
                <div>
                  <label className="text-gray-400 text-sm">Objetivo</label>
                  <div className="text-white font-medium">{clientInfo.goal}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div
          className={`
          space-y-4
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
        >
          {[
            { title: "Treinos Totais", value: clientInfo.totalWorkouts, icon: Activity, color: "green" },
            { title: "Conquistas", value: clientInfo.achievements, icon: Award, color: "yellow" },
            { title: "Sequência Atual", value: `${clientInfo.currentStreak} dias`, icon: Calendar, color: "orange" },
          ].map((stat, index) => (
            <div key={index} className="bg-black border border-gray-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon
                  className={`w-5 h-5 ${
                    stat.color === "green"
                      ? "text-green-400"
                      : stat.color === "yellow"
                        ? "text-yellow-400"
                        : "text-orange-400"
                  }`}
                />
                <div
                  className={`w-2 h-2 rounded-full ${
                    stat.color === "green"
                      ? "bg-green-400"
                      : stat.color === "yellow"
                        ? "bg-yellow-400"
                        : "bg-orange-400"
                  }`}
                />
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Configurações */}
      <div
        className={`
        grid md:grid-cols-2 gap-6
        transition-all duration-700 ease-out delay-300
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      >
        {/* Preferências */}
        <div className="bg-black border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Preferências</h2>
          </div>

          <div className="space-y-4">
            {[
              { name: "Notificações de treino", enabled: true },
              { name: "Lembretes de metas", enabled: true },
              { name: "Relatórios semanais", enabled: false },
              { name: "Compartilhar progresso", enabled: true },
            ].map((pref, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-xl">
                <span className="text-white">{pref.name}</span>
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${pref.enabled ? "bg-green-500" : "bg-gray-600"}`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      pref.enabled ? "translate-x-6" : "translate-x-0.5"
                    } mt-0.5`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saúde e segurança */}
        <div className="bg-black border border-gray-800 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-gray-400" />
            <h2 className="text-xl font-bold text-white">Saúde & Segurança</h2>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-white">Informações médicas</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-400" />
                <span className="text-white">Contatos de emergência</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white">Privacidade</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
