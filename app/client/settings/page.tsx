"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function ClientSettingsPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Configurações</h1>
      </div>

      {/* Seção de Logout */}
      <div className="p-6 bg-gray-900 rounded-2xl space-y-4">
        <h2 className="text-xl font-semibold text-white">Conta</h2>
        <p className="text-gray-400">
          Sair da sua conta APT
        </p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  )
}
