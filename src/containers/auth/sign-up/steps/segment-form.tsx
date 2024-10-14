import { Button } from '@/components/ui/button';

const businessTypes = [
  { icon: '✂️', label: 'Salão de Beleza' },
  { icon: '💆', label: 'Clínica de Estética' },
  { icon: '💈', label: 'Barbearia' },
  { icon: '👣', label: 'Podologia' },
  { icon: '💅', label: 'Esmalteria' },
  { icon: '👨‍⚕️', label: 'Clínica médica' },
  { icon: '💆‍♂️', label: 'SPA e massagem' },
  { icon: '🐾', label: 'Pet e Veterinário' },
  { icon: '🎨', label: 'Estúdio de tatuagem' },
  { icon: '🦷', label: 'Clínica odontológica' },
  { icon: '🏋️', label: 'Personal e fitness' },
  { icon: '❓', label: 'Outros segmentos' },
];

export function SegmentForm({ onNext }: { onNext: () => void }) {
  return (
    <div className="animate-fade-right">
      <h2 className="mb-4 text-2xl font-bold">Segmento de atuação</h2>
      <p className="mb-6 text-gray-600">
        Para que você tenha um ambiente personalizado, é importante saber qual o
        seu tipo de negócio.
      </p>
      <div className="grid gap-2 md:grid-cols-2 lg:gap-4">
        {businessTypes.map(type => (
          <Button
            key={type.label}
            variant="outline"
            className="justify-start px-1 text-left lg:px-4"
          >
            <span className="mr-2">{type.icon}</span>
            {type.label}
          </Button>
        ))}
      </div>
      <Button className="mt-6 w-full" onClick={onNext}>
        Continuar
      </Button>
    </div>
  );
}
