"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"

// Icons
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import PeopleIcon from "@mui/icons-material/People"
import EventIcon from "@mui/icons-material/Event"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import NotificationsIcon from "@mui/icons-material/Notifications"
import RefreshIcon from "@mui/icons-material/Refresh"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import WarningIcon from "@mui/icons-material/Warning"

// Components
import { ActivityChart } from "@/components/md3/activity-chart"

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; session: any }>({ open: false, session: null })

  // Dados mockados mais realistas
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalStudents: 24,
      activeStudents: 18,
      todayWorkouts: 8,
      completedWorkouts: 6,
      scheduledSessions: 12,
      pendingSessions: 3,
      monthlyRevenue: 8750,
      revenueGrowth: 12.5,
    },
    upcomingClasses: [
      {
        id: 1,
        time: "08:00",
        student: "Leandro Silva",
        type: "Musculação",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        status: "confirmed",
        duration: 60,
        phone: "+5511999999999",
      },
      {
        id: 2,
        time: "09:30",
        student: "Mario Lenon",
        type: "Natação",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mario&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        status: "confirmed",
        duration: 45,
        phone: "+5511888888888",
      },
      {
        id: 3,
        time: "11:00",
        student: "Otávio Martins",
        type: "Fisioterapia",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Otavio&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        status: "pending",
        duration: 90,
        phone: "+5511777777777",
      },
      {
        id: 4,
        time: "14:30",
        student: "Ana Carolina",
        type: "Personal Training",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        status: "pending",
        duration: 60,
        phone: "+5511666666666",
      },
      {
        id: 5,
        time: "16:00",
        student: "Carlos Santos",
        type: "Avaliação",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        status: "pending",
        duration: 45,
        phone: "+5511555555555",
      },
    ],
    recentStudents: [
      {
        id: 1,
        name: "Leandro Silva",
        status: "Ativo",
        progress: 85,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Leandro&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        lastWorkout: "Hoje",
        plan: "Premium",
      },
      {
        id: 2,
        name: "Mario Lenon",
        status: "Ativo",
        progress: 72,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Mario&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        lastWorkout: "Ontem",
        plan: "Standard",
      },
      {
        id: 3,
        name: "Otávio Martins",
        status: "Pendente",
        progress: 45,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Otavio&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        lastWorkout: "3 dias atrás",
        plan: "Basic",
      },
      {
        id: 4,
        name: "Ana Carolina",
        status: "Ativo",
        progress: 90,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Ana&backgroundColor=b6e3f4,c0aede,d1d4f9`,
        lastWorkout: "Hoje",
        plan: "VIP",
      },
    ],
    weeklyActivity: [
      { name: "Seg", workouts: 8, revenue: 1200 },
      { name: "Ter", workouts: 12, revenue: 1800 },
      { name: "Qua", workouts: 10, revenue: 1500 },
      { name: "Qui", workouts: 15, revenue: 2100 },
      { name: "Sex", workouts: 9, revenue: 1350 },
      { name: "Sáb", workouts: 6, revenue: 900 },
      { name: "Dom", workouts: 4, revenue: 600 },
    ],
    notifications: [
      { id: 1, message: "3 agendamentos pendentes de confirmação", type: "warning", time: "5 min" },
      { id: 2, message: "Leandro Silva completou treino de hoje", type: "success", time: "15 min" },
      { id: 3, message: "Pagamento de Ana Carolina processado", type: "info", time: "1h" },
    ],
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    // Simular atualização de dados
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const navigateToStudent = (id: number) => {
    router.push(`/dashboard/students/${id}`)
  }

  const handleConfirmSession = (sessionId: number) => {
    setDashboardData((prev) => ({
      ...prev,
      upcomingClasses: prev.upcomingClasses.map((session) =>
        session.id === sessionId ? { ...session, status: "confirmed" } : session,
      ),
    }))
    setConfirmDialog({ open: false, session: null })
  }

  const handleCancelSession = (sessionId: number) => {
    setDashboardData((prev) => ({
      ...prev,
      upcomingClasses: prev.upcomingClasses.map((session) =>
        session.id === sessionId ? { ...session, status: "cancelled" } : session,
      ),
    }))
  }

  const handleSendWhatsApp = (session: any) => {
    if (!session || !session.phone) return
    const message = `Olá ${session.student}! Confirmando seu treino de ${session.type} hoje às ${session.time}. Duração: ${session.duration}min. Nos vemos em breve! 💪`
    const whatsappUrl = `https://wa.me/${session.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "success"
      case "pending":
        return "warning"
      case "cancelled":
        return "error"
      default:
        return "default"
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "VIP":
        return "#9c27b0"
      case "Premium":
        return "#ff9800"
      case "Standard":
        return "#2196f3"
      case "Basic":
        return "#4caf50"
      default:
        return "#757575"
    }
  }

  const pendingClasses = dashboardData.upcomingClasses.filter((session) => session.status === "pending")

  // Funções de navegação para os cards de estatísticas
  const navigateToStudents = () => {
    router.push("/dashboard/students")
  }

  const navigateToWorkouts = () => {
    router.push("/dashboard/workouts")
  }

  const navigateToSchedule = () => {
    router.push("/dashboard/schedule")
  }

  const navigateToReports = () => {
    router.push("/dashboard/reports")
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "var(--primary)" }}>
          Carregando dashboard...
        </Typography>
        <LinearProgress sx={{ width: "100%", maxWidth: 400, borderRadius: 2, height: 6 }} />
      </Box>
    )
  }

  // Definição dos cards de estatísticas
  const statCards = [
    {
      title: "Total de Alunos",
      value: dashboardData.stats.totalStudents,
      subtitle: `${dashboardData.stats.activeStudents} ativos`,
      icon: <PeopleIcon />,
      color: "#2196f3",
      trend: "+2 este mês",
      onClick: navigateToStudents,
    },
    {
      title: "Treinos Hoje",
      value: `${dashboardData.stats.completedWorkouts}/${dashboardData.stats.todayWorkouts}`,
      subtitle: "Concluídos/Total",
      icon: <FitnessCenterIcon />,
      color: "#4caf50",
      trend: "+15% vs ontem",
      onClick: navigateToWorkouts,
    },
    {
      title: "Agendamentos",
      value: dashboardData.stats.scheduledSessions,
      subtitle: `${dashboardData.stats.pendingSessions} pendentes`,
      icon: <EventIcon />,
      color: "#ff9800",
      trend: "3 para hoje",
      onClick: navigateToSchedule,
    },
    {
      title: "Receita Mensal",
      value: `R$ ${dashboardData.stats.monthlyRevenue.toLocaleString()}`,
      subtitle: `+${dashboardData.stats.revenueGrowth}% vs mês anterior`,
      icon: <AttachMoneyIcon />,
      color: "#9c27b0",
      trend: "Meta: R$ 10.000",
      onClick: navigateToReports,
    },
  ]

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Container principal centralizado */}
      <Box sx={{ width: "100%", maxWidth: "1400px", px: { xs: 2, sm: 3 } }}>
        {/* Header com ações */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: "var(--primary)" }}>
              Dashboard
            </Typography>
            <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mt: 0.5 }}>
              Visão geral das atividades de hoje
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                backgroundColor: "var(--surface-container)",
                "&:hover": { backgroundColor: "var(--surface-container-high)" },
              }}
            >
              <RefreshIcon sx={{ color: "var(--primary)" }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "var(--surface-container)",
              }}
            >
              <NotificationsIcon sx={{ color: "var(--primary)" }} />
            </IconButton>
          </Box>
        </Box>

        {/* Alerta de aulas pendentes */}
        {pendingClasses.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card
              sx={{
                mb: 3,
                backgroundColor: "var(--warning-container)",
                border: "1px solid var(--warning)",
                borderRadius: 3,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                  <WarningIcon sx={{ color: "var(--warning)" }} />
                  <Typography variant="h6" sx={{ color: "var(--on-warning-container)", fontWeight: 600 }}>
                    {pendingClasses.length} aula{pendingClasses.length > 1 ? "s" : ""} pendente
                    {pendingClasses.length > 1 ? "s" : ""} de confirmação
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "var(--on-warning-container)", mb: 2 }}>
                  Confirme as aulas abaixo para notificar os alunos:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {pendingClasses.map((session) => (
                    <Box
                      key={session.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 2,
                        backgroundColor: "var(--surface-container)",
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Avatar src={session.avatar} sx={{ width: 40, height: 40 }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: "var(--on-surface)" }}>
                            {session.student}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                            {session.time} - {session.type} ({session.duration}min)
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton size="small" onClick={() => handleSendWhatsApp(session)} sx={{ color: "#25d366" }}>
                          <WhatsAppIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => setConfirmDialog({ open: true, session })}
                          sx={{ color: "var(--success)" }}
                        >
                          <CheckIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleCancelSession(session.id)}
                          sx={{ color: "var(--error)" }}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Cards de estatísticas principais */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  elevation={2}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: `0 8px 25px ${stat.color}20`,
                    },
                    height: "100%",
                    background: `linear-gradient(135deg, ${stat.color}10 0%, ${stat.color}05 100%)`,
                    border: `1px solid ${stat.color}20`,
                    backgroundColor: "var(--surface-container)",
                  }}
                  onClick={stat.onClick}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Avatar sx={{ bgcolor: stat.color, width: 48, height: 48 }}>{stat.icon}</Avatar>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: "var(--on-surface)" }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 1 }}>
                      {stat.subtitle}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TrendingUpIcon sx={{ fontSize: 16, color: "#4caf50", mr: 0.5 }} />
                      <Typography variant="caption" sx={{ color: "#4caf50" }}>
                        {stat.trend}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Conteúdo principal */}
        <Grid container spacing={3}>
          {/* Próximas aulas */}
          <Grid item xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Paper elevation={2} sx={{ p: 3, height: "100%", backgroundColor: "var(--surface-container)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "var(--on-surface)" }}>
                    Próximas Aulas
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={navigateToSchedule}
                    sx={{ borderColor: "var(--primary)", color: "var(--primary)" }}
                  >
                    Ver Agenda
                  </Button>
                </Box>
                <List>
                  {dashboardData.upcomingClasses.map((session, index) => (
                    <Box key={session.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          borderRadius: 1,
                          "&:hover": {
                            bgcolor: "var(--surface-container-high)",
                            transform: "translateX(4px)",
                          },
                        }}
                        onClick={() => navigateToStudent(session.id)}
                      >
                        <ListItemAvatar>
                          <Avatar src={session.avatar} sx={{ width: 48, height: 48 }} />
                        </ListItemAvatar>
                        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, ml: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "var(--on-surface)" }}>
                              {session.student}
                            </Typography>
                            <Chip
                              label={session.time}
                              size="small"
                              icon={<AccessTimeIcon fontSize="small" />}
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" sx={{ color: "var(--on-surface-variant)" }}>
                              {session.type} • {session.duration}min
                            </Typography>
                            <Chip
                              label={
                                session.status === "confirmed"
                                  ? "Confirmado"
                                  : session.status === "pending"
                                    ? "Pendente"
                                    : "Cancelado"
                              }
                              size="small"
                              color={getStatusColor(session.status)}
                              variant="filled"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          </Box>
                        </Box>
                      </ListItem>
                      {index < dashboardData.upcomingClasses.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Alunos recentes */}
          <Grid item xs={12} lg={6}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Paper elevation={2} sx={{ p: 3, height: "100%", backgroundColor: "var(--surface-container)" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "var(--on-surface)" }}>
                    Alunos Ativos
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<PersonAddIcon />}
                    onClick={() => router.push("/dashboard/students/new")}
                    sx={{
                      backgroundColor: "var(--primary)",
                      color: "var(--on-primary)",
                      "&:hover": { backgroundColor: "var(--primary)", opacity: 0.9 },
                    }}
                  >
                    Novo Aluno
                  </Button>
                </Box>
                <List>
                  {dashboardData.recentStudents.map((student, index) => (
                    <Box key={student.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          cursor: "pointer",
                          transition: "all 0.2s",
                          borderRadius: 1,
                          "&:hover": {
                            bgcolor: "var(--surface-container-high)",
                            transform: "translateX(4px)",
                          },
                        }}
                        onClick={() => navigateToStudent(student.id)}
                      >
                        <ListItemAvatar>
                          <Avatar src={student.avatar} sx={{ width: 48, height: 48 }} />
                        </ListItemAvatar>
                        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, ml: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "var(--on-surface)" }}>
                              {student.name}
                            </Typography>
                            <Box sx={{ display: "flex", gap: 0.5 }}>
                              <Chip
                                label={student.plan}
                                size="small"
                                sx={{
                                  backgroundColor: `${getPlanColor(student.plan)}20`,
                                  color: getPlanColor(student.plan),
                                  fontSize: "0.7rem",
                                }}
                              />
                              <Chip
                                label={student.status}
                                size="small"
                                icon={<CheckCircleIcon fontSize="small" />}
                                color={student.status === "Ativo" ? "success" : "warning"}
                                variant="filled"
                                sx={{ fontSize: "0.7rem" }}
                              />
                            </Box>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                            <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                              Último treino: {student.lastWorkout}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                              {student.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={student.progress}
                            color={student.progress > 70 ? "success" : student.progress > 40 ? "warning" : "error"}
                            sx={{ borderRadius: 5, height: 6 }}
                          />
                        </Box>
                      </ListItem>
                      {index < dashboardData.recentStudents.length - 1 && <Divider variant="inset" component="li" />}
                    </Box>
                  ))}
                </List>
              </Paper>
            </motion.div>
          </Grid>

          {/* Gráfico de atividade semanal */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  backgroundColor: "var(--surface-container)",
                  border: "1px solid var(--outline-variant)",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: "var(--on-surface)" }}>
                    Atividade Semanal
                  </Typography>
                  <IconButton size="small">
                    <MoreVertIcon sx={{ color: "var(--on-surface-variant)" }} />
                  </IconButton>
                </Box>
                <ActivityChart
                  data={dashboardData.weeklyActivity}
                  type="bar"
                  dataKey="workouts"
                  title="Treinos por Dia"
                  color="var(--primary)"
                  height={300}
                />
              </Paper>
            </motion.div>
          </Grid>

          {/* Notificações */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Paper elevation={2} sx={{ p: 3, backgroundColor: "var(--surface-container)" }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2, color: "var(--on-surface)" }}>
                  Notificações Recentes
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {dashboardData.notifications.map((notification) => (
                    <Box
                      key={notification.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 1,
                        backgroundColor: `${
                          notification.type === "warning"
                            ? "var(--warning-container)"
                            : notification.type === "success"
                              ? "var(--success-container)"
                              : "var(--info-container)"
                        }`,
                        border: `1px solid ${
                          notification.type === "warning"
                            ? "var(--warning)"
                            : notification.type === "success"
                              ? "var(--success)"
                              : "var(--info)"
                        }`,
                      }}
                    >
                      <NotificationsIcon
                        sx={{
                          color:
                            notification.type === "warning"
                              ? "var(--warning)"
                              : notification.type === "success"
                                ? "var(--success)"
                                : "var(--info)",
                          mr: 2,
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" sx={{ color: "var(--on-surface)" }}>
                          {notification.message}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                        {notification.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      {/* Dialog de confirmação */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, session: null })}
        PaperProps={{
          sx: {
            backgroundColor: "var(--surface-container)",
            border: "1px solid var(--outline-variant)",
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "var(--on-surface)" }}>Confirmar Aula</DialogTitle>
        <DialogContent>
          {confirmDialog.session && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" sx={{ color: "var(--on-surface)" }}>
                Confirmar aula de <strong>{confirmDialog.session.student}</strong>?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2,
                  backgroundColor: "var(--surface-container-high)",
                  borderRadius: 2,
                }}
              >
                <Avatar src={confirmDialog.session.avatar} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "var(--on-surface)" }}>
                    {confirmDialog.session.type}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "var(--on-surface-variant)" }}>
                    {confirmDialog.session.time} - {confirmDialog.session.duration}min
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: "var(--on-surface-variant)" }}>
                O aluno será notificado via WhatsApp automaticamente.
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, session: null })}>Cancelar</Button>
          <Button
            onClick={() => confirmDialog.session && handleConfirmSession(confirmDialog.session.id)}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary)",
              color: "var(--on-primary)",
            }}
          >
            Confirmar Aula
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
