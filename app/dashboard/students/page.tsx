import React, { useState } from "react";

interface Student {
  id: number;
  name: string;
  age: number;
  weight: number;
  height: number;
  progress: string;
}

const StudentsPage = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const students: Student[] = [
    { id: 1, name: "João Silva", age: 20, weight: 70, height: 175, progress: "Ganhou 2kg de massa muscular" },
    { id: 2, name: "Maria Oliveira", age: 22, weight: 60, height: 165, progress: "Perdeu 3kg de gordura" },
    { id: 3, name: "Carlos Santos", age: 19, weight: 80, height: 180, progress: "Melhorou o condicionamento físico" },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Alunos</h1>
      <input
        type="text"
        placeholder="Buscar aluno..."
        className="w-full p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="space-y-2">
        {filteredStudents.map((student) => (
          <li
            key={student.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm bg-white text-black cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <p><strong>Nome:</strong> {student.name}</p>
            <p><strong>Idade:</strong> {student.age} anos</p>
          </li>
        ))}
      </ul>

      {selectedStudent && (
        <div className="mt-6 p-4 border border-gray-300 rounded-md shadow-sm bg-white text-black">
          <h2 className="text-xl font-bold mb-2">Detalhes do Aluno</h2>
          <p><strong>Nome:</strong> {selectedStudent.name}</p>
          <p><strong>Idade:</strong> {selectedStudent.age} anos</p>
          <p><strong>Peso:</strong> {selectedStudent.weight} kg</p>
          <p><strong>Altura:</strong> {selectedStudent.height} cm</p>
          <p><strong>Progresso:</strong> {selectedStudent.progress}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setSelectedStudent(null)}
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
