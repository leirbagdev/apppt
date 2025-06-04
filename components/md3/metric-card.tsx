import type React from "react"
import type { IconType } from "react-icons"

interface MetricCardProps {
  title: string
  value: string | number
  icon: IconType
  iconColor?: string
  description?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, iconColor = "white", description }) => {
  return (
    <div className="bg-black border border-gray-800 rounded-2xl p-6 text-white hover:border-gray-700 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <Icon size={32} color={iconColor} />
        <div>
          <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
      {description && <p className="mt-2 text-sm text-gray-400">{description}</p>}
    </div>
  )
}

export default MetricCard
