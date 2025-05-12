import React from "react";

export default function ProgressBodyMeasures({ alunoId }: { alunoId: string }) {
  // Exemplo estático
  return (
    <div>
      <h3 className="font-bold mb-2">Medidas Corporais</h3>
      <ul className="list-disc ml-5">
        <li>Braço: 35cm</li>
        <li>Peso: 80kg</li>
        <li>Cintura: 90cm</li>
        <li>Quadril: 100cm</li>
      </ul>
      <p className="text-xs text-muted-foreground mt-2">Aluno ID: {alunoId}</p>
    </div>
  );
} 