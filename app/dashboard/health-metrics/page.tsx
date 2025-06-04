"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import LinearProgress from "@mui/material/LinearProgress"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import { motion } from "framer-motion"
import { getDay, subDays, eachDayOfInterval } from "date-fns"

// Icons
import FavoriteIcon from "@mui/icons-material/Favorite"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import BedtimeIcon from "@mui/icons-material/Bedtime"
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import DownloadIcon from "@mui/icons-material/Download"
import PersonIcon from "@mui/icons-material/Person"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

// Dados mockados de alunos com métricas específicas
const mockStudents = [
  {
    id: 1,
    name: "Leandro Silva",
    device: "Apple Watch",
    metrics: {
      heartRate: "68 bpm",
      steps: "8,742",
      sleep: "7h 15min",
      calories: "2,456 kcal",
      trends: { hr: -2, steps: 5, sleep: 3, calories: 8 },
    },
    activityPattern: () => (Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 1 : 0), // muito ativo
  },
  {
    id: 2,
    name: "Mario Lenon",
    device: "Garmin",
    metrics: {
      heartRate: "72 bpm",
      steps: "6,234",
      sleep: "6h 45min",
      calories: "2,180 kcal",
      trends: { hr: 1, steps: -8, sleep: -5, calories: 3 },
    },
    activityPattern: () => (Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0), // moderadamente ativo
  },
  {
    id: 3,
    name: "Otávio Martins",
    device: "Samsung Galaxy Watch",
    metrics: {
      heartRate: "75 bpm",
      steps: "4,567",
      sleep: "8h 20min",
      calories: "1,890 kcal",
      trends: { hr: 0, steps: 12, sleep: 8, calories: -2 },
    },
    activityPattern: () => (Math.random() > 0.5 ? Math.floor(Math.random() * 2) + 1 : 0), // menos ativo
  },
  {
    id: 4,
    name: "Ana Carolina",
    device: "Fitbit",
    metrics: {
      heartRate: "65 bpm",
      steps: "9,876",
      sleep: "7h 30min",
      calories: "2,340 kcal",
      trends: { hr: -3, steps: 15, sleep: 2, calories: 12 },
    },
    activityPattern: () => (Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0), // muito ativa
  },
  {
    id: 5,
    name: "Roberto Gomes",
    device: "Google Fit",
    metrics: {
      heartRate: "78 bpm",
      steps: "5,432",
      sleep: "6h 30min",
      calories: "2,100 kcal",
      trends: { hr: 4, steps: -12, sleep: -8, calories: -5 },
    },
    activityPattern: () => (Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0), // pouco ativo
  },
  {
    id: 6,
    name: "Carla Mendes",
    device: "Strava + Apple Watch",
    metrics: {
      heartRate: "62 bpm",
      steps: "11,234",
      sleep: "7h 45min",
      calories: "2,680 kcal",
      trends: { hr: -5, steps: 18, sleep: 5, calories: 20 },
    },
    activityPattern: () => (Math.random() > 0.1 ? Math.floor(Math.random() * 4) + 1 : 0), // extremamente ativa
  },
]

// Função para gerar dados de atividade do habituário
const generateActivityData = (studentId: string) => {
  const student = mockStudents.find((s) => s.id.toString() === studentId)
  if (!student) return []

  const today = new Date()
  const startDate = subDays(today, 364) // 1 ano de dados

  const allDays = eachDayOfInterval({ start: startDate, end: today })

  return allDays.map((date) => {
    const value = student.activityPattern()
    return {
      date,
      value,
      exercises: value > 0 ? generateExerciseData(value) : [],
      duration: value > 0 ? value * 30 + Math.floor(Math.random() * 30) : 0,
    }
  })
}

const generateExerciseData = (value: number) => {
  const exercises = ["Musculação", "Cardio", "Funcional", "Yoga", "Pilates", "Natação"]
  const count = Math.min(value, 3)
  return exercises.slice(0, count)
}

const getActivityColor = (value: number) => {
  switch (value) {
    case 0:
      return "bg-gray-800"
    case 1:
      return "bg-green-900"
    case 2:
      return "bg-green-700"
    case 3:
      return "bg-green-500"
    case 4:
      return "bg-green-400"
    default:
      return "bg-gray-800"
  }
}

const mockChartData = [
  { day: "Seg", heartRate: 68, steps: 8245, sleep: 7.2, calories: 2340 },
  { day: "Ter", heartRate: 72, steps: 9120, sleep: 6.8, calories: 2456 },
  { day: "Qua", heartRate: 70, steps: 12350, sleep: 7.5, calories: 2680 },
  { day: "Qui", heartRate: 69, steps: 7890, sleep: 7.0, calories: 2234 },
  { day: "Sex", heartRate: 74, steps: 10230, sleep: 6.5, calories: 2567 },
  { day: "Sáb", heartRate: 71, steps: 6540, sleep: 8.2, calories: 2123 },
  { day: "Dom", heartRate: 68, steps: 5820, sleep: 8.5, calories: 1987 },
]

export default function HealthMetricsPage() {
  const [selectedStudent, setSelectedStudent] = useState("1")
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [activityData, setActivityData] = useState<any[]>([])
  const [tooltip, setTooltip] = useState<any>({ visible: false })

  // Gerar dados de atividade quando o aluno muda
  useEffect(() => {
    const data = generateActivityData(selectedStudent)
    setActivityData(data)
  }, [selectedStudent])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const currentStudent = mockStudents.find((s) => s.id.toString() === selectedStudent)

  // Organizar dados do heatmap por semanas
  const organizeDataByWeeks = () => {
    const weeks: Array<Array<any>> = []
    let currentWeek: Array<any> = new Array(7).fill(null)

    activityData.forEach((day, index) => {
      const dayOfWeek = getDay(day.date)
      const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

      currentWeek[adjustedDayOfWeek] = day

      if (dayOfWeek === 0 || index === activityData.length - 1) {
        weeks.push([...currentWeek])
        currentWeek = new Array(7).fill(null)
      }
    })

    return weeks
  }

  const weeks = organizeDataByWeeks()
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"]

  // Calcular estatísticas do habituário
  const activeDays = activityData.filter((d) => d.value > 0).length
  const maxActivity = activityData.length > 0 ? Math.max(...activityData.map((d) => d.value)) : 0
  const consistency = activityData.length > 0 ? Math.round((activeDays / activityData.length) * 100) : 0
  const totalWorkouts = activityData.reduce((sum, d) => sum + d.value, 0)

  const handleMouseEnter = (event: React.MouseEvent, day: any) => {
    if (!day) return
    const rect = event.currentTarget.getBoundingClientRect()
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
      content: {
        date: day.date.toLocaleDateString("pt-BR"),
        activities: day.value,
        exercises: day.exercises,
        duration: day.duration,
      },
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ visible: false })
  }

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#4ade80" }}>
          Carregando dados do aluno...
        </Typography>
        <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Tooltip */}
      {tooltip.visible && (
        <Box
          sx={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <Paper
            sx={{
              p: 1.5,
              background: "rgba(0,0,0,0.9)",
              border: "1px solid #4ade80",
              borderRadius: 1,
              maxWidth: 200,
            }}
          >
            <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600, display: "block" }}>
              {tooltip.content?.date}
            </Typography>
            {tooltip.content?.activities > 0 ? (
              <>
                <Typography variant="caption" sx={{ color: "#4ade80", display: "block" }}>
                  {tooltip.content.activities} treino(s)
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af", display: "block" }}>
                  {tooltip.content.exercises.join(", ")}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  {Math.floor(tooltip.content.duration / 60)}h {tooltip.content.duration % 60}min
                </Typography>
              </>
            ) : (
              <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                Sem atividade
              </Typography>
            )}
          </Paper>
        </Box>
      )}

      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#4ade80" }}>
          Dashboard do Aluno
        </Typography>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{
            borderRadius: 1,
            px: 3,
            py: 1,
            background: "linear-gradient(45deg, #4ade80 30%, #22c55e 90%)",
            "&:hover": {
              background: "linear-gradient(45deg, #22c55e 30%, #16a34a 90%)",
            },
          }}
        >
          Exportar Relatório
        </Button>
      </Box>

      {/* Seletor de aluno */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          background: "rgba(0,0,0,0.8)",
          border: "1px solid rgba(74, 222, 128, 0.15)",
        }}
      >
        <Typography variant="subtitle1" sx={{ color: "#4ade80", mb: 1.5, fontWeight: 500 }}>
          Selecionar Aluno
        </Typography>
        <Grid container spacing={1}>
          {mockStudents.map((student) => (
            <Grid item xs={6} sm={4} md={2} key={student.id}>
              <Card
                sx={{
                  background:
                    selectedStudent === student.id.toString() ? "rgba(74, 222, 128, 0.1)" : "rgba(255,255,255,0.03)",
                  border:
                    selectedStudent === student.id.toString()
                      ? "1px solid #4ade80"
                      : "1px solid rgba(74, 222, 128, 0.1)",
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "rgba(74, 222, 128, 0.3)",
                    background: "rgba(74, 222, 128, 0.05)",
                  },
                  height: "100%",
                }}
                onClick={() => setSelectedStudent(student.id.toString())}
              >
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ color: "#4ade80", mr: 1, fontSize: 18 }} />
                    <Box>
                      <Typography variant="body2" sx={{ color: "#fff", fontWeight: 500, lineHeight: 1.2 }}>
                        {student.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                        {student.device}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Métricas de saúde */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            {
              title: "Freq. Cardíaca",
              value: currentStudent?.metrics.heartRate || "-- bpm",
              icon: <FavoriteIcon />,
              color: "#ef4444",
              trend: currentStudent?.metrics.trends.hr || 0,
            },
            {
              title: "Passos Diários",
              value: currentStudent?.metrics.steps || "--",
              icon: <DirectionsRunIcon />,
              color: "#8b5cf6",
              trend: currentStudent?.metrics.trends.steps || 0,
            },
            {
              title: "Qualidade do Sono",
              value: currentStudent?.metrics.sleep || "--",
              icon: <BedtimeIcon />,
              color: "#3b82f6",
              trend: currentStudent?.metrics.trends.sleep || 0,
            },
            {
              title: "Calorias",
              value: currentStudent?.metrics.calories || "--",
              icon: <LocalFireDepartmentIcon />,
              color: "#f59e0b",
              trend: currentStudent?.metrics.trends.calories || 0,
            },
          ].map((metric, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(74, 222, 128, 0.15)",
                    borderRadius: 1,
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Box
                        sx={{
                          p: 0.5,
                          borderRadius: 1,
                          backgroundColor: `${metric.color}20`,
                          mr: 1,
                        }}
                      >
                        <Box sx={{ color: metric.color, fontSize: 16 }}>{metric.icon}</Box>
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 700, lineHeight: 1 }}>
                          {metric.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: "#4ade80", display: "block", mb: 0.5 }}>
                      {metric.title}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {metric.trend >= 0 ? (
                        <TrendingUpIcon sx={{ color: "#22c55e", fontSize: 12, mr: 0.5 }} />
                      ) : (
                        <TrendingDownIcon sx={{ color: "#ef4444", fontSize: 12, mr: 0.5 }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{
                          color: metric.trend >= 0 ? "#22c55e" : "#ef4444",
                          fontSize: "0.7rem",
                        }}
                      >
                        {Math.abs(metric.trend)}%
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Layout responsivo: Desktop lado a lado, Mobile empilhado */}
      <Grid container spacing={2}>
        {/* Habituário - Heatmap de atividades */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: { xs: 2, lg: 0 },
              borderRadius: 1,
              background: "rgba(0,0,0,0.8)",
              border: "1px solid rgba(74, 222, 128, 0.15)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FitnessCenterIcon sx={{ color: "#4ade80", mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: "#4ade80", fontWeight: 500 }}>
                Habituário de Treinos - {currentStudent?.name}
              </Typography>
            </Box>

            {/* Heatmap */}
            <Box sx={{ overflowX: "auto", mb: 2 }}>
              <Box sx={{ minWidth: 600 }}>
                {/* Cabeçalho dos meses */}
                <Box sx={{ display: "flex", mb: 1 }}>
                  <Box sx={{ width: 20 }}></Box>
                  {months.map((month, index) => (
                    <Box key={index} sx={{ flex: 1, textAlign: "center" }}>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                        {month}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Grid de atividades */}
                <Box sx={{ display: "flex" }}>
                  {/* Labels dos dias */}
                  <Box sx={{ display: "flex", flexDirection: "column", mr: 1 }}>
                    {weekDays.map((day, index) => (
                      <Box key={index} sx={{ height: 12, display: "flex", alignItems: "center", mb: 0.25 }}>
                        <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.6rem" }}>
                          {day}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {/* Grid de semanas */}
                  <Box sx={{ display: "flex", gap: 0.25 }}>
                    {weeks.slice(0, 52).map((week, weekIndex) => (
                      <Box key={weekIndex} sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
                        {week.map((day, dayIndex) => (
                          <Box
                            key={dayIndex}
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: 0.5,
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                            }}
                            className={day ? getActivityColor(day.value) : "bg-gray-800"}
                            onMouseEnter={(e) => handleMouseEnter(e, day)}
                            onMouseLeave={handleMouseLeave}
                          />
                        ))}
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Legenda */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                  <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                    2025
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                      Menos
                    </Typography>
                    <Box className="bg-gray-800" sx={{ width: 8, height: 8, borderRadius: 0.5 }} />
                    <Box className="bg-green-900" sx={{ width: 8, height: 8, borderRadius: 0.5 }} />
                    <Box className="bg-green-700" sx={{ width: 8, height: 8, borderRadius: 0.5 }} />
                    <Box className="bg-green-500" sx={{ width: 8, height: 8, borderRadius: 0.5 }} />
                    <Box className="bg-green-400" sx={{ width: 8, height: 8, borderRadius: 0.5 }} />
                    <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                      Mais
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Estatísticas do habituário */}
            <Grid container spacing={1}>
              {[
                { label: "Dias Ativos", value: activeDays, icon: "🔥" },
                { label: "Máximo", value: maxActivity, icon: "⚡" },
                { label: "Consistência", value: `${consistency}%`, icon: "🎯" },
                { label: "Total Treinos", value: totalWorkouts, icon: "📊" },
              ].map((stat, index) => (
                <Grid item xs={3} key={index}>
                  <Card
                    sx={{
                      background: "rgba(74, 222, 128, 0.05)",
                      border: "1px solid rgba(74, 222, 128, 0.2)",
                      borderRadius: 1,
                      textAlign: "center",
                    }}
                  >
                    <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                      <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                        {stat.icon}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "#4ade80", fontWeight: 700, fontSize: "1rem" }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#9ca3af", fontSize: "0.7rem" }}>
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Gráfico semanal e recomendações */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Gráfico de atividade semanal */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 1,
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(74, 222, 128, 0.15)",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CalendarTodayIcon sx={{ color: "#4ade80", mr: 1 }} />
                <Typography variant="subtitle1" sx={{ color: "#4ade80", fontWeight: 500 }}>
                  Atividade Semanal
                </Typography>
              </Box>

              {/* Tabs */}
              <Box sx={{ mb: 2 }}>
                {["overview", "heart", "steps", "sleep"].map((tab) => (
                  <Chip
                    key={tab}
                    label={tab === "overview" ? "Geral" : tab === "heart" ? "❤️" : tab === "steps" ? "👟" : "😴"}
                    onClick={() => setActiveTab(tab)}
                    size="small"
                    sx={{
                      mr: 0.5,
                      mb: 0.5,
                      borderRadius: 1,
                      backgroundColor: activeTab === tab ? "#4ade80" : "rgba(255,255,255,0.05)",
                      color: activeTab === tab ? "#000" : "#fff",
                      fontSize: "0.7rem",
                    }}
                  />
                ))}
              </Box>

              {/* Gráfico compacto */}
              <Box sx={{ height: 150 }}>
                <Grid container spacing={0.5} sx={{ height: "100%" }}>
                  {mockChartData.map((data, index) => (
                    <Grid item xs key={index} sx={{ height: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "#9ca3af", mb: 0.5, fontSize: "0.6rem" }}>
                          {data.day}
                        </Typography>
                        <Box
                          sx={{
                            flexGrow: 1,
                            display: "flex",
                            alignItems: "end",
                            width: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <Box
                            sx={{
                              width: "70%",
                              height: `${
                                activeTab === "heart"
                                  ? (data.heartRate / 100) * 100
                                  : activeTab === "steps"
                                    ? (data.steps / 15000) * 100
                                    : activeTab === "sleep"
                                      ? (data.sleep / 10) * 100
                                      : 60
                              }%`,
                              backgroundColor: "#4ade80",
                              borderRadius: "1px 1px 0 0",
                              minHeight: "10px",
                            }}
                          />
                        </Box>
                        <Typography variant="caption" sx={{ color: "#4ade80", mt: 0.5, fontSize: "0.6rem" }}>
                          {activeTab === "heart"
                            ? `${data.heartRate}`
                            : activeTab === "steps"
                              ? `${(data.steps / 1000).toFixed(1)}k`
                              : activeTab === "sleep"
                                ? `${data.sleep}h`
                                : ""}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>

            {/* Recomendações compactas */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 1,
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(74, 222, 128, 0.15)",
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "#4ade80", mb: 1.5, fontWeight: 500 }}>
                Recomendações
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {[
                  { title: "💤 Melhore o sono", desc: "Estabeleça rotina de relaxamento" },
                  { title: "🚶 Mais atividade", desc: "15min de caminhada após almoço" },
                  { title: "❤️ Monitore FC", desc: "Adicione mais tempo de recuperação" },
                ].map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(74, 222, 128, 0.1)",
                      borderRadius: 1,
                    }}
                  >
                    <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                      <Typography variant="body2" sx={{ color: "#4ade80", fontWeight: 500, fontSize: "0.8rem" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#d1d5db", fontSize: "0.7rem" }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
