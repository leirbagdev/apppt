// Utilitários para o componente Habituário
import { format, startOfYear, endOfYear, eachDayOfInterval } from "date-fns"
import type { Locale } from "date-fns"

// Gerar dados de exercícios baseado na intensidade
export const generateExerciseData = (value: number) => {
  const exercises = ["Musculação", "Cardio", "Funcional", "Yoga", "Pilates", "Natação"]
  const count = Math.min(value, 3)
  return exercises.slice(0, count)
}

// Gerar duração baseado na intensidade
export const generateDuration = (value: number) => {
  const baseDuration = value * 30 + Math.floor(Math.random() * 30)
  return baseDuration
}

// Gerar dados de atividade para o ano inteiro baseado no aluno
export const generateYearActivityData = (studentId: string) => {
  const currentYear = new Date().getFullYear()
  const startDate = startOfYear(new Date(currentYear, 0, 1))
  const endDate = endOfYear(new Date(currentYear, 11, 31))

  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  // Diferentes padrões de atividade para cada aluno
  const activityPatterns = {
    "1": () => (Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 1 : 0), // Leandro - muito ativo
    "2": () => (Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0), // Mario - moderadamente ativo
    "3": () => (Math.random() > 0.5 ? Math.floor(Math.random() * 2) + 1 : 0), // Otávio - menos ativo
    "4": () => (Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0), // Ana - muito ativa
    "5": () => (Math.random() > 0.6 ? Math.floor(Math.random() * 2) + 1 : 0), // Roberto - pouco ativo
    "6": () => (Math.random() > 0.1 ? Math.floor(Math.random() * 4) + 1 : 0), // Carla - extremamente ativa
  }

  const pattern = activityPatterns[studentId] || activityPatterns["1"]

  return allDays.map((date) => {
    const value = pattern()
    return {
      date,
      value,
      exercises: value > 0 ? generateExerciseData(value) : [],
      duration: value > 0 ? generateDuration(value) : 0,
    }
  })
}

// Função para obter a cor baseada no valor
export const getActivityColor = (value: number, isOledMode: boolean) => {
  if (isOledMode) {
    // Cores OLED - preto absoluto para economia de bateria
    switch (value) {
      case 0:
        return "bg-black"
      case 1:
        return "bg-green-900"
      case 2:
        return "bg-green-700"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      default:
        return "bg-black"
    }
  } else {
    // Cores padrão
    switch (value) {
      case 0:
        return "bg-gray-800"
      case 1:
        return "bg-green-900"
      case 2:
        return "bg-green-700"
      case 3:
        return "bg-green-500"
      case 4:
        return "bg-green-400"
      default:
        return "bg-gray-800"
    }
  }
}

// Formatar data para exibição
export const formatActivityDate = (date: Date, locale: Locale) => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale })
}
