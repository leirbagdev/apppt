"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Drawer from "@mui/material/Drawer"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Tooltip from "@mui/material/Tooltip"
import Collapse from "@mui/material/Collapse"
import Link from "next/link"
import PageTransition from "@/components/md3/page-transition"
import ErrorBoundary from "@/lib/error-boundary"
import { useMobile } from "@/hooks/use-mobile"

// Importar nossos patches
import "@/lib/error-handling"

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard"
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"
import PeopleIcon from "@mui/icons-material/People"
import SettingsIcon from "@mui/icons-material/Settings"
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"

// Largura do drawer
const drawerWidth = 240
const miniDrawerWidth = 60

// Itens do menu
const menuItems = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { name: "Clients", icon: <PeopleIcon />, path: "/dashboard/students" },
  { name: "Playground", icon: <FitnessCenterIcon />, path: "/dashboard/exercise-library" },
  { name: "Tracker", icon: <HealthAndSafetyIcon />, path: "/dashboard/health-metrics" },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(true)
  const pathname = usePathname()
  const isMobile = useMobile()

  // Carregar preferência do drawer do localStorage
  useEffect(() => {
    try {
      const savedDrawerState = localStorage.getItem("drawerOpen")
      if (savedDrawerState !== null) {
        setDrawerOpen(JSON.parse(savedDrawerState))
      }
    } catch (error) {
      console.error("Erro ao carregar preferências:", error)
    }
  }, [])

  // Salvar preferência do drawer no localStorage
  useEffect(() => {
    try {
      localStorage.setItem("drawerOpen", JSON.stringify(drawerOpen))
    } catch (error) {
      console.error("Erro ao salvar preferências:", error)
    }
  }, [drawerOpen])

  // Desabilitar transições durante a montagem inicial
  useEffect(() => {
    document.body.classList.add("no-transition")

    const timer = setTimeout(() => {
      document.body.classList.remove("no-transition")
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const currentDrawerWidth = drawerOpen ? drawerWidth : miniDrawerWidth

  const drawer = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header do Drawer */}
      <Toolbar sx={{ justifyContent: drawerOpen ? "space-between" : "center", py: 1 }}>
        {drawerOpen && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src="/images/apt-logo.svg" alt="APT Logo" style={{ width: 32, height: 32 }} />
          </Box>
        )}
        {!drawerOpen && <img src="/images/apt-logo.svg" alt="APT Logo" style={{ width: 24, height: 24 }} />}
        <IconButton onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}>
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>

      <Divider />

      {/* Menu Principal */}
      <Box sx={{ flexGrow: 1 }}>
        <List sx={{ px: 1 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <Link href={item.path} style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
                  <Tooltip title={!drawerOpen ? item.name : ""} placement="right">
                    <ListItemButton
                      selected={pathname === item.path}
                      sx={{
                        minHeight: 48,
                        justifyContent: drawerOpen ? "initial" : "center",
                        px: 2.5,
                        borderRadius: 2,
                        mx: 1,
                        background: isActive
                          ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 70%, transparent 100%)"
                          : "transparent",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          background: isActive
                            ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 70%, transparent 100%)"
                            : "radial-gradient(circle at center, rgba(74, 222, 128, 0.04) 0%, transparent 70%)",
                        },
                        "&::before": isActive
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: "50%",
                              transform: "translateY(-50%)",
                              width: 3,
                              height: 24,
                              background: "linear-gradient(180deg, transparent 0%, #4ade80 50%, transparent 100%)",
                              borderRadius: "0 2px 2px 0",
                              filter: "blur(0.5px)",
                            }
                          : {},
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: drawerOpen ? 3 : "auto",
                          justifyContent: "center",
                          color: "#4ade80",
                          filter: isActive
                            ? "drop-shadow(0 0 4px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 8px rgba(74, 222, 128, 0.2))"
                            : "none",
                          borderRadius: "12px",
                          padding: "6px",
                          background: isActive
                            ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)"
                            : "transparent",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: isActive ? "scale(1.05)" : "scale(1)",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <Collapse in={drawerOpen} orientation="horizontal">
                        <ListItemText
                          primary={item.name}
                          sx={{
                            "& .MuiListItemText-primary": {
                              color: isActive ? "#4ade80" : "#d1d5db",
                              fontWeight: isActive ? 600 : 400,
                              textShadow: isActive
                                ? "0 0 4px rgba(74, 222, 128, 0.3), 0 0 8px rgba(74, 222, 128, 0.1)"
                                : "none",
                              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            },
                          }}
                        />
                      </Collapse>
                    </ListItemButton>
                  </Tooltip>
                </Link>
              </ListItem>
            )
          })}
        </List>

        <Divider sx={{ mx: 2, borderColor: "rgba(74, 222, 128, 0.1)" }} />

        {/* Configurações com o mesmo estilo */}
        <List sx={{ px: 1 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <Link href="/dashboard/settings" style={{ width: "100%", textDecoration: "none", color: "inherit" }}>
              <Tooltip title={!drawerOpen ? "Settings" : ""} placement="right">
                <ListItemButton
                  selected={pathname === "/dashboard/settings"}
                  sx={{
                    minHeight: 48,
                    justifyContent: drawerOpen ? "initial" : "center",
                    px: 2.5,
                    borderRadius: 2,
                    mx: 1,
                    background:
                      pathname === "/dashboard/settings"
                        ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 70%, transparent 100%)"
                        : "transparent",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background:
                        pathname === "/dashboard/settings"
                          ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 70%, transparent 100%)"
                          : "radial-gradient(circle at center, rgba(74, 222, 128, 0.04) 0%, transparent 70%)",
                    },
                    "&::before":
                      pathname === "/dashboard/settings"
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: 3,
                            height: 24,
                            background: "linear-gradient(180deg, transparent 0%, #4ade80 50%, transparent 100%)",
                            borderRadius: "0 2px 2px 0",
                            filter: "blur(0.5px)",
                          }
                        : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerOpen ? 3 : "auto",
                      justifyContent: "center",
                      color: "#4ade80",
                      filter:
                        pathname === "/dashboard/settings"
                          ? "drop-shadow(0 0 4px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 8px rgba(74, 222, 128, 0.2))"
                          : "none",
                      borderRadius: "12px",
                      padding: "6px",
                      background:
                        pathname === "/dashboard/settings"
                          ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)"
                          : "transparent",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: pathname === "/dashboard/settings" ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <SettingsIcon />
                  </ListItemIcon>
                  <Collapse in={drawerOpen} orientation="horizontal">
                    <ListItemText
                      primary="Settings"
                      sx={{
                        "& .MuiListItemText-primary": {
                          color: pathname === "/dashboard/settings" ? "#4ade80" : "#d1d5db",
                          fontWeight: pathname === "/dashboard/settings" ? 600 : 400,
                          textShadow:
                            pathname === "/dashboard/settings"
                              ? "0 0 4px rgba(74, 222, 128, 0.3), 0 0 8px rgba(74, 222, 128, 0.1)"
                              : "none",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        },
                      }}
                    />
                  </Collapse>
                </ListItemButton>
              </Tooltip>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  )

  // Layout para mobile com bottom navigation
  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <CssBaseline />

        {/* Conteúdo principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            pb: 10, // Espaço para o bottom navigation
            overflow: "auto",
          }}
        >
          <ErrorBoundary>
            <PageTransition>{children}</PageTransition>
          </ErrorBoundary>
        </Box>

        {/* Bottom Navigation fixo com efeito neon refinado */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(74, 222, 128, 0.1)",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 8px",
            zIndex: 1000,
            boxShadow: "0 -8px 32px rgba(0, 0, 0, 0.8), 0 0 1px rgba(74, 222, 128, 0.2)",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(ellipse at center top, rgba(74, 222, 128, 0.03) 0%, transparent 70%)",
              pointerEvents: "none",
            },
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: "16px",
                minWidth: "60px",
                position: "relative",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                background:
                  pathname === item.path
                    ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 70%, transparent 100%)"
                    : "transparent",
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background =
                    "radial-gradient(circle at center, rgba(74, 222, 128, 0.04) 0%, transparent 70%)"
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.path) {
                  e.currentTarget.style.background = "transparent"
                }
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  opacity: pathname === item.path ? 1 : 0.7,
                  transform: pathname === item.path ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Indicador ativo refinado */}
                {pathname === item.path && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -6,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 24,
                      height: 2,
                      background: "linear-gradient(90deg, transparent 0%, #4ade80 50%, transparent 100%)",
                      borderRadius: 2,
                      filter: "blur(0.5px)",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 12,
                        height: 2,
                        backgroundColor: "#4ade80",
                        borderRadius: 2,
                        filter: "blur(0px)",
                      },
                    }}
                  />
                )}

                {/* Ícone com glow sutil */}
                <Box
                  sx={{
                    fontSize: 22,
                    mb: 0.5,
                    color: "#4ade80",
                    filter:
                      pathname === item.path
                        ? "drop-shadow(0 0 4px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 8px rgba(74, 222, 128, 0.2))"
                        : "none",
                    borderRadius: "12px",
                    padding: "6px",
                    background:
                      pathname === item.path
                        ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)"
                        : "transparent",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.icon}
                </Box>

                {/* Label com glow refinado */}
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: 9,
                    fontWeight: pathname === item.path ? 600 : 400,
                    textAlign: "center",
                    lineHeight: 1,
                    color: pathname === item.path ? "#4ade80" : "#d1d5db",
                    textShadow:
                      pathname === item.path
                        ? "0 0 4px rgba(74, 222, 128, 0.3), 0 0 8px rgba(74, 222, 128, 0.1)"
                        : "none",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.name}
                </Typography>
              </Box>
            </Link>
          ))}

          {/* Configurações com efeito refinado */}
          <Link
            href="/dashboard/settings"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "8px 12px",
              borderRadius: "16px",
              minWidth: "60px",
              position: "relative",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              background:
                pathname === "/dashboard/settings"
                  ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 70%, transparent 100%)"
                  : "transparent",
            }}
            onMouseEnter={(e) => {
              if (pathname !== "/dashboard/settings") {
                e.currentTarget.style.background =
                  "radial-gradient(circle at center, rgba(74, 222, 128, 0.04) 0%, transparent 70%)"
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== "/dashboard/settings") {
                e.currentTarget.style.background = "transparent"
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                opacity: pathname === "/dashboard/settings" ? 1 : 0.7,
                transform: pathname === "/dashboard/settings" ? "scale(1.05)" : "scale(1)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {pathname === "/dashboard/settings" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 24,
                    height: 2,
                    background: "linear-gradient(90deg, transparent 0%, #4ade80 50%, transparent 100%)",
                    borderRadius: 2,
                    filter: "blur(0.5px)",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 12,
                      height: 2,
                      backgroundColor: "#4ade80",
                      borderRadius: 2,
                      filter: "blur(0px)",
                    },
                  }}
                />
              )}

              <Box
                sx={{
                  fontSize: 22,
                  mb: 0.5,
                  color: "#4ade80",
                  filter:
                    pathname === "/dashboard/settings"
                      ? "drop-shadow(0 0 4px rgba(74, 222, 128, 0.4)) drop-shadow(0 0 8px rgba(74, 222, 128, 0.2))"
                      : "none",
                  borderRadius: "12px",
                  padding: "6px",
                  background:
                    pathname === "/dashboard/settings"
                      ? "radial-gradient(circle at center, rgba(74, 222, 128, 0.06) 0%, transparent 70%)"
                      : "transparent",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <SettingsIcon />
              </Box>

              <Typography
                variant="caption"
                sx={{
                  fontSize: 9,
                  fontWeight: pathname === "/dashboard/settings" ? 600 : 400,
                  textAlign: "center",
                  lineHeight: 1,
                  color: pathname === "/dashboard/settings" ? "#4ade80" : "#d1d5db",
                  textShadow:
                    pathname === "/dashboard/settings"
                      ? "0 0 4px rgba(74, 222, 128, 0.3), 0 0 8px rgba(74, 222, 128, 0.1)"
                      : "none",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Settings
              </Typography>
            </Box>
          </Link>
        </Box>
      </Box>
    )
  }

  // Layout para desktop com drawer lateral
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Box
        component="nav"
        sx={{ width: { sm: currentDrawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Drawer para dispositivos móveis */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Melhor desempenho em dispositivos móveis
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer permanente para desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: currentDrawerWidth,
              background: "linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
              backdropFilter: "blur(20px)",
              borderRight: "1px solid rgba(74, 222, 128, 0.1)",
              boxShadow: "8px 0 32px rgba(0, 0, 0, 0.8), 0 0 1px rgba(74, 222, 128, 0.2)",
              transition: (theme) =>
                theme.transitions.create("width", {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              overflowX: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "radial-gradient(ellipse at center left, rgba(74, 222, 128, 0.03) 0%, transparent 70%)",
                pointerEvents: "none",
              },
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <ErrorBoundary>
          <PageTransition>{children}</PageTransition>
        </ErrorBoundary>
      </Box>
    </Box>
  )
}
