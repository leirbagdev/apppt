"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

// Components
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Input } from "@/components/md3/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

// Icons
import {
  ArrowLeft,
  Save,
  Upload,
  User,
  Heart,
  CreditCard,
  Shield,
  Camera,
  AlertCircle,
  Phone,
  MapPin,
  Scale,
  Target,
  Activity,
  FileText,
  Clock,
} from "lucide-react"

// MUI Components
import { Box, Typography, Avatar, Chip, Stepper, Step, StepLabel } from "@mui/material"

// Validation Schema
const studentSchema = z.object({
  // Dados Pessoais
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  secondaryPhone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  emergencyContact: z.string().min(2, "Contato de emergência é obrigatório"),
  emergencyPhone: z.string().min(10, "Telefone de emergência é obrigatório"),

  // Dados Físicos
  height: z.number().min(100, "Altura deve ser maior que 100cm"),
  weight: z.number().min(30, "Peso deve ser maior que 30kg"),
  bodyFat: z.number().optional(),

  // Saúde e Objetivos
  objectives: z.array(z.string()).min(1, "Selecione pelo menos um objetivo"),
  medicalRestrictions: z.string().optional(),
  medications: z.string().optional(),
  injuries: z.string().optional(),
  experienceLevel: z.enum(["iniciante", "intermediario", "avancado", "atleta"]),

  // Wearable
  wearableDevice: z.string().optional(),
  wearableId: z.string().optional(),

  // Plano
  plan: z.enum(["basic", "standard", "premium", "vip"]),
  frequency: z.number().min(1).max(7),
  startDate: z.string().min(1, "Data de início é obrigatória"),
  paymentMethod: z.enum(["credit", "debit", "pix", "transfer", "cash"]),
  observations: z.string().optional(),

  // Termos
  termsAccepted: z.boolean().refine((val) => val === true, "Aceite dos termos é obrigatório"),
  dataProcessingAccepted: z.boolean().refine((val) => val === true, "Aceite do tratamento de dados é obrigatório"),
})

type StudentFormData = z.infer<typeof studentSchema>

export default function NewStudent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      objectives: [],
      termsAccepted: false,
      dataProcessingAccepted: false,
    },
  })

  // Watch form values for progress calculation
  const watchedValues = watch()

  // Calculate form completion progress
  const calculateProgress = useCallback(() => {
    const requiredFields = [
      "fullName",
      "birthDate",
      "email",
      "phone",
      "emergencyContact",
      "emergencyPhone",
      "height",
      "weight",
      "experienceLevel",
      "plan",
      "frequency",
      "startDate",
      "paymentMethod",
    ]

    const completedFields = requiredFields.filter((field) => {
      const value = watchedValues[field as keyof StudentFormData]
      return value !== undefined && value !== "" && value !== 0
    })

    const objectivesCompleted = selectedObjectives.length > 0 ? 1 : 0
    const termsCompleted = watchedValues.termsAccepted && watchedValues.dataProcessingAccepted ? 2 : 0

    return Math.round(
      ((completedFields.length + objectivesCompleted + termsCompleted) / (requiredFields.length + 3)) * 100,
    )
  }, [watchedValues, selectedObjectives])

  const progress = calculateProgress()

  // Handle tab navigation with validation
  const handleTabChange = async (newTab: string) => {
    const tabValidations = {
      personal: ["fullName", "birthDate", "email", "phone", "emergencyContact", "emergencyPhone"],
      health: ["height", "weight", "experienceLevel"],
      plan: ["plan", "frequency", "startDate", "paymentMethod", "termsAccepted", "dataProcessingAccepted"],
    }

    if (activeTab !== newTab) {
      const fieldsToValidate = tabValidations[activeTab as keyof typeof tabValidations]
      if (fieldsToValidate) {
        const isValid = await trigger(fieldsToValidate as any)
        if (!isValid && newTab !== "personal") {
          return // Don't allow navigation if current tab is invalid
        }
      }
      setActiveTab(newTab)
    }
  }

  // Handle objectives selection
  const handleObjectiveToggle = (objective: string) => {
    const newObjectives = selectedObjectives.includes(objective)
      ? selectedObjectives.filter((obj) => obj !== objective)
      : [...selectedObjectives, objective]

    setSelectedObjectives(newObjectives)
    setValue("objectives", newObjectives)
  }

  // Handle image upload simulation
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle form submission
  const onSubmit = async (data: StudentFormData) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Student data:", { ...data, profileImage: uploadedImage })

      // Show success message
      alert("Aluno cadastrado com sucesso!")

      // Redirect to students list
      router.push("/dashboard/students")
    } catch (error) {
      console.error("Error saving student:", error)
      alert("Erro ao salvar aluno. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const steps = ["Dados Pessoais", "Saúde e Objetivos", "Plano e Termos"]
  const activeStepIndex = steps.findIndex(
    (step) =>
      (step === "Dados Pessoais" && activeTab === "personal") ||
      (step === "Saúde e Objetivos" && activeTab === "health") ||
      (step === "Plano e Termos" && activeTab === "plan"),
  )

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
    <Box sx={{ maxWidth: "900px", mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button variant="text" onClick={() => router.back()} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ArrowLeft size={16} />
          Voltar
        </Button>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ color: "var(--on-surface)", fontWeight: 700 }}>
            Novo Aluno
          </Typography>
          <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mt: 0.5 }}>
            Preencha as informações para cadastrar um novo aluno
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
              {progress}% completo
            </Typography>
            <Progress value={progress} className="w-20" />
          </Box>
        </Box>
      </Box>

      {/* Progress Stepper */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Stepper activeStep={activeStepIndex} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color: index <= activeStepIndex ? "var(--primary)" : "var(--on-surface-variant)",
                    fontWeight: index === activeStepIndex ? 600 : 400,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Card>

      <Card>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: "1px solid var(--outline-variant)" }}>
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="personal"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <User size={16} />
                Dados Pessoais
                {errors.fullName || errors.email || errors.phone ? (
                  <AlertCircle size={14} className="text-red-500" />
                ) : null}
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <Heart size={16} />
                Saúde e Objetivos
                {errors.height || errors.weight || errors.experienceLevel ? (
                  <AlertCircle size={14} className="text-red-500" />
                ) : null}
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <CreditCard size={16} />
                Plano e Termos
                {errors.plan || errors.frequency || errors.termsAccepted ? (
                  <AlertCircle size={14} className="text-red-500" />
                ) : null}
              </TabsTrigger>
            </TabsList>
          </Box>

          <Box sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                {/* Tab 1: Dados Pessoais */}
                <TabsContent value="personal" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Foto do Perfil */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Camera size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Foto do Perfil
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                        <Avatar
                          sx={{ width: 100, height: 100, mb: 2, backgroundColor: "var(--surface-variant)" }}
                          src={uploadedImage || undefined}
                        >
                          {uploadedImage ? null : <Upload size={32} />}
                        </Avatar>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                          id="profile-image-upload"
                        />
                        <label htmlFor="profile-image-upload">
                          <Button variant="outlined" size="small" component="span">
                            {uploadedImage ? "Alterar Foto" : "Adicionar Foto"}
                          </Button>
                        </label>
                        {uploadedImage && (
                          <Button
                            variant="text"
                            size="small"
                            onClick={() => setUploadedImage(null)}
                            sx={{ mt: 1, color: "var(--error)" }}
                          >
                            Remover
                          </Button>
                        )}
                      </Box>
                    </Box>

                    {/* Informações Básicas */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <User size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Informações Básicas
                        </Typography>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Input
                            {...register("fullName")}
                            label="Nome Completo *"
                            placeholder="Nome completo do aluno"
                            error={!!errors.fullName}
                          />
                          <ErrorMessage error={errors.fullName?.message} />
                        </Box>
                        <Box>
                          <Input
                            {...register("birthDate")}
                            label="Data de Nascimento *"
                            type="date"
                            error={!!errors.birthDate}
                          />
                          <ErrorMessage error={errors.birthDate?.message} />
                        </Box>
                      </Box>
                    </Box>

                    {/* Contato */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Phone size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Informações de Contato
                        </Typography>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Input
                            {...register("email")}
                            label="Email *"
                            type="email"
                            placeholder="email@exemplo.com"
                            error={!!errors.email}
                          />
                          <ErrorMessage error={errors.email?.message} />
                        </Box>
                        <Box>
                          <Input
                            {...register("phone")}
                            label="Telefone Principal *"
                            placeholder="(00) 00000-0000"
                            error={!!errors.phone}
                          />
                          <ErrorMessage error={errors.phone?.message} />
                        </Box>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Input
                          {...register("secondaryPhone")}
                          label="Telefone Secundário"
                          placeholder="(00) 00000-0000"
                        />
                      </Box>
                    </Box>

                    {/* Endereço */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <MapPin size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Endereço
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Input
                          {...register("address")}
                          label="Endereço Completo"
                          placeholder="Rua, número, complemento"
                        />
                      </Box>
                      <Box
                        sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" }, gap: 3, mb: 3 }}
                      >
                        <Input {...register("city")} label="Cidade" placeholder="Cidade" />
                        <Input {...register("state")} label="Estado" placeholder="Estado" />
                        <Input {...register("zipCode")} label="CEP" placeholder="00000-000" />
                      </Box>
                    </Box>

                    {/* Contato de Emergência */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Shield size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Contato de Emergência
                        </Typography>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Input
                            {...register("emergencyContact")}
                            label="Nome do Contato *"
                            placeholder="Nome completo"
                            error={!!errors.emergencyContact}
                          />
                          <ErrorMessage error={errors.emergencyContact?.message} />
                        </Box>
                        <Box>
                          <Input
                            {...register("emergencyPhone")}
                            label="Telefone de Emergência *"
                            placeholder="(00) 00000-0000"
                            error={!!errors.emergencyPhone}
                          />
                          <ErrorMessage error={errors.emergencyPhone?.message} />
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="filled" onClick={() => handleTabChange("health")}>
                        Próximo
                      </Button>
                    </Box>
                  </motion.div>
                </TabsContent>

                {/* Tab 2: Saúde e Objetivos */}
                <TabsContent value="health" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Medidas Físicas */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Scale size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Medidas Físicas
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3, mb: 3 }}
                      >
                        <Box>
                          <Input
                            {...register("height", { valueAsNumber: true })}
                            label="Altura (cm) *"
                            type="number"
                            placeholder="Ex: 175"
                            error={!!errors.height}
                          />
                          <ErrorMessage error={errors.height?.message} />
                        </Box>
                        <Box>
                          <Input
                            {...register("weight", { valueAsNumber: true })}
                            label="Peso (kg) *"
                            type="number"
                            placeholder="Ex: 70"
                            error={!!errors.weight}
                          />
                          <ErrorMessage error={errors.weight?.message} />
                        </Box>
                        <Input
                          {...register("bodyFat", { valueAsNumber: true })}
                          label="% de Gordura"
                          type="number"
                          placeholder="Ex: 15"
                        />
                      </Box>
                    </Box>

                    {/* Objetivos */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Target size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Objetivos
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 2 }}>
                        Selecione os objetivos do aluno: *
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                        {[
                          "Perda de peso",
                          "Ganho de massa muscular",
                          "Definição muscular",
                          "Condicionamento físico",
                          "Reabilitação",
                          "Saúde geral",
                          "Flexibilidade",
                          "Força",
                          "Resistência",
                          "Mobilidade",
                        ].map((objective) => (
                          <Chip
                            key={objective}
                            label={objective}
                            onClick={() => handleObjectiveToggle(objective)}
                            color={selectedObjectives.includes(objective) ? "primary" : "default"}
                            variant={selectedObjectives.includes(objective) ? "filled" : "outlined"}
                            sx={{ cursor: "pointer" }}
                          />
                        ))}
                      </Box>
                      {errors.objectives && <ErrorMessage error="Selecione pelo menos um objetivo" />}
                    </Box>

                    {/* Informações de Saúde */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Heart size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Informações de Saúde
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Label className="block text-sm font-medium mb-2">Restrições Médicas</Label>
                        <Textarea
                          {...register("medicalRestrictions")}
                          placeholder="Descreva quaisquer condições médicas, lesões ou restrições"
                          className="min-h-[80px]"
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Label className="block text-sm font-medium mb-2">Medicamentos em Uso</Label>
                        <Textarea
                          {...register("medications")}
                          placeholder="Liste os medicamentos que o aluno utiliza regularmente"
                          className="min-h-[60px]"
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Label className="block text-sm font-medium mb-2">Lesões Anteriores</Label>
                        <Textarea
                          {...register("injuries")}
                          placeholder="Descreva lesões anteriores relevantes para o treinamento"
                          className="min-h-[60px]"
                        />
                      </Box>
                    </Box>

                    {/* Experiência */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Activity size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Experiência em Exercícios
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Label className="block text-sm font-medium mb-2">Nível de Experiência *</Label>
                        <Select onValueChange={(value) => setValue("experienceLevel", value as any)}>
                          <SelectTrigger className={errors.experienceLevel ? "border-red-500" : ""}>
                            <SelectValue placeholder="Selecione o nível de experiência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="iniciante">Iniciante (0-6 meses)</SelectItem>
                            <SelectItem value="intermediario">Intermediário (6 meses - 2 anos)</SelectItem>
                            <SelectItem value="avancado">Avançado (2+ anos)</SelectItem>
                            <SelectItem value="atleta">Atleta/Competidor</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMessage error={errors.experienceLevel?.message} />
                      </Box>
                    </Box>

                    {/* Wearable */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Clock size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Dispositivos Wearable
                        </Typography>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Label className="block text-sm font-medium mb-2">Dispositivo</Label>
                          <Select onValueChange={(value) => setValue("wearableDevice", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o dispositivo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apple">Apple Watch</SelectItem>
                              <SelectItem value="garmin">Garmin</SelectItem>
                              <SelectItem value="samsung">Samsung Galaxy Watch</SelectItem>
                              <SelectItem value="fitbit">Fitbit</SelectItem>
                              <SelectItem value="google">Google Fit</SelectItem>
                              <SelectItem value="strava">Strava</SelectItem>
                              <SelectItem value="none">Nenhum dispositivo</SelectItem>
                            </SelectContent>
                          </Select>
                        </Box>
                        <Input
                          {...register("wearableId")}
                          label="ID/Email da Conta"
                          placeholder="ID ou email da conta do wearable"
                        />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button variant="outlined" onClick={() => handleTabChange("personal")}>
                        Anterior
                      </Button>
                      <Button variant="filled" onClick={() => handleTabChange("plan")}>
                        Próximo
                      </Button>
                    </Box>
                  </motion.div>
                </TabsContent>

                {/* Tab 3: Plano e Termos */}
                <TabsContent value="plan" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Plano de Treinamento */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <CreditCard size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Plano de Treinamento
                        </Typography>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Label className="block text-sm font-medium mb-2">Plano *</Label>
                          <Select onValueChange={(value) => setValue("plan", value as any)}>
                            <SelectTrigger className={errors.plan ? "border-red-500" : ""}>
                              <SelectValue placeholder="Selecione o plano" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Básico - R$ 150/mês</SelectItem>
                              <SelectItem value="standard">Standard - R$ 250/mês</SelectItem>
                              <SelectItem value="premium">Premium - R$ 400/mês</SelectItem>
                              <SelectItem value="vip">VIP - R$ 600/mês</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage error={errors.plan?.message} />
                        </Box>
                        <Box>
                          <Label className="block text-sm font-medium mb-2">Frequência Semanal *</Label>
                          <Select onValueChange={(value) => setValue("frequency", Number.parseInt(value))}>
                            <SelectTrigger className={errors.frequency ? "border-red-500" : ""}>
                              <SelectValue placeholder="Selecione a frequência" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x por semana</SelectItem>
                              <SelectItem value="2">2x por semana</SelectItem>
                              <SelectItem value="3">3x por semana</SelectItem>
                              <SelectItem value="4">4x por semana</SelectItem>
                              <SelectItem value="5">5x por semana</SelectItem>
                              <SelectItem value="6">6x por semana</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage error={errors.frequency?.message} />
                        </Box>
                      </Box>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                        <Box>
                          <Input
                            {...register("startDate")}
                            label="Data de Início *"
                            type="date"
                            error={!!errors.startDate}
                          />
                          <ErrorMessage error={errors.startDate?.message} />
                        </Box>
                        <Box>
                          <Label className="block text-sm font-medium mb-2">Método de Pagamento *</Label>
                          <Select onValueChange={(value) => setValue("paymentMethod", value as any)}>
                            <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                              <SelectValue placeholder="Selecione o método" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="credit">Cartão de Crédito</SelectItem>
                              <SelectItem value="debit">Cartão de Débito</SelectItem>
                              <SelectItem value="pix">PIX</SelectItem>
                              <SelectItem value="transfer">Transferência Bancária</SelectItem>
                              <SelectItem value="cash">Dinheiro</SelectItem>
                            </SelectContent>
                          </Select>
                          <ErrorMessage error={errors.paymentMethod?.message} />
                        </Box>
                      </Box>
                    </Box>

                    {/* Observações */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <FileText size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Observações Adicionais
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Label className="block text-sm font-medium mb-2">Observações</Label>
                        <Textarea
                          {...register("observations")}
                          placeholder="Observações adicionais sobre o aluno, plano ou pagamento"
                          className="min-h-[80px]"
                        />
                      </Box>
                    </Box>

                    {/* Termos e Condições */}
                    <Box sx={{ mb: 4 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                        <Shield size={20} className="mr-2 text-primary" />
                        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
                          Termos e Condições
                        </Typography>
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
                          <Checkbox
                            id="terms"
                            onCheckedChange={(checked) => setValue("termsAccepted", checked as boolean)}
                          />
                          <Box>
                            <Label htmlFor="terms" className="text-sm cursor-pointer">
                              Aceito os termos e condições de uso *
                            </Label>
                            <Typography
                              variant="caption"
                              sx={{ color: "var(--on-surface-variant)", display: "block", mt: 0.5 }}
                            >
                              Li e concordo com os termos de uso, política de privacidade e condições gerais do serviço.
                            </Typography>
                          </Box>
                        </Box>
                        <ErrorMessage error={errors.termsAccepted?.message} />

                        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
                          <Checkbox
                            id="dataProcessing"
                            onCheckedChange={(checked) => setValue("dataProcessingAccepted", checked as boolean)}
                          />
                          <Box>
                            <Label htmlFor="dataProcessing" className="text-sm cursor-pointer">
                              Autorizo o tratamento dos meus dados pessoais *
                            </Label>
                            <Typography
                              variant="caption"
                              sx={{ color: "var(--on-surface-variant)", display: "block", mt: 0.5 }}
                            >
                              Autorizo o uso dos meus dados para fins de prestação de serviços, conforme LGPD.
                            </Typography>
                          </Box>
                        </Box>
                        <ErrorMessage error={errors.dataProcessingAccepted?.message} />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Button variant="outlined" onClick={() => handleTabChange("health")}>
                        Anterior
                      </Button>
                      <Button
                        type="submit"
                        variant="filled"
                        disabled={isSubmitting || isLoading}
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {isSubmitting || isLoading ? (
                          <>
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                border: "2px solid currentColor",
                                borderTop: "2px solid transparent",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                                "@keyframes spin": {
                                  "0%": { transform: "rotate(0deg)" },
                                  "100%": { transform: "rotate(360deg)" },
                                },
                              }}
                            />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Salvar Aluno
                          </>
                        )}
                      </Button>
                    </Box>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </form>
          </Box>
        </Tabs>
      </Card>
    </Box>
  )
}
