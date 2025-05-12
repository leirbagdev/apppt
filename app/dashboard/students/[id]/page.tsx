import { Tab } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import StudentHealthMetrics from "@/components/ui/StudentHealthMetrics"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

// Mock de dados do aluno real
const aluno = {
  id: '1',
  nome: 'Gabriel Pereira',
  idade: 31,
  email: 'gabriel.pereira@email.com',
  objetivo: 'Melhorar condicionamento físico e ganhar massa muscular',
  progresso: 'Aumentou a carga dos principais exercícios em 20% nos últimos 3 meses',
}

export default function StudentPage({ params }: { params: { id: string } }) {
  if (params.id !== aluno.id) {
    return <div className="text-red-500">Aluno não encontrado.</div>
  }

  return (
    <div>
      <Link href="/dashboard/students" className="flex items-center mb-4 text-emerald-500 hover:underline">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Voltar para lista de alunos
      </Link>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{aluno.nome}</h2>
        <p><span className="font-semibold">Idade:</span> {aluno.idade}</p>
        <p><span className="font-semibold">Email:</span> {aluno.email}</p>
        <p><span className="font-semibold">Objetivo:</span> {aluno.objetivo}</p>
        <p><span className="font-semibold">Progresso:</span> {aluno.progresso}</p>
      </div>
      {/* TODO: Adaptar StudentHealthMetrics para aceitar studentId se necessário */}
      <StudentHealthMetrics />
    </div>
  )
} 