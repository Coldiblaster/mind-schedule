import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiCalendar, PiCalendarX, PiSun } from 'react-icons/pi';

import { CustomSelect } from '@/components/custom-select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import { CreateAccountData, ScheduleSchema } from '@/schemas/schemas-sign-up';
import { createAccount } from '@/services/createAccount';
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
      enabled: boolean;
      start: string;
      end: string;
    };
  };

  const { formData } = useStepsDataStore();
  const [isPending, setIsPending] = useState(false);

  const [schedules, setSchedules] = useState<Schedule>(
    weekDays.reduce(
      (acc, day) => ({
        ...acc,
        [day.id]: {
          enabled: true,
          start: '09:00',
          end: '18:00',
        },
      }),
      {},
    ),
  );

  const handleCheckboxChange = (dayId: string) => {
    setSchedules(prev => ({
      ...prev,
      [dayId]: {
        ...prev[dayId],
        enabled: !prev[dayId].enabled,
      },
    }));
  };

  const form = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ScheduleSchema),
    defaultValues: {
      days: Object.keys(schedules).map(dayId => ({
        startTime: schedules[dayId].start,
        endTime: schedules[dayId].end,
        isOpen: schedules[dayId].enabled,
        weekday: dayId,
      })),
    },
  });

  const onSubmitForm = async () => {
    setIsPending(true);
    if (!form.formState.isValid) {
      return;
    }

    const operatingHours = {
      days: Object.keys(schedules).map(dayId => ({
        startTime: schedules[dayId].start,
        endTime: schedules[dayId].end,
        isOpen: schedules[dayId].enabled,
        weekday: dayId,
      })),
    };

    const data: CreateAccountData = {
      providerId: '1',
      email: 'email-do-teste@gmail.com',
      customSegment: formData.business?.businessType.label,
      address: formData?.location || {
        number: '',
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
      },
      services: formData.services,
      operatingHours,
    };

    try {
      await createAccount(data);
      onNext();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
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
              className={`flex flex-col items-start gap-2 rounded-lg border border-gray-200/45 p-4 transition-colors sm:items-center md:gap-4 lg:flex-row ${schedules[day.id].enabled ? 'bg-white' : 'bg-gray-200/50'}`}
            >
              <div className="flex min-w-40 flex-1 items-center">
                <Checkbox
                  id={day.id}
                  checked={schedules[day.id].enabled}
                  onCheckedChange={() => handleCheckboxChange(day.id)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  {schedules[day.id].enabled ? (
                    <PiSun className="mr-2 h-4 w-4 text-gray-500" />
                  ) : (
                    <PiCalendarX className="mr-2 h-4 w-4 text-gray-500" />
                  )}

                  <label htmlFor={day.id} className="font-medium">
                    {day.label}
                  </label>
                </div>
              </div>

              {schedules[day.id].enabled ? (
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
                <span className="ml-4 text-gray-500">Fechado</span>
              )}
            </div>
          ))}

          <div className="mt-8 flex justify-between border-t pt-4">
            <Button variant="ghost" onClick={onBack}>
              Voltar
            </Button>
            <Button type="submit" loading={isPending}>
              Continuar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
