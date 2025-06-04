"use client"

import type React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Roboto } from "next/font/google"

// Definir a fonte Roboto
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
})

// Definir apenas o tema OLED como padrão
const themeOptions = {
  oled: {
    name: "OLED",
    primary: {
      main: "#22c55e",
      dark: "#16a34a",
      light: "#4ade80",
      contrastText: "#FFFFFF",
      gradient: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
    },
    secondary: {
      main: "#34D399",
      dark: "#10B981",
      light: "#6EE7B7",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E5E5",
    },
    surface: {
      main: "#000000",
      light: "#111111",
    },
  },
}

type ThemeMode = "oled"

interface ThemeContextType {
  mode: ThemeMode
  currentTheme: (typeof themeOptions)[ThemeMode]
  isOledMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "oled",
  currentTheme: themeOptions.oled,
  isOledMode: true,
})

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Return default values instead of throwing error
    return {
      mode: "oled" as ThemeMode,
      currentTheme: themeOptions.oled,
      isOledMode: true,
    }
  }
  return context
}

export function ThemeProvider({
  children,
  onThemeChange,
}: {
  children: React.ReactNode
  onThemeChange?: () => void
}) {
  const [mounted, setMounted] = useState(false)
  const mode: ThemeMode = "oled" // Sempre OLED

  // Efeito para montar o componente no cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = themeOptions[mode]
  const isOledMode = true // Sempre true

  // Cria o tema MUI com base nas preferências
  const theme = useMemo(() => {
    const isLight = false //OLED is always dark

    return createTheme({
      palette: {
        mode: isLight ? "light" : "dark",
        primary: {
          main: currentTheme.primary.main,
          dark: currentTheme.primary.dark,
          light: currentTheme.primary.light,
          contrastText: currentTheme.primary.contrastText,
        },
        secondary: {
          main: currentTheme.secondary.main,
          dark: currentTheme.secondary.dark,
          light: currentTheme.secondary.light,
          contrastText: currentTheme.secondary.contrastText,
        },
        background: {
          default: currentTheme.background.default,
          paper: currentTheme.background.paper,
        },
        text: {
          primary: currentTheme.text.primary,
          secondary: currentTheme.text.secondary,
        },
      },
      typography: {
        fontFamily: roboto.style.fontFamily,
        h1: {
          fontSize: "2.5rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h2: {
          fontSize: "2rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h3: {
          fontSize: "1.75rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h4: {
          fontSize: "1.5rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h5: {
          fontSize: "1.25rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        h6: {
          fontSize: "1.125rem",
          fontWeight: 500,
          lineHeight: 1.2,
        },
        button: {
          textTransform: "none",
        },
      },
      shape: {
        borderRadius: 16,
      },
      components: {
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: currentTheme.primary.gradient,
              color: currentTheme.primary.contrastText,
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              background: currentTheme.primary.gradient,
              color: currentTheme.primary.contrastText,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: currentTheme.background.paper,
              color: currentTheme.text.primary,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "1px",
                background: currentTheme.primary.gradient,
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              },
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 100,
              textTransform: "none",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: currentTheme.background.paper,
              color: currentTheme.text.primary,
            },
          },
        },
      },
    })
  }, [currentTheme])

  // Aplicar variáveis CSS customizadas
  useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      const root = document.documentElement
      root.style.setProperty("--background", "0 0% 0%")
      root.style.setProperty("--foreground", "0 0% 100%")
      root.style.setProperty("--primary", "142.1 70.6% 45.3%")
      root.style.setProperty("--primary-foreground", "144.9 80.4% 10%")
      root.style.setProperty("--secondary", "217.2 32.6% 17.5%")
      root.style.setProperty("--secondary-foreground", "210 40% 98%")
      root.style.setProperty("--muted", "0 0% 15%")
      root.style.setProperty("--muted-foreground", "240 5% 64.9%")
      root.style.setProperty("--accent", "12 6.5% 15.1%")
      root.style.setProperty("--accent-foreground", "0 0% 98%")

      // Novas variáveis para o seletor de alunos
      root.style.setProperty("--surface-container", currentTheme.surface.main)
      root.style.setProperty("--surface-variant", currentTheme.surface.light)
      root.style.setProperty("--outline-variant", "#4B5563")
      root.style.setProperty("--on-surface", currentTheme.text.primary)
      root.style.setProperty("--on-surface-variant", currentTheme.text.secondary)
      root.style.setProperty("--secondary-container", currentTheme.secondary.light)
      root.style.setProperty("--success", "#10B981")
      root.style.setProperty("--error", "#EF4444")

      // Aplicar atributo data-theme
      document.body.setAttribute("data-theme", mode)

      // Aplicar classe OLED se necessário
      if (isOledMode) {
        document.body.classList.add("oled-mode")
      } else {
        document.body.classList.remove("oled-mode")
      }
    }
  }, [currentTheme, mounted, isOledMode, mode])

  const contextValue = useMemo(
    () => ({
      mode,
      currentTheme,
      isOledMode,
    }),
    [mode, currentTheme, isOledMode],
  )

  // Evitar renderização no servidor para prevenir problemas de hidratação
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="h-full bg-background antialiased">
          {children}
        </div>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
