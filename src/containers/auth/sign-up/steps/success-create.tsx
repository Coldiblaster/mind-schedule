import success from '@/assets/animations/success.json';
import { Animations } from '@/components/animations/animations';
import { Button } from '@/components/ui/button';

export function SuccessCreate({ resetSteps }: { resetSteps: () => void }) {
  return (
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Horário de funcionamento"
    >
      <h2 className="mb-2 text-2xl font-bold">Finalizado</h2>
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Agora você pode usar o sistema da forma que mais atende o seu negócio.
      </p>
      <div className="flex flex-col items-center gap-4">
        <Animations url={success} size={{ width: '250px', height: 'auto' }} />
      </div>
      <div className="flex justify-between">
        <Button onClick={resetSteps} className="mt-4 w-full" size="lg">
          Entrar agora
        </Button>
      </div>
    </div>
  );
}
