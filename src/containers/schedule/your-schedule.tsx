'use client';

export default function YourSchedule() {
  return (
    <div className="relative flex min-h-full w-full flex-col items-start gap-4 rounded-lg bg-muted p-4 md:p-12">
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-lg font-bold md:text-2xl">Agendamentos</h1>
        </div>
        <span className="text-xs text-muted-foreground md:text-sm">
          Veja abaixo os profissionais com os quais você já tem agendamentos
          confirmados.
        </span>
      </div>

      <div className="h-full w-full">
        <span className="text-sm">Nenhum agendamento realizado.</span>
      </div>
    </div>
  );
}
