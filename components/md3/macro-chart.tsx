"use client"

import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { motion } from "framer-motion"

interface MacroChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
  title?: string
  height?: number | string
  showLegend?: boolean
}

export default function MacroChart({ data, title, height = 300, showLegend = true }: MacroChartProps) {
  const theme = useTheme()
  //const isDarkMode = theme.palette.mode === "dark"

  // Estilo para o tooltip
  const tooltipStyle = {
    backgroundColor: "#000000", // Sempre preto
    border: "1px solid #4ade80", // Borda verde
    borderRadius: "8px",
    padding: "8px 12px",
    boxShadow: "0px 4px 12px rgba(74, 222, 128, 0.3)",
    color: "#ffffff", // Texto sempre branco
  }

  // Calcular o total para percentagens
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Box
      sx={{
        width: "100%",
        height,
        p: 2,
        borderRadius: 4,
        bgcolor: "#000000", // Fundo preto OLED
        color: "#ffffff", // Texto branco
        border: "1px solid #1a1a1a", // Borda sutil
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
      }}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {title && (
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom align="center">
          {title}
        </Typography>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value}g (${((value / total) * 100).toFixed(1)}%)`]}
            contentStyle={tooltipStyle}
          />
          {showLegend && <Legend formatter={(value, entry) => <span style={{ color: "#FFFFFF" }}>{value}</span>} />}
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}
