"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"
import { ArrowLeft, Play, Clock, Dumbbell } from "lucide-react"

export default function WorkoutDetails() {
  const params = useParams()
  const router = useRouter()
  const workoutId = params.id

  // Dados mockados para o treino
  const workout = {
    id: Number(workoutId),
    title: `Treino ${workoutId}`,
    description:
      "Este é um treino completo que trabalha todos os grupos musculares principais com foco em hipertrofia.",
    duration: "45 min",
    level: "Intermediário",
    thumbnail: "/placeholder.svg?height=400&width=600",
    trainer: "Ricardo Almeida",
    trainerAvatar: "/placeholder.svg?height=40&width=40",
    exercises: [
      {
        name: "Supino reto",
        sets: 4,
        reps: "10-12",
        rest: "90s",
        muscle: "Peito",
      },
      {
        name: "Puxada frontal",
        sets: 4,
        reps: "10-12",
        rest: "90s",
        muscle: "Costas",
      },
      {
        name: "Agachamento",
        sets: 4,
        reps: "10-12",
        rest: "120s",
        muscle: "Pernas",
      },
      {
        name: "Desenvolvimento",
        sets: 3,
        reps: "10-12",
        rest: "90s",
        muscle: "Ombros",
      },
      {
        name: "Rosca direta",
        sets: 3,
        reps: "12-15",
        rest: "60s",
        muscle: "Bíceps",
      },
      {
        name: "Tríceps corda",
        sets: 3,
        reps: "12-15",
        rest: "60s",
        muscle: "Tríceps",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="text" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative">
              <img
                src={workout.thumbnail || "/placeholder.svg"}
                alt={workout.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Chip className="bg-black/60 text-white border-none" variant="assist">
                  <Clock className="h-3 w-3 mr-1" />
                  {workout.duration}
                </Chip>
                <Chip className="bg-black/60 text-white border-none" variant="assist">
                  <Dumbbell className="h-3 w-3 mr-1" />
                  {workout.level}
                </Chip>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={workout.trainerAvatar || "/placeholder.svg"}
                  alt={workout.trainer}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-muted-foreground">Treinador: {workout.trainer}</span>
              </div>
              <p className="text-muted-foreground mb-6">{workout.description}</p>

              <Button variant="filled" className="flex items-center gap-2 w-full md:w-auto">
                <Play className="h-4 w-4" />
                Iniciar Treino
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Exercícios</h2>
            <div className="space-y-4">
              {workout.exercises.map((exercise, index) => (
                <Card key={index} className="p-4 border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <p className="text-xs text-muted-foreground">{exercise.muscle}</p>
                    </div>
                    <Chip variant="outline" size="sm">
                      {exercise.sets} x {exercise.reps}
                    </Chip>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Descanso: {exercise.rest}</div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
