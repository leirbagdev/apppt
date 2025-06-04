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
}: {
  children: React.ReactNode
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
      root.style.setProperty("--primary-color", currentTheme.primary.main)
      root.style.setProperty("--secondary-color", currentTheme.secondary.main)
      root.style.setProperty("--background-default", currentTheme.background.default)
      root.style.setProperty("--background-paper", currentTheme.background.paper)
      root.style.setProperty("--text-primary", currentTheme.text.primary)
      root.style.setProperty("--text-secondary", currentTheme.text.secondary)
      root.style.setProperty("--primary-gradient", currentTheme.primary.gradient)
      root.style.setProperty("--surface-main", currentTheme.surface.main)
      root.style.setProperty("--surface-light", currentTheme.surface.light)

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
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
