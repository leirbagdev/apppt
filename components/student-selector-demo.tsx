"use client"

import { useState } from "react"
import { MobileStudentSelector } from "@/components/md3/mobile-student-selector"
import { Card, CardContent } from "@/components/md3/card"
import { Typography, Box } from "@mui/material"

const mockStudents = [
  {
    id: 1,
    name: "Ana Silva",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
    wearable: "Apple Watch",
    wearableConnected: true,
  },
  {
    id: 2,
    name: "Carlos Santos",
    avatar: "/placeholder.svg?height=32&width=32&text=CS",
    wearable: "Fitbit",
    wearableConnected: false,
  },
  {
    id: 3,
    name: "Maria Oliveira",
    avatar: "/placeholder.svg?height=32&width=32&text=MO",
    wearable: "Garmin",
    wearableConnected: true,
  },
  {
    id: 4,
    name: "João Pereira",
    avatar: "/placeholder.svg?height=32&width=32&text=JP",
    wearable: "Samsung Galaxy Watch",
    wearableConnected: false,
  },
]

export function StudentSelectorDemo() {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0])

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, color: "var(--on-surface)" }}>
          Seletor de Alunos - Teste de Legibilidade
        </Typography>

        <Box sx={{ mb: 3 }}>
          <MobileStudentSelector
            students={mockStudents}
            selectedStudent={selectedStudent}
            onSelectStudent={setSelectedStudent}
          />
        </Box>

        <Box sx={{ p: 2, borderRadius: 2, backgroundColor: "var(--surface-variant)" }}>
          <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mb: 1 }}>
            Aluno Selecionado:
          </Typography>
          <Typography variant="body1" sx={{ color: "var(--on-surface)", fontWeight: 600 }}>
            {selectedStudent?.name || "Nenhum"}
          </Typography>
          {selectedStudent?.wearable && (
            <Typography variant="body2" sx={{ color: "var(--on-surface-variant)", mt: 1 }}>
              Dispositivo: {selectedStudent.wearable}
              <span
                style={{
                  color: selectedStudent.wearableConnected ? "var(--success)" : "var(--error)",
                  marginLeft: 8,
                }}
              >
                {selectedStudent.wearableConnected ? "Conectado" : "Desconectado"}
              </span>
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}
