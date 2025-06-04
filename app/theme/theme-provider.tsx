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

// Definir temas com OLED escuro aprimorado
const themeOptions = {
  light: {
    name: "Light",
    primary: {
      main: "#10B981",
      dark: "#059669",
      light: "#34D399",
      contrastText: "#FFFFFF",
      gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    },
    secondary: {
      main: "#34D399",
      dark: "#10B981",
      light: "#6EE7B7",
      contrastText: "#000000",
    },
    background: {
      default: "#F8F9FA",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
    },
    surface: {
      main: "#FFFFFF",
      light: "#F3F4F6",
    },
  },
  dark: {
    name: "OLED Dark",
    primary: {
      main: "#4ADE80",
      dark: "#22C55E",
      light: "#86EFAC",
      contrastText: "#000000",
      gradient: "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
    },
    secondary: {
      main: "#60A5FA",
      dark: "#3B82F6",
      light: "#93C5FD",
      contrastText: "#000000",
    },
    background: {
      default: "#000000",
      paper: "#000000",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#E5E7EB",
    },
    surface: {
      main: "#000000",
      light: "#111111",
    },
  },
}

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  mode: ThemeMode
  toggleMode: () => void
  currentTheme: (typeof themeOptions)[ThemeMode]
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark", // Padrão OLED escuro
  toggleMode: () => {},
  currentTheme: themeOptions.dark,
  isDarkMode: true,
})

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    return {
      mode: "dark" as ThemeMode,
      toggleMode: () => {},
      currentTheme: themeOptions.dark,
      isDarkMode: true,
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
  const [mode, setMode] = useState<ThemeMode>("dark") // Padrão OLED escuro

  // Efeito para montar o componente no cliente
  useEffect(() => {
    setMounted(true)
    // Carregar tema salvo do localStorage, mas manter dark como padrão
    const savedTheme = localStorage.getItem("theme") as ThemeMode
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setMode(savedTheme)
    } else {
      // Se não há tema salvo, usar dark como padrão
      setMode("dark")
      localStorage.setItem("theme", "dark")
    }
  }, [])

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("theme", newMode)
    onThemeChange?.()
  }

  const currentTheme = themeOptions[mode]
  const isDarkMode = mode === "dark"

  // Cria o tema MUI com base nas preferências
  const theme = useMemo(() => {
    const isLight = mode === "light"

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
              background: currentTheme.background.paper,
              color: currentTheme.text.primary,
              borderBottom: isDarkMode ? "1px solid #1F2937" : "1px solid #E5E7EB",
            },
          },
        },
        MuiDrawer: {
          styleOverrides: {
            paper: {
              background: currentTheme.background.paper,
              color: currentTheme.text.primary,
              borderRight: isDarkMode ? "1px solid #1F2937" : "1px solid #E5E7EB",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundColor: currentTheme.background.paper,
              color: currentTheme.text.primary,
              border: isDarkMode ? "1px solid #1F2937" : "1px solid #E5E7EB",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 12,
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
  }, [currentTheme, mode, isDarkMode])

  // Aplicar variáveis CSS customizadas
  useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      const root = document.documentElement

      // Cores principais
      root.style.setProperty("--primary-color", currentTheme.primary.main)
      root.style.setProperty("--secondary-color", currentTheme.secondary.main)
      root.style.setProperty("--background-default", currentTheme.background.default)
      root.style.setProperty("--background-paper", currentTheme.background.paper)
      root.style.setProperty("--text-primary", currentTheme.text.primary)
      root.style.setProperty("--text-secondary", currentTheme.text.secondary)
      root.style.setProperty("--primary-gradient", currentTheme.primary.gradient)
      root.style.setProperty("--surface-main", currentTheme.surface.main)
      root.style.setProperty("--surface-light", currentTheme.surface.light)

      // Variáveis específicas para componentes
      root.style.setProperty("--surface-container", currentTheme.surface.main)
      root.style.setProperty("--surface-variant", currentTheme.surface.light)
      root.style.setProperty("--outline-variant", isDarkMode ? "#374151" : "#D1D5DB")
      root.style.setProperty("--on-surface", currentTheme.text.primary)
      root.style.setProperty("--on-surface-variant", currentTheme.text.secondary)
      root.style.setProperty("--secondary-container", isDarkMode ? "#1F2937" : currentTheme.secondary.light)
      root.style.setProperty("--success", "#4ADE80")
      root.style.setProperty("--error", "#EF4444")
      root.style.setProperty("--warning", "#F59E0B")

      // Bordas e divisores
      root.style.setProperty("--border-color", isDarkMode ? "#374151" : "#E5E7EB")
      root.style.setProperty("--divider-color", isDarkMode ? "#1F2937" : "#F3F4F6")

      // Aplicar atributo data-theme
      document.body.setAttribute("data-theme", mode)

      // Aplicar classes CSS
      if (isDarkMode) {
        document.body.classList.add("dark-mode", "oled-mode")
        document.body.classList.remove("light-mode")
      } else {
        document.body.classList.add("light-mode")
        document.body.classList.remove("dark-mode", "oled-mode")
      }
    }
  }, [currentTheme, mounted, isDarkMode, mode])

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode,
      currentTheme,
      isDarkMode,
    }),
    [mode, currentTheme, isDarkMode],
  )

  // Evitar renderização no servidor para prevenir problemas de hidratação
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
