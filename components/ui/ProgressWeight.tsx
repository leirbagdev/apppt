import React from "react";

export default function ProgressWeight({ alunoId }: { alunoId: string }) {
  // Exemplo estático
  return (
    <div>
      <h3 className="font-bold mb-2">Histórico de Peso</h3>
      <ul className="list-disc ml-5">
        <li>10/06/2024: 80kg</li>
        <li>01/06/2024: 81kg</li>
        <li>20/05/2024: 82kg</li>
      </ul>
      <p className="text-xs text-muted-foreground mt-2">Aluno ID: {alunoId}</p>
    </div>
  );
} 