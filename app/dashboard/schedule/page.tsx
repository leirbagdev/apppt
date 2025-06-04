"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import Fab from "@mui/material/Fab"
import Tooltip from "@mui/material/Tooltip"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import { useMobile } from "@/hooks/use-mobile"

// Components
import { Input } from "@/components/md3/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay"
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek"
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth"
import AddIcon from "@mui/icons-material/Add"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import PoolIcon from "@mui/icons-material/Pool"
import SpaIcon from "@mui/icons-material/Spa"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import PersonIcon from "@mui/icons-material/Person"
import EventIcon from "@mui/icons-material/Event"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import DeleteIcon from "@mui/icons-material/Delete"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, startOfWeek, endOfWeek } from "date-fns"
import { ptBR } from "date-fns/locale"

type ViewType = "day" | "week" | "month"

interface Appointment {
  id: number
  date: string
  time: string
  duration: number
  student: string
  studentId: string
  type: string
  status: "confirmed" | "pending" | "cancelled"
  avatar: string
  color: string
  icon: React.ReactNode
  phone?: string
  notes?: string
  price?: number
}

interface NewAppointment {
  studentId: string
  date: string
  time: string
  duration: number
  type: string
  notes: string
  price: number
}

// Dados expandidos de agendamentos
const allAppointments: Appointment[] = [
  // ... (manter os dados existentes e adicionar mais)
  {
    id: 1,
    date: "2025-06-03",
    time: "08:00",
    duration: 60,
    student: "Leandro Silva",
    studentId: "1",
    type: "Musculação",
    status: "confirmed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511999999999",
    notes: "Foco em peito e tríceps",
    price: 80,
  },
  {
    id: 2,
    date: "2025-06-03",
    time: "10:00",
    duration: 45,
    student: "Mario Lenon",
    studentId: "2",
    type: "Natação",
    status: "confirmed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mario",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511888888888",
    price: 60,
  },
  {
    id: 3,
    date: "2025-06-03",
    time: "14:00",
    duration: 90,
    student: "Otávio Martins",
    studentId: "3",
    type: "Fisioterapia",
    status: "pending",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Otavio",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511777777777",
    notes: "Reabilitação do joelho",
    price: 120,
  },
  // Adicionar mais agendamentos para os próximos dias
  {
    id: 4,
    date: "2025-06-04",
    time: "09:00",
    duration: 60,
    student: "Ana Carolina",
    studentId: "4",
    type: "Personal Training",
    status: "confirmed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511666666666",
    price: 100,
  },
  {
    id: 1,
    date: "2025-05-01",
    time: "08:00",
    duration: 60,
    student: "Leandro Silva",
    studentId: "1",
    type: "Musculação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511999999999",
  },
  {
    id: 2,
    date: "2025-05-01",
    time: "10:00",
    duration: 45,
    student: "Mario Lenon",
    studentId: "2",
    type: "Natação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511888888888",
  },
  {
    id: 3,
    date: "2025-05-02",
    time: "09:00",
    duration: 90,
    student: "Otávio Martins",
    studentId: "3",
    type: "Fisioterapia",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511777777777",
  },
  {
    id: 4,
    date: "2025-05-02",
    time: "14:00",
    duration: 60,
    student: "Ana Costa",
    studentId: "4",
    type: "Personal Training",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511666666666",
  },
  {
    id: 5,
    date: "2025-05-03",
    time: "16:30",
    duration: 45,
    student: "Carlos Santos",
    studentId: "5",
    type: "Avaliação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#f59e0b",
    icon: <PersonIcon />,
    phone: "+5511555555555",
  },
  {
    id: 6,
    date: "2025-05-05",
    time: "07:00",
    duration: 60,
    student: "Fernanda Lima",
    studentId: "6",
    type: "Corrida",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#ef4444",
    icon: <DirectionsRunIcon />,
    phone: "+5511444444444",
  },
  {
    id: 7,
    date: "2025-05-05",
    time: "15:00",
    duration: 75,
    student: "Roberto Alves",
    studentId: "7",
    type: "Yoga",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#8b5cf6",
    icon: <SelfImprovementIcon />,
    phone: "+5511333333333",
  },
  {
    id: 8,
    date: "2025-05-06",
    time: "08:30",
    duration: 60,
    student: "Juliana Rocha",
    studentId: "8",
    type: "Musculação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511222222222",
  },
  {
    id: 9,
    date: "2025-05-07",
    time: "11:00",
    duration: 45,
    student: "Pedro Henrique",
    studentId: "9",
    type: "Natação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511111111111",
  },
  {
    id: 10,
    date: "2025-05-08",
    time: "13:00",
    duration: 90,
    student: "Mariana Santos",
    studentId: "10",
    type: "Fisioterapia",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511000000000",
  },
  {
    id: 11,
    date: "2025-05-09",
    time: "17:00",
    duration: 60,
    student: "Lucas Oliveira",
    studentId: "11",
    type: "Personal Training",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511999888777",
  },
  {
    id: 12,
    date: "2025-05-10",
    time: "09:30",
    duration: 45,
    student: "Camila Ferreira",
    studentId: "12",
    type: "Corrida",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#ef4444",
    icon: <DirectionsRunIcon />,
    phone: "+5511888777666",
  },
  {
    id: 13,
    date: "2025-05-12",
    time: "08:00",
    duration: 60,
    student: "Diego Martins",
    studentId: "13",
    type: "Musculação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511777666555",
  },
  {
    id: 14,
    date: "2025-05-12",
    time: "14:30",
    duration: 75,
    student: "Beatriz Silva",
    studentId: "14",
    type: "Yoga",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#8b5cf6",
    icon: <SelfImprovementIcon />,
    phone: "+5511666555444",
  },
  {
    id: 15,
    date: "2025-05-13",
    time: "10:00",
    duration: 45,
    student: "Rafael Costa",
    studentId: "15",
    type: "Natação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511555444333",
  },
  {
    id: 16,
    date: "2025-05-14",
    time: "16:00",
    duration: 90,
    student: "Larissa Mendes",
    studentId: "16",
    type: "Fisioterapia",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511444333222",
  },
  {
    id: 17,
    date: "2025-05-15",
    time: "07:30",
    duration: 60,
    student: "Thiago Barbosa",
    studentId: "17",
    type: "Personal Training",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511333222111",
  },
  {
    id: 18,
    date: "2025-05-16",
    time: "18:00",
    duration: 45,
    student: "Gabriela Souza",
    studentId: "18",
    type: "Corrida",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#ef4444",
    icon: <DirectionsRunIcon />,
    phone: "+5511222111000",
  },
  {
    id: 19,
    date: "2025-05-17",
    time: "12:00",
    duration: 60,
    student: "André Pereira",
    studentId: "19",
    type: "Avaliação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#f59e0b",
    icon: <PersonIcon />,
    phone: "+5511111000999",
  },
  {
    id: 20,
    date: "2025-05-19",
    time: "08:00",
    duration: 60,
    student: "Leandro Silva",
    studentId: "20",
    type: "Musculação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511999999999",
  },
  {
    id: 21,
    date: "2025-05-19",
    time: "15:30",
    duration: 75,
    student: "Patrícia Gomes",
    studentId: "21",
    type: "Yoga",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#8b5cf6",
    icon: <SelfImprovementIcon />,
    phone: "+5511000999888",
  },
  {
    id: 22,
    date: "2025-05-20",
    time: "09:00",
    duration: 45,
    student: "Rodrigo Lima",
    studentId: "22",
    type: "Natação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511999888777",
  },
  {
    id: 23,
    date: "2025-05-21",
    time: "13:30",
    duration: 90,
    student: "Vanessa Cardoso",
    studentId: "23",
    type: "Fisioterapia",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511888777666",
  },
  {
    id: 24,
    date: "2025-05-22",
    time: "17:30",
    duration: 60,
    student: "Gustavo Reis",
    studentId: "24",
    type: "Personal Training",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511777666555",
  },
  {
    id: 25,
    date: "2025-05-23",
    time: "06:30",
    duration: 45,
    student: "Isabela Moura",
    studentId: "25",
    type: "Corrida",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#ef4444",
    icon: <DirectionsRunIcon />,
    phone: "+5511666555444",
  },
  {
    id: 26,
    date: "2025-05-24",
    time: "11:30",
    duration: 60,
    student: "Felipe Nascimento",
    studentId: "26",
    type: "Musculação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511555444333",
  },
  {
    id: 27,
    date: "2025-05-26",
    time: "14:00",
    duration: 75,
    student: "Carolina Dias",
    studentId: "27",
    type: "Yoga",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#8b5cf6",
    icon: <SelfImprovementIcon />,
    phone: "+5511444333222",
  },
  {
    id: 28,
    date: "2025-05-27",
    time: "08:00",
    duration: 60,
    student: "Leandro Silva",
    studentId: "28",
    type: "Musculação",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511999999999",
  },
  {
    id: 29,
    date: "2025-05-27",
    time: "09:30",
    duration: 45,
    student: "Mario Lenon",
    studentId: "29",
    type: "Natação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#60a5fa",
    icon: <PoolIcon />,
    phone: "+5511888888888",
  },
  {
    id: 30,
    date: "2025-05-27",
    time: "11:00",
    duration: 90,
    student: "Otávio Martins",
    studentId: "30",
    type: "Fisioterapia",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#a78bfa",
    icon: <SpaIcon />,
    phone: "+5511777777777",
  },
  {
    id: 31,
    date: "2025-05-28",
    time: "16:00",
    duration: 60,
    student: "Renata Almeida",
    studentId: "31",
    type: "Personal Training",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4ade80",
    icon: <FitnessCenterIcon />,
    phone: "+5511333222111",
  },
  {
    id: 32,
    date: "2025-05-29",
    time: "18:30",
    duration: 45,
    student: "Bruno Teixeira",
    studentId: "32",
    type: "Corrida",
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#ef4444",
    icon: <DirectionsRunIcon />,
    phone: "+5511222111000",
  },
  {
    id: 33,
    date: "2025-05-30",
    time: "10:30",
    duration: 60,
    student: "Aline Ribeiro",
    studentId: "33",
    type: "Avaliação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#f59e0b",
    icon: <PersonIcon />,
    phone: "+5511111000999",
  },
]

const mockStudents = [
  { id: "1", name: "Leandro Silva", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro" },
  { id: "2", name: "Mario Lenon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mario" },
  { id: "3", name: "Otávio Martins", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Otavio" },
  { id: "4", name: "Ana Carolina", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana" },
]

const workoutTypes = [
  { value: "musculacao", label: "Musculação", color: "#4ade80", icon: <FitnessCenterIcon /> },
  { value: "cardio", label: "Cardio", color: "#ef4444", icon: <DirectionsRunIcon /> },
  { value: "natacao", label: "Natação", color: "#60a5fa", icon: <PoolIcon /> },
  { value: "yoga", label: "Yoga", color: "#8b5cf6", icon: <SelfImprovementIcon /> },
  { value: "fisioterapia", label: "Fisioterapia", color: "#a78bfa", icon: <SpaIcon /> },
  { value: "avaliacao", label: "Avaliação", color: "#f59e0b", icon: <PersonIcon /> },
]

const timeSlots = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
]

export default function SchedulePage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>("day")
  const [appointments, setAppointments] = useState(allAppointments)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [newAppointmentDialog, setNewAppointmentDialog] = useState(false)
  const [editAppointmentDialog, setEditAppointmentDialog] = useState(false)
  const [newAppointment, setNewAppointment] = useState<NewAppointment>({
    studentId: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "09:00",
    duration: 60,
    type: "musculacao",
    notes: "",
    price: 80,
  })
  const isMobile = useMobile()

  // Função para formatar data no formato YYYY-MM-DD
  const formatDateKey = useCallback((date: Date) => {
    return date.toISOString().split("T")[0]
  }, [])

  // Função para obter agendamentos de uma data específica
  const getAppointmentsForDate = useCallback(
    (date: Date) => {
      const dateKey = formatDateKey(date)
      return appointments.filter((apt) => apt.date === dateKey)
    },
    [appointments, formatDateKey],
  )

  // Agendamentos do dia atual
  const todayAppointments = useMemo(() => {
    return getAppointmentsForDate(currentDate)
  }, [currentDate, getAppointmentsForDate])

  // Função para criar novo agendamento
  const handleCreateAppointment = async () => {
    const student = mockStudents.find((s) => s.id === newAppointment.studentId)
    const workoutType = workoutTypes.find((t) => t.value === newAppointment.type)

    if (!student || !workoutType) return

    const newApt: Appointment = {
      id: Math.max(...appointments.map((a) => a.id)) + 1,
      date: newAppointment.date,
      time: newAppointment.time,
      duration: newAppointment.duration,
      student: student.name,
      studentId: student.id,
      type: workoutType.label,
      status: "pending",
      avatar: student.avatar,
      color: workoutType.color,
      icon: workoutType.icon,
      notes: newAppointment.notes,
      price: newAppointment.price,
    }

    setAppointments([...appointments, newApt])
    setNewAppointmentDialog(false)
    setNewAppointment({
      studentId: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: "09:00",
      duration: 60,
      type: "musculacao",
      notes: "",
      price: 80,
    })
  }

  // Função para confirmar agendamento
  const handleConfirmAppointment = (id: number) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "confirmed" as const } : apt)))
  }

  // Função para cancelar agendamento
  const handleCancelAppointment = (id: number) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" as const } : apt)))
  }

  // Função para deletar agendamento
  const handleDeleteAppointment = (id: number) => {
    setAppointments(appointments.filter((apt) => apt.id !== id))
    setSelectedAppointment(null)
  }

  const formatDate = (date: Date) => {
    switch (viewType) {
      case "day":
        return format(date, "dd 'de' MMMM, yyyy", { locale: ptBR })
      case "week":
        const startWeek = startOfWeek(date, { weekStartsOn: 1 })
        const endWeek = endOfWeek(date, { weekStartsOn: 1 })
        return `${format(startWeek, "dd", { locale: ptBR })} - ${format(endWeek, "dd 'de' MMMM, yyyy", { locale: ptBR })}`
      case "month":
        return format(date, "MMMM yyyy", { locale: ptBR })
      default:
        return ""
    }
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    switch (viewType) {
      case "day":
        newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
        break
    }
    setCurrentDate(newDate)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "#4ade80"
      case "pending":
        return "#f59e0b"
      case "cancelled":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendente"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconhecido"
    }
  }

  // Renderizar visualização do dia
  const renderDayView = () => (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
          Agendamentos do Dia ({todayAppointments.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setNewAppointmentDialog(true)}
          sx={{
            backgroundColor: "#4ade80",
            color: "#000",
            "&:hover": { backgroundColor: "#22c55e" },
          }}
        >
          Novo Agendamento
        </Button>
      </Box>

      {todayAppointments.length === 0 ? (
        <Card
          sx={{ backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: 3, textAlign: "center", py: 4 }}
        >
          <Typography variant="h6" sx={{ color: "#9ca3af", mb: 1 }}>
            Nenhum agendamento para hoje
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Clique em "Novo Agendamento" para adicionar uma sessão
          </Typography>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <AnimatePresence>
            {todayAppointments
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#1a1a1a",
                      border: `1px solid ${appointment.color}40`,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#262626",
                        transform: "translateY(-2px)",
                        boxShadow: `0 8px 25px ${appointment.color}20`,
                      },
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar
                            sx={{ backgroundColor: appointment.color, width: 56, height: 56 }}
                            src={appointment.avatar}
                          >
                            {appointment.icon}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
                              {appointment.student}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                              {appointment.type}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                              <AccessTimeIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
                              <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                                {appointment.time} - {appointment.duration}min
                              </Typography>
                              {appointment.price && (
                                <Typography variant="caption" sx={{ color: "#4ade80", ml: 1 }}>
                                  R$ {appointment.price}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Chip
                            label={getStatusText(appointment.status)}
                            size="small"
                            sx={{
                              backgroundColor: `${getStatusColor(appointment.status)}20`,
                              color: getStatusColor(appointment.status),
                              border: `1px solid ${getStatusColor(appointment.status)}40`,
                              fontWeight: 600,
                            }}
                          />

                          {appointment.status === "pending" && (
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <Tooltip title="Confirmar">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleConfirmAppointment(appointment.id)
                                  }}
                                  sx={{ color: "#4ade80" }}
                                >
                                  <CheckIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancelar">
                                <IconButton
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCancelAppointment(appointment.id)
                                  }}
                                  sx={{ color: "#ef4444" }}
                                >
                                  <CloseIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          )}
                        </Box>
                      </Box>

                      {appointment.notes && (
                        <Typography variant="body2" sx={{ color: "#9ca3af", mt: 2, fontStyle: "italic" }}>
                          "{appointment.notes}"
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </AnimatePresence>
        </Box>
      )}
    </Box>
  )

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: isMobile ? 2 : 3 }}>
      {/* Header com navegação */}
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigateDate("prev")}
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              color: "#4ade80",
              "&:hover": { backgroundColor: "#262626", boxShadow: "0 0 12px rgba(74, 222, 128, 0.3)" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography
            variant="h5"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              minWidth: isMobile ? "200px" : "300px",
              textAlign: "center",
            }}
          >
            {formatDate(currentDate)}
          </Typography>

          <IconButton
            onClick={() => navigateDate("next")}
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              color: "#4ade80",
              "&:hover": { backgroundColor: "#262626", boxShadow: "0 0 12px rgba(74, 222, 128, 0.3)" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Seletor de visualização */}
        <Box sx={{ display: "flex", backgroundColor: "#1a1a1a", border: "1px solid #333333", borderRadius: 2, p: 0.5 }}>
          {[
            { type: "day" as ViewType, icon: <CalendarViewDayIcon />, label: "Dia" },
            { type: "week" as ViewType, icon: <CalendarViewWeekIcon />, label: "Semana" },
            { type: "month" as ViewType, icon: <CalendarViewMonthIcon />, label: "Mês" },
          ].map((view) => (
            <Button
              key={view.type}
              onClick={() => setViewType(view.type)}
              startIcon={view.icon}
              sx={{
                color: viewType === view.type ? "#000000" : "#d1d5db",
                backgroundColor: viewType === view.type ? "#4ade80" : "transparent",
                borderRadius: 1.5,
                px: isMobile ? 1.5 : 2,
                py: 1,
                minWidth: "auto",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": { backgroundColor: viewType === view.type ? "#4ade80" : "#262626" },
                "& .MuiButton-startIcon": { marginRight: isMobile ? 0 : 1 },
              }}
            >
              {!isMobile && view.label}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outlined"
            className={cn(
              "w-[300px] justify-start text-left font-normal mb-4",
              !currentDate && "text-muted-foreground",
            )}
          >
            <EventIcon className="mr-2 h-4 w-4" />
            {currentDate ? format(currentDate, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={(date) => date && setCurrentDate(date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Conteúdo baseado na visualização */}
      {viewType === "day" && renderDayView()}

      {/* Dialog para novo agendamento */}
      <Dialog
        open={newAppointmentDialog}
        onClose={() => setNewAppointmentDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #333333",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "#4ade80", fontWeight: 600 }}>Novo Agendamento</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            <Box>
              <Label className="block text-sm font-medium mb-2">Aluno *</Label>
              <Select
                value={newAppointment.studentId}
                onValueChange={(value) => setNewAppointment({ ...newAppointment, studentId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aluno" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={student.avatar} sx={{ width: 24, height: 24 }} />
                        {student.name}
                      </Box>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Input
                label="Data *"
                type="date"
                value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
              <Box>
                <Label className="block text-sm font-medium mb-2">Horário *</Label>
                <Select
                  value={newAppointment.time}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Box>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Box>
                <Label className="block text-sm font-medium mb-2">Tipo de Treino *</Label>
                <Select
                  value={newAppointment.type}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {workoutTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          {type.icon}
                          {type.label}
                        </Box>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Box>
              <Input
                label="Duração (min) *"
                type="number"
                value={newAppointment.duration}
                onChange={(e) => setNewAppointment({ ...newAppointment, duration: Number.parseInt(e.target.value) })}
              />
            </Box>

            <Input
              label="Valor (R$)"
              type="number"
              value={newAppointment.price}
              onChange={(e) => setNewAppointment({ ...newAppointment, price: Number.parseFloat(e.target.value) })}
            />

            <Box>
              <Label className="block text-sm font-medium mb-2">Observações</Label>
              <Textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Observações sobre o treino..."
                className="min-h-[80px]"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setNewAppointmentDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleCreateAppointment}
            variant="contained"
            disabled={!newAppointment.studentId || !newAppointment.date || !newAppointment.time}
            sx={{
              backgroundColor: "#4ade80",
              color: "#000",
              "&:hover": { backgroundColor: "#22c55e" },
            }}
          >
            Criar Agendamento
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para detalhes do agendamento */}
      <Dialog
        open={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1a1a1a",
            border: "1px solid #333333",
            borderRadius: 3,
          },
        }}
      >
        {selectedAppointment && (
          <>
            <DialogTitle sx={{ color: "#4ade80", fontWeight: 600 }}>Detalhes do Agendamento</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={selectedAppointment.avatar}
                    sx={{ width: 64, height: 64, backgroundColor: selectedAppointment.color }}
                  >
                    {selectedAppointment.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 600 }}>
                      {selectedAppointment.student}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                      {selectedAppointment.type}
                    </Typography>
                    <Chip
                      label={getStatusText(selectedAppointment.status)}
                      size="small"
                      sx={{
                        backgroundColor: `${getStatusColor(selectedAppointment.status)}20`,
                        color: getStatusColor(selectedAppointment.status),
                        mt: 1,
                      }}
                    />
                  </Box>
                </Box>

                <Divider sx={{ borderColor: "#333333" }} />

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                      Data
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>
                      {format(new Date(selectedAppointment.date), "dd/MM/yyyy")}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                      Horário
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>
                      {selectedAppointment.time}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                      Duração
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#ffffff" }}>
                      {selectedAppointment.duration} minutos
                    </Typography>
                  </Box>
                  {selectedAppointment.price && (
                    <Box>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        Valor
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#4ade80" }}>
                        R$ {selectedAppointment.price}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {selectedAppointment.notes && (
                  <Box>
                    <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                      Observações
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#d1d5db", mt: 1 }}>
                      {selectedAppointment.notes}
                    </Typography>
                  </Box>
                )}
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button
                onClick={() => handleDeleteAppointment(selectedAppointment.id)}
                sx={{ color: "#ef4444" }}
                startIcon={<DeleteIcon />}
              >
                Excluir
              </Button>
              <Button onClick={() => setSelectedAppointment(null)}>Fechar</Button>
              {selectedAppointment.phone && (
                <Button
                  onClick={() => {
                    const message = `Olá ${selectedAppointment.student}! Lembrete do seu treino de ${selectedAppointment.type} hoje às ${selectedAppointment.time}. Nos vemos em breve! 💪`
                    window.open(
                      `https://wa.me/${selectedAppointment.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
                      "_blank",
                    )
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#25d366",
                    color: "#fff",
                    "&:hover": { backgroundColor: "#128c7e" },
                  }}
                  startIcon={<WhatsAppIcon />}
                >
                  WhatsApp
                </Button>
              )}
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* FAB para adicionar agendamento */}
      <Fab
        onClick={() => setNewAppointmentDialog(true)}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          backgroundColor: "#4ade80",
          color: "#000000",
          "&:hover": { backgroundColor: "#22c55e", boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)" },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}
import { Divider } from "@mui/material"
