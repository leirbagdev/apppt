import ProgressTabs from "@/components/ui/ProgressTabs";

export default function ProgressoAluno({ params }: { params: { id: string } }) {
  return <ProgressTabs alunoId={params.id} />;
} 