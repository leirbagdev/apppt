"use client"

import type { ReactNode } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { alpha, useTheme } from "@mui/material/styles"
import ProgressIndicator from "./progress-indicator"

// Tipos específicos para as propriedades do cartão
type HealthMetricColor = "primary" | "secondary" | "success" | "warning" | "info" | "error"

// Interface para o indicador de progresso
interface ProgressConfig {
  value: number           // Valor atual do progresso
  max?: number           // Valor máximo (padrão: 100)
  label?: string         // Rótulo opcional para o progresso
}

// Props principal do componente com documentação detalhada
interface HealthStatCardProps {
  /** Título principal do cartão de métrica */
  title: string
  /** Valor atual da métrica (pode ser número ou texto) */
  value: string | number
  /** Subtítulo opcional para informações adicionais */
  subtitle?: string
  /** Ícone opcional para representar visualmente a métrica */
  icon?: ReactNode
  /** Cor do tema para o cartão */
  color?: HealthMetricColor
  /** Configuração do indicador de progresso */
  progress?: ProgressConfig
  /** Conteúdo adicional opcional */
  children?: ReactNode
}

/**
 * Componente para exibir métricas de saúde em um cartão material design
 * 
 * @param props - Props do componente HealthStatCard
 * @returns Componente React renderizado
 */
export default function HealthStatCard({
  title,
  value,
  subtitle,
  icon,
  color = "primary",
  progress,
  children,
}: HealthStatCardProps) {
  const theme = useTheme()

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        height: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 2 }}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div" fontWeight="medium">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: (theme) => alpha(theme.palette[color].main, 0.1),
                color: `${color}.main`,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {progress && (
          <Box sx={{ mt: 2 }}>
            <ProgressIndicator
              value={progress.value}
              max={progress.max}
              label={progress.label}
              color={color}
              animated
            />
          </Box>
        )}

        {children}
      </CardContent>
    </Card>
  )
}
