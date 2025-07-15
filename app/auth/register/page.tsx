"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "trainer" as "trainer" | "client",
    acceptTerms: false,
    phone: "",
    birth_date: "",
    emergency_contact: "",
    emergency_phone: "",
    height: "",
    weight: "",
    objectives: "",
    experience_level: "",
    plan: "",
    frequency: "",
    start_date: "",
    payment_method: "",
    status: "",
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      })
      return
    }

    if (!formData.acceptTerms) {
      toast({
        title: "Erro",
        description: "Você deve aceitar os termos de uso.",
        variant: "destructive",
      })
      return
    }

    // Criação do usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    })

    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      })
      return
    }

    // Após criar o usuário, insere na tabela correta
    const { user } = data
    if (user) {
      let insertError = null
      if (formData.userType === "trainer") {
        const { error: trainerError } = await supabase.from("trainers").insert({
          full_name: formData.name,
          email: formData.email,
          // Adicione outros campos obrigatórios para trainers aqui
          created_at: new Date().toISOString(),
        })
        insertError = trainerError
      } else {
        const { error: studentError } = await supabase.from("students").insert({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birth_date: formData.birth_date || new Date().toISOString().slice(0, 10),
          emergency_contact: formData.emergency_contact || formData.name,
          emergency_phone: formData.emergency_phone,
          height: formData.height ? Number(formData.height) : 170,
          weight: formData.weight ? Number(formData.weight) : 70,
          objectives: formData.objectives ? [formData.objectives] : ["Saúde geral"],
          experience_level: formData.experience_level || "iniciante",
          plan: formData.plan || "basic",
          frequency: formData.frequency ? Number(formData.frequency) : 1,
          start_date: formData.start_date || new Date().toISOString().slice(0, 10),
          payment_method: formData.payment_method || "pix",
          status: formData.status || "active",
        })
        insertError = studentError
      }
      if (insertError) {
        toast({
          title: "Erro ao salvar dados do usuário",
          description: insertError.message,
          variant: "destructive",
        })
        return
      }
    }

    toast({
      title: "Conta criada com sucesso!",
      description: "Redirecionando...",
      variant: "default",
    })

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
              <Link href="/termos" className="text-green-500 hover:text-green-400" target="_blank">
                termos de uso
              </Link>{" "}
              e{" "}
              <Link href="/politica-de-privacidade" className="text-green-500 hover:text-green-400" target="_blank">
                política de privacidade
              </Link>
            </label>
          </div>

          {/* Campos extras para CLIENTE */}
          {formData.userType === "client" && (
            <>
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-white text-base font-medium">
                  Telefone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(99) 99999-9999"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="birth_date" className="block text-white text-base font-medium">
                  Data de nascimento
                </label>
                <input
                  id="birth_date"
                  name="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emergency_contact" className="block text-white text-base font-medium">
                  Contato de emergência
                </label>
                <input
                  id="emergency_contact"
                  name="emergency_contact"
                  type="text"
                  value={formData.emergency_contact}
                  onChange={handleInputChange}
                  placeholder="Nome do contato"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="emergency_phone" className="block text-white text-base font-medium">
                  Telefone de emergência
                </label>
                <input
                  id="emergency_phone"
                  name="emergency_phone"
                  type="text"
                  value={formData.emergency_phone}
                  onChange={handleInputChange}
                  placeholder="(99) 99999-9999"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="height" className="block text-white text-base font-medium">
                  Altura (cm)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="170"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="weight" className="block text-white text-base font-medium">
                  Peso (kg)
                </label>
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="70"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="objectives" className="block text-white text-base font-medium">
                  Objetivo
                </label>
                <input
                  id="objectives"
                  name="objectives"
                  type="text"
                  value={formData.objectives}
                  onChange={handleInputChange}
                  placeholder="Saúde geral"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="experience_level" className="block text-white text-base font-medium">
                  Nível de experiência
                </label>
                <input
                  id="experience_level"
                  name="experience_level"
                  type="text"
                  value={formData.experience_level}
                  onChange={handleInputChange}
                  placeholder="iniciante"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="plan" className="block text-white text-base font-medium">
                  Plano
                </label>
                <input
                  id="plan"
                  name="plan"
                  type="text"
                  value={formData.plan}
                  onChange={handleInputChange}
                  placeholder="basic"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="frequency" className="block text-white text-base font-medium">
                  Frequência semanal
                </label>
                <input
                  id="frequency"
                  name="frequency"
                  type="number"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  placeholder="1"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="start_date" className="block text-white text-base font-medium">
                  Data de início
                </label>
                <input
                  id="start_date"
                  name="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="payment_method" className="block text-white text-base font-medium">
                  Forma de pagamento
                </label>
                <input
                  id="payment_method"
                  name="payment_method"
                  type="text"
                  value={formData.payment_method}
                  onChange={handleInputChange}
                  placeholder="pix"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="block text-white text-base font-medium">
                  Status
                </label>
                <input
                  id="status"
                  name="status"
                  type="text"
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder="active"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-2xl text-white placeholder-gray-500"
                />
              </div>
            </>
          )}

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
