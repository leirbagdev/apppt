"use client"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { useTheme as useMuiTheme } from "@mui/material/styles"

interface ThemePreviewProps {
  paletteName: string
  onClick?: () => void
  selected?: boolean
}

export default function ThemePreview({ paletteName, onClick, selected = false }: ThemePreviewProps) {
  const theme = useMuiTheme()

  // Obter as cores da paleta atual
  const getPaletteColors = () => {
    // Esta é uma simplificação - na implementação real, você obteria as cores da paleta específica
    return {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      background: theme.palette.background.default,
      paper: theme.palette.background.paper,
      text: theme.palette.text.primary,
    }
  }

  const colors = getPaletteColors()

  return (
    <Paper
      elevation={selected ? 8 : 1}
      sx={{
        p: 1.5,
        cursor: "pointer",
        border: selected ? `2px solid ${theme.palette.primary.main}` : "2px solid transparent",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
      }}
      onClick={onClick}
    >
      <Typography variant="subtitle2" gutterBottom>
        {paletteName}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box
            sx={{
              height: 24,
              bgcolor: colors.primary,
              borderRadius: 1,
              mb: 0.5,
            }}
          />
          <Box
            sx={{
              height: 24,
              bgcolor: colors.secondary,
              borderRadius: 1,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              height: 48,
              bgcolor: colors.background,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "70%",
                height: "70%",
                bgcolor: colors.paper,
                borderRadius: 0.5,
                border: `1px solid ${theme.palette.divider}`,
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}
