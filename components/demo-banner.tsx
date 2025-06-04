"use client"

import { useState, useEffect } from "react"
import { Alert, AlertTitle } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import InfoIcon from "@mui/icons-material/Info"

// Constante para simular o modo mock (já que não temos o arquivo supabase.ts completo)
const isMockMode = true

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mostrar o banner apenas após um pequeno delay para evitar flash durante o carregamento
    const timer = setTimeout(() => {
      setIsVisible(isMockMode)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <Alert
      severity="info"
      icon={<InfoIcon />}
      sx={{
        position: "fixed",
        bottom: { xs: 90, sm: 20 },
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1500,
        maxWidth: "90%",
        width: "auto",
        borderRadius: 2,
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(74, 222, 128, 0.2)",
        color: "#fff",
        "& .MuiAlert-icon": {
          color: "#4ade80",
        },
      }}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setIsVisible(false)
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      <AlertTitle sx={{ fontWeight: 600, color: "#4ade80" }}>Modo Demo</AlertTitle>
      Executando com dados mockados. Configure o Supabase para dados reais.
    </Alert>
  )
}
