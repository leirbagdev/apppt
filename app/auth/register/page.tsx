"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "trainer" as "trainer" | "client",
    acceptTerms: false,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    if (!formData.acceptTerms) {
      alert("Você deve aceitar os termos de uso")
      return
    }

    // Redirecionar baseado no tipo de usuário
    if (formData.userType === "trainer") {
      router.push("/dashboard")
    } else {
      router.push("/client")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-8">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <Link href="/">
          <img
            src="/images/apt-logo.svg"
            alt="APT Logo"
            className="w-20 h-20 object-contain hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Criar Conta</h1>
          <p className="text-gray-400">Junte-se à revolução do fitness</p>
        </div>

        {/* User Type Toggle */}
        <div className="relative flex bg-gray-800/50 rounded-full p-1 border border-gray-700">
          <div
            className={`absolute top-1 bottom-1 w-1/2 bg-gray-700 rounded-full transition-transform duration-200 ease-in-out ${
              formData.userType === "client" ? "translate-x-full" : "translate-x-0"
            }`}
          />
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, userType: "trainer" }))}
            className={`relative z-10 flex-1 py-3 px-6 rounded-full text-base font-medium transition-colors ${
              formData.userType === "trainer" ? "text-white" : "text-gray-400"
            }`}
          >
            Treinador
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, userType: "client" }))}
            className={`relative z-10 flex-1 py-3 px-6 rounded-full text-base font-medium transition-colors ${
              formData.userType === "client" ? "text-white" : "text-gray-400"
            }`}
          >
            Cliente
          </button>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-white text-base font-medium">
              Nome Completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-white text-base font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-white text-base font-medium">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mínimo 8 caracteres"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-white text-base font-medium">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Digite a senha novamente"
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3 pt-2">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              className="w-5 h-5 mt-0.5 bg-transparent border-2 border-gray-600 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-500 checked:border-green-500"
            />
            <label htmlFor="acceptTerms" className="text-sm text-gray-300">
              Aceito os{" "}
              <Link href="#" className="text-green-500 hover:text-green-400">
                termos de uso
              </Link>{" "}
              e{" "}
              <Link href="#" className="text-green-500 hover:text-green-400">
                política de privacidade
              </Link>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-4 rounded-2xl transition-colors text-lg"
          >
            Criar Conta
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center pt-4">
          <span className="text-gray-400 text-base">Já tem uma conta? </span>
          <Link href="/auth/login" className="text-green-500 hover:text-green-400 font-medium text-base">
            Entrar
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
