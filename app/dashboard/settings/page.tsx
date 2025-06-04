"use client"

import { useState } from "react"
import {
  Settings,
  Shield,
  HelpCircle,
  Edit3,
  Camera,
  Globe,
  DollarSign,
  Clock,
  Users,
  Lock,
  Database,
  Phone,
} from "lucide-react"
import { Avatar } from "@/components/md3/avatar"

type SettingsPageProps = {}

export default function SettingsPage({}: SettingsPageProps) {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [profile, setProfile] = useState({
    name: "Carlos Silva",
    email: "carlos@personaltrainer.com",
    phone: "+55 11 99999-9999",
    location: "São Paulo, SP",
    bio: "Personal Trainer certificado com 8 anos de experiência",
    avatar: "/placeholder.svg?height=100&width=100&text=CS",
  })

  const settingsSections = [
    {
      title: "Preferências",
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          label: "Tema escuro",
          description: "Usar interface escura",
          type: "toggle",
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          label: "Notificações",
          description: "Receber alertas e lembretes",
          type: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
        {
          label: "Idioma",
          description: "Português (Brasil)",
          type: "button",
          icon: <Globe className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Negócio",
      icon: <DollarSign className="w-5 h-5" />,
      items: [
        {
          label: "Preços dos serviços",
          description: "Configurar valores de treinos e consultas",
          type: "button",
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          label: "Horários de atendimento",
          description: "Definir disponibilidade semanal",
          type: "button",
          icon: <Clock className="w-4 h-4" />,
        },
        {
          label: "Limite de alunos",
          description: "Máximo de 50 alunos ativos",
          type: "button",
          icon: <Users className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Segurança",
      icon: <Shield className="w-5 h-5" />,
      items: [
        {
          label: "Privacidade",
          description: "Controlar visibilidade dos dados",
          type: "button",
          icon: <Lock className="w-4 h-4" />,
        },
        {
          label: "Backup automático",
          description: "Última sincronização: hoje às 14:30",
          type: "button",
          icon: <Database className="w-4 h-4" />,
        },
      ],
    },
    {
      title: "Suporte",
      icon: <HelpCircle className="w-5 h-5" />,
      items: [
        {
          label: "Central de ajuda",
          description: "Tutoriais e documentação",
          type: "button",
          icon: <HelpCircle className="w-4 h-4" />,
        },
        {
          label: "Contato",
          description: "Falar com nossa equipe",
          type: "button",
          icon: <Phone className="w-4 h-4" />,
        },
      ],
    },
  ]

  const handleSaveProfile = () => {
    setShowEditProfile(false)
    // Aqui você salvaria os dados no backend
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-emerald-400 mb-2">Configurações</h1>
          <p className="text-gray-400">Gerencie suas preferências e configurações da conta</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar src={profile.avatar} alt={profile.name} size="xl" />
              <button className="absolute -bottom-1 -right-1 bg-emerald-500 hover:bg-emerald-600 rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
              <p className="text-emerald-400 mb-1">{profile.email}</p>
              <p className="text-gray-400 text-sm">{profile.location}</p>
            </div>

            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-xl px-4 py-2 flex items-center gap-2 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          </div>

          <p className="text-gray-300 text-sm">{profile.bio}</p>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-emerald-400">{section.icon}</div>
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <div className="text-gray-400">{item.icon}</div>}
                    <div>
                      <p className="text-white font-medium">{item.label}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>

                  {item.type === "toggle" ? (
                    <button
                      onClick={() => item.onChange && item.onChange(!item.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.value ? "bg-emerald-500" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          item.value ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  ) : (
                    <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Edit Profile Modal */}
        {showEditProfile && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 border border-emerald-500/20 rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold text-white mb-6">Editar Perfil</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Localização</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 rounded-xl py-3 text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 rounded-xl py-3 text-white transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
