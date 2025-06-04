"use client"
import { useTheme } from "@/app/theme/theme-provider"
import { Card, CardContent } from "@/components/md3/card"

export function ThemeSelector() {
  const { currentTheme } = useTheme()

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Tema da Interface</h3>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-surface-main">
          <div className="w-4 h-4 rounded-full bg-primary-color"></div>
          <div>
            <p className="font-medium text-text-primary">OLED Mode</p>
            <p className="text-sm text-text-secondary">Otimizado para economia de bateria</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
