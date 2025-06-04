"use client"

import { useState, Suspense, lazy } from "react"
import { useRouter } from "next/navigation"

// Componentes MD3 personalizados (carregamento imediato)
import { Button } from "@/components/md3/button"
import { Card } from "@/components/md3/card"
import { Chip } from "@/components/md3/chip"
import { Fab } from "@/components/md3/fab"

// Componentes UI básicos
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Ícones
import {
  Search,
  Plus,
  Clock,
  Copy,
  Edit,
  Trash2,
  Eye,
  Share2,
  BookOpen,
  ContrastIcon as CompareIcon,
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
const Dialog = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.Dialog,
  })),
)
const DialogContent = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogContent,
  })),
)
const DialogDescription = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogDescription,
  })),
)
const DialogHeader = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogHeader,
  })),
)
const DialogTitle = lazy(() =>
  import("@/components/ui/dialog").then((module) => ({
    default: module.DialogTitle,
  })),
)

// Loading components
const FilterSkeleton = () => <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>

const DialogSkeleton = () => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
      <div className="h-6 bg-muted rounded mb-4 animate-pulse"></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
)

// Tipos
interface Exercise {
  id: number
  name: string
  muscle: string
  equipment: string
  difficulty: string
  instructions: string
  videoUrl?: string
  imageUrl?: string
}

interface Workout {
  id: number
  title: string
  type: string
  target: string
  duration: string
  difficulty: string
  createdAt: string
  lastModified: string
  exercises: Exercise[]
  assignedTo?: string[]
  tags: string[]
  isFavorite: boolean
}

export default function ExerciseLibrary() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("my-workouts")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterTarget, setFilterTarget] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedWorkouts, setSelectedWorkouts] = useState<number[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [showCompareDialog, setShowCompareDialog] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Dados mockados para a biblioteca de exercícios (movidos para dentro do componente)
  const myWorkouts: Workout[] = [
    {
      id: 1,
      title: "Treino A - Hipertrofia Superior",
      type: "Musculação",
      target: "Parte Superior",
      duration: "60 min",
      difficulty: "Intermediário",
      createdAt: "2025-04-01",
      lastModified: "2025-05-10",
      exercises: [
        {
          id: 101,
          name: "Supino Reto",
          muscle: "Peito",
          equipment: "Barra",
          difficulty: "Intermediário",
          instructions:
            "Deite-se no banco, segure a barra com as mãos um pouco mais afastadas que a largura dos ombros...",
        },
        {
          id: 102,
          name: "Puxada Frontal",
          muscle: "Costas",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, segure a barra com as mãos afastadas...",
        },
        {
          id: 103,
          name: "Desenvolvimento com Halteres",
          muscle: "Ombros",
          equipment: "Halteres",
          difficulty: "Intermediário",
          instructions: "Sente-se em um banco com encosto, segure os halteres ao lado dos ombros...",
        },
        {
          id: 104,
          name: "Rosca Direta",
          muscle: "Bíceps",
          equipment: "Barra",
          difficulty: "Iniciante",
          instructions: "Em pé, segure a barra com as palmas das mãos voltadas para cima...",
        },
        {
          id: 105,
          name: "Tríceps Corda",
          muscle: "Tríceps",
          equipment: "Cabo",
          difficulty: "Iniciante",
          instructions: "Fique em pé em frente ao aparelho de cabo, segure a corda com as duas mãos...",
        },
      ],
      assignedTo: ["Leandro Silva", "Mario Lenon"],
      tags: ["hipertrofia", "força", "parte superior"],
      isFavorite: true,
    },
    {
      id: 2,
      title: "Treino B - Hipertrofia Inferior",
      type: "Musculação",
      target: "Parte Inferior",
      duration: "50 min",
      difficulty: "Intermediário",
      createdAt: "2025-04-01",
      lastModified: "2025-05-10",
      exercises: [
        {
          id: 201,
          name: "Agachamento Livre",
          muscle: "Quadríceps",
          equipment: "Barra",
          difficulty: "Avançado",
          instructions: "Posicione a barra nos trapézios, pés na largura dos ombros...",
        },
        {
          id: 202,
          name: "Leg Press 45°",
          muscle: "Quadríceps",
          equipment: "Máquina",
          difficulty: "Intermediário",
          instructions: "Sente-se na máquina, coloque os pés na plataforma na largura dos ombros...",
        },
        {
          id: 203,
          name: "Cadeira Extensora",
          muscle: "Quadríceps",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, ajuste o apoio para os tornozelos...",
        },
        {
          id: 204,
          name: "Mesa Flexora",
          muscle: "Isquiotibiais",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Deite-se de bruços na máquina, ajuste o apoio para os tornozelos...",
        },
        {
          id: 205,
          name: "Panturrilha em Pé",
          muscle: "Panturrilha",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Posicione os ombros sob as almofadas da máquina, apoie a ponta dos pés na plataforma...",
        },
      ],
      assignedTo: ["Leandro Silva", "Mario Lenon"],
      tags: ["hipertrofia", "força", "parte inferior"],
      isFavorite: true,
    },
    {
      id: 3,
      title: "Treino Funcional - HIIT",
      type: "Funcional",
      target: "Full Body",
      duration: "30 min",
      difficulty: "Avançado",
      createdAt: "2025-04-15",
      lastModified: "2025-05-05",
      exercises: [
        {
          id: 301,
          name: "Burpees",
          muscle: "Full Body",
          equipment: "Peso Corporal",
          difficulty: "Avançado",
          instructions: "Comece em pé, agache, coloque as mãos no chão, jogue os pés para trás...",
        },
        {
          id: 302,
          name: "Mountain Climbers",
          muscle: "Core",
          equipment: "Peso Corporal",
          difficulty: "Intermediário",
          instructions: "Comece na posição de prancha, traga um joelho em direção ao peito...",
        },
        {
          id: 303,
          name: "Jumping Jacks",
          muscle: "Full Body",
          equipment: "Peso Corporal",
          difficulty: "Iniciante",
          instructions: "Comece em pé com os braços ao lado do corpo, salte abrindo as pernas...",
        },
        {
          id: 304,
          name: "Kettlebell Swings",
          muscle: "Posterior",
          equipment: "Kettlebell",
          difficulty: "Intermediário",
          instructions: "Segure o kettlebell com as duas mãos, pés afastados na largura dos ombros...",
        },
        {
          id: 305,
          name: "Box Jumps",
          muscle: "Pernas",
          equipment: "Caixa",
          difficulty: "Intermediário",
          instructions: "Fique em frente à caixa, agache levemente e salte sobre a caixa...",
        },
      ],
      assignedTo: ["Otávio Martins"],
      tags: ["hiit", "cardio", "funcional"],
      isFavorite: false,
    },
  ]

  const studentWorkouts: Workout[] = [
    {
      id: 4,
      title: "Treino A - Leandro Silva",
      type: "Musculação",
      target: "Parte Superior",
      duration: "60 min",
      difficulty: "Intermediário",
      createdAt: "2025-05-01",
      lastModified: "2025-05-10",
      exercises: [
        {
          id: 401,
          name: "Supino Inclinado",
          muscle: "Peito",
          equipment: "Halteres",
          difficulty: "Intermediário",
          instructions: "Deite-se no banco inclinado, segure os halteres ao lado do peito...",
        },
        {
          id: 402,
          name: "Remada Curvada",
          muscle: "Costas",
          equipment: "Barra",
          difficulty: "Intermediário",
          instructions: "Segure a barra com as mãos afastadas, curve o tronco para frente...",
        },
        {
          id: 403,
          name: "Elevação Lateral",
          muscle: "Ombros",
          equipment: "Halteres",
          difficulty: "Iniciante",
          instructions: "Em pé, segure os halteres ao lado do corpo, eleve os braços lateralmente...",
        },
        {
          id: 404,
          name: "Rosca Scott",
          muscle: "Bíceps",
          equipment: "Barra EZ",
          difficulty: "Intermediário",
          instructions: "Sente-se no banco Scott, segure a barra com as palmas voltadas para cima...",
        },
        {
          id: 405,
          name: "Tríceps Testa",
          muscle: "Tríceps",
          equipment: "Barra EZ",
          difficulty: "Intermediário",
          instructions: "Deite-se no banco, segure a barra acima da cabeça...",
        },
      ],
      assignedTo: ["Leandro Silva"],
      tags: ["hipertrofia", "força", "parte superior", "personalizado"],
      isFavorite: false,
    },
    {
      id: 5,
      title: "Treino B - Mario Lenon",
      type: "Musculação",
      target: "Full Body",
      duration: "45 min",
      difficulty: "Iniciante",
      createdAt: "2025-05-05",
      lastModified: "2025-05-10",
      exercises: [
        {
          id: 501,
          name: "Leg Press Horizontal",
          muscle: "Quadríceps",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, coloque os pés na plataforma...",
        },
        {
          id: 502,
          name: "Puxada Alta",
          muscle: "Costas",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, segure a barra com as mãos afastadas...",
        },
        {
          id: 503,
          name: "Supino Máquina",
          muscle: "Peito",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, ajuste a altura do banco...",
        },
        {
          id: 504,
          name: "Cadeira Adutora",
          muscle: "Adutores",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, posicione as pernas nas almofadas...",
        },
        {
          id: 505,
          name: "Cadeira Abdutora",
          muscle: "Abdutores",
          equipment: "Máquina",
          difficulty: "Iniciante",
          instructions: "Sente-se na máquina, posicione as pernas nas almofadas...",
        },
      ],
      assignedTo: ["Mario Lenon"],
      tags: ["iniciante", "adaptação", "full body", "personalizado"],
      isFavorite: false,
    },
  ]

  const monthlyPrograms: Workout[] = [
    {
      id: 6,
      title: "Programa Maio - Hipertrofia",
      type: "Programa",
      target: "Full Body",
      duration: "4 semanas",
      difficulty: "Intermediário",
      createdAt: "2025-04-25",
      lastModified: "2025-05-01",
      exercises: [],
      assignedTo: ["Leandro Silva", "Mario Lenon"],
      tags: ["programa", "hipertrofia", "mensal"],
      isFavorite: true,
    },
    {
      id: 7,
      title: "Programa Maio - Reabilitação",
      type: "Programa",
      target: "Específico",
      duration: "4 semanas",
      difficulty: "Iniciante",
      createdAt: "2025-04-25",
      lastModified: "2025-05-01",
      exercises: [],
      assignedTo: ["Otávio Martins"],
      tags: ["programa", "reabilitação", "mensal"],
      isFavorite: false,
    },
  ]

  // Função para filtrar os treinos
  const filterWorkouts = (workouts: Workout[]) => {
    return workouts
      .filter((workout) => {
        if (
          searchTerm &&
          !workout.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !workout.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return false
        }

        if (filterType !== "all" && workout.type !== filterType) {
          return false
        }

        if (filterTarget !== "all" && workout.target !== filterTarget) {
          return false
        }

        if (filterDifficulty !== "all" && workout.difficulty !== filterDifficulty) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "recent":
            return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
          case "oldest":
            return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime()
          case "name-asc":
            return a.title.localeCompare(b.title)
          case "name-desc":
            return b.title.localeCompare(a.title)
          default:
            return 0
        }
      })
  }

  // Renderiza um card de treino (otimizado)
  const renderWorkoutCard = (workout: Workout) => {
    const isSelected = selectedWorkouts.includes(workout.id)

    return (
      <Card
        key={workout.id}
        className={`overflow-hidden h-full transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer ${
          isSelected ? "ring-2 ring-primary" : ""
        }`}
        onClick={() => {
          if (compareMode) {
            if (selectedWorkouts.includes(workout.id)) {
              setSelectedWorkouts(selectedWorkouts.filter((id) => id !== workout.id))
            } else if (selectedWorkouts.length < 2) {
              setSelectedWorkouts([...selectedWorkouts, workout.id])
            }
          } else {
            router.push(`/dashboard/exercise-library/${workout.id}`)
          }
        }}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium">{workout.title}</h3>
            {workout.isFavorite && <span className="text-amber-500">⭐</span>}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <Chip
              variant="assist"
              size="sm"
              className={`${
                workout.type === "Musculação"
                  ? "bg-blue-500 text-white border-blue-400"
                  : workout.type === "Funcional"
                    ? "bg-orange-500 text-white border-orange-400"
                    : workout.type === "Cardio"
                      ? "bg-red-500 text-white border-red-400"
                      : workout.type === "Programa"
                        ? "bg-purple-500 text-white border-purple-400"
                        : "bg-gray-500 text-white border-gray-400"
              }`}
            >
              {workout.type}
            </Chip>
            <Chip
              variant="assist"
              size="sm"
              className={`${
                workout.target === "Parte Superior"
                  ? "bg-emerald-500 text-white border-emerald-400"
                  : workout.target === "Parte Inferior"
                    ? "bg-cyan-500 text-white border-cyan-400"
                    : workout.target === "Full Body"
                      ? "bg-indigo-500 text-white border-indigo-400"
                      : workout.target === "Específico"
                        ? "bg-pink-500 text-white border-pink-400"
                        : "bg-gray-500 text-white border-gray-400"
              }`}
            >
              {workout.target}
            </Chip>
            <Chip
              variant="assist"
              size="sm"
              className={`${
                workout.difficulty === "Iniciante"
                  ? "bg-green-500 text-white border-green-400"
                  : workout.difficulty === "Intermediário"
                    ? "bg-yellow-500 text-black border-yellow-400"
                    : workout.difficulty === "Avançado"
                      ? "bg-red-500 text-white border-red-400"
                      : "bg-gray-500 text-white border-gray-400"
              }`}
            >
              {workout.difficulty}
            </Chip>
          </div>

          <div className="flex items-center text-xs text-muted-foreground mb-3">
            <Clock className="h-3 w-3 mr-1" />
            {workout.duration}
          </div>

          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Criado: {new Date(workout.createdAt).toLocaleDateString("pt-BR")}</span>
            <span>Modificado: {new Date(workout.lastModified).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        <div className="border-t border-gray-800 p-2 bg-gray-900/30 flex justify-between">
          <div className="flex gap-1">
            <Button
              variant="text"
              size="icon"
              title="Editar"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="text"
              size="icon"
              title="Duplicar"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="text"
              size="icon"
              title="Excluir"
              className="text-gray-400 hover:text-red-400 hover:bg-gray-800"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1">
            <Button
              variant="text"
              size="icon"
              title="Visualizar"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="text"
              size="icon"
              title="Compartilhar"
              className="text-gray-400 hover:text-green-400 hover:bg-gray-800"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Biblioteca de Exercícios</h1>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full md:w-[200px] rounded-full bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-green-500"
            />
          </div>

          {/* Desktop Compare Button */}
          <div className="hidden md:block">
            <Button
              variant={compareMode ? "filled" : "outlined"}
              className={`flex items-center gap-2 ${
                compareMode
                  ? "bg-green-500 text-black hover:bg-green-400"
                  : "border-gray-600 text-white hover:border-green-500 hover:text-green-500"
              }`}
              onClick={() => setCompareMode(!compareMode)}
            >
              <CompareIcon className="h-4 w-4" />
              {compareMode ? "Cancelar" : "Comparar"}
            </Button>
          </div>

          {/* Mobile Filter - Lazy loaded */}
          <div className="block md:hidden">
            <Suspense fallback={<FilterSkeleton />}>
              <MobileFilterTrigger
                onClick={() => setMobileFilterOpen(true)}
                activeFiltersCount={
                  (filterType !== "all" ? 1 : 0) +
                  (filterTarget !== "all" ? 1 : 0) +
                  (filterDifficulty !== "all" ? 1 : 0) +
                  (sortBy !== "recent" ? 1 : 0)
                }
              />
            </Suspense>
          </div>
        </div>
      </div>

      {compareMode && (
        <Card className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Modo de Comparação</h3>
              <p className="text-sm text-muted-foreground">
                Selecione até 2 treinos para comparar. Selecionados: {selectedWorkouts.length}/2
              </p>
            </div>
            <Button
              variant="filled"
              disabled={selectedWorkouts.length !== 2}
              onClick={() => setShowCompareDialog(true)}
              className="flex items-center gap-2"
            >
              <CompareIcon className="h-4 w-4" />
              Comparar Selecionados
            </Button>
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <Tabs defaultValue="my-workouts" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="my-workouts"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-gray-400 data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:text-white hover:text-white"
              >
                Meus Treinos
              </TabsTrigger>
              <TabsTrigger
                value="student-workouts"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-gray-400 data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:text-white hover:text-white"
              >
                Treinos dos Alunos
              </TabsTrigger>
              <TabsTrigger
                value="monthly-programs"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-gray-400 data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:text-white hover:text-white"
              >
                Programas Mensais
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            {/* Desktop Filters */}
            <div className="hidden md:flex flex-wrap gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">Tipo</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-800">
                      Todos os tipos
                    </SelectItem>
                    <SelectItem value="Musculação" className="text-white hover:bg-gray-800">
                      Musculação
                    </SelectItem>
                    <SelectItem value="Funcional" className="text-white hover:bg-gray-800">
                      Funcional
                    </SelectItem>
                    <SelectItem value="Cardio" className="text-white hover:bg-gray-800">
                      Cardio
                    </SelectItem>
                    <SelectItem value="Programa" className="text-white hover:bg-gray-800">
                      Programa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Alvo</label>
                <Select value={filterTarget} onValueChange={setFilterTarget}>
                  <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Todos os alvos" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-800">
                      Todos os alvos
                    </SelectItem>
                    <SelectItem value="Parte Superior" className="text-white hover:bg-gray-800">
                      Parte Superior
                    </SelectItem>
                    <SelectItem value="Parte Inferior" className="text-white hover:bg-gray-800">
                      Parte Inferior
                    </SelectItem>
                    <SelectItem value="Full Body" className="text-white hover:bg-gray-800">
                      Full Body
                    </SelectItem>
                    <SelectItem value="Específico" className="text-white hover:bg-gray-800">
                      Específico
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Dificuldade</label>
                <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                  <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Todas as dificuldades" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-800">
                      Todas as dificuldades
                    </SelectItem>
                    <SelectItem value="Iniciante" className="text-white hover:bg-gray-800">
                      Iniciante
                    </SelectItem>
                    <SelectItem value="Intermediário" className="text-white hover:bg-gray-800">
                      Intermediário
                    </SelectItem>
                    <SelectItem value="Avançado" className="text-white hover:bg-gray-800">
                      Avançado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white">Ordenar por</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Mais recentes" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="recent" className="text-white hover:bg-gray-800">
                      Mais recentes
                    </SelectItem>
                    <SelectItem value="oldest" className="text-white hover:bg-gray-800">
                      Mais antigos
                    </SelectItem>
                    <SelectItem value="name-asc" className="text-white hover:bg-gray-800">
                      Nome (A-Z)
                    </SelectItem>
                    <SelectItem value="name-desc" className="text-white hover:bg-gray-800">
                      Nome (Z-A)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="my-workouts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(myWorkouts).map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="student-workouts" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(studentWorkouts).map(renderWorkoutCard)}
              </div>
            </TabsContent>

            <TabsContent value="monthly-programs" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterWorkouts(monthlyPrograms).map(renderWorkoutCard)}
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
          title="Filtrar Biblioteca"
          activeFiltersCount={
            (filterType !== "all" ? 1 : 0) +
            (filterTarget !== "all" ? 1 : 0) +
            (filterDifficulty !== "all" ? 1 : 0) +
            (sortBy !== "recent" ? 1 : 0)
          }
          sections={[]}
          onClear={() => {
            setFilterType("all")
            setFilterTarget("all")
            setFilterDifficulty("all")
            setSortBy("recent")
          }}
        />
      </Suspense>

      {/* Compare Dialog - Lazy loaded */}
      {showCompareDialog && (
        <Suspense fallback={<DialogSkeleton />}>
          <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Comparação de Treinos</DialogTitle>
                <DialogDescription>Comparando treinos selecionados</DialogDescription>
              </DialogHeader>
              <div className="p-4">
                <p>Conteúdo da comparação...</p>
              </div>
            </DialogContent>
          </Dialog>
        </Suspense>
      )}

      <div className="fixed bottom-6 right-6">
        <Fab variant="primary" size="medium" onClick={() => router.push("/dashboard/exercise-library/create")}>
          <Plus className="h-6 w-6" />
        </Fab>
      </div>
    </div>
  )
}
