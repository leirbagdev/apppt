"use client"

import type React from "react"

import { useState } from "react"
import Box from "@mui/material/Box"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialIcon from "@mui/material/SpeedDialIcon"
import SpeedDialAction from "@mui/material/SpeedDialAction"
import { styled } from "@mui/material/styles"

// Estilizando o SpeedDial para seguir o Material Design 3
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "fixed",
  "&.MuiSpeedDial-root": {
    "& .MuiFab-primary": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}))

const StyledSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  "& .MuiFab-primary": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))

interface FabSpeedDialProps {
  actions: Array<{
    icon: React.ReactNode
    name: string
    onClick: () => void
  }>
  position?: {
    bottom?: number | string
    right?: number | string
    top?: number | string
    left?: number | string
  }
  icon?: React.ReactNode
  color?: "primary" | "secondary" | "default"
}

export default function FabSpeedDial({
  actions,
  position = { bottom: 24, right: 24 },
  icon,
  color = "primary",
}: FabSpeedDialProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial"
        sx={{
          ...position,
        }}
        icon={icon || <SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        color={color}
      >
        {actions.map((action) => (
          <StyledSpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose()
              action.onClick()
            }}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  )
}
