import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiCalendar, PiCalendarX, PiSun } from 'react-icons/pi';

import { CustomSelect } from '@/components/custom-select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { ScheduleData, ScheduleSchema } from '@/schemas/schemas-sign-up';
import { useStepsDataStore } from '@/store/steps-data-store';

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const weekDays = [
  { id: 'domingo', label: 'Domingo', icon: PiCalendar },
  { id: 'segunda', label: 'Segunda-Feira', icon: PiCalendar },
  { id: 'terca', label: 'Terça-Feira', icon: PiCalendar },
  { id: 'quarta', label: 'Quarta-Feira', icon: PiCalendar },
  { id: 'quinta', label: 'Quinta-Feira', icon: PiCalendar },
  { id: 'sexta', label: 'Sexta-Feira', icon: PiCalendar },
  { id: 'sabado', label: 'Sábado', icon: PiCalendar },
];

export function ScheduleForm({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  type Schedule = {
    [key: string]: {
      isOpen: boolean;
      start: string;
      end: string;
    };
  };

  const { updateFormData } = useStepsDataStore();
  const [isPending, setIsPending] = useState(false);

  const [schedules, setSchedules] = useState<Schedule>(
    weekDays.reduce(
      (acc, day) => ({
        ...acc,
        [day.id]: {
          isOpen: true,
          start: '09:00',
          end: '18:00',
        },
      }),
      {},
    ),
  );

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      days: Object.keys(schedules).map(dayId => ({
        startTime: schedules[dayId].start,
        endTime: schedules[dayId].end,
        isOpen: schedules[dayId].isOpen,
        weekday: dayId,
      })),
    },
  });

  const handleCheckboxChange = (dayId: string) => {
    setSchedules(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        isOpen: !prev[dayId].isOpen,
      },
    }));
  };

  const onSubmitForm = async (data: ScheduleData) => {
    setIsPending(true);

    // const operatingHours = {
    //   days: Object.keys(schedules).map(dayId => ({
    //     startTime: schedules[dayId].start,
    //     endTime: schedules[dayId].end,
    //     isOpen: schedules[dayId].isOpen,
    //     weekday: dayId,
    //   })),
    // };

    const validation = ScheduleSchema.safeParse(data);

    if (validation.success) {
      updateFormData({ schedule: data });
      onNext();
    } else {
      console.error(validation.error.format());
    }

    // const data: CreateAccountData = {
    //   providerId: '1',
    //   email: 'email-do-teste@gmail.com',
    //   customSegment: formData.business?.businessType.label,
    //   address: formData?.location || {
    //     number: '',
    //     cep: '',
    //     street: '',
    //     neighborhood: '',
    //     city: '',
    //     state: '',
    //     complement: '',
    //   },
    //   services: formData.services,
    //   operatingHours,
    // };

    // try {
    //   await createAccount(data);
    //   onNext();
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsPending(false);
    // }
  };

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
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmitForm)}>
          {weekDays.map(day => (
            <div
              key={day.id}
              data-current={schedules[day.id].isOpen}
              className="relative flex min-h-[94px] flex-col items-center justify-between gap-2 border border-input/70 bg-white/20 p-3 text-xs transition data-[current=true]:border-input data-[current=true]:bg-white dark:border-slate-900 dark:bg-black/20 data-[current=true]:dark:border-slate-900/60 data-[current=true]:dark:bg-black md:gap-4 lg:min-h-[70px] lg:flex-row lg:px-4 lg:text-sm"
            >
              <div className="flex min-w-40 flex-1 items-center">
                <Checkbox
                  id={day.id}
                  checked={schedules[day.id].isOpen}
                  onCheckedChange={() => handleCheckboxChange(day.id)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  {schedules[day.id].isOpen ? (
                    <PiSun className="mr-2 h-4 w-4 text-gray-500" />
                  ) : (
                    <PiCalendarX className="mr-2 h-4 w-4 text-gray-500" />
                  )}

                  <label htmlFor={day.id} className="font-medium">
                    {day.label}
                  </label>
                </div>
              </div>

              {schedules[day.id].isOpen ? (
                <div className="flex items-center space-x-2">
                  <CustomSelect
                    defaultValue="09:00"
                    registerName={`${day.id}.start`} // Identificador único para o horário de início
                    control={form.control}
                    options={timeOptions}
                    labelText="Início"
                  />

                  <span className="text-gray-500">às</span>
                  <CustomSelect
                    defaultValue="18:00"
                    registerName={`${day.id}.end`} // Identificador único para o horário de fim
                    control={form.control}
                    options={timeOptions}
                    labelText="Fim"
                  />
                </div>
              ) : (
                <span className="white ml-4">Fechado</span>
              )}
            </div>
          ))}

          <div className="mt-8 flex justify-between border-t pt-4">
            <Button variant="ghost" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit" isLoading={isPending}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
