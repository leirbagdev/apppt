"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { alpha, useTheme } from "@mui/material/styles"

interface ProgressIndicatorProps {
  value: number
  max?: number
  label?: string
  showPercentage?: boolean
  color?: "primary" | "secondary" | "success" | "warning" | "info" | "error"
  size?: "small" | "medium" | "large"
  thickness?: number
  animated?: boolean
}

export function ProgressIndicator({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = "secondary",
  size = "medium",
  thickness = 6,
  animated = false,
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const theme = useTheme()

  const getSize = () => {
    switch (size) {
      case "small":
        return { height: thickness, borderRadius: thickness / 2 }
      case "medium":
        return { height: thickness, borderRadius: thickness / 2 }
      case "large":
        return { height: thickness * 1.5, borderRadius: thickness * 0.75 }
      default:
        return { height: thickness, borderRadius: thickness / 2 }
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      {label && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
          {showPercentage && (
            <Typography variant="caption" fontWeight="medium">
              {percentage.toFixed(0)}%
            </Typography>
          )}
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          ...getSize(),
          bgcolor: (theme) => alpha(theme.palette[color].main, 0.2),
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${percentage}%`,
            bgcolor: `${color}.main`,
            borderRadius: getSize().borderRadius,
            transition: "width 0.5s ease-in-out",
            ...(animated && {
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
                animation: "shimmer 1.5s infinite",
              },
            }),
          }}
        />
      </Box>
    </Box>
  )
}

export default ProgressIndicator
