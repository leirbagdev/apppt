"use client"

import { lazy } from "react"

// Componentes da UI Material Design 3
export const MobileFilterSheet = lazy(() => import("@/components/md3/mobile-filter-sheet"))
export const ActivityChart = lazy(() => import("@/components/md3/activity-chart"))
export const ActivityHeatmap = lazy(() => import("@/components/md3/activity-heatmap"))
export const MetricCard = lazy(() => import("@/components/md3/metric-card"))
export const MacroChart = lazy(() => import("@/components/md3/macro-chart"))
export const PieChart = lazy(() => import("@/components/md3/pie-chart"))
export const HealthStatCard = lazy(() => import("@/components/md3/health-stat-card"))
export const RecommendationCard = lazy(() => import("@/components/md3/recommendation-card"))

// Componentes de Animação
export const AnimatedCounter = lazy(() => import("@/components/animations/animated-counter"))
export const FloatingElements = lazy(() => import("@/components/animations/floating-elements"))
export const MagneticButton = lazy(() => import("@/components/animations/magnetic-button"))
export const StaggerContainer = lazy(() => import("@/components/animations/stagger-container"))

// Componentes de Performance
export const PerformanceWidget = lazy(() => import("@/components/performance-widget"))
export const PerformanceMonitor = lazy(() => import("@/components/performance-monitor"))
export const PerformanceOptimizedImage = lazy(() => import("@/components/performance-optimized-image"))
