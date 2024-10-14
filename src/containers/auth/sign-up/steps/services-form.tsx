import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ServicesForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="animate-fade-right">
      <h2 className="mb-4 text-2xl font-bold">Serviços Sugeridos</h2>
      <p className="mb-6 text-gray-600">
        Defina os serviços oferecidos, seus preços e a duração de cada um.
      </p>
      <Input placeholder="Serviço" className="mb-4" />
      <Input placeholder="Preço" className="mb-4" />
      <Input placeholder="Duração (minutos)" className="mb-4" />
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  );
}
