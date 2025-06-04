"use client"

import { useTheme } from "@mui/material/styles"
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PieChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
  innerRadius?: number
  outerRadius?: number
  cx?: number | string
  cy?: number | string
  height?: number | string
  width?: number | string
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
}

export function PieChart({
  data,
  innerRadius = 60,
  outerRadius = 80,
  cx = "50%",
  cy = "50%",
  height = 300,
  width = "100%",
  showLegend = true,
  showTooltip = true,
  className = "",
}: PieChartProps) {
  const theme = useTheme()

  // Função para formatar o tooltip
  const formatTooltip = (value: number, name: string) => {
    return [`${value}`, name]
  }

  // Função para renderizar o rótulo personalizado
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "12px", fontWeight: "bold" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className={`w-full h-full bg-black text-white ${className}`} style={{ height, width }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx={cx}
            cy={cy}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {showTooltip && (
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: "#000000",
                border: "1px solid #4ade80",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
          )}
          {showLegend && (
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px", color: "#ffffff" }}
            />
          )}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  )
}
