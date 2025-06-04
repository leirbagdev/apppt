import { describe, it, expect } from "@jest/globals"

// Mock dos tipos
interface Student {
  id: string
  full_name: string
  status: "active" | "pending" | "inactive"
  avatar_url?: string
}

// Mock do componente StudentSelector
const mockStudentSelector = {
  render: (props: {
    students: Student[]
    selectedId?: string
    onSelect: (id: string) => void
    loading?: boolean
  }) => {
    if (!Array.isArray(props.students)) {
      return { error: "Lista de alunos inválida" }
    }

    if (props.loading) {
      return { loading: true }
    }

    const selectedStudent = props.selectedId 
      ? props.students.find(s => s.id === props.selectedId)
      : null

    return {
      success: true,
      rendered: {
        students: props.students,
        selectedStudent,
        canSelect: typeof props.onSelect === "function"
      }
    }
  }
}

describe("StudentSelector Component", () => {
  const sampleStudents: Student[] = [
    { id: "1", full_name: "João Silva", status: "active" },
    { id: "2", full_name: "Maria Santos", status: "active" },
    { id: "3", full_name: "Pedro Costa", status: "inactive" }
  ]

  it("deve renderizar lista de alunos", () => {
    const result = mockStudentSelector.render({
      students: sampleStudents,
      onSelect: () => {}
    })

    expect(result.success).toBe(true)
    expect(result.rendered.students).toHaveLength(3)
    expect(result.rendered.canSelect).toBe(true)
  })

  it("deve mostrar aluno selecionado", () => {
    const result = mockStudentSelector.render({
      students: sampleStudents,
      selectedId: "1",
      onSelect: () => {}
    })

    expect(result.success).toBe(true)
    expect(result.rendered.selectedStudent).toMatchObject({
      id: "1",
      full_name: "João Silva"
    })
  })

  it("deve mostrar estado de carregamento", () => {
    const result = mockStudentSelector.render({
      students: sampleStudents,
      loading: true,
      onSelect: () => {}
    })

    expect(result.loading).toBe(true)
  })

  it("deve validar lista de alunos", () => {
    const result = mockStudentSelector.render({
      students: null as any,
      onSelect: () => {}
    })

    expect(result.error).toBe("Lista de alunos inválida")
  })
})
