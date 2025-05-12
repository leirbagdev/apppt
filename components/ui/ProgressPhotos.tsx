import React from "react";

export default function ProgressPhotos({ alunoId }: { alunoId: string }) {
  // Exemplo estático
  return (
    <div>
      <h3 className="font-bold mb-2">Fotos de Progresso</h3>
      <div className="flex gap-4">
        <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">Foto 1</div>
        <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">Foto 2</div>
        <div className="w-24 h-32 bg-gray-200 flex items-center justify-center">Foto 3</div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Aluno ID: {alunoId}</p>
    </div>
  );
} 