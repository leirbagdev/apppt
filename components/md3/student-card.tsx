"use client"

import type React from "react"
import { Card, CardContent, CardActions } from "@mui/material"
import { Box, Typography, Chip, Avatar, IconButton, LinearProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import PhoneIcon from "@mui/icons-material/Phone"
import EmailIcon from "@mui/icons-material/Email"
import WearableStatus from "./wearable-status"

const StyledCard = styled(Card)(({ theme }) => ({
  background: "var(--surface-container)",
  border: "1px solid var(--outline-variant)",
  borderRadius: "20px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    borderColor: "var(--primary)",
  },
}))

const StatusChip = styled(Chip)<{ status: string }>(({ status }) => ({
  fontSize: "0.75rem",
  height: "24px",
  fontWeight: 500,
  borderRadius: "8px",
  ...(status === "active" && {
    backgroundColor: "var(--success-container)",
    color: "var(--on-success-container)",
  }),
  ...(status === "pending" && {
    backgroundColor: "var(--warning-container)",
    color: "var(--on-warning-container)",
  }),
  ...(status === "inactive" && {
    backgroundColor: "var(--error-container)",
    color: "var(--on-error-container)",
  }),
}))

const ProgressContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "8px",
})

const InfoRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  marginBottom: "4px",
  color: "var(--on-surface-variant)",
  fontSize: "0.875rem",
})

interface Student {
  id?: number
  name: string
  email?: string
  phone?: string
  status?: string
  plan?: string
  avatar?: string
  lastSession?: string
  nextSession?: string
  progress?: number
  age: number
  weight: number | string
  height: number | string
  objectives?: string[]
  restrictions?: string[]
  hasExams?: boolean
  wearable: string
  wearableConnected: boolean
}

interface StudentCardProps {
  student: Student
  onClick?: () => void
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

const getPlanColor = (plan: string) => {
  switch (plan?.toLowerCase()) {
    case "premium":
      return "var(--tertiary)"
    case "standard":
      return "var(--secondary)"
    case "basic":
      return "var(--primary)"
    default:
      return "var(--outline)"
  }
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const {
    name,
    email,
    phone,
    status = "active",
    plan = "Basic",
    avatar,
    lastSession,
    nextSession,
    progress = 0,
    age,
    weight,
    height,
    objectives = [],
    restrictions = [],
    hasExams = false,
    wearable,
    wearableConnected,
  } = student

  return (
    <StyledCard onClick={onClick}>
      <CardContent sx={{ p: 3 }}>
        {/* Header com Avatar e Status */}
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={avatar || student.avatar}
              sx={{
                width: 52,
                height: 52,
                backgroundColor: "var(--primary)",
                color: "var(--on-primary)",
                fontSize: "1.25rem",
                fontWeight: 600,
                borderRadius: "12px",
              }}
            >
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: "var(--on-surface)",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  lineHeight: 1.2,
                  mb: 0.5,
                }}
              >
                {name}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <StatusChip label={getStatusLabel(status)} status={status} size="small" />
                <Chip
                  label={plan}
                  size="small"
                  sx={{
                    fontSize: "0.75rem",
                    height: "24px",
                    backgroundColor: getPlanColor(plan),
                    color: "var(--on-primary)",
                    fontWeight: 500,
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <IconButton
            size="small"
            sx={{ color: "var(--on-surface-variant)" }}
            onClick={(e) => {
              e.stopPropagation()
              // Handle menu action
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Informações Pessoais */}
        <Box sx={{ mb: 2 }}>
          <InfoRow>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {age} anos • {weight}kg • {height}m
            </Typography>
          </InfoRow>
          {email && (
            <InfoRow>
              <EmailIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {email}
              </Typography>
            </InfoRow>
          )}
          {phone && (
            <InfoRow>
              <PhoneIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                {phone}
              </Typography>
            </InfoRow>
          )}
        </Box>

        {/* Progresso */}
        {progress > 0 && (
          <ProgressContainer>
            <FitnessCenterIcon sx={{ fontSize: 16, color: "var(--primary)" }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "var(--on-surface-variant)" }}>
                  Progresso
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--primary)" }}>
                  {progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: "var(--surface-variant)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "var(--primary)",
                    borderRadius: 6,
                  },
                }}
              />
            </Box>
          </ProgressContainer>
        )}

        {/* Sessões */}
        {(lastSession || nextSession) && (
          <Box sx={{ mt: 2 }}>
            {lastSession && (
              <InfoRow>
                <CalendarTodayIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                  Última: {lastSession}
                </Typography>
              </InfoRow>
            )}
            {nextSession && (
              <InfoRow>
                <CalendarTodayIcon sx={{ fontSize: 16, color: "var(--primary)" }} />
                <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "var(--primary)" }}>
                  Próxima: {nextSession}
                </Typography>
              </InfoRow>
            )}
          </Box>
        )}

        {/* Objetivos */}
        {objectives.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" sx={{ fontSize: "0.8rem", color: "var(--on-surface-variant)", mb: 1 }}>
              Objetivos:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {objectives.slice(0, 2).map((objective, index) => (
                <Chip
                  key={index}
                  label={objective}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: "20px",
                    backgroundColor: "var(--secondary-container)",
                    color: "var(--on-secondary-container)",
                    borderRadius: "8px",
                  }}
                />
              ))}
              {objectives.length > 2 && (
                <Chip
                  label={`+${objectives.length - 2}`}
                  size="small"
                  sx={{
                    fontSize: "0.7rem",
                    height: "20px",
                    backgroundColor: "var(--outline-variant)",
                    color: "var(--on-surface-variant)",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
          </Box>
        )}

        {/* Restrições e Exames */}
        {(restrictions.length > 0 || hasExams) && (
          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {restrictions.length > 0 && (
              <Chip
                label={`${restrictions.length} restrição${restrictions.length > 1 ? "ões" : ""}`}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  backgroundColor: "var(--error-container)",
                  color: "var(--on-error-container)",
                  borderRadius: "8px",
                }}
              />
            )}
            {hasExams && (
              <Chip
                label="Exames"
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: "20px",
                  backgroundColor: "var(--success-container)",
                  color: "var(--on-success-container)",
                  borderRadius: "8px",
                }}
              />
            )}
          </Box>
        )}
      </CardContent>

      {/* Footer com Wearable Status */}
      <CardActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <WearableStatus wearable={wearable} connected={wearableConnected} sx={{ flex: 1 }} />
      </CardActions>
    </StyledCard>
  )
}

export default StudentCard
