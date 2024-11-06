import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiCalendar, PiSun } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScheduleSchema } from '@/schemas/schemas-sign-up';

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

const weekDays = [
  { id: 'domingo', label: 'Domingo', icon: PiSun },
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

  const [schedules, setSchedules] = useState<Schedule>(
    weekDays.reduce(
      (acc, day) => ({
        ...acc,
        [day.id]: {
          enabled: day.id !== 'domingo',
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
    defaultValues: {},
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
        <div className="grid gap-4">
          {weekDays.map(day => (
            <div
              key={day.id}
              className={`flex items-center rounded-lg p-4 transition-colors ${schedules[day.id].enabled ? 'bg-blue-200/30' : 'bg-gray-200/50'}`}
            >
              <div className="flex w-48 items-center">
                <Checkbox
                  id={day.id}
                  checked={schedules[day.id].enabled}
                  onCheckedChange={() => handleCheckboxChange(day.id)}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <day.icon className="mr-2 h-4 w-4 text-gray-500" />
                  <label htmlFor={day.id} className="font-medium">
                    {day.label}
                  </label>
                </div>
              </div>

              {schedules[day.id].enabled ? (
                <div className="ml-4 flex items-center space-x-2">
                  <Select
                    value={schedules[day.id].start}
                    onValueChange={value =>
                      setSchedules(prev => ({
                        ...prev,
                        [day.id]: { ...prev[day.id], start: value },
                      }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Início" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span className="text-gray-500">às</span>

                  <Select
                    value={schedules[day.id].end}
                    onValueChange={value =>
                      setSchedules(prev => ({
                        ...prev,
                        [day.id]: { ...prev[day.id], end: value },
                      }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Fim" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map(time => (
                        <SelectItem key={time.value} value={time.value}>
                          {time.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <span className="ml-4 text-gray-500">Fechado</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between border-t pt-4">
          <Button variant="ghost" onClick={onBack}>
            Voltar
          </Button>
          <Button onClick={onNext}>Continuar</Button>
        </div>
      </Form>
    </div>
  );
}
