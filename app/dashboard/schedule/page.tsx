"use client"

import type React from "react"

import { useState, useMemo } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Avatar from "@mui/material/Avatar"
import Fab from "@mui/material/Fab"
import Grid from "@mui/material/Grid"
import Tooltip from "@mui/material/Tooltip"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import { useMobile } from "@/hooks/use-mobile"

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
import ShareIcon from "@mui/icons-material/Share"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

type ViewType = "day" | "week" | "month"

interface Appointment {
  id: number
  date: string // YYYY-MM-DD format
  time: string
  duration: number
  student: string
  type: string
  status: "confirmed" | "pending" | "cancelled"
  avatar: string
  color: string
  icon: React.ReactNode
  phone?: string
}

// Dados reais de agendamentos desde 1 de maio de 2025
const allAppointments: Appointment[] = [
  // Maio 2025
  {
    id: 1,
    date: "2025-05-01",
    time: "08:00",
    duration: 60,
    student: "Leandro Silva",
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
    type: "Avaliação",
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#f59e0b",
    icon: <PersonIcon />,
    phone: "+5511111000999",
  },
]

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>("day")
  const [speedDialOpen, setSpeedDialOpen] = useState(false)
  const isMobile = useMobile()

  // Função para formatar data no formato YYYY-MM-DD
  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  // Função para obter agendamentos de uma data específica
  const getAppointmentsForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return allAppointments.filter((apt) => apt.date === dateKey)
  }

  // Função para obter agendamentos de uma semana
  const getAppointmentsForWeek = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())

    const weekAppointments = []
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek)
      currentDay.setDate(startOfWeek.getDate() + i)
      const dayAppointments = getAppointmentsForDate(currentDay)
      weekAppointments.push({
        date: new Date(currentDay),
        appointments: dayAppointments,
      })
    }
    return weekAppointments
  }

  // Função para obter agendamentos de um mês
  const getAppointmentsForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    return allAppointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate.getFullYear() === year && aptDate.getMonth() === month
    })
  }

  // Agendamentos do dia atual
  const todayAppointments = useMemo(() => {
    return getAppointmentsForDate(currentDate)
  }, [currentDate])

  const formatDate = (date: Date) => {
    switch (viewType) {
      case "day":
        return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`
      case "week":
        const startOfWeek = new Date(date)
        startOfWeek.setDate(date.getDate() - date.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`
      case "month":
        return `${months[date.getMonth()]} ${date.getFullYear()}`
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

  const handleGoogleCalendarSync = () => {
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Agendamentos%20do%20Dia&dates=${currentDate.toISOString().split("T")[0].replace(/-/g, "")}T080000Z/${currentDate.toISOString().split("T")[0].replace(/-/g, "")}T180000Z&details=Agendamentos%20do%20personal%20trainer&location=Academia`
    window.open(googleCalendarUrl, "_blank")
  }

  const handleWhatsAppShare = (appointment?: Appointment) => {
    let message = ""

    if (appointment) {
      message =
        `🏋️ *Lembrete de Treino*\n\n` +
        `👤 Aluno: ${appointment.student}\n` +
        `📅 Data: ${formatDate(currentDate)}\n` +
        `⏰ Horário: ${appointment.time}\n` +
        `⏱️ Duração: ${appointment.duration} minutos\n` +
        `🎯 Tipo: ${appointment.type}\n` +
        `✅ Status: ${getStatusText(appointment.status)}\n\n` +
        `Nos vemos em breve! 💪`

      if (appointment.phone) {
        const whatsappUrl = `https://wa.me/${appointment.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
      }
    } else {
      const confirmedAppointments = todayAppointments.filter((apt) => apt.status === "confirmed")
      message = `📅 *Agenda do Dia - ${formatDate(currentDate)}*\n\n`

      if (confirmedAppointments.length > 0) {
        confirmedAppointments.forEach((apt) => {
          message += `⏰ ${apt.time} - ${apt.student} (${apt.type})\n`
        })
        message += `\n💪 Total: ${confirmedAppointments.length} agendamentos confirmados`
      } else {
        message += `📝 Nenhum agendamento confirmado para hoje`
      }

      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    }
  }

  const renderDayView = () => (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ color: "#ffffff" }}>
          Agendamentos do Dia ({todayAppointments.length})
        </Typography>

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Sincronizar com Google Agenda">
              <IconButton
                onClick={handleGoogleCalendarSync}
                sx={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333333",
                  color: "#4285f4",
                  "&:hover": {
                    backgroundColor: "#262626",
                    boxShadow: "0 0 12px rgba(66, 133, 244, 0.3)",
                  },
                }}
              >
                <EventIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Compartilhar agenda via WhatsApp">
              <IconButton
                onClick={() => handleWhatsAppShare()}
                sx={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333333",
                  color: "#25d366",
                  "&:hover": {
                    backgroundColor: "#262626",
                    boxShadow: "0 0 12px rgba(37, 211, 102, 0.3)",
                  },
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      {todayAppointments.length === 0 ? (
        <Card
          sx={{
            backgroundColor: "#1a1a1a",
            border: "1px solid #333333",
            borderRadius: 3,
            textAlign: "center",
            py: 4,
          }}
        >
          <Typography variant="h6" sx={{ color: "#9ca3af", mb: 1 }}>
            Nenhum agendamento para hoje
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Que tal aproveitar para descansar ou planejar os próximos treinos?
          </Typography>
        </Card>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {todayAppointments
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((appointment) => (
              <Card
                key={appointment.id}
                sx={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #333333",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#262626",
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 25px rgba(74, 222, 128, 0.1)`,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        sx={{
                          backgroundColor: appointment.color,
                          width: 48,
                          height: 48,
                        }}
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

                      <Tooltip title="Enviar lembrete via WhatsApp">
                        <IconButton
                          onClick={() => handleWhatsAppShare(appointment)}
                          size="small"
                          sx={{
                            color: "#25d366",
                            "&:hover": {
                              backgroundColor: "#25d36620",
                            },
                          }}
                        >
                          <WhatsAppIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
        </Box>
      )}
    </Box>
  )

  const renderWeekView = () => {
    const weekAppointments = getAppointmentsForWeek(currentDate)

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#ffffff" }}>
          Visão Semanal
        </Typography>
        <Grid container spacing={1}>
          {weekAppointments.map((dayData, index) => {
            const isToday = dayData.date.toDateString() === new Date().toDateString()
            const dayAppointments = dayData.appointments

            return (
              <Grid item xs key={index}>
                <Card
                  sx={{
                    backgroundColor: isToday ? "#1a4d2e" : "#1a1a1a",
                    border: isToday ? "1px solid #4ade80" : "1px solid #333333",
                    borderRadius: 2,
                    minHeight: 120,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: isToday ? "#1a4d2e" : "#262626",
                    },
                  }}
                  onClick={() => setCurrentDate(new Date(dayData.date))}
                >
                  <CardContent sx={{ p: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isToday ? "#4ade80" : "#d1d5db",
                        fontWeight: 600,
                        textAlign: "center",
                        display: "block",
                      }}
                    >
                      {weekDays[dayData.date.getDay()]}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#ffffff",
                        textAlign: "center",
                        mt: 0.5,
                      }}
                    >
                      {dayData.date.getDate()}
                    </Typography>

                    {dayAppointments.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {dayAppointments.slice(0, 2).map((apt, aptIndex) => (
                          <Box
                            key={apt.id}
                            sx={{
                              backgroundColor: `${apt.color}20`,
                              border: `1px solid ${apt.color}40`,
                              borderRadius: 1,
                              p: 0.5,
                              mb: 0.5,
                            }}
                          >
                            <Typography variant="caption" sx={{ color: apt.color, fontSize: 10 }}>
                              {apt.time} - {apt.student.split(" ")[0]}
                            </Typography>
                          </Box>
                        ))}
                        {dayAppointments.length > 2 && (
                          <Typography
                            variant="caption"
                            sx={{ color: "#9ca3af", fontSize: 10, textAlign: "center", display: "block" }}
                          >
                            +{dayAppointments.length - 2} mais
                          </Typography>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    )
  }

  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const monthAppointments = getAppointmentsForMonth(currentDate)

    const days = []

    // Dias vazios do início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day)
      const dayAppointments = monthAppointments.filter((apt) => {
        const aptDate = new Date(apt.date)
        return aptDate.getDate() === day
      })

      days.push({
        day,
        date: dayDate,
        appointments: dayAppointments,
        isToday: dayDate.toDateString() === new Date().toDateString(),
      })
    }

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#ffffff" }}>
          Visão Mensal
        </Typography>

        {/* Cabeçalho dos dias da semana */}
        <Grid container spacing={1} sx={{ mb: 1 }}>
          {weekDays.map((day) => (
            <Grid item xs key={day}>
              <Typography
                variant="caption"
                sx={{
                  color: "#9ca3af",
                  fontWeight: 600,
                  textAlign: "center",
                  display: "block",
                  p: 1,
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Grade do calendário */}
        <Grid container spacing={1}>
          {days.map((dayData, index) => (
            <Grid item xs key={index}>
              <Card
                sx={{
                  backgroundColor: dayData?.isToday ? "#1a4d2e" : "#1a1a1a",
                  border: dayData?.isToday ? "1px solid #4ade80" : "1px solid #333333",
                  borderRadius: 1,
                  minHeight: 80,
                  cursor: dayData ? "pointer" : "default",
                  transition: "all 0.2s ease",
                  "&:hover": dayData
                    ? {
                        backgroundColor: dayData.isToday ? "#1a4d2e" : "#262626",
                      }
                    : {},
                }}
                onClick={() => dayData && setCurrentDate(new Date(dayData.date))}
              >
                <CardContent sx={{ p: 1 }}>
                  {dayData && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          color: dayData.isToday ? "#4ade80" : "#ffffff",
                          fontWeight: 600,
                        }}
                      >
                        {dayData.day}
                      </Typography>
                      {dayData.appointments.length > 0 && (
                        <Box sx={{ mt: 0.5 }}>
                          {dayData.appointments.slice(0, 3).map((apt, aptIndex) => (
                            <Box
                              key={apt.id}
                              sx={{
                                width: 6,
                                height: 6,
                                backgroundColor: apt.color,
                                borderRadius: "50%",
                                mb: 0.5,
                              }}
                            />
                          ))}
                          {dayData.appointments.length > 3 && (
                            <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: 8 }}>
                              +{dayData.appointments.length - 3}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  const speedDialActions = [
    {
      icon: <AddIcon />,
      name: "Novo Agendamento",
      onClick: () => console.log("Novo agendamento"),
    },
    {
      icon: <EventIcon sx={{ color: "#4285f4" }} />,
      name: "Sincronizar Google Agenda",
      onClick: handleGoogleCalendarSync,
    },
    {
      icon: <WhatsAppIcon sx={{ color: "#25d366" }} />,
      name: "Compartilhar WhatsApp",
      onClick: () => handleWhatsAppShare(),
    },
  ]

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto", p: isMobile ? 2 : 3 }}>
      {/* Header com navegação */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            onClick={() => navigateDate("prev")}
            sx={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #333333",
              color: "#4ade80",
              "&:hover": {
                backgroundColor: "#262626",
                boxShadow: "0 0 12px rgba(74, 222, 128, 0.3)",
              },
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
              "&:hover": {
                backgroundColor: "#262626",
                boxShadow: "0 0 12px rgba(74, 222, 128, 0.3)",
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Seletor de visualização */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#1a1a1a",
            border: "1px solid #333333",
            borderRadius: 2,
            p: 0.5,
          }}
        >
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
                "&:hover": {
                  backgroundColor: viewType === view.type ? "#4ade80" : "#262626",
                },
                "& .MuiButton-startIcon": {
                  marginRight: isMobile ? 0 : 1,
                },
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
            variant={"outline"}
            className={cn("w-[300px] justify-start text-left font-normal", !currentDate && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentDate ? format(currentDate, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={currentDate}
            onSelect={setCurrentDate}
            disabled={(date) => date > new Date() || date < new Date("2025-01-01")}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Conteúdo baseado na visualização */}
      {viewType === "day" && renderDayView()}
      {viewType === "week" && renderWeekView()}
      {viewType === "month" && renderMonthView()}

      {/* Speed Dial para mobile */}
      {isMobile ? (
        <SpeedDial
          ariaLabel="Ações da agenda"
          sx={{
            position: "fixed",
            bottom: 100,
            right: 16,
            "& .MuiFab-primary": {
              backgroundColor: "#4ade80",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#22c55e",
                boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)",
              },
            },
          }}
          icon={<ShareIcon />}
          open={speedDialOpen}
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
        >
          {speedDialActions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => {
                action.onClick()
                setSpeedDialOpen(false)
              }}
              sx={{
                "& .MuiFab-primary": {
                  backgroundColor: "#1a1a1a",
                  color: "#ffffff",
                  border: "1px solid #333333",
                  "&:hover": {
                    backgroundColor: "#262626",
                  },
                },
              }}
            />
          ))}
        </SpeedDial>
      ) : (
        /* FAB simples para desktop */
        <Fab
          onClick={() => console.log("Novo agendamento")}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            backgroundColor: "#4ade80",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#22c55e",
              boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)",
            },
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Box>
  )
}

import { CalendarIcon } from "lucide-react"
