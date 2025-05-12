import React from "react";

export default function ProgressWorkouts({ alunoId }: { alunoId: string }) {
  // Exemplo estático
  return (
    <div>
      <h3 className="font-bold mb-2">Treinos Recentes</h3>
      <ul className="list-disc ml-5">
        <li>Treino A - 10/06/2024</li>
        <li>Treino B - 08/06/2024</li>
        <li>Treino C - 05/06/2024</li>
      </ul>
      <p className="text-xs text-muted-foreground mt-2">Aluno ID: {alunoId}</p>
    </div>
  );
} 