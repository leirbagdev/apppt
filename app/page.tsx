import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4 text-white">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-zinc-800/50 p-6 backdrop-blur">
        <div className="text-center">
          <h1 className="text-3xl font-bold">appt - for trainers</h1>
          <p className="mt-2 text-zinc-400">Acesse sua área de membros</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="seu@email.com"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-300">
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-emerald-500 hover:text-emerald-400">
                Esqueceu a senha?
              </a>
            </div>
          </div>
          <div>
            <Link
              href="/dashboard"
              className="flex w-full justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
              Entrar
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center text-sm text-zinc-400">
          <p>
            Não tem uma conta?{" "}
            <a href="#" className="font-medium text-emerald-500 hover:text-emerald-400">
              Cadastre-se
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
