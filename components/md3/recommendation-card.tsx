"use client"

import type React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import { useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"

interface RecommendationCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  color?: "primary" | "secondary" | "success" | "warning" | "info" | "error"
}

export default function RecommendationCard({ title, description, icon, color = "primary" }: RecommendationCardProps) {
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
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {icon && (
            <Avatar
              sx={{
                bgcolor: `${color}.main`,
                color: `${color}.contrastText`,
              }}
            >
              {icon}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
