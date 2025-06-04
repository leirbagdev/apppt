"use client"

import { useEffect, useState } from "react"

interface ActivityChartProps {
  data: Array<{ name: string; value: number; [key: string]: any }>
  type: "line" | "bar" | "area"
  dataKey: string
  title?: string
  color?: string
  height?: number
  className?: string
}

export default function ActivityChart({
  data = [],
  type = "bar",
  dataKey = "value",
  title,
  color = "#4cc27d",
  height = 300,
  className = "",
}: ActivityChartProps) {
  const [isClient, setIsClient] = useState(false)
  const [chartData, setChartData] = useState<Array<{ name: string; value: number }>>([])

  useEffect(() => {
    setIsClient(true)
    if (Array.isArray(data) && data.length > 0) {
      setChartData(
        data.map((item) => ({
          name: item.name || item.label || "Item",
          value: Number(item[dataKey]) || 0,
        })),
      )
    }
  }, [data, dataKey])

  if (!isClient) {
    return (
      <div className={`w-full bg-black rounded-lg flex items-center justify-center ${className}`} style={{ height }}>
        <div className="text-gray-500 text-sm">Carregando gráfico...</div>
      </div>
    )
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div
        className={`w-full bg-black rounded-lg flex items-center justify-center border-2 border-dashed border-gray-800 ${className}`}
        style={{ height }}
      >
        <div className="text-gray-400 text-sm">Nenhum dado disponível</div>
      </div>
    )
  }

  const maxValue = Math.max(...chartData.map((item) => item.value))
  const minValue = Math.min(...chartData.map((item) => item.value))

  const BarChart = () => (
    <div className="flex items-end justify-between h-full px-4 pb-8 pt-4">
      {chartData.map((item, index) => {
        const percentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0
        return (
          <div key={index} className="flex flex-col items-center flex-1 mx-1 group">
            <div className="text-xs text-gray-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.value}
            </div>
            <div
              className="w-full rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer"
              style={{
                height: `${Math.max(percentage, 2)}%`,
                backgroundColor: color,
                minHeight: "4px",
              }}
              title={`${item.name}: ${item.value}`}
            />
            <div className="text-xs text-gray-300 mt-2 text-center truncate w-full">{item.name}</div>
          </div>
        )
      })}
    </div>
  )

  const LineChart = () => {
    const points = chartData.map((item, index) => {
      const x = (index / Math.max(chartData.length - 1, 1)) * 90 + 5
      const y = maxValue > 0 ? 90 - (item.value / maxValue) * 70 : 50
      return { x, y, value: item.value, name: item.name }
    })

    const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

    return (
      <div className="relative h-full p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />

          {/* Line */}
          <path d={pathData} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />

          {/* Points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={color}
              stroke="white"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              className="hover:r-4 transition-all cursor-pointer"
            >
              <title>{`${point.name}: ${point.value}`}</title>
            </circle>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-300">
          {chartData.map((item, index) => (
            <span key={index} className="truncate max-w-[60px]" title={item.name}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const AreaChart = () => {
    const points = chartData.map((item, index) => {
      const x = (index / Math.max(chartData.length - 1, 1)) * 90 + 5
      const y = maxValue > 0 ? 90 - (item.value / maxValue) * 70 : 50
      return { x, y, value: item.value, name: item.name }
    })

    const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

    const areaPath = `${pathData} L 95 90 L 5 90 Z`

    return (
      <div className="relative h-full p-4">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`area-gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={color} stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Area */}
          <path
            d={areaPath}
            fill={`url(#area-gradient-${color.replace("#", "")})`}
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          {/* Points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="2"
              fill={color}
              vectorEffect="non-scaling-stroke"
              className="hover:r-3 transition-all cursor-pointer"
            >
              <title>{`${point.name}: ${point.value}`}</title>
            </circle>
          ))}
        </svg>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-300">
          {chartData.map((item, index) => (
            <span key={index} className="truncate max-w-[60px]" title={item.name}>
              {item.name}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return <LineChart />
      case "area":
        return <AreaChart />
      case "bar":
      default:
        return <BarChart />
    }
  }

  return (
    <div className={`w-full bg-black rounded-lg border border-gray-800 shadow-sm ${className}`} style={{ height }}>
      {title && (
        <div className="p-4 border-b border-gray-800 bg-black rounded-t-lg">
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
      )}
      <div className="relative" style={{ height: title ? height - 60 : height }}>
        {renderChart()}
      </div>
    </div>
  )
}

// Exportação nomeada para compatibilidade
export { ActivityChart }
