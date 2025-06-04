"use client"

import { useState } from "react"
import { useStudents } from "./use-students"
import type { StudentSelectorStudent } from "@/lib/database.types"

export function useStudentSelector() {
  const { students } = useStudents()
  const [selectedStudent, setSelectedStudent] = useState<StudentSelectorStudent | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const selectStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId)
    if (student) {
      setSelectedStudent({
        id: student.id,
        name: student.full_name,
        avatarUrl: student.avatar_url
      })
    }
    close()
  }

  return {
    students: students.map(s => ({
      id: s.id,
      name: s.full_name,
      avatarUrl: s.avatar_url
    })),
    selectedStudent,
    isOpen,
    open,
    close,
    selectStudent
  }
}
