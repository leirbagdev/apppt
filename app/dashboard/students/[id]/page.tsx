"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"

// Componentes MD3 personalizados
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"
import { ProgressIndicator } from "@/components/md3/progress-indicator"

// Componentes UI
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, Box, Typography, IconButton, Divider, Grid } from "@mui/material"

// Ícones
import {
  ArrowLeft,
  Edit,
  MessageSquare,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  Dumbbell,
  Heart,
  FileText,
  AlertCircle,
  Phone,
  MapPin,
  User,
  Scale,
  Ruler,
  Target,
  Shield,
  Activity,
} from "lucide-react"

// Componente de informações do aluno
function StudentInfo({ student }: { student: any }) {
  const InfoCard = ({
    title,
    children,
    icon,
  }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) => (
    <Card className="h-full">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          {icon && (
            <Box
              sx={{
                mr: 2,
                p: 1,
                borderRadius: "12px",
                backgroundColor: "var(--primary-container)",
                color: "var(--on-primary-container)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{
              color: "var(--on-surface)",
              fontWeight: 600,
              fontSize: "1.1rem",
            }}
          >
            {title}
          </Typography>
        </Box>
        {children}
      </Box>
    </Card>
  )

  const InfoRow = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <Box sx={{ display: "flex", alignItems: "center", py: 1.5, borderBottom: "1px solid var(--outline-variant)" }}>
      {icon && (
        <Box sx={{ mr: 2, color: "var(--on-surface-variant)", display: "flex", alignItems: "center" }}>{icon}</Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", fontSize: "0.875rem", mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: "var(--on-surface)", fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  )

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <InfoCard title="Informações Pessoais" icon={<User size={20} />}>
          <Box sx={{ "& > *:last-child": { borderBottom: "none" } }}>
            <InfoRow label="Nome Completo" value={student.fullName || student.name} />
            <InfoRow
              label="Data de Nascimento"
              value={new Date(student.birthDate).toLocaleDateString("pt-BR")}
              icon={<Calendar size={16} />}
            />
            <InfoRow label="Idade" value={student.age} />
            <InfoRow label="E-mail" value={student.email} icon={<Mail size={16} />} />
            <InfoRow label="Telefone" value={student.phone} icon={<Phone size={16} />} />
            {student.secondaryPhone && (
              <InfoRow label="Telefone Secundário" value={student.secondaryPhone} icon={<Phone size={16} />} />
            )}
            <InfoRow label="Endereço" value={student.address || "Não informado"} icon={<MapPin size={16} />} />
          </Box>
        </InfoCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <InfoCard title="Informações Físicas e Objetivos" icon={<Activity size={20} />}>
          <Box sx={{ "& > *:last-child": { borderBottom: "none" } }}>
            <InfoRow label="Peso" value={student.weight} icon={<Scale size={16} />} />
            <InfoRow label="Altura" value={student.height} icon={<Ruler size={16} />} />
            <InfoRow label="IMC" value="26.8 (Sobrepeso)" />
            <InfoRow
              label="Data de Início"
              value={new Date(student.startDate).toLocaleDateString("pt-BR")}
              icon={<Calendar size={16} />}
            />
            <InfoRow label="Modalidades" value={student.modalities.join(", ")} icon={<Dumbbell size={16} />} />
            <InfoRow
              label="Restrições"
              value={student.restrictions.length > 0 ? student.restrictions.join(", ") : "Nenhuma restrição"}
              icon={<Shield size={16} />}
            />
          </Box>
        </InfoCard>
      </Grid>

      <Grid item xs={12}>
        <InfoCard title="Objetivos e Progresso" icon={<Target size={20} />}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {student.objectives.map((objective: string, index: number) => (
              <Box key={index}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "var(--on-surface)" }}>
                    {objective}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", fontSize: "0.875rem" }}>
                    {index === 0 ? "65%" : "10%"} concluído
                  </Typography>
                </Box>
                <ProgressIndicator value={index === 0 ? 65 : 10} color={index === 0 ? "success" : "primary"} animated />
              </Box>
            ))}
          </Box>
        </InfoCard>
      </Grid>
    </Grid>
  )
}

// Componente de treinos
function WorkoutsTab() {
  const WorkoutCard = ({ title, schedule, description, exercises, onEdit, onStart }: any) => (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600, mb: 1 }}>
              {title}
            </Typography>
            <Chip
              label={schedule}
              size="small"
              sx={{
                backgroundColor: "var(--success-container)",
                color: "var(--on-success-container)",
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>

        <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 3 }}>
          {description}
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {exercises.map((exercise: any, index: number) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  backgroundColor: "var(--surface-variant)",
                  borderRadius: "12px",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "var(--primary)",
                    color: "var(--on-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 2,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "var(--on-surface)", mb: 0.5 }}>
                    {exercise.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                    {exercise.sets || exercise.description}
                    {exercise.weight && ` (${exercise.weight})`}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onEdit} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Edit size={16} />
            Editar
          </Button>
          <Button variant="filled" onClick={onStart} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Dumbbell size={16} />
            Iniciar Treino
          </Button>
        </Box>
      </Box>
    </Card>
  )

  return (
    <Box>
      <WorkoutCard
        title="Treino A - Musculação Full Body"
        schedule="Segunda, Quarta e Sexta"
        description="Foco em adaptação e condicionamento geral"
        exercises={[
          { name: "Leg press", sets: "3x15", weight: "80kg" },
          { name: "Supino máquina", sets: "3x15", weight: "40kg" },
          { name: "Puxada frontal", sets: "3x15", weight: "50kg" },
          { name: "Desenvolvimento máquina", sets: "3x15", weight: "30kg" },
          { name: "Cadeira extensora", sets: "3x15", weight: "40kg" },
          { name: "Abdominal máquina", sets: "3x20", weight: "30kg" },
        ]}
        onEdit={() => {}}
        onStart={() => {}}
      />

      <WorkoutCard
        title="Treino B - Natação"
        schedule="Terça e Quinta"
        description="Foco em técnica e resistência cardiorrespiratória"
        exercises={[
          { name: "Aquecimento", description: "200m nado livre" },
          { name: "Técnica de respiração", description: "10 min" },
          { name: "Nado crawl", description: "400m (4x100m)" },
          { name: "Nado costas", description: "200m (4x50m)" },
          { name: "Pernada com prancha", description: "200m" },
          { name: "Relaxamento", description: "100m nado livre leve" },
        ]}
        onEdit={() => {}}
        onStart={() => {}}
      />
    </Box>
  )
}

// Componente de pendências
function PendingItemsTab({ student }: { student: any }) {
  const ActionCard = ({ title, description, icon, action, color = "primary" }: any) => (
    <Card sx={{ height: "100%" }}>
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              mr: 2,
              p: 1.5,
              borderRadius: "12px",
              backgroundColor: `var(--${color}-container)`,
              color: `var(--on-${color}-container)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600, fontSize: "1rem" }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 3, flex: 1, lineHeight: 1.5 }}>
          {description}
        </Typography>
        <Button variant="outlined" size="small" sx={{ alignSelf: "flex-start" }}>
          {action}
        </Button>
      </Box>
    </Card>
  )

  return (
    <Box>
      {student.pendingItems.length > 0 ? (
        <Card sx={{ mb: 3 }}>
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <AlertTriangle size={20} color="var(--warning)" />
              <Typography variant="h6" sx={{ ml: 2, color: "var(--warning)", fontWeight: 600 }}>
                Itens Pendentes
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {student.pendingItems.map((item: string, index: number) => (
                <Card key={index} variant="outlined">
                  <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AlertTriangle size={16} color="var(--warning)" />
                      <Typography variant="body2" sx={{ ml: 2, color: "var(--on-surface)" }}>
                        {item}
                      </Typography>
                    </Box>
                    <Button variant="filled" size="small">
                      Marcar como Concluído
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600, mb: 2 }}>
              Adicionar Novo Item Pendente
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box
                component="input"
                sx={{
                  flex: 1,
                  p: 2,
                  borderRadius: "24px",
                  border: "1px solid var(--outline-variant)",
                  backgroundColor: "var(--surface-variant)",
                  color: "var(--on-surface)",
                  fontSize: "0.875rem",
                  outline: "none",
                  "&:focus": {
                    borderColor: "var(--primary)",
                  },
                }}
                placeholder="Descrição do item pendente..."
              />
              <Button variant="filled">Adicionar</Button>
            </Box>
          </Box>
        </Card>
      ) : (
        <Card sx={{ mb: 3 }}>
          <Box sx={{ p: 4, textAlign: "center" }}>
            <CheckCircle size={48} color="var(--success)" style={{ marginBottom: 16 }} />
            <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600, mb: 1 }}>
              Não há itens pendentes
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--on-surface-variant)" }}>
              Este aluno não possui itens pendentes no momento.
            </Typography>
          </Box>
        </Card>
      )}

      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ color: "var(--on-surface)", fontWeight: 600, mb: 3 }}>
            Próximos Passos
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ActionCard
                title="Agendar Avaliação Física"
                description="Realizar avaliação física completa para estabelecer linha de base e definir metas específicas."
                icon={<Heart size={20} />}
                action="Agendar Agora"
                color="primary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ActionCard
                title="Solicitar Exames"
                description="Solicitar hemograma completo e outros exames relevantes para avaliação de saúde."
                icon={<FileText size={20} />}
                action="Gerar Solicitação"
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ActionCard
                title="Configurar Apple Watch"
                description="Auxiliar na configuração do Apple Watch para monitoramento de atividades e integração com o sistema."
                icon={<Clock size={20} />}
                action="Ver Tutorial"
                color="tertiary"
              />
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Box>
  )
}

export default function StudentDetail() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("info")
  const [loading, setLoading] = useState(true)
  const [student, setStudent] = useState<any>(null)

  useEffect(() => {
    // Verificar se é rota "new" primeiro
    if (params.id === "new") {
      router.replace("/dashboard/students/new")
      return
    }

    // Verificar se é um ID válido
    if (!params.id || Array.isArray(params.id)) {
      router.replace("/dashboard/students")
      return
    }

    // Verificar se o ID é um número válido
    const studentId = params.id as string
    if (!/^\d+$/.test(studentId)) {
      router.replace("/dashboard/students")
      return
    }

    // Dados do aluno com base no ID
    const students = {
      "1": {
        id: 1,
        name: "Leandro Silva",
        fullName: "Leandro Santos Silva",
        startDate: "2025-02-04",
        birthDate: "1988-10-03",
        age: "36 anos",
        email: "leandrossilva@gmail.com",
        phone: "(41) 9 9512-3112",
        address: "Av. Anchieta, 3450 (AP 524)",
        weight: "97,00kg",
        height: "1,90m",
        status: "active",
        pendingItems: [],
        modalities: ["Musculação"],
        objectives: ["Perda de peso", "Ganho de massa muscular"],
        restrictions: [],
        avatar: "https://this-person-does-not-exist.com/img/avatar-gen11c4f36f8b5c4c5e9a8b2d3e4f5g6h7i.jpg",
      },
      "2": {
        id: 2,
        name: "Mario Lenon",
        fullName: "Mario Lenon Santos",
        startDate: "2024-11-15",
        birthDate: "1973-09-23",
        age: "51 anos",
        email: "lenon1973@hotmail.com",
        phone: "(41) 9 9876-5432",
        address: "Rua das Flores, 123 - Centro",
        weight: "85kg",
        height: "1,78m",
        status: "active",
        pendingItems: ["Aguardando avaliações", "Hemograma", "Conectar o Apple Watch para dados Self-Tracking"],
        modalities: ["Musculação", "Natação"],
        objectives: ["Perda de peso (objetivo: 80/81kg)"],
        restrictions: ["Nenhuma restrição nem limitação"],
        avatar: "https://this-person-does-not-exist.com/img/avatar-gen22d5g47h9c6d7e0b9c3f4g5h6i7j8k.jpg",
      },
      "3": {
        id: 3,
        name: "Otávio Martins",
        fullName: "Flávio Ferreira Martins",
        startDate: "2021-05-19",
        birthDate: "1946-01-10",
        age: "79 anos",
        email: "otavianomartins@hotmail.com",
        phone: "(41) 9996-88234",
        secondaryPhone: "(41) 3145-7054 (Portaria Condomínio)",
        address: "Av. Visconde de Guarapuava, 56 - Cristo Rei, Curitiba - PR, 80050-160",
        weight: "72kg",
        height: "1,68m",
        status: "active",
        pendingItems: [],
        modalities: ["Musculação", "Fisioterapia"],
        objectives: ["Manutenção da saúde", "Mobilidade"],
        restrictions: ["Hipertensão controlada", "Artrose leve nos joelhos"],
        hasExams: true,
        avatar: "https://this-person-does-not-exist.com/img/avatar-gen33e6h58i0d7e1c0d4g5h6i7j8k9l0m.jpg",
      },
    }

    // Verificar se o ID existe nos dados
    if (students[params.id as keyof typeof students]) {
      setStudent(students[params.id as keyof typeof students])
    } else {
      // Redirecionar para a lista de alunos se o ID não existir
      router.push("/dashboard/students")
      return
    }

    setLoading(false)
  }, [params.id, router])

  // Se estiver carregando ou não houver aluno, mostrar indicador de carregamento
  if (loading || !student) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              border: "2px solid var(--primary)",
              borderTop: "2px solid transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              mx: "auto",
              mb: 2,
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          <Typography variant="body2" sx={{ color: "var(--on-surface-variant)" }}>
            Carregando informações do aluno...
          </Typography>
        </Box>
      </Box>
    )
  }

  const getStatusColor = () => {
    switch (student.status) {
      case "active":
        return "var(--success-container)"
      case "pending":
        return "var(--warning-container)"
      case "inactive":
        return "var(--error-container)"
      default:
        return "var(--surface-variant)"
    }
  }

  const getStatusTextColor = () => {
    switch (student.status) {
      case "active":
        return "var(--on-success-container)"
      case "pending":
        return "var(--on-warning-container)"
      case "inactive":
        return "var(--on-error-container)"
      default:
        return "var(--on-surface-variant)"
    }
  }

  const getStatusText = () => {
    switch (student.status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "inactive":
        return "Inativo"
      default:
        return student.status
    }
  }

  const getStatusIcon = () => {
    switch (student.status) {
      case "active":
        return <CheckCircle size={16} />
      case "pending":
        return <Clock size={16} />
      case "inactive":
        return <AlertCircle size={16} />
      default:
        return null
    }
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2, mb: 3 }}>
          <IconButton
            onClick={() => router.push("/dashboard/students")}
            sx={{
              backgroundColor: "var(--surface-container)",
              color: "var(--on-surface)",
              "&:hover": { backgroundColor: "var(--surface-container-high)" },
            }}
          >
            <ArrowLeft size={20} />
          </IconButton>

          <Avatar
            sx={{
              width: 56,
              height: 56,
              backgroundColor: "var(--primary)",
              color: "var(--on-primary)",
              fontSize: "1.5rem",
              fontWeight: 600,
            }}
            src={student.avatar}
          >
            {student.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)}
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h4"
              sx={{
                color: "var(--on-surface)",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", md: "2rem" },
                mb: 1,
              }}
            >
              {student.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "16px",
                  backgroundColor: getStatusColor(),
                  color: getStatusTextColor(),
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                {getStatusIcon()}
                {getStatusText()}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Button variant="outlined" size="small" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MessageSquare size={16} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>WhatsApp</Box>
            </Button>
            <Button variant="outlined" size="small" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Mail size={16} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>Email</Box>
            </Button>
            <Button variant="outlined" size="small" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Calendar size={16} />
              <Box sx={{ display: { xs: "none", sm: "block" } }}>Agendar</Box>
            </Button>
            <Button variant="filled" size="small" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Edit size={16} />
              Editar
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Card>
        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab}>
          <Box sx={{ borderBottom: "1px solid var(--outline-variant)" }}>
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="info"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Informações
              </TabsTrigger>
              <TabsTrigger
                value="workouts"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Treinos
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Pendências
              </TabsTrigger>
            </TabsList>
          </Box>

          <Box sx={{ p: 3 }}>
            <TabsContent value="info" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <StudentInfo student={student} />
              </motion.div>
            </TabsContent>

            <TabsContent value="workouts" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <WorkoutsTab />
              </motion.div>
            </TabsContent>

            <TabsContent value="pending" className="mt-0">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <PendingItemsTab student={student} />
              </motion.div>
            </TabsContent>
          </Box>
        </Tabs>
      </Card>
    </Box>
  )
}
