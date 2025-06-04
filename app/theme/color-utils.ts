// Função para ajustar a luminosidade de uma cor
export function adjustBrightness(hex: string, percent: number): string {
  // Verificar se hex é uma string válida
  if (typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) {
    return "#000000" // Retornar preto como fallback
  }

  try {
    // Converte hex para RGB
    let r = Number.parseInt(hex.substring(1, 3), 16)
    let g = Number.parseInt(hex.substring(3, 5), 16)
    let b = Number.parseInt(hex.substring(5, 7), 16)

    // Ajusta a luminosidade
    r = Math.min(255, Math.max(0, Math.round(r * (1 + percent / 100))))
    g = Math.min(255, Math.max(0, Math.round(g * (1 + percent / 100))))
    b = Math.min(255, Math.max(0, Math.round(b * (1 + percent / 100))))

    // Converte de volta para hex
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  } catch (error) {
    console.error("Error adjusting brightness:", error)
    return "#000000" // Retornar preto como fallback
  }
}

// Função para gerar uma paleta de cores a partir de uma cor primária
export function generatePalette(primaryColor: string) {
  // Verificar se primaryColor é uma string válida
  if (typeof primaryColor !== "string" || !primaryColor.startsWith("#")) {
    primaryColor = "#4CAF50" // Usar verde como cor padrão
  }

  try {
    // Gera variações da cor primária
    const primaryLight = adjustBrightness(primaryColor, 20)
    const primaryDark = adjustBrightness(primaryColor, -20)

    // Gera uma cor secundária complementar (180 graus no círculo cromático)
    // Esta é uma simplificação, uma implementação mais robusta usaria conversão HSL
    const r = Number.parseInt(primaryColor.substring(1, 3), 16)
    const g = Number.parseInt(primaryColor.substring(3, 5), 16)
    const b = Number.parseInt(primaryColor.substring(5, 7), 16)

    // Cor complementar aproximada
    const secondaryR = 255 - r
    const secondaryG = 255 - g
    const secondaryB = 255 - b

    const secondaryColor = `#${secondaryR.toString(16).padStart(2, "0")}${secondaryG.toString(16).padStart(2, "0")}${secondaryB.toString(16).padStart(2, "0")}`
    const secondaryLight = adjustBrightness(secondaryColor, 20)
    const secondaryDark = adjustBrightness(secondaryColor, -20)

    return {
      primary: {
        main: primaryColor,
        light: primaryLight,
        dark: primaryDark,
        contrastText: isLightColor(primaryColor) ? "#000000" : "#ffffff",
      },
      secondary: {
        main: secondaryColor,
        light: secondaryLight,
        dark: secondaryDark,
        contrastText: isLightColor(secondaryColor) ? "#000000" : "#ffffff",
      },
    }
  } catch (error) {
    console.error("Error generating palette:", error)
    // Retornar uma paleta padrão em caso de erro
    return {
      primary: {
        main: "#4CAF50",
        light: "#80E27E",
        dark: "#087F23",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#9C27B0",
        light: "#D05CE3",
        dark: "#6A0080",
        contrastText: "#FFFFFF",
      },
    }
  }
}

// Função para determinar se uma cor é clara ou escura
export function isLightColor(hex: string): boolean {
  try {
    // Verificar se hex é uma string válida
    if (typeof hex !== "string" || !hex.startsWith("#") || hex.length !== 7) {
      return false
    }

    const r = Number.parseInt(hex.substring(1, 3), 16)
    const g = Number.parseInt(hex.substring(3, 5), 16)
    const b = Number.parseInt(hex.substring(5, 7), 16)

    // Fórmula de luminosidade percebida
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5
  } catch (error) {
    console.error("Error checking if color is light:", error)
    return false
  }
}

// Função para gerar cores de tema com base no modo e cor primária
export function generateThemeColors(mode: "light" | "dark", primaryColor: string) {
  try {
    const palette = generatePalette(primaryColor)

    if (mode === "light") {
      return {
        mode: "light",
        primary: palette.primary,
        secondary: palette.secondary,
        background: {
          default: "#f8f9fa",
          paper: "#ffffff",
        },
        text: {
          primary: "rgba(0, 0, 0, 0.87)",
          secondary: "rgba(0, 0, 0, 0.6)",
        },
      }
    } else {
      return {
        mode: "dark",
        primary: {
          ...palette.primary,
          main: palette.primary.light, // Usar uma versão mais clara no modo escuro
        },
        secondary: {
          ...palette.secondary,
          main: palette.secondary.light, // Usar uma versão mais clara no modo escuro
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
        text: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.7)",
        },
      }
    }
  } catch (error) {
    console.error("Error generating theme colors:", error)
    // Retornar um tema padrão em caso de erro
    return {
      mode,
      primary: {
        main: "#4CAF50",
        light: "#80E27E",
        dark: "#087F23",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#9C27B0",
        light: "#D05CE3",
        dark: "#6A0080",
        contrastText: "#FFFFFF",
      },
      background: {
        default: mode === "light" ? "#f8f9fa" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
      text: {
        primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#ffffff",
        secondary: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.7)",
      },
    }
  }
}

// Função para gerar estilos de componentes com base no tema
export function generateComponentStyles(mode: "light" | "dark", primaryColor: string) {
  const isLight = mode === "light"

  // Garantir que primaryColor seja uma string válida
  if (typeof primaryColor !== "string" || !primaryColor.startsWith("#")) {
    primaryColor = "#4CAF50" // Usar verde como cor padrão
  }

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: "none",
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: isLight ? "0px 2px 8px rgba(0, 0, 0, 0.08)" : "0px 2px 8px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 100,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
        },
        switchBase: {
          padding: 1,
          "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: primaryColor,
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          opacity: 0.38,
        },
      },
    },
  }
}
