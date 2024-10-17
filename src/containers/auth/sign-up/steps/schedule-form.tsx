import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ScheduleForm({
  onBack,
  resetSteps,
}: {
  onBack: () => void;
  resetSteps: () => void;
}) {
  return (
    <div className="animate-fade-left">
      <h2 className="mb-2 text-2xl font-bold">Expediente</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Configure os horários de atendimento do seu negócio.
      </p>

      <Input placeholder="Horário de Abertura" className="mb-4" />
      <Input placeholder="Horário de Fechamento" className="mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={resetSteps}>Finalizar</Button>
      </div>
    </div>
  );
}
