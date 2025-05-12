import { Users, Calendar, Clock, Award } from "lucide-react"

export function PersonalInfoForm() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div className="relative h-24 w-24 overflow-hidden rounded-full">
          <img
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Foto de perfil"
            className="h-full w-full object-cover"
          />
          <button className="absolute bottom-0 right-0 rounded-full bg-emerald-600 p-1 text-white hover:bg-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V13.14c0 .48.159.935.44 1.302M9.75 20.25c3.75 0 7.5-1.5 7.5-6a3 3 0 00-3-3H6.75a3 3 0 00-3 3c0 4.5 3.75 6 7.5 6zM9 11.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm1.5 0a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"
              />
            </svg>
          </button>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold">Gabriel Maciel</h3>
          <p className="text-zinc-400">CREF 030307-PR</p>
          <p className="text-zinc-400">gabriel@email.com</p>
          <p className="text-zinc-400">Membro desde Janeiro 2018</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
              Nome Completo
            </label>
            <input
              type="text"
              id="name"
              defaultValue="Gabriel Maciel"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="gabriel@email.com"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-zinc-300">
              Telefone
            </label>
            <input
              type="tel"
              id="phone"
              defaultValue="(41) 9 9969-6969"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="cref" className="block text-sm font-medium text-zinc-300">
              CREF
            </label>
            <input
              type="text"
              id="cref"
              defaultValue="030307-PR"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-zinc-300">
              Data de Nascimento
            </label>
            <input
              type="date"
              id="birthdate"
              defaultValue="1996-03-23"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-zinc-300">
              Gênero
            </label>
            <select
              id="gender"
              defaultValue="male"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="other">Outro</option>
              <option value="prefer-not-to-say">Prefiro não informar</option>
            </select>
          </div>
          <div>
            <label htmlFor="emergency-contact" className="block text-sm font-medium text-zinc-300">
              Contato de Emergência
            </label>
            <input
              type="text"
              id="emergency-contact"
              defaultValue="Maria Maciel - (41) 99876-5432"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-zinc-300">
              Endereço
            </label>
            <input
              type="text"
              id="address"
              defaultValue="Rua das Flores, 123 - Curitiba, PR"
              className="mt-1 block w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-zinc-700/30 p-4">
        <h3 className="mb-4 text-lg font-medium">Estatísticas Profissionais</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
            <Users className="mb-2 h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">28</span>
            <span className="text-sm text-zinc-400">Alunos Ativos</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
            <Calendar className="mb-2 h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">6</span>
            <span className="text-sm text-zinc-400">Anos de Experiência</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
            <Clock className="mb-2 h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">42</span>
            <span className="text-sm text-zinc-400">Horas Semanais</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-zinc-800 p-4">
            <Award className="mb-2 h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold">8</span>
            <span className="text-sm text-zinc-400">Certificações</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  )
} 