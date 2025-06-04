"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react"

export default function NewWorkout() {
  const router = useRouter()
  const [exercises, setExercises] = useState([{ name: "", sets: "", reps: "", rest: "", muscle: "" }])

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: "", reps: "", rest: "", muscle: "" }])
  }

  const removeExercise = (index: number) => {
    const newExercises = [...exercises]
    newExercises.splice(index, 1)
    setExercises(newExercises)
  }

  const updateExercise = (index: number, field: string, value: string) => {
    const newExercises = [...exercises]
    newExercises[index] = { ...newExercises[index], [field]: value }
    setExercises(newExercises)
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
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Treino</label>
                <Input placeholder="Ex: Treino de Força - Superior" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea placeholder="Descreva o objetivo e detalhes do treino" className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Duração</label>
                  <Input placeholder="Ex: 45 min" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nível</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                      <SelectItem value="todos">Todos os níveis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Imagem de Capa</label>
                <Input type="file" />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Exercícios</h2>
              <Button variant="text" onClick={addExercise} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Adicionar
              </Button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <Card key={index} className="p-4 border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">Exercício {index + 1}</h3>
                    {exercises.length > 1 && (
                      <Button
                        variant="text"
                        size="icon"
                        onClick={() => removeExercise(index)}
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Input
                      placeholder="Nome do exercício"
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, "name", e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Séries"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, "sets", e.target.value)}
                      />
                      <Input
                        placeholder="Repetições"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, "reps", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Descanso"
                        value={exercise.rest}
                        onChange={(e) => updateExercise(index, "rest", e.target.value)}
                      />
                      <Input
                        placeholder="Grupo muscular"
                        value={exercise.muscle}
                        onChange={(e) => updateExercise(index, "muscle", e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="text" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button variant="filled" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Treino
        </Button>
      </div>
    </div>
  )
}
