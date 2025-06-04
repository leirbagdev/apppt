"use client"
import { Box, Card, CardContent, Typography, Grid } from "@mui/material"
import CompactThemeSelector from "./compact-theme-selector"

export default function ThemeDemo() {
  return (
    <Card sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Demonstração do Tema</Typography>
          <CompactThemeSelector />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Cartão Exemplo
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Este cartão demonstra como as cores do tema são aplicadas aos componentes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Outro Cartão
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Observe como as cores mudam quando você seleciona diferentes paletas e modos.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, p: 2, backgroundColor: "action.hover", borderRadius: 1 }}>
          <Typography variant="body2" color="text.secondary">
            💡 <strong>Dica:</strong> Clique no ícone de paleta no header para personalizar o tema. Você pode escolher
            entre 4 modos de exibição e 8 paletas de cores diferentes!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
