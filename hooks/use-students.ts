"use client"

import { useState, useEffect } from "react"
import { StudentsService } from "@/lib/services/students"
import type { Student, CreateStudentData, UpdateStudentData, StudentSelectorStudent } from "@/lib/database.types"

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studentSelectorOpen, setStudentSelectorOpen] = useState(false)

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await StudentsService.getAll()
      setStudents(data)
    } catch (err) {
      console.error("Erro ao carregar estudantes:", err)
      setError("Erro ao carregar estudantes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  const createStudent = async (studentData: CreateStudentData) => {
    try {
      setError(null)
      const newStudent = await StudentsService.create(studentData)
      setStudents((prev) => [newStudent, ...prev])
      return newStudent
    } catch (err) {
      console.error("Erro ao criar estudante:", err)
      setError("Erro ao criar estudante")
      throw err
    }
  }

  const updateStudent = async (id: string, studentData: UpdateStudentData) => {
    try {
      setError(null)
      const updatedStudent = await StudentsService.update(id, studentData)
      setStudents((prev) => prev.map((s) => (s.id === id ? updatedStudent : s)))
      return updatedStudent
    } catch (err) {
      console.error("Erro ao atualizar estudante:", err)
      setError("Erro ao atualizar estudante")
      throw err
    }
  }

  const deleteStudent = async (id: string) => {
    try {
      setError(null)
      await StudentsService.delete(id)
      setStudents((prev) => prev.filter((s) => s.id !== id))
    } catch (err) {
      console.error("Erro ao deletar estudante:", err)
      setError("Erro ao deletar estudante")
      throw err
    }
  }

  const searchStudents = async (query: string) => {
    try {
      setError(null)
      const results = await StudentsService.search(query)
      return results
    } catch (err) {
      console.error("Erro ao buscar estudantes:", err)
      setError("Erro ao buscar estudantes")
      return []
    }
  }

  const openStudentSelector = () => setStudentSelectorOpen(true)
  const closeStudentSelector = () => setStudentSelectorOpen(false)

  const selectStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    setSelectedStudent(student || null)
    closeStudentSelector()
  }

  return {
    students: students.map(s => ({
      id: s.id,
      name: s.full_name,
      avatarUrl: s.avatar_url
    })) as StudentSelectorStudent[],
    selectedStudent,
    selectStudent,
    studentSelectorOpen,
    openStudentSelector,
    closeStudentSelector,
    loading,
    error,
    createStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
    refetch: loadStudents,
  }
}

export function useStudent(id: string) {
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadStudent = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await StudentsService.getById(id)
        setStudent(data)
      } catch (err) {
        console.error("Erro ao carregar estudante:", err)
        setError("Erro ao carregar estudante")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      loadStudent()
    }
  }, [id])

  return { student, loading, error }
}
