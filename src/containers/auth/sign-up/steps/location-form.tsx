import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAddress } from '@/services/cep';

export function LocationForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const handleChangeCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    if (cep.length === 8) await getAddress(cep).then(console.log);
  };

  return (
    <div className="animate-fade-left">
      <h2 className="mb-4 text-2xl font-bold">Localização</h2>
      <p className="mb-6 text-gray-600">
        Insira o endereço do seu negócio para que seus clientes possam
        encontrá-lo.
      </p>
      <form className="mb-4 grid gap-4 md:grid-cols-2">
        <Input placeholder="CEP" autoFocus onChange={handleChangeCep} />
        <Input placeholder="Rua" disabled />
        <Input placeholder="Número" />
        <Input placeholder="Bairro" disabled />
        <Input placeholder="Cidade" disabled />
        <Input placeholder="Estado" disabled />
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
