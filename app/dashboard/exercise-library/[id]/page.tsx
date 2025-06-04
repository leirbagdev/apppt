"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

// Componentes MD3 personalizados
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"

// Componentes UI
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Tipos
interface Exercise {
  id: number
  name: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
  videoUrl?: string
  imageUrl?: string
  sets?: number
  reps?: string
  rest?: string
  weight?: string
  notes?: string
}

interface Workout {
  id: number
  title: string
  type: string
  target: string
  duration: string
  difficulty: string
  createdAt: string
  lastModified: string
  description?: string
  exercises: Exercise[]
  assignedTo?: string[]
  tags: string[]
  isFavorite: boolean
  notes?: string
}

export default function WorkoutDetail() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [showAssignDialog, setShowAssignDialog] = useState(false)
  const [showExerciseDialog, setShowExerciseDialog] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  // Dados mockados para o treino
  const workouts: Record<string, Workout> = {
    "1": {
      id: 1,
      title: "Treino A - Hipertrofia Superior",
      type: "Musculação",
      target: "Parte Superior",
      duration: "60 min",
      difficulty: "Intermediário",
      createdAt: "2025-04-01",
      lastModified: "2025-05-10",
      description:
        "Treino focado em hipertrofia para parte superior do corpo, com ênfase em peito, costas e ombros. Ideal para alunos intermediários que já possuem uma base de força.",
      exercises: [
        {
          id: 101,
          name: "Supino Reto",
          muscle: "Peito",
          equipment: "Barra",
          difficulty: "Intermediário",
          instructions:
            "1. Deite-se no banco, com os pés apoiados no chão.\n2. Segure a barra com as mãos um pouco mais afastadas que a largura dos ombros.\n3. Desça a barra controladamente até tocar levemente o peito.\n4. Empurre a barra para cima até estender os braços, sem travar os cotovelos.",
          sets: 4,
          reps: "8-10",
          rest: "90s",
          weight: "70-80% 1RM",
        },
        {
          id: 102,
          name: "Puxada Frontal",
          muscle: "Costas",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions:
            "1. Sente-se na máquina, ajuste o apoio para as coxas.\n2. Segure a barra com as mãos afastadas.\n3. Puxe a barra para baixo até tocar o peito ou a parte superior do tórax.\n4. Retorne controladamente à posição inicial.",
          sets: 4,
          reps: "10-12",
          rest: "60s",
          weight: "Moderado",
        },
        {
          id: 103,
          name: "Desenvolvimento com Halteres",
          muscle: "Ombros",
          equipment: "Halteres",
          difficulty: "Intermediário",
          instructions:
            "1. Sente-se em um banco com encosto, segure os halteres ao lado dos ombros.\n2. Empurre os halteres para cima até estender os braços.\n3. Desça controladamente até a posição inicial.",
          sets: 3,
          reps: "10-12",
          rest: "60s",
          weight: "Moderado",
        },
        {
          id: 104,
          name: "Rosca Direta",
          muscle: "Bíceps",
          equipment: "Barra",
          difficulty: "Iniciante",
          instructions:
            "1. Em pé, segure a barra com as palmas das mãos voltadas para cima.\n2. Mantenha os cotovelos junto ao corpo.\n3. Flexione os cotovelos, trazendo a barra até os ombros.\n4. Desça controladamente até a posição inicial.",
          sets: 3,
          reps: "12-15",
          rest: "45s",
          weight: "Leve a moderado",
        },
        {
          id: 105,
          name: "Tríceps Corda",
          muscle: "Tríceps",
          equipment: "Cabo",
          difficulty: "Iniciante",
          instructions:
            "1. Fique em pé em frente ao aparelho de cabo, segure a corda com as duas mãos.\n2. Mantenha os cotovelos junto ao corpo.\n3. Estenda os cotovelos, empurrando a corda para baixo.\n4. Retorne controladamente à posição inicial.",
          sets: 3,
          reps: "12-15",
          rest: "45s",
          weight: "Leve a moderado",
        },
      ],
      assignedTo: ["Leandro Silva", "Mario Lenon"],
      tags: ["hipertrofia", "força", "parte superior"],
      isFavorite: true,
      notes:
        "Este treino pode ser adaptado para iniciantes reduzindo o peso e aumentando as repetições. Para avançados, pode-se aumentar o peso e reduzir o tempo de descanso.",
    },
  }

  const workout = workouts[params.id as string]

  // Se o treino não existir, redirecionar para a biblioteca
  if (!workout) {
    router.push("/dashboard/exercise-library")
    return null
  }

  // Função para abrir o diálogo de detalhes do exercício
  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise)
    setShowExerciseDialog(true)
  }

  // Renderiza o diálogo de detalhes do exercício
  const renderExerciseDialog = () => {
    if (!selectedExercise) return null

    return (
      <Dialog open={showExerciseDialog} onOpenChange={setShowExerciseDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedExercise.name}</DialogTitle>
            <DialogDescription>
              {selectedExercise.muscle} • {selectedExercise.equipment} • {selectedExercise.difficulty}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Instruções</h3>
              <div className="bg-muted/30 p-4 rounded whitespace-pre-line">{selectedExercise.instructions}</div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Séries:</span>
                  <span>{selectedExercise.sets}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Repetições:</span>
                  <span>{selectedExercise.reps}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Descanso:</span>
                  <span>{selectedExercise.rest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Carga:</span>
                  <span>{selectedExercise.weight}</span>
                </div>
              </div>

              {selectedExercise.notes && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Observações</h3>
                  <div className="bg-muted/30 p-4 rounded">{selectedExercise.notes}</div>
                </div>
              )}
            </div>

            <div>
              <div className="aspect-video bg-muted rounded flex items-center justify-center">
                {selectedExercise.videoUrl ? (
                  <video
                    src={selectedExercise.videoUrl}
                    controls
                    className="w-full h-full rounded"
                    poster={selectedExercise.imageUrl}
                  />
                ) : selectedExercise.imageUrl ? (
                  <img src={selectedExercise.imageUrl || "/placeholder.svg"} alt={selectedExercise.name} className="w-full h-full rounded object-cover" />
                ) : (
                  <div className="text-center">
                    <Video className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-muted-foreground">Nenhum vídeo ou imagem disponível</p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outlined" className="flex items-center gap-2 flex-1">
                  <Video className="h-4 w-4" />
                  Ver Demonstração
                </Button>
                <Button variant="outlined" className="flex items-center gap-2 flex-1">
                  <Info className="h-4 w-4" />
                  Mais Informações
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outlined" onClick={() => setShowExerciseDialog(false)}>
              Fechar
            </Button>
            <Button variant="filled" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Editar Exercício
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Renderiza o diálogo de atribuição de treino
  const renderAssignDialog = () => {
    return (
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atribuir Treino</DialogTitle>
            <DialogDescription>Selecione os alunos para atribuir este treino</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Alunos</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione os alunos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leandro">Leandro Silva</SelectItem>
                  <SelectItem value="mario">Mario Lenon</SelectItem>
                  <SelectItem value="otavio">Otávio Martins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Data de Início</label>
              <input
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Frequência</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="once">Uma vez</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="biweekly">Duas vezes por semana</SelectItem>
                  <SelectItem value="triweekly">Três vezes por semana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Observações</label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Adicione observações específicas para este aluno..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outlined" onClick={() => setShowAssignDialog(false)}>
              Cancelar
            </Button>
            <Button variant="filled">Atribuir</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap gap-4">
        <button
          onClick={() => router.push("/dashboard/exercise-library")}
          className="bg-background hover:bg-muted rounded-full p-2 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex gap-2 ml-auto">
          <Button variant="outlined" className="flex items-center gap-2" onClick={() => setShowAssignDialog(true)}>
            <Users className="h-4 w-4" />
            Atribuir
          </Button>
          <Button variant="outlined" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            Duplicar
          </Button>
          <Button variant="filled" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Visão Geral
                  </TabsTrigger>
                  <TabsTrigger
                    value="exercises"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Exercícios
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                  >
                    Histórico
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="overview" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <Card className="p-4">
                        <h3 className="font-medium mb-3">Informações do Treino</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tipo:</span>
                            <span>{workout.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Alvo:</span>
                            <span>{workout.target}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Duração:</span>
                            <span>{workout.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Dificuldade:</span>
                            <span>{workout.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Criado em:</span>
                            <span>{new Date(workout.createdAt).toLocaleDateString("pt-BR")}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Última modificação:</span>
                            <span>{new Date(workout.lastModified).toLocaleDateString("pt-BR")}</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h3 className="font-medium mb-3">Atribuições</h3>
                        {workout.assignedTo && workout.assignedTo.length > 0 ? (
                          <div className="space-y-3">
                            {workout.assignedTo.map((student, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                                <span>{student}</span>
                                <Button variant="text" size="sm">
                                  Ver Progresso
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outlined"
                              className="w-full mt-2 flex items-center gap-2 justify-center"
                              onClick={() => setShowAssignDialog(true)}
                            >
                              <Plus className="h-4 w-4" />
                              Atribuir a Mais Alunos
                            </Button>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Users className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-muted-foreground mb-4">Este treino ainda não foi atribuído a nenhum aluno</p>
                            <Button
                              variant="outlined"
                              className="flex items-center gap-2 mx-auto"
                              onClick={() => setShowAssignDialog(true)}
                            >
                              <Plus className="h-4 w-4" />
                              Atribuir Agora
                            </Button>
                          </div>
                        )}
                      </Card>
                    </div>

                    {workout.description && (
                      <Card className="p-4 mb-6">
                        <h3 className="font-medium mb-3">Descrição</h3>
                        <p className="text-muted-foreground">{workout.description}</p>
                      </Card>
                    )}

                    <Card className="p-4">
                      <h3 className="font-medium mb-3">Resumo dos Exercícios</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total de Exercícios:</span>
                            <span>{workout.exercises.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Grupos Musculares:</span>
                            <span>
                              {Array.from(new Set(workout.exercises.map((e) => e.muscle))).join(", ")}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Equipamentos Necessários:</span>
                            <span>
                              {Array.from(new Set(workout.exercises.map((e) => e.equipment))).join(", ")}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tempo Estimado:</span>
                            <span>{workout.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Nível de Dificuldade:</span>
                            <span>{workout.difficulty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Tags:</span>
                            <span>{workout.tags.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {workout.notes && (
                      <Card className="p-4 mt-6">
                        <h3 className="font-medium mb-3">Observações</h3>
                        <p className="text-muted-foreground">{workout.notes}</p>
                      </Card>
                    )}
                  </motion.div>
                </TabsContent>

                <TabsContent value="exercises" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Lista de Exercícios</h3>
                      <div className="flex gap-2">
                        <Button variant="outlined" className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Adicionar Exercício
                        </Button>
                        <Button variant="outlined" className="flex items-center gap-2">
                          <ArrowUpDown className="h-4 w-4" />
                          Reordenar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {workout.exercises.map((exercise, index) => (
                        <Card
                          key={exercise.id}
                          className="p-4 cursor-pointer hover:bg-muted/10 transition-colors"
                          onClick={() => handleExerciseClick(exercise)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-medium">{exercise.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <Chip variant="assist" size="sm">
                                    {exercise.muscle}
                                  </Chip>
                                  <Chip variant="assist" size="sm">
                                    {exercise.equipment}
                                  </Chip>
                                  <Chip variant="assist" size="sm">
                                    {exercise.difficulty}
                                  </Chip>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {exercise.sets} x {exercise.reps}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Descanso: {exercise.rest}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Histórico de Treinos</h3>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Configurações</h3>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </Card>
        </div>
      </div>

      {renderExerciseDialog()}
      {renderAssignDialog()}
    </div>
  )
}
