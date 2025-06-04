"use client"

import { useState, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"

// Componentes básicos (carregamento imediato)
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"
import { Fab } from "@/components/md3/fab"

// Componentes UI
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Ícones
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  Target,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react"

// Lazy loading dos componentes pesados
const MobileFilterSheet = lazy(() =>
  import("@/components/md3/mobile-filter-sheet").then((module) => ({
    default: module.MobileFilterSheet,
  })),
)
const MobileFilterTrigger = lazy(() =>
  import("@/components/md3/mobile-filter-sheet").then((module) => ({
    default: module.MobileFilterTrigger,
  })),
)

// Loading components
const FilterSkeleton = () => <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>

const CardSkeleton = () => <div className="h-[200px] bg-muted rounded-lg animate-pulse"></div>

// Tipos
interface Workout {
  id: number
  title: string
  type: string
  duration: string
  difficulty: string
  assignedTo: string[]
  status: "active" | "completed" | "paused" | "scheduled"
  progress: number
  lastSession?: string
  nextSession?: string
  exercises: number
  tags: string[]
}

export default function Workouts() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Dados mockados dos treinos
  const workouts: Workout[] = [
    {
      id: 1,
      title: "Hipertrofia Superior - Leandro",
      type: "Musculação",
      duration: "60 min",
      difficulty: "Intermediário",
      assignedTo: ["Leandro Silva"],
      status: "active",
      progress: 75,
      lastSession: "2025-05-10",
      nextSession: "2025-05-12",
      exercises: 8,
      tags: ["hipertrofia", "força"],
    },
    {
      id: 2,
      title: "Funcional HIIT - Mario",
      type: "Funcional",
      duration: "45 min",
      difficulty: "Avançado",
      assignedTo: ["Mario Lenon"],
      status: "active",
      progress: 60,
      lastSession: "2025-05-09",
      nextSession: "2025-05-11",
      exercises: 12,
      tags: ["hiit", "cardio"],
    },
    {
      id: 3,
      title: "Reabilitação Joelho - Otávio",
      type: "Reabilitação",
      duration: "30 min",
      difficulty: "Iniciante",
      assignedTo: ["Otávio Martins"],
      status: "paused",
      progress: 40,
      lastSession: "2025-05-05",
      exercises: 6,
      tags: ["reabilitação", "joelho"],
    },
    {
      id: 4,
      title: "Programa Emagrecimento - Ana",
      type: "Cardio",
      duration: "50 min",
      difficulty: "Intermediário",
      assignedTo: ["Ana Carolina"],
      status: "scheduled",
      progress: 0,
      nextSession: "2025-05-13",
      exercises: 10,
      tags: ["emagrecimento", "cardio"],
    },
    {
      id: 5,
      title: "Força Powerlifting - Roberto",
      type: "Musculação",
      duration: "90 min",
      difficulty: "Avançado",
      assignedTo: ["Roberto Gomes"],
      status: "completed",
      progress: 100,
      lastSession: "2025-05-08",
      exercises: 5,
      tags: ["força", "powerlifting"],
    },
  ]

  // Função para filtrar treinos
  const filterWorkouts = (workouts: Workout[], status?: string) => {
    return workouts
      .filter((workout) => {
        // Filtro por status da aba
        if (status && workout.status !== status) {
          return false
        }

        // Filtro de busca
        if (
          searchTerm &&
          !workout.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !workout.assignedTo.some((student) => student.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !workout.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return false
        }

        // Filtro de tipo
        if (filterType !== "all" && workout.type !== filterType) {
          return false
        }

        // Filtro de dificuldade
        if (filterDifficulty !== "all" && workout.difficulty !== filterDifficulty) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.lastSession || "").getTime() - new Date(a.lastSession || "").getTime()
          case "progress":
            return b.progress - a.progress
          case "name":
            return a.title.localeCompare(b.title)
          default:
            return 0
        }
      })
  }

  // Função para obter cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200"
      case "completed":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "paused":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "scheduled":
        return "text-purple-600 bg-purple-50 border-purple-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  // Função para obter ícone do status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "scheduled":
        return <Calendar className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  // Renderizar card de treino (otimizado)
  const renderWorkoutCard = (workout: Workout) => (
    <Card
      key={workout.id}
      className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/dashboard/workouts/${workout.id}`)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-medium line-clamp-2">{workout.title}</h3>
          <div
            className={`px-2 py-1 rounded-full text-xs border flex items-center gap-1 ${getStatusColor(workout.status)}`}
          >
            {getStatusIcon(workout.status)}
            {workout.status === "active" && "Ativo"}
            {workout.status === "completed" && "Concluído"}
            {workout.status === "paused" && "Pausado"}
            {workout.status === "scheduled" && "Agendado"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Chip variant="assist" size="sm">
            {workout.type}
          </Chip>
          <Chip variant="assist" size="sm">
            {workout.difficulty}
          </Chip>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {workout.duration} • {workout.exercises} exercícios
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            {workout.assignedTo.join(", ")}
          </div>
        </div>

        {workout.status !== "scheduled" && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progresso</span>
              <span>{workout.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${workout.progress}%` }} />
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          {workout.lastSession && <div>Última sessão: {new Date(workout.lastSession).toLocaleDateString("pt-BR")}</div>}
          {workout.nextSession && (
            <div>Próxima sessão: {new Date(workout.nextSession).toLocaleDateString("pt-BR")}</div>
          )}
        </div>
      </div>

      <div className="border-t p-2 bg-muted/30 flex justify-between">
        <div className="flex gap-1">
          <Button variant="text" size="icon" title="Visualizar">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="text" size="icon" title="Editar">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="text" size="icon" title="Duplicar">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="text" size="icon" title="Excluir">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Treinos</h1>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full md:w-[200px] rounded-full"
            />
          </div>

          {/* Mobile Filter - Lazy loaded */}
          <div className="block md:hidden">
            <Suspense fallback={<FilterSkeleton />}>
              <MobileFilterTrigger
                onClick={() => setMobileFilterOpen(true)}
                activeFiltersCount={
                  (filterType !== "all" ? 1 : 0) + (filterDifficulty !== "all" ? 1 : 0) + (sortBy !== "recent" ? 1 : 0)
                }
              />
            </Suspense>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden">
        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="active"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Ativos ({filterWorkouts(workouts, "active").length})
              </TabsTrigger>
              <TabsTrigger
                value="scheduled"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Agendados ({filterWorkouts(workouts, "scheduled").length})
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Concluídos ({filterWorkouts(workouts, "completed").length})
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Todos ({filterWorkouts(workouts).length})
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {/* Desktop Filters */}
            <div className="hidden md:flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="Musculação">Musculação</SelectItem>
                    <SelectItem value="Funcional">Funcional</SelectItem>
                    <SelectItem value="Cardio">Cardio</SelectItem>
                    <SelectItem value="Reabilitação">Reabilitação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Dificuldade</label>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Todas as dificuldades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as dificuldades</SelectItem>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mais recentes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="progress">Progresso</SelectItem>
                    <SelectItem value="name">Nome</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="active" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(workouts, "active").map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(workouts, "scheduled").map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(workouts, "completed").map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(workouts).map(renderWorkoutCard)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>

      {/* Mobile Filter Sheet - Lazy loaded */}
      <Suspense fallback={null}>
        <MobileFilterSheet
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          title="Filtrar Treinos"
          activeFiltersCount={
            (filterType !== "all" ? 1 : 0) + (filterDifficulty !== "all" ? 1 : 0) + (sortBy !== "recent" ? 1 : 0)
          }
          sections={[]}
          onClear={() => {
            setFilterType("all")
            setFilterDifficulty("all")
            setSortBy("recent")
          }}
        />
      </Suspense>

      <div className="fixed bottom-6 right-6">
        <Fab variant="primary" size="medium" onClick={() => router.push("/dashboard/workouts/new")}>
          <Plus className="h-6 w-6" />
        </Fab>
      </div>
    </div>
  )
}
