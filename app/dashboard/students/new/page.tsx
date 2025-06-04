"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Input } from "@/components/md3/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
import { Box, Typography, Avatar } from "@mui/material"
import { useStudents } from "@/hooks/use-students"
import { studentSchema, type StudentFormData } from "@/lib/validations/student"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface StudentFormDataOld {
  // Dados Pessoais
  fullName: string
  birthDate: string
  email: string
  phone: string
  secondaryPhone: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string

  // Dados Físicos
  height: string
  weight: string
  bodyFat: string

  // Saúde e Objetivos
  objectives: string[]
  medicalRestrictions: string
  medications: string
  injuries: string
  experienceLevel: string

  // Wearable
  wearableDevice: string
  wearableId: string

  // Plano
  plan: string
  frequency: string
  startDate: string
  paymentMethod: string
  observations: string

  // Termos
  termsAccepted: boolean
  dataProcessingAccepted: boolean
}

export default function NewStudent() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<StudentFormDataOld>({
    fullName: "",
    birthDate: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    height: "",
    weight: "",
    bodyFat: "",
    objectives: [],
    medicalRestrictions: "",
    medications: "",
    injuries: "",
    experienceLevel: "",
    wearableDevice: "",
    wearableId: "",
    plan: "",
    frequency: "",
    startDate: "",
    paymentMethod: "",
    observations: "",
    termsAccepted: false,
    dataProcessingAccepted: false,
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof StudentFormDataOld, value: string | string[] | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Limpar erro quando o usuário começar a digitar
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    const newObjectives = checked
      ? [...formData.objectives, objective]
      : formData.objectives.filter((obj) => obj !== objective)
    handleInputChange("objectives", newObjectives)
  }

  const validateTab = (tab: string): boolean => {
    const newErrors: Record<string, string> = {}

    switch (tab) {
      case "personal":
        if (!formData.fullName.trim()) newErrors.fullName = "Nome completo é obrigatório"
        if (!formData.birthDate) newErrors.birthDate = "Data de nascimento é obrigatória"
        if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
        if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
        if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Contato de emergência é obrigatório"
        if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = "Telefone de emergência é obrigatório"
        break

      case "health":
        if (!formData.height.trim()) newErrors.height = "Altura é obrigatória"
        if (!formData.weight.trim()) newErrors.weight = "Peso é obrigatório"
        if (formData.objectives.length === 0) newErrors.objectives = "Selecione pelo menos um objetivo"
        if (!formData.experienceLevel) newErrors.experienceLevel = "Nível de experiência é obrigatório"
        break

      case "plan":
        if (!formData.plan) newErrors.plan = "Plano é obrigatório"
        if (!formData.frequency) newErrors.frequency = "Frequência é obrigatória"
        if (!formData.startDate) newErrors.startDate = "Data de início é obrigatória"
        if (!formData.paymentMethod) newErrors.paymentMethod = "Método de pagamento é obrigatório"
        if (!formData.termsAccepted) newErrors.termsAccepted = "Aceite dos termos é obrigatório"
        if (!formData.dataProcessingAccepted)
          newErrors.dataProcessingAccepted = "Aceite do tratamento de dados é obrigatório"
        break
    }

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextTab = () => {
    if (validateTab(activeTab)) {
      const tabs = ["personal", "health", "plan"]
      const currentIndex = tabs.indexOf(activeTab)
      if (currentIndex < tabs.length - 1) {
        setActiveTab(tabs[currentIndex + 1])
      }
    }
  }

  const handlePreviousTab = () => {
    const tabs = ["personal", "health", "plan"]
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }

  const handleSaveStudentOld = async () => {
    if (!validateTab("plan")) return

    setIsLoading(true)

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Dados do aluno:", formData)

      // Redirecionar para a lista de alunos
      router.push("/dashboard/students")
    } catch (error) {
      console.error("Erro ao salvar aluno:", error)
      alert("Erro ao salvar aluno. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const FormSection = ({
    title,
    icon,
    children,
  }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            mr: 2,
            p: 1,
            borderRadius: "12px",
            backgroundColor: "var(--primary-container)",
            color: "var(--on-primary-container)",
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
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

  const {
    register,
    handleSubmit,
    formState: { errors: formikErrors, isSubmitting },
    setValue,
    watch,
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      status: "pending",
      objectives: [],
    },
  })

  const { createStudent } = useStudents()

  const handleSaveStudent = async (data: StudentFormData) => {
    try {
      const { error } = await createStudent(data)

      if (error) {
        alert(`Erro ao salvar aluno: ${error.message}`)
        return
      }

      // Redirecionar para a lista de alunos
      router.push("/dashboard/students")
    } catch (error) {
      console.error("Erro ao salvar aluno:", error)
      alert("Erro inesperado ao salvar aluno. Tente novamente.")
    }
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Button variant="text" onClick={() => router.back()} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ArrowLeft size={16} />
          Voltar
        </Button>
        <Typography variant="h4" sx={{ color: "var(--on-surface)", fontWeight: 700 }}>
          Novo Aluno
        </Typography>
      </Box>

      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: "1px solid var(--outline-variant)" }}>
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="personal"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <User size={16} />
                Dados Pessoais
              </TabsTrigger>
              <TabsTrigger
                value="health"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <Heart size={16} />
                Saúde e Objetivos
              </TabsTrigger>
              <TabsTrigger
                value="plan"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent flex items-center gap-2"
              >
                <CreditCard size={16} />
                Plano e Termos
              </TabsTrigger>
            </TabsList>
          </Box>

          <Box sx={{ p: 4 }}>
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
                  <FormSection title="Foto do Perfil" icon={<Camera size={20} />}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 4 }}>
                      <Avatar sx={{ width: 80, height: 80, mb: 2, backgroundColor: "var(--surface-variant)" }}>
                        <Upload size={32} />
                      </Avatar>
                      <Button variant="outlined" size="small">
                        Adicionar Foto
                      </Button>
                    </Box>
                  </FormSection>

                  {/* Informações Básicas */}
                  <FormSection title="Informações Básicas" icon={<User size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Input
                          {...register("full_name")}
                          label="Nome Completo *"
                          placeholder="Nome completo do aluno"
                          error={!!formikErrors.full_name}
                        />
                        <ErrorMessage error={formikErrors.full_name?.message} />
                      </Box>
                      <Box>
                        <Input
                          label="Data de Nascimento *"
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          error={!!formErrors.birthDate}
                        />
                        <ErrorMessage error={formErrors.birthDate} />
                      </Box>
                    </Box>
                  </FormSection>

                  {/* Contato */}
                  <FormSection title="Informações de Contato" icon={<Phone size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Input
                          label="Email *"
                          type="email"
                          placeholder="email@exemplo.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          error={!!formErrors.email}
                        />
                        <ErrorMessage error={formErrors.email} />
                      </Box>
                      <Box>
                        <Input
                          label="Telefone Principal *"
                          placeholder="(00) 00000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          error={!!formErrors.phone}
                        />
                        <ErrorMessage error={formErrors.phone} />
                      </Box>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Input
                        label="Telefone Secundário"
                        placeholder="(00) 00000-0000"
                        value={formData.secondaryPhone}
                        onChange={(e) => handleInputChange("secondaryPhone", e.target.value)}
                      />
                    </Box>
                  </FormSection>

                  {/* Endereço */}
                  <FormSection title="Endereço" icon={<MapPin size={20} />}>
                    <Box sx={{ mb: 3 }}>
                      <Input
                        label="Endereço Completo"
                        placeholder="Rua, número, complemento"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                      />
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Input
                        label="Cidade"
                        placeholder="Cidade"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                      <Input
                        label="Estado"
                        placeholder="Estado"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                      />
                      <Input
                        label="CEP"
                        placeholder="00000-000"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </Box>
                  </FormSection>

                  {/* Contato de Emergência */}
                  <FormSection title="Contato de Emergência" icon={<Shield size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Input
                          label="Nome do Contato *"
                          placeholder="Nome completo"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                          error={!!formErrors.emergencyContact}
                        />
                        <ErrorMessage error={formErrors.emergencyContact} />
                      </Box>
                      <Box>
                        <Input
                          label="Telefone de Emergência *"
                          placeholder="(00) 00000-0000"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                          error={!!formErrors.emergencyPhone}
                        />
                        <ErrorMessage error={formErrors.emergencyPhone} />
                      </Box>
                    </Box>
                  </FormSection>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="filled" onClick={handleNextTab}>
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
                  <FormSection title="Medidas Físicas" icon={<Scale size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Input
                          label="Altura (cm) *"
                          type="number"
                          placeholder="Ex: 175"
                          value={formData.height}
                          onChange={(e) => handleInputChange("height", e.target.value)}
                          error={!!formErrors.height}
                        />
                        <ErrorMessage error={formErrors.height} />
                      </Box>
                      <Box>
                        <Input
                          label="Peso (kg) *"
                          type="number"
                          placeholder="Ex: 70"
                          value={formData.weight}
                          onChange={(e) => handleInputChange("weight", e.target.value)}
                          error={!!formErrors.weight}
                        />
                        <ErrorMessage error={formErrors.weight} />
                      </Box>
                      <Input
                        label="% de Gordura"
                        type="number"
                        placeholder="Ex: 15"
                        value={formData.bodyFat}
                        onChange={(e) => handleInputChange("bodyFat", e.target.value)}
                      />
                    </Box>
                  </FormSection>

                  {/* Objetivos */}
                  <FormSection title="Objetivos" icon={<Target size={20} />}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 2 }}>
                        Selecione os objetivos do aluno: *
                      </Typography>
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 2, mb: 3 }}>
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
                          <Box key={objective} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Checkbox
                              id={objective}
                              checked={formData.objectives.includes(objective)}
                              onCheckedChange={(checked) => handleObjectiveChange(objective, checked as boolean)}
                            />
                            <Label htmlFor={objective} className="text-sm cursor-pointer">
                              {objective}
                            </Label>
                          </Box>
                        ))}
                      </Box>
                      <ErrorMessage error={formErrors.objectives} />
                    </Box>
                  </FormSection>

                  {/* Informações de Saúde */}
                  <FormSection title="Informações de Saúde" icon={<Heart size={20} />}>
                    <Box sx={{ mb: 3 }}>
                      <Label className="block text-sm font-medium mb-2">Restrições Médicas</Label>
                      <Textarea
                        placeholder="Descreva quaisquer condições médicas, lesões ou restrições"
                        value={formData.medicalRestrictions}
                        onChange={(e) => handleInputChange("medicalRestrictions", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Label className="block text-sm font-medium mb-2">Medicamentos em Uso</Label>
                      <Textarea
                        placeholder="Liste os medicamentos que o aluno utiliza regularmente"
                        value={formData.medications}
                        onChange={(e) => handleInputChange("medications", e.target.value)}
                        className="min-h-[60px]"
                      />
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Label className="block text-sm font-medium mb-2">Lesões Anteriores</Label>
                      <Textarea
                        placeholder="Descreva lesões anteriores relevantes para o treinamento"
                        value={formData.injuries}
                        onChange={(e) => handleInputChange("injuries", e.target.value)}
                        className="min-h-[60px]"
                      />
                    </Box>
                  </FormSection>

                  {/* Experiência */}
                  <FormSection title="Experiência em Exercícios" icon={<Activity size={20} />}>
                    <Box sx={{ mb: 3 }}>
                      <Label className="block text-sm font-medium mb-2">Nível de Experiência *</Label>
                      <Select
                        value={formData.experienceLevel}
                        onValueChange={(value) => handleInputChange("experienceLevel", value)}
                      >
                        <SelectTrigger className={formErrors.experienceLevel ? "border-red-500" : ""}>
                          <SelectValue placeholder="Selecione o nível de experiência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iniciante">Iniciante (0-6 meses)</SelectItem>
                          <SelectItem value="intermediario">Intermediário (6 meses - 2 anos)</SelectItem>
                          <SelectItem value="avancado">Avançado (2+ anos)</SelectItem>
                          <SelectItem value="atleta">Atleta/Competidor</SelectItem>
                        </SelectContent>
                      </Select>
                      <ErrorMessage error={formErrors.experienceLevel} />
                    </Box>
                  </FormSection>

                  {/* Wearable */}
                  <FormSection title="Dispositivos Wearable" icon={<Clock size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Label className="block text-sm font-medium mb-2">Dispositivo</Label>
                        <Select
                          value={formData.wearableDevice}
                          onValueChange={(value) => handleInputChange("wearableDevice", value)}
                        >
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
                        label="ID/Email da Conta"
                        placeholder="ID ou email da conta do wearable"
                        value={formData.wearableId}
                        onChange={(e) => handleInputChange("wearableId", e.target.value)}
                      />
                    </Box>
                  </FormSection>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={handlePreviousTab}>
                      Anterior
                    </Button>
                    <Button variant="filled" onClick={handleNextTab}>
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
                  <FormSection title="Plano de Treinamento" icon={<CreditCard size={20} />}>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Label className="block text-sm font-medium mb-2">Plano *</Label>
                        <Select value={formData.plan} onValueChange={(value) => handleInputChange("plan", value)}>
                          <SelectTrigger className={formErrors.plan ? "border-red-500" : ""}>
                            <SelectValue placeholder="Selecione o plano" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Básico - R$ 150/mês</SelectItem>
                            <SelectItem value="standard">Standard - R$ 250/mês</SelectItem>
                            <SelectItem value="premium">Premium - R$ 400/mês</SelectItem>
                            <SelectItem value="vip">VIP - R$ 600/mês</SelectItem>
                          </SelectContent>
                        </Select>
                        <ErrorMessage error={formErrors.plan} />
                      </Box>
                      <Box>
                        <Label className="block text-sm font-medium mb-2">Frequência Semanal *</Label>
                        <Select
                          value={formData.frequency}
                          onValueChange={(value) => handleInputChange("frequency", value)}
                        >
                          <SelectTrigger className={formErrors.frequency ? "border-red-500" : ""}>
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
                        <ErrorMessage error={formErrors.frequency} />
                      </Box>
                    </Box>
                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3, mb: 3 }}>
                      <Box>
                        <Input
                          label="Data de Início *"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange("startDate", e.target.value)}
                          error={!!formErrors.startDate}
                        />
                        <ErrorMessage error={formErrors.startDate} />
                      </Box>
                      <Box>
                        <Label className="block text-sm font-medium mb-2">Método de Pagamento *</Label>
                        <Select
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange("paymentMethod", value)}
                        >
                          <SelectTrigger className={formErrors.paymentMethod ? "border-red-500" : ""}>
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
                        <ErrorMessage error={formErrors.paymentMethod} />
                      </Box>
                    </Box>
                  </FormSection>

                  {/* Observações */}
                  <FormSection title="Observações Adicionais" icon={<FileText size={20} />}>
                    <Box sx={{ mb: 3 }}>
                      <Label className="block text-sm font-medium mb-2">Observações</Label>
                      <Textarea
                        placeholder="Observações adicionais sobre o aluno, plano ou pagamento"
                        value={formData.observations}
                        onChange={(e) => handleInputChange("observations", e.target.value)}
                        className="min-h-[80px]"
                      />
                    </Box>
                  </FormSection>

                  {/* Termos e Condições */}
                  <FormSection title="Termos e Condições" icon={<Shield size={20} />}>
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
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
                      <ErrorMessage error={formErrors.termsAccepted} />

                      <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
                        <Checkbox
                          id="dataProcessing"
                          checked={formData.dataProcessingAccepted}
                          onCheckedChange={(checked) => handleInputChange("dataProcessingAccepted", checked as boolean)}
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
                      <ErrorMessage error={formErrors.dataProcessingAccepted} />
                    </Box>
                  </FormSection>

                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={handlePreviousTab}>
                      Anterior
                    </Button>
                    <Button
                      variant="filled"
                      onClick={handleSubmit(handleSaveStudent)}
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
          </Box>
        </Tabs>
      </Card>
    </Box>
  )
}
