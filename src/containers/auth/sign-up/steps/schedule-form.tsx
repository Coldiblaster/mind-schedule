import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CustomCheckBox } from '@/components/custom-checkbox';
import { CustomSelect } from '@/components/custom-select';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ScheduleSchema } from '@/schemas/schemas-sign-up';

export function ScheduleForm({
  onBack,
  resetSteps,
}: {
  onBack: () => void;
  resetSteps: () => void;
}) {
  const defaultDaysWork = [
    {
      day: 'Domingo',
      open: '9',
      close: '18',
      isOpen: false,
    },
    {
      day: 'Segunda-Feira',
      open: '9',
      close: '18',
      isOpen: true,
    },
    {
      day: 'Terça-Feira',
      open: '9',
      close: '18',
      isOpen: true,
    },
    {
      day: 'Quarta-Feira',
      open: '9',
      close: '18',
      isOpen: true,
    },
    {
      day: 'Quinta-Feira',
      open: '9',
      close: '18',
      isOpen: true,
    },
    {
      day: 'Sexta-Feira',
      open: '9',
      close: '18',
      isOpen: true,
    },
    {
      day: 'Sábado',
      open: '9',
      close: '18',
      isOpen: true,
    },
  ];

  const defaultHours = [
    { value: '6', label: '06:00' },
    { value: '7', label: '07:00' },
    { value: '8', label: '08:00' },
    { value: '9', label: '09:00' },
    { value: '10', label: '10:00' },
    { value: '11', label: '11:00' },
    { value: '12', label: '12:00' },
    { value: '13', label: '13:00' },
    { value: '14', label: '14:00' },
    { value: '15', label: '15:00' },
    { value: '16', label: '16:00' },
    { value: '17', label: '17:00' },
    { value: '18', label: '18:00' },
    { value: '19', label: '19:00' },
    { value: '20', label: '20:00' },
    { value: '21', label: '21:00' },
    { value: '22', label: '22:00' },
  ];

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      days: defaultDaysWork,
    },
  });

  console.log('formData', form.getValues());

  return (
    <div
      className="w-full animate-fade-down"
      role="tabpanel"
      aria-label="Horário de funcionamento"
    >
      <h2 className="mb-2 text-2xl font-bold">Expediente</h2>
      <p className="mb-4 text-sm text-muted-foreground md:mb-6">
        Para finalizar, qual é o horário de funcionamento do seu
        estabelecimento?
      </p>
      <Form {...form}>
        <div className="flex flex-col gap-4">
          {defaultDaysWork.map(item => (
            <div key={item.day} className="flex w-full items-center gap-4">
              <CustomCheckBox
                control={form.control}
                registerName={item.day}
                labelText={item.day}
              />

              {!item.isOpen ? (
                <span className="text-muted-foreground">Fechado</span>
              ) : (
                <>
                  <CustomSelect
                    control={form.control}
                    registerName="open"
                    labelText="Horário:"
                    defaultValue="9"
                    options={defaultHours}
                    required
                  />
                  <span className="mx-3 text-muted-foreground">às</span>
                  <CustomSelect
                    control={form.control}
                    registerName="close"
                    labelText="Horário:"
                    defaultValue="9"
                    options={defaultHours}
                    required
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            Voltar
          </Button>
          <Button onClick={resetSteps}>Finalizar</Button>
        </div>
      </Form>
    </div>
  );
}
