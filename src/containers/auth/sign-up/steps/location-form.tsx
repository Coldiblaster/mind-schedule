import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LocationForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="animate-fade-left">
      <h2 className="mb-4 text-2xl font-bold">Localização</h2>
      <p className="mb-6 text-gray-600">
        Insira o endereço do seu negócio para que seus clientes possam
        encontrá-lo.
      </p>
      <form className="mb-4 grid gap-4 md:grid-cols-2">
        <Input placeholder="CEP" autoFocus />
        <Input placeholder="Rua" />
        <Input placeholder="Número" />
        <Input placeholder="Bairro" />
        <Input placeholder="Cidade" />
        <Input placeholder="Estado" />
      </form>
      <div className="flex justify-between">
        <Button variant="ghost" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  );
}
