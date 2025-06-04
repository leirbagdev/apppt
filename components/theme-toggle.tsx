"use client"

import { Switch } from "@mui/material"
import { useTheme } from "@/app/theme/theme-provider"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { mode, toggleMode, isDarkMode } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <Sun className={`w-5 h-5 transition-colors ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`} />
      <Switch
        checked={isDarkMode}
        onChange={toggleMode}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": {
            color: "#10B981",
            "&:hover": {
              backgroundColor: "rgba(16, 185, 129, 0.08)",
            },
          },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#10B981",
          },
        }}
      />
      <Moon className={`w-5 h-5 transition-colors ${isDarkMode ? "text-blue-400" : "text-gray-400"}`} />
    </div>
  )
}
