"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Components
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Input } from "@/components/md3/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Icons
import { ArrowLeft, Save, Plus, Trash2, Copy, Target, Dumbbell, AlertCircle } from "lucide-react"

// MUI Components
import { Box, Typography, Chip, Avatar } from "@mui/material"

// Validation Schema
const exerciseSchema = z.object({
  name: z.string().min(1, "Nome do exercício é obrigatório"),
  sets: z.number().min(1, "Número de séries deve ser maior que 0"),
  reps: z.string().min(1, "Repetições são obrigatórias"),
  weight: z.string().optional(),
  rest: z.string().min(1, "Tempo de descanso é obrigatório"),
  notes: z.string().optional(),
  muscleGroup: z.string().min(1, "Grupo muscular é obrigatório"),
})

const workoutSchema = z.object({
  name: z.string().min(2, "Nome do treino deve ter pelo menos 2 caracteres"),
  description: z.string().optional(),
  type: z.enum(["musculacao", "cardio", "funcional", "yoga", "pilates", "natacao", "reabilitacao"]),
  difficulty: z.enum(["iniciante", "intermediario", "avancado"]),
  duration: z.number().min(15, "Duração deve ser de pelo menos 15 minutos"),
  targetMuscles: z.array(z.string()).min(1, "Selecione pelo menos um grupo muscular"),
  equipment: z.array(z.string()),
  exercises: z.array(exerciseSchema).min(1, "Adicione pelo menos um exercício"),
  assignedStudents: z.array(z.string()),
  tags: z.array(z.string()),
  isTemplate: z.boolean().default(false),
})

type WorkoutFormData = z.infer<typeof workoutSchema>

const muscleGroups = [
  "Peito",
  "Costas",
  "Ombros",
  "Bíceps",
  "Tríceps",
  "Antebraços",
  "Quadríceps",
  "Posterior",
  "Glúteos",
  "Panturrilhas",
  "Abdômen",
  "Core",
]

const equipmentOptions = [
  "Halteres",
  "Barras",
  "Máquinas",
  "Cabos",
  "Kettlebells",
  "Elásticos",
  "Peso Corporal",
  "TRX",
  "Bola Suíça",
  "Medicine Ball",
  "Corda Naval",
]

const mockStudents = [
  { id: "1", name: "Leandro Silva", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro" },
  { id: "2", name: "Mario Lenon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mario" },
  { id: "3", name: "Otávio Martins", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Otavio" },
  { id: "4", name: "Ana Carolina", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana" },
]

export default function CreateWorkout() {
  const router = useRouter()
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([])
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [workoutTags, setWorkoutTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    control,
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    defaultValues: {
      exercises: [{ name: "", sets: 1, reps: "", weight: "", rest: "", notes: "", muscleGroup: "" }],
      targetMuscles: [],
      equipment: [],
      assignedStudents: [],
      tags: [],
      isTemplate: false,
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "exercises",
  })

  const watchedType = watch("type")
  const watchedDifficulty = watch("difficulty")

  const handleMuscleToggle = (muscle: string) => {
    const newMuscles = selectedMuscles.includes(muscle)
      ? selectedMuscles.filter((m) => m !== muscle)
      : [...selectedMuscles, muscle]
    setSelectedMuscles(newMuscles)
    setValue("targetMuscles", newMuscles)
  }

  const handleEquipmentToggle = (equipment: string) => {
    const newEquipment = selectedEquipment.includes(equipment)
      ? selectedEquipment.filter((e) => e !== equipment)
      : [...selectedEquipment, equipment]
    setSelectedEquipment(newEquipment)
    setValue("equipment", newEquipment)
  }

  const handleStudentToggle = (studentId: string) => {
    const newStudents = selectedStudents.includes(studentId)
      ? selectedStudents.filter((s) => s !== studentId)
      : [...selectedStudents, studentId]
    setSelectedStudents(newStudents)
    setValue("assignedStudents", newStudents)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !workoutTags.includes(newTag.trim())) {
      const newTags = [...workoutTags, newTag.trim()]
      setWorkoutTags(newTags)
      setValue("tags", newTags)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = workoutTags.filter((tag) => tag !== tagToRemove)
    setWorkoutTags(newTags)
    setValue("tags", newTags)
  }

  const addExercise = () => {
    append({ name: "", sets: 1, reps: "", weight: "", rest: "", notes: "", muscleGroup: "" })
  }

  const duplicateExercise = (index: number) => {
    const exercise = fields[index]
    append({ ...exercise })
  }

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Workout data:", data)
      alert("Treino criado com sucesso!")
      router.push("/dashboard/workouts")
    } catch (error) {
      console.error("Error creating workout:", error)
      alert("Erro ao criar treino. Tente novamente.")
    }
  }

  const ErrorMessage = ({ error }: { error?: string }) =>
    error ? (
      <Typography
        variant="caption"
        sx={{ color: "var(--error)", display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}
      >
        <AlertCircle size={12} />
        {error}
      </Typography>
    ) : null

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button variant="text" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" />
          Voltar
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#4ade80" }}>
            Criar Novo Treino
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            Monte um treino personalizado para seus alunos
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: 3 }}>
          {/* Coluna Principal */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Informações Básicas */}
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Target size={20} className="mr-2 text-primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Informações Básicas
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 3, mb: 3 }}>
                <Box>
                  <Input
                    {...register("name")}
                    label="Nome do Treino *"
                    placeholder="Ex: Treino de Força - Superior"
                    error={!!errors.name}
                  />
                  <ErrorMessage error={errors.name?.message} />
                </Box>
                <Box>
                  <Input
                    {...register("duration", { valueAsNumber: true })}
                    label="Duração (minutos) *"
                    type="number"
                    placeholder="60"
                    error={!!errors.duration}
                  />
                  <ErrorMessage error={errors.duration?.message} />
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Label className="block text-sm font-medium mb-2">Descrição</Label>
                <Textarea
                  {...register("description")}
                  placeholder="Descreva o objetivo e detalhes do treino"
                  className="min-h-[80px]"
                />
              </Box>

              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
                <Box>
                  <Label className="block text-sm font-medium mb-2">Tipo de Treino *</Label>
                  <Select onValueChange={(value) => setValue("type", value as any)}>
                    <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="musculacao">Musculação</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="funcional">Funcional</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="pilates">Pilates</SelectItem>
                      <SelectItem value="natacao">Natação</SelectItem>
                      <SelectItem value="reabilitacao">Reabilitação</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.type?.message} />
                </Box>
                <Box>
                  <Label className="block text-sm font-medium mb-2">Dificuldade *</Label>
                  <Select onValueChange={(value) => setValue("difficulty", value as any)}>
                    <SelectTrigger className={errors.difficulty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione a dificuldade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iniciante">Iniciante</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                      <SelectItem value="avancado">Avançado</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage error={errors.difficulty?.message} />
                </Box>
              </Box>
            </Card>

            {/* Exercícios */}
            <Card sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Dumbbell size={20} className="mr-2 text-primary" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Exercícios ({fields.length})
                  </Typography>
                </Box>
                <Button variant="outlined" onClick={addExercise}>
                  <Plus size={16} className="mr-2" />
                  Adicionar Exercício
                </Button>
              </Box>

              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card sx={{ p: 3, mb: 3, border: "1px solid", borderColor: "divider" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Exercício {index + 1}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button variant="text" size="small" onClick={() => duplicateExercise(index)}>
                            <Copy size={14} />
                          </Button>
                          {fields.length > 1 && (
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => remove(index)}
                              sx={{ color: "error.main" }}
                            >
                              <Trash2 size={14} />
                            </Button>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 2, mb: 2 }}>
                        <Input
                          {...register(`exercises.${index}.name`)}
                          label="Nome do Exercício *"
                          placeholder="Ex: Supino Reto"
                          error={!!errors.exercises?.[index]?.name}
                        />
                        <Box>
                          <Label className="block text-sm font-medium mb-2">Grupo Muscular *</Label>
                          <Select onValueChange={(value) => setValue(`exercises.${index}.muscleGroup`, value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              {muscleGroups.map((muscle) => (
                                <SelectItem key={muscle} value={muscle}>
                                  {muscle}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Input
                          {...register(`exercises.${index}.sets`, { valueAsNumber: true })}
                          label="Séries *"
                          type="number"
                          placeholder="3"
                        />
                        <Input {...register(`exercises.${index}.reps`)} label="Repetições *" placeholder="12-15" />
                        <Input {...register(`exercises.${index}.weight`)} label="Peso" placeholder="20kg" />
                        <Input {...register(`exercises.${index}.rest`)} label="Descanso *" placeholder="60s" />
                      </Box>

                      <Textarea
                        {...register(`exercises.${index}.notes`)}
                        placeholder="Observações sobre execução, técnica, etc."
                        className="min-h-[60px]"
                      />
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>

              {errors.exercises && <ErrorMessage error="Adicione pelo menos um exercício válido" />}
            </Card>
          </Box>

          {/* Sidebar */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Grupos Musculares */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Grupos Musculares *
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {muscleGroups.map((muscle) => (
                  <Chip
                    key={muscle}
                    label={muscle}
                    onClick={() => handleMuscleToggle(muscle)}
                    color={selectedMuscles.includes(muscle) ? "primary" : "default"}
                    variant={selectedMuscles.includes(muscle) ? "filled" : "outlined"}
                    size="small"
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
              {errors.targetMuscles && <ErrorMessage error="Selecione pelo menos um grupo muscular" />}
            </Card>

            {/* Equipamentos */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Equipamentos
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {equipmentOptions.map((equipment) => (
                  <Chip
                    key={equipment}
                    label={equipment}
                    onClick={() => handleEquipmentToggle(equipment)}
                    color={selectedEquipment.includes(equipment) ? "secondary" : "default"}
                    variant={selectedEquipment.includes(equipment) ? "filled" : "outlined"}
                    size="small"
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
            </Card>

            {/* Alunos */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Atribuir a Alunos
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {mockStudents.map((student) => (
                  <Box
                    key={student.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 1,
                      borderRadius: 1,
                      cursor: "pointer",
                      backgroundColor: selectedStudents.includes(student.id) ? "primary.light" : "transparent",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                    onClick={() => handleStudentToggle(student.id)}
                  >
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentToggle(student.id)}
                    />
                    <Avatar src={student.avatar} sx={{ width: 32, height: 32, mx: 1 }} />
                    <Typography variant="body2">{student.name}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>

            {/* Tags */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Tags
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Nova tag"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button variant="outlined" size="small" onClick={handleAddTag}>
                  <Plus size={14} />
                </Button>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {workoutTags.map((tag) => (
                  <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} size="small" color="info" />
                ))}
              </Box>
            </Card>

            {/* Opções */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Opções
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox id="template" onCheckedChange={(checked) => setValue("isTemplate", checked as boolean)} />
                <Label htmlFor="template" className="text-sm cursor-pointer">
                  Salvar como template
                </Label>
              </Box>
            </Card>

            {/* Ações */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Button
                type="submit"
                variant="filled"
                disabled={isSubmitting}
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                {isSubmitting ? (
                  <>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        border: "2px solid currentColor",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Salvar Treino
                  </>
                )}
              </Button>
              <Button variant="outlined" onClick={() => router.back()}>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}
