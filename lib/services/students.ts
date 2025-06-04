import { supabase, isDemoMode } from "@/lib/supabase"
import type { Student, CreateStudentData, UpdateStudentData } from "@/lib/database.types"

// Dados mockados para desenvolvimento
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Leandro Silva",
    email: "leandrossilva@gmail.com",
    phone: "(11) 99999-9999",
    birth_date: "1990-05-15",
    gender: "male",
    goal: "Ganho de massa muscular",
    activity_level: "intermediate",
    avatar_url: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 88888-8888",
    birth_date: "1985-08-22",
    gender: "female",
    goal: "Perda de peso",
    activity_level: "beginner",
    avatar_url: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "3",
    name: "João Oliveira",
    email: "joao.oliveira@email.com",
    phone: "(11) 77777-7777",
    birth_date: "1992-12-03",
    gender: "male",
    goal: "Condicionamento físico",
    activity_level: "advanced",
    avatar_url: "/placeholder.svg?height=40&width=40",
    created_at: "2024-01-05T09:15:00Z",
    updated_at: "2024-01-05T09:15:00Z",
  },
]

let mockIdCounter = 4

export class StudentsService {
  static async getAll(): Promise<Student[]> {
    if (isDemoMode) {
      // Simular delay de rede
      await new Promise((resolve) => setTimeout(resolve, 500))
      return mockStudents
    }

    try {
      const { data, error } = await supabase.from("students").select("*").order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error)
      return mockStudents // Fallback para dados mockados
    }
  }

  static async getById(id: string): Promise<Student | null> {
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockStudents.find((s) => s.id === id) || null
    }

    try {
      const { data, error } = await supabase.from("students").select("*").eq("id", id).single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Erro ao buscar estudante:", error)
      return mockStudents.find((s) => s.id === id) || null
    }
  }

  static async create(studentData: CreateStudentData): Promise<Student> {
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const newStudent: Student = {
        id: mockIdCounter.toString(),
        ...studentData,
        avatar_url: studentData.avatar_url || "/placeholder.svg?height=40&width=40",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockStudents.unshift(newStudent)
      mockIdCounter++
      return newStudent
    }

    try {
      const { data, error } = await supabase.from("students").insert(studentData).select().single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Erro ao criar estudante:", error)
      throw error
    }
  }

  static async update(id: string, studentData: UpdateStudentData): Promise<Student> {
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      const index = mockStudents.findIndex((s) => s.id === id)
      if (index === -1) throw new Error("Estudante não encontrado")

      mockStudents[index] = {
        ...mockStudents[index],
        ...studentData,
        updated_at: new Date().toISOString(),
      }
      return mockStudents[index]
    }

    try {
      const { data, error } = await supabase
        .from("students")
        .update({ ...studentData, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Erro ao atualizar estudante:", error)
      throw error
    }
  }

  static async delete(id: string): Promise<void> {
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      const index = mockStudents.findIndex((s) => s.id === id)
      if (index === -1) throw new Error("Estudante não encontrado")
      mockStudents.splice(index, 1)
      return
    }

    try {
      const { error } = await supabase.from("students").delete().eq("id", id)

      if (error) throw error
    } catch (error) {
      console.error("Erro ao deletar estudante:", error)
      throw error
    }
  }

  static async search(query: string): Promise<Student[]> {
    if (isDemoMode) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      return mockStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.email.toLowerCase().includes(query.toLowerCase()),
      )
    }

    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data || []
    } catch (error) {
      console.error("Erro ao buscar estudantes:", error)
      return mockStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(query.toLowerCase()) ||
          student.email.toLowerCase().includes(query.toLowerCase()),
      )
    }
  }
}
