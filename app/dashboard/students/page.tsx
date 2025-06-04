"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Avatar from "@mui/material/Avatar"
import Chip from "@mui/material/Chip"
import LinearProgress from "@mui/material/LinearProgress"
import { motion } from "framer-motion"

// Icons
import SearchIcon from "@mui/icons-material/Search"
import PersonAddIcon from "@mui/icons-material/PersonAdd"
import CloseIcon from "@mui/icons-material/Close"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"

// Dados mockados dos estudantes
const mockStudents = [
  {
    id: 1,
    name: "Leandro Silva",
    email: "leandrossilva@gmail.com",
    phone: "(41) 9 9512-3112",
    status: "active",
    plan: "Premium",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen11c4f36f8b5c4c5e9a8b2d3e4f5g6h7i.jpg",
    lastSession: "Hoje, 08:00",
    nextSession: "Amanhã, 08:00",
    progress: 75,
    age: 36,
    weight: "97kg",
    height: "1,90m",
    objectives: ["Perda de peso", "Ganho de massa muscular"],
    restrictions: [],
    hasExams: true,
  },
  {
    id: 2,
    name: "Mario Lenon",
    email: "lenon1973@hotmail.com",
    phone: "(41) 9 9876-5432",
    status: "pending",
    plan: "Standard",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen22d5g47h9c6d7e0b9c3f4g5h6i7j8k.jpg",
    lastSession: "Ontem, 16:30",
    nextSession: "Quinta, 16:30",
    progress: 30,
    age: 51,
    weight: "85kg",
    height: "1,78m",
    objectives: ["Perda de peso"],
    restrictions: [],
    hasExams: false,
  },
  {
    id: 3,
    name: "Otávio Martins",
    email: "otavianomartins@hotmail.com",
    phone: "(41) 9996-88234",
    status: "active",
    plan: "Premium",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen33e6h58i0d7e1c0d4g5h6i7j8k9l0m.jpg",
    lastSession: "Segunda, 10:00",
    nextSession: "Sexta, 10:00",
    progress: 90,
    age: 79,
    weight: "72kg",
    height: "1,68m",
    objectives: ["Manutenção da saúde", "Mobilidade"],
    restrictions: ["Hipertensão controlada", "Artrose leve nos joelhos"],
    hasExams: true,
  },
  {
    id: 4,
    name: "Ana Carolina",
    email: "anacarolina@gmail.com",
    phone: "(41) 9 9123-4567",
    status: "active",
    plan: "Basic",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen44f7i69j1e8f2d1e5h6i7j8k9l0m1n.jpg",
    lastSession: "Terça, 14:00",
    nextSession: "Sábado, 09:00",
    progress: 60,
    age: 28,
    weight: "62kg",
    height: "1,65m",
    objectives: ["Tonificação muscular", "Flexibilidade"],
    restrictions: [],
    hasExams: true,
  },
  {
    id: 5,
    name: "Roberto Gomes",
    email: "robertogomes@outlook.com",
    phone: "(41) 9 8765-4321",
    status: "inactive",
    plan: "Standard",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen55g8j70k2f9g3e2f6i7j8k9l0m1n2o.jpg",
    lastSession: "15/03/2023",
    nextSession: "Não agendado",
    progress: 0,
    age: 45,
    weight: "88kg",
    height: "1,82m",
    objectives: ["Perda de peso", "Condicionamento cardiovascular"],
    restrictions: ["Lesão no joelho direito"],
    hasExams: false,
  },
  {
    id: 6,
    name: "Carla Mendes",
    email: "carlamendes@gmail.com",
    phone: "(41) 9 9876-1234",
    status: "active",
    plan: "Premium",
    avatar: "https://this-person-does-not-exist.com/img/avatar-gen66h9k81l3g0h4f3g7j8k9l0m1n2o3p.jpg",
    lastSession: "Segunda, 17:00",
    nextSession: "Quarta, 17:00",
    progress: 85,
    age: 32,
    weight: "58kg",
    height: "1,70m",
    objectives: ["Ganho de massa muscular", "Definição"],
    restrictions: [],
    hasExams: true,
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tabValue, setTabValue] = useState(0)
  const [students, setStudents] = useState(mockStudents)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4ade80"
      case "pending":
        return "#fbbf24"
      case "inactive":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "pending":
        return "Pendente"
      case "inactive":
        return "Inativo"
      default:
        return "Desconhecido"
    }
  }

  const filteredStudents = students
    .filter((student) => {
      // Filtro por status
      if (tabValue === 0) return true
      if (tabValue === 1) return student.status === "active"
      if (tabValue === 2) return student.status === "pending"
      if (tabValue === 3) return student.status === "inactive"
      return true
    })
    .filter((student) => {
      // Filtro por termo de busca
      if (!searchTerm) return true
      return (
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#4ade80" }}>
          Carregando alunos...
        </Typography>
        <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: "#4ade80" }}>
          Alunos
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            borderRadius: 28,
            px: 3,
            py: 1,
            background: "linear-gradient(45deg, #4ade80 30%, #22c55e 90%)",
            "&:hover": {
              background: "linear-gradient(45deg, #22c55e 30%, #16a34a 90%)",
            },
          }}
        >
          Novo Aluno
        </Button>
      </Box>

      {/* Barra de busca */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 4,
          background: "rgba(0,0,0,0.8)",
          border: "1px solid rgba(74, 222, 128, 0.2)",
        }}
      >
        <TextField
          placeholder="Buscar alunos..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              borderRadius: 28,
              backgroundColor: "rgba(255,255,255,0.05)",
              "& fieldset": {
                borderColor: "rgba(74, 222, 128, 0.3)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(74, 222, 128, 0.5)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4ade80",
              },
            },
            "& .MuiInputBase-input": {
              color: "#fff",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#4ade80" }} />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => setSearchTerm("")}>
                  <CloseIcon fontSize="small" sx={{ color: "#4ade80" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Tabs */}
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          borderRadius: 4,
          overflow: "hidden",
          background: "rgba(0,0,0,0.8)",
          border: "1px solid rgba(74, 222, 128, 0.2)",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="student tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
              backgroundColor: "#4ade80",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              py: 2,
              color: "#d1d5db",
              "&.Mui-selected": {
                color: "#4ade80",
              },
            },
          }}
        >
          <Tab label="Todos" />
          <Tab label="Ativos" />
          <Tab label="Pendentes" />
          <Tab label="Inativos" />
        </Tabs>
      </Paper>

      {/* Lista de alunos */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Grid container spacing={3}>
          {filteredStudents.map((student, index) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(74, 222, 128, 0.2)",
                    borderRadius: 3,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 32px rgba(74, 222, 128, 0.2)",
                      border: "1px solid rgba(74, 222, 128, 0.4)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header do card */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        src={student.avatar}
                        sx={{
                          width: 50,
                          height: 50,
                          mr: 2,
                          border: "2px solid #4ade80",
                        }}
                      >
                        {student.name.charAt(0)}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
                          {student.name}
                        </Typography>
                        <Chip
                          label={getStatusLabel(student.status)}
                          size="small"
                          sx={{
                            backgroundColor: getStatusColor(student.status),
                            color: "#000",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Informações de contato */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <EmailIcon sx={{ color: "#4ade80", fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                          {student.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneIcon sx={{ color: "#4ade80", fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                          {student.phone}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Progresso */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#d1d5db" }}>
                          Progresso
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4ade80", fontWeight: 600 }}>
                          {student.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={student.progress}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "rgba(255,255,255,0.1)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#4ade80",
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>

                    {/* Informações adicionais */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                          Plano
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#4ade80", fontWeight: 600 }}>
                          {student.plan}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                          Idade
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#fff" }}>
                          {student.age} anos
                        </Typography>
                      </Box>
                    </Box>

                    {/* Última sessão */}
                    <Box sx={{ pt: 2, borderTop: "1px solid rgba(74, 222, 128, 0.2)" }}>
                      <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                        Última sessão
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#fff" }}>
                        {student.lastSession}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Estado vazio */}
      {filteredStudents.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
            background: "rgba(0,0,0,0.8)",
            border: "1px solid rgba(74, 222, 128, 0.2)",
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: 64, color: "#4ade80", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "#fff", mb: 1 }}>
            Nenhum aluno encontrado
          </Typography>
          <Typography variant="body2" sx={{ color: "#9ca3af", mb: 3 }}>
            Tente ajustar seus filtros ou adicione um novo aluno
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            sx={{
              borderRadius: 28,
              background: "linear-gradient(45deg, #4ade80 30%, #22c55e 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #22c55e 30%, #16a34a 90%)",
              },
            }}
          >
            Adicionar Aluno
          </Button>
        </Paper>
      )}
    </Box>
  )
}
