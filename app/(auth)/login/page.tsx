"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    if (!supabase) {
      setError("Erro de conexão. Tente novamente mais tarde.")
      setLoading(false)
      return
    }

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else {
        setSuccess("Login realizado com sucesso!")
        router.push("/dashboard")
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else {
        setSuccess("Cadastro realizado! Verifique seu email.")
        router.push("/dashboard")
      }
    }
    setLoading(false)
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError("")

    if (!supabase) {
      setError("Erro de conexão. Tente novamente mais tarde.")
      setLoading(false)
      return
    }

    try {
      await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/dashboard' } })
    } catch (err: any) {
      setError("Erro ao autenticar com Google")
    }
    setLoading(false)
  }

  async function handleFacebookLogin() {
    setLoading(true)
    setError("")

    if (!supabase) {
      setError("Erro de conexão. Tente novamente mais tarde.")
      setLoading(false)
      return
    }

    try {
      await supabase.auth.signInWithOAuth({ provider: 'facebook', options: { redirectTo: window.location.origin + '/dashboard' } })
    } catch (err: any) {
      setError("Erro ao autenticar com Facebook")
    }
    setLoading(false)
  }

  return (
    <>
      {/* <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </head> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#171717] px-4">
        <div className="max-w-md w-full bg-[#222222] rounded-lg p-10 shadow-lg mx-auto mt-10">
          <h2 className="text-2xl font-bold text-center mb-2">appt<span className="text-[#5bae7d]">.</span> for trainers</h2>
          <p className="text-center text-[#aaaaaa] mb-8">{isLogin ? "Acesse sua área de membros" : "Crie sua conta gratuita"}</p>
          <button
            type="button"
            className="w-full bg-white text-[#171717] font-medium py-3 rounded transition mb-4 flex items-center justify-center gap-2 border border-[#5bae7d] hover:bg-[#5bae7d] hover:text-white"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {/* <i className="fab fa-google"></i> */}
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-[#5bae7d]" />
            Entrar com Google
          </button>
          <button
            type="button"
            className="w-full bg-white text-[#171717] font-medium py-3 rounded transition mb-4 flex items-center justify-center gap-2 border border-[#5bae7d] hover:bg-[#5bae7d] hover:text-white"
            onClick={handleFacebookLogin}
            disabled={loading}
          >
            {/* <i className="fab fa-facebook-f"></i> */}
            <ArrowRightOnRectangleIcon className="h-5 w-5 text-[#5bae7d]" />
            Entrar com Facebook
          </button>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 font-medium">Email</label>
              <input id="email" type="email" className="w-full p-3 rounded bg-[#2c2c2c] border border-[#2c2c2c] text-white focus:border-[#5bae7d] focus:outline-none" placeholder="seu@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2 font-medium">Senha</label>
              <input id="password" type="password" className="w-full p-3 rounded bg-[#2c2c2c] border border-[#2c2c2c] text-white focus:border-[#5bae7d] focus:outline-none" placeholder="********" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" /> Lembrar-me
              </label>
              <button type="button" className="text-[#5bae7d] text-sm hover:underline" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Criar conta" : "Já tenho conta"}
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-2">{success}</div>}
            <button type="submit" className="w-full bg-[#5bae7d] hover:bg-[#4c9f6e] text-white font-medium py-3 rounded transition mb-2" disabled={loading}>{loading ? "Enviando..." : isLogin ? "Entrar" : "Cadastrar"}</button>
          </form>
          <div className="mt-4 text-center">
            <a href="/auth/recover" className="text-blue-500">Esqueceu sua senha?</a>
          </div>
        </div>
      </div>
    </>
  )
}