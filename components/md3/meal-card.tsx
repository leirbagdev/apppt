"use client"

import React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Chip from "@mui/material/Chip"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import { alpha } from "@mui/material/styles"
import { motion } from "framer-motion"

// Icons
import EditIcon from "@mui/icons-material/Edit"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

interface Food {
  name: string
  quantity: string
  calories: number
  protein?: number
  carbs?: number
  fat?: number
}

interface MealCardProps {
  meal: string
  time: string
  foods: Food[]
  totalCalories: number
  macros: {
    protein: string
    carbs: string
    fat: string
  }
  onEdit?: () => void
  onCopy?: () => void
  onMore?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function MealCard({ meal, time, foods, totalCalories, macros, onEdit, onCopy, onMore }: MealCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        height: "100%",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="h6" component="div" gutterBottom>
              {meal}
            </Typography>
            <Chip
              icon={<AccessTimeIcon fontSize="small" />}
              label={time}
              size="small"
              sx={{ borderRadius: 3, bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton size="small" onClick={onEdit} sx={{ color: "primary.main" }}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onCopy} sx={{ color: "primary.main" }}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={onMore} sx={{ color: "primary.main" }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <List disablePadding>
          {foods.map((food, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemText
                  primary={food.name}
                  secondary={food.quantity}
                  primaryTypographyProps={{ variant: "body2" }}
                  secondaryTypographyProps={{ variant: "caption" }}
                />
                <Typography variant="body2">{food.calories} kcal</Typography>
              </ListItem>
              {index < foods.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Total de Calorias
            </Typography>
            <Typography variant="caption" fontWeight="medium">
              {totalCalories} kcal
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              Macros
            </Typography>
            <Typography variant="caption" fontWeight="medium">
              P: {macros.protein} | C: {macros.carbs} | G: {macros.fat}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
