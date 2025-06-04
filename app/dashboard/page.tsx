"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Divider from "@mui/material/Divider"
import LinearProgress from "@mui/material/LinearProgress"
import { useRouter } from "next/navigation"

// Icons
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import PeopleIcon from "@mui/icons-material/People"
import EventIcon from "@mui/icons-material/Event"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

export default function Dashboard() {
  const router = useRouter()
  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: 1,
      time: "08:00",
      student: "Leandro Silva",
      type: "Musculação",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      time: "09:30",
      student: "Mario Lenon",
      type: "Natação",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      time: "11:00",
      student: "Otávio Martins",
      type: "Fisioterapia",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const [recentStudents, setRecentStudents] = useState([
    {
      id: 1,
      name: "Leandro Silva",
      status: "Ativo",
      progress: 70,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mario Lenon",
      status: "Pendente",
      progress: 30,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Otávio Martins",
      status: "Ativo",
      progress: 90,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  // Função para navegar para a página de detalhes do aluno
  const navigateToStudent = (id: number) => {
    router.push(`/dashboard/students/${id}`)
  }

  // Função para navegar para a agenda
  const navigateToSchedule = () => {
    router.push("/dashboard/schedule")
  }

  // Função para navegar para a página de alunos
  const navigateToStudents = () => {
    router.push("/dashboard/students")
  }

  // Função para navegar para a página de novo aluno
  const navigateToNewStudent = () => {
    router.push("/dashboard/students/new")
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {/* Container principal centralizado */}
      <Box sx={{ width: "100%", maxWidth: "1200px", px: { xs: 2, sm: 3 } }}>
        {/* Cards de estatísticas em layout 2x2 */}
        <Grid
          container
          spacing={2}
          sx={{
            maxWidth: "500px",
            mb: 4,
            mx: "auto",
            justifyContent: "center",
          }}
        >
          {/* Primeira linha */}
          <Grid item xs={6} sm={6}>
            <Card
              elevation={2}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                },
                height: "140px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => router.push("/dashboard/students")}
            >
              <CardContent
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ bgcolor: "primary.main", mb: 1.5, width: 40, height: 40 }}>
                    <PeopleIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                    Total de Alunos
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    24
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Card
              elevation={2}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                },
                height: "140px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => router.push("/dashboard/workouts")}
            >
              <CardContent
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ bgcolor: "secondary.main", mb: 1.5, width: 40, height: 40 }}>
                    <FitnessCenterIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                    Treinos Hoje
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    8
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Segunda linha */}
          <Grid item xs={6} sm={6}>
            <Card
              elevation={2}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                },
                height: "140px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => router.push("/dashboard/schedule")}
            >
              <CardContent
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ bgcolor: "success.main", mb: 1.5, width: 40, height: 40 }}>
                    <EventIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                    Agendamentos
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    12
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Card
              elevation={2}
              sx={{
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                },
                height: "140px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => router.push("/dashboard/progress")}
            >
              <CardContent
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  <Avatar sx={{ bgcolor: "warning.main", mb: 1.5, width: 40, height: 40 }}>
                    <TrendingUpIcon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", mb: 0.5 }}>
                    Novos este mês
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    5
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Conteúdo principal centralizado */}
        <Grid container spacing={3}>
          {/* Próximas aulas */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Próximas Aulas
                </Typography>
                <Button variant="outlined" size="small" onClick={navigateToSchedule}>
                  Ver Agenda
                </Button>
              </Box>
              <List>
                {upcomingClasses.map((session, index) => (
                  <Box key={session.id}>
                    <ListItem
                      sx={{
                        px: 0,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                          borderRadius: 1,
                        },
                      }}
                      onClick={() => navigateToStudent(session.id)}
                    >
                      <ListItemAvatar>
                        <Avatar src={session.avatar} />
                      </ListItemAvatar>
                      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="subtitle2">{session.student}</Typography>
                          <Chip
                            label={session.time}
                            size="small"
                            icon={<AccessTimeIcon fontSize="small" />}
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {session.type}
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < upcomingClasses.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Alunos recentes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" component="h2">
                  Alunos Recentes
                </Typography>
                <Button variant="contained" size="small" startIcon={<PersonAddIcon />} onClick={navigateToNewStudent}>
                  Novo Aluno
                </Button>
              </Box>
              <List>
                {recentStudents.map((student, index) => (
                  <Box key={student.id}>
                    <ListItem
                      sx={{
                        px: 0,
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                          borderRadius: 1,
                        },
                      }}
                      onClick={() => navigateToStudent(student.id)}
                    >
                      <ListItemAvatar>
                        <Avatar src={student.avatar} />
                      </ListItemAvatar>
                      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography variant="subtitle2">{student.name}</Typography>
                          <Chip
                            label={student.status}
                            size="small"
                            icon={<CheckCircleIcon fontSize="small" />}
                            color={student.status === "Ativo" ? "success" : "warning"}
                            variant="outlined"
                          />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                          <Box sx={{ flexGrow: 1, mr: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={student.progress}
                              color={student.progress > 50 ? "success" : "warning"}
                              sx={{ borderRadius: 5, height: 6 }}
                            />
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            {student.progress}%
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    {index < recentStudents.length - 1 && <Divider variant="inset" component="li" />}
                  </Box>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Resumo de atividades */}
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                },
              }}
              onClick={() => router.push("/dashboard/health-metrics")}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Resumo de Atividades
              </Typography>
              <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Gráfico de atividades será exibido aqui
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
