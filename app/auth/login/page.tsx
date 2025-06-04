"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [userType, setUserType] = useState<"trainer" | "client">("trainer")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Redirecionar baseado no tipo de usuário
    if (userType === "trainer") {
      router.push("/dashboard")
    } else {
      router.push("/client")
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-8">
      {/* Logo */}
      <div className="mb-12 flex justify-center">
        <Link href="/">
          <img
            src="/images/apt-logo.svg"
            alt="APT Logo"
            className="w-24 h-24 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="w-full max-w-sm space-y-6">
        {/* User Type Toggle */}
        <div className="relative flex bg-gray-800/50 rounded-full p-1 border border-gray-700">
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-gray-700 rounded-full transition-transform duration-200 ease-in-out ${
              userType === "client" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setUserType("trainer")}
            className={`relative z-10 flex-1 py-3 px-6 rounded-full text-base font-medium transition-colors ${
              userType === "trainer" ? "text-white" : "text-gray-400"
            }`}
          >
            Treinador
          </button>
          <button
            type="button"
            onClick={() => setUserType("client")}
            className={`relative z-10 flex-1 py-3 px-6 rounded-full text-base font-medium transition-colors ${
              userType === "client" ? "text-white" : "text-gray-400"
            }`}
          >
            Cliente
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-white text-lg font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-white text-lg font-medium">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-gray-900/50 border border-gray-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 bg-transparent border-2 border-gray-600 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500"
              />
              <span className="text-white text-base">Lembrar-me</span>
            </label>
            <Link href="#" className="text-green-500 hover:text-green-400 text-base font-medium">
              Esqueceu a senha?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-4 rounded-2xl transition-colors text-lg"
          >
            Entrar
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center pt-4">
          <span className="text-gray-400 text-base">Não tem uma conta? </span>
          <Link href="/auth/register" className="text-green-500 hover:text-green-400 font-medium text-base">
            Cadastre-se
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center pt-2">
          <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
