"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Box, Typography } from "@mui/material"

export default function RouteTester() {
  const router = useRouter()
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testRoutes = [
    {
      name: "Lista de Alunos",
      path: "/dashboard/students",
      test: () => {
        try {
          router.push("/dashboard/students")
          addResult("✅ Lista de alunos - OK")
        } catch (error) {
          addResult("❌ Lista de alunos - ERRO")
        }
      },
    },
    {
      name: "Novo Aluno",
      path: "/dashboard/students/new",
      test: () => {
        try {
          router.push("/dashboard/students/new")
          addResult("✅ Novo aluno - OK")
        } catch (error) {
          addResult("❌ Novo aluno - ERRO")
        }
      },
    },
    {
      name: "Aluno 1",
      path: "/dashboard/students/1",
      test: () => {
        try {
          router.push("/dashboard/students/1")
          addResult("✅ Aluno 1 - OK")
        } catch (error) {
          addResult("❌ Aluno 1 - ERRO")
        }
      },
    },
    {
      name: "Aluno 2",
      path: "/dashboard/students/2",
      test: () => {
        try {
          router.push("/dashboard/students/2")
          addResult("✅ Aluno 2 - OK")
        } catch (error) {
          addResult("❌ Aluno 2 - ERRO")
        }
      },
    },
    {
      name: "Aluno 3",
      path: "/dashboard/students/3",
      test: () => {
        try {
          router.push("/dashboard/students/3")
          addResult("✅ Aluno 3 - OK")
        } catch (error) {
          addResult("❌ Aluno 3 - ERRO")
        }
      },
    },
    {
      name: "Aluno Inexistente",
      path: "/dashboard/students/999",
      test: () => {
        try {
          router.push("/dashboard/students/999")
          addResult("✅ Aluno inexistente (deve redirecionar) - OK")
        } catch (error) {
          addResult("❌ Aluno inexistente - ERRO")
        }
      },
    },
    {
      name: "ID Inválido",
      path: "/dashboard/students/abc",
      test: () => {
        try {
          router.push("/dashboard/students/abc")
          addResult("✅ ID inválido (deve redirecionar) - OK")
        } catch (error) {
          addResult("❌ ID inválido - ERRO")
        }
      },
    },
  ]

  const runAllTests = () => {
    setTestResults([])
    addResult("🚀 Iniciando testes de rotas...")

    testRoutes.forEach((route, index) => {
      setTimeout(() => {
        route.test()
      }, index * 500)
    })
  }

  return (
    <Card sx={{ p: 3, m: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, color: "var(--on-surface)" }}>
        Testador de Rotas - Alunos
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {testRoutes.map((route) => (
          <Button key={route.path} variant="outlined" size="small" onClick={route.test} sx={{ fontSize: "0.75rem" }}>
            {route.name}
          </Button>
        ))}
      </Box>

      <Button variant="filled" onClick={runAllTests} sx={{ mb: 3 }}>
        Executar Todos os Testes
      </Button>

      <Box
        sx={{
          maxHeight: 300,
          overflow: "auto",
          backgroundColor: "var(--surface-variant)",
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, color: "var(--on-surface)" }}>
          Resultados dos Testes:
        </Typography>
        {testResults.length === 0 ? (
          <Typography variant="body2" sx={{ color: "var(--on-surface-variant)" }}>
            Nenhum teste executado ainda
          </Typography>
        ) : (
          testResults.map((result, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "var(--on-surface)",
                mb: 0.5,
              }}
            >
              {result}
            </Typography>
          ))
        )}
      </Box>
    </Card>
  )
}
