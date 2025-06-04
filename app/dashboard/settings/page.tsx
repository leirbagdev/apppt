import ThemeToggle from "@/components/theme-toggle"
import {
  Settings,
  Shield,
  HelpCircle,
  Edit3,
  Camera,
  DollarSign,
  Clock,
  Users,
  Lock,
  Database,
  Phone,
} from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)] p-4 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--primary)] mb-2">Configurações</h1>
          <p className="text-[var(--on-surface-variant)]">Gerencie suas preferências e configurações da conta</p>
        </div>

        {/* Profile Card */}
        <div className="bg-[var(--surface-container)] backdrop-blur-sm border border-[var(--outline-variant)] rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center text-2xl font-bold text-white">
                CS
              </div>
              <button className="absolute -bottom-1 -right-1 bg-[var(--primary)] hover:bg-[var(--primary)]/80 rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-semibold text-[var(--on-surface)]">Carlos Silva</h2>
              <p className="text-[var(--primary)] mb-1">carlos@personaltrainer.com</p>
              <p className="text-[var(--on-surface-variant)] text-sm">São Paulo, SP</p>
            </div>

            <button className="bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 border border-[var(--primary)]/30 rounded-xl px-4 py-2 flex items-center gap-2 transition-colors text-[var(--primary)]">
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          </div>

          <p className="text-[var(--on-surface-variant)] text-sm">
            Personal Trainer certificado com 8 anos de experiência
          </p>
        </div>

        {/* Appearance Settings */}
        <div className="bg-[var(--surface-container)] backdrop-blur-sm border border-[var(--outline-variant)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[var(--primary)]">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--on-surface)]">Aparência</h3>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-[var(--on-surface)] font-medium">Modo Escuro</p>
              <p className="text-[var(--on-surface-variant)] text-sm">Alternar entre tema claro e escuro</p>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Business Settings */}
        <div className="bg-[var(--surface-container)] backdrop-blur-sm border border-[var(--outline-variant)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[var(--primary)]">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--on-surface)]">Negócio</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[var(--outline-variant)] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Preços dos serviços</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Configurar valores de treinos e consultas</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-[var(--outline-variant)] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Horários de atendimento</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Definir disponibilidade semanal</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Limite de alunos</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Máximo de 50 alunos ativos</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-[var(--surface-container)] backdrop-blur-sm border border-[var(--outline-variant)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[var(--primary)]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--on-surface)]">Segurança</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[var(--outline-variant)] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Privacidade</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Controlar visibilidade dos dados</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Backup automático</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Última sincronização: hoje às 14:30</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--success)] rounded-full"></div>
                <span className="text-[var(--success)] text-sm">Ativo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Support Settings */}
        <div className="bg-[var(--surface-container)] backdrop-blur-sm border border-[var(--outline-variant)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-[var(--primary)]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--on-surface)]">Suporte</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[var(--outline-variant)] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Central de ajuda</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Tutoriais e documentação</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="text-[var(--on-surface-variant)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[var(--on-surface)] font-medium">Contato</p>
                  <p className="text-[var(--on-surface-variant)] text-sm">Falar com nossa equipe</p>
                </div>
              </div>
              <button className="text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
