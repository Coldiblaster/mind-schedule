'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { usePostAvailability } from '@/services/availability/postAvailability';

const currentDate = new Date();

const today = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
);

const FormSchema = z.object({
  date: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date().refine(date => date >= today, {
      message: 'A data deve ser a atual ou uma data futura.',
    }),
  ),
  timeSlots: z
    .array(
      z
        .object({
          startTime: z
            .string()
            .refine(time => !!time, 'Horário inicial é obrigatório.'),
          endTime: z
            .string()
            .refine(time => !!time, 'Horário final é obrigatório.'),
        })
        .refine(slot => {
          const [startHours, startMinutes] = slot.startTime
            .split(':')
            .map(Number);
          const [endHours, endMinutes] = slot.endTime.split(':').map(Number);

          const start = startHours * 60 + startMinutes;
          const end = endHours * 60 + endMinutes;

          return end - start >= 10;
        }, 'O horário final deve ser ao menos 10 minutos maior que o inicial.'),
    )
    .nonempty('É necessário adicionar ao menos um horário.'),
});

export default function ServiceHoursInput() {
  const saveAvailability = usePostAvailability();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      timeSlots: [{ startTime: '', endTime: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'timeSlots',
  });

  const [open, setOpen] = useState(false); // Estado para controlar o Popover

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    const formattedData = {
      ...data,
      timeSlots: data.timeSlots.map(slot => ({
        startTime: convertTimeToTimestamp(slot.startTime, data.date),
        endTime: convertTimeToTimestamp(slot.endTime, data.date),
      })),
    };

    try {
      await saveAvailability.mutateAsync({
        ...formattedData,
        timeSlots: [
          formattedData.timeSlots[0],
          ...formattedData.timeSlots.slice(1),
        ],
      });

      toast({
        title: 'Horários salvos com sucesso!',
      });
    } catch (error) {
      // Tratamento de erro
      toast({
        title: 'Ocorreu um erro ao tentar salvar os horários, tente novamente!',
        variant: 'destructive',
      });
    }
  };

  const convertTimeToTimestamp = (time: string, date: Date) => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
  };

  const validateEndTime = (index: number, endTime: string) => {
    const startTime = form.getValues(`timeSlots.${index}.startTime`);

    if (!startTime) return; // Se não houver startTime, não faz validação.

    // Convertendo startTime e endTime para minutos desde a meia-noite
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;

    const differenceInMinutes = endInMinutes - startInMinutes;

    // Verifica se a diferença entre startTime e endTime é menor que 10 minutos
    if (differenceInMinutes < 10) {
      form.setError(`timeSlots.${index}.endTime`, {
        message:
          'O horário final deve ser ao menos 10 minutos maior que o horário inicial.',
      });
    } else {
      form.clearErrors(`timeSlots.${index}.endTime`);
    }
  };

  const validateStartTime = (index: number, startTime: string) => {
    const dateSelected = form.getValues('date');
    const timeSlots = form.getValues('timeSlots');
    const currentDate = new Date();

    // Se a data selecionada for o dia atual, verifique o horário
    if (
      dateSelected &&
      dateSelected.toDateString() === currentDate.toDateString()
    ) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const startTimeInMinutes = startHours * 60 + startMinutes;
      const currentTimeInMinutes =
        currentDate.getHours() * 60 + currentDate.getMinutes();

      // Calcule o tempo mínimo que deve ser 10 minutos após o horário atual
      const minimumTimeInMinutes = currentTimeInMinutes + 10;

      if (startTimeInMinutes < minimumTimeInMinutes) {
        form.setError(`timeSlots.${index}.startTime`, {
          message:
            'O horário de início deve ser ao menos 10 minutos após o horário atual.',
        });
        return; // Para evitar validações adicionais se a primeira falhar
      }
    }

    // Validação do próximo horário em relação ao `endTime` anterior
    if (index > 0) {
      const previousEndTime = timeSlots[index - 1]?.endTime;
      if (previousEndTime) {
        const [endHours, endMinutes] = previousEndTime.split(':').map(Number);
        const previousEndTimeInMinutes = endHours * 60 + endMinutes;

        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const startTimeInMinutes = startHours * 60 + startMinutes;

        if (startTimeInMinutes <= previousEndTimeInMinutes) {
          form.setError(`timeSlots.${index}.startTime`, {
            message:
              'O horário de início deve ser maior que o horário de término anterior.',
          });
          return;
        }
      }
    }

    // Se todas as validações passarem, limpe os erros
    form.clearErrors(`timeSlots.${index}.startTime`);
  };

  const getCurrentTimePlusTenMinutes = () => {
    const date = form.getValues('date');
    if (date && date.toDateString() === new Date().toDateString()) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);

      // Obtendo hora e minuto local
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }

    return false;
  };

  const addNewTime = () => {
    const lastSlot = form.getValues('timeSlots').at(-1);
    if (!lastSlot || !lastSlot.startTime || !lastSlot.endTime) {
      toast.error(
        'Preencha o horário inicial e final antes de adicionar um novo!',
        { id: '1' },
      );
      return;
    }

    const startTime = getCurrentTimePlusTenMinutes();

    if (startTime) append({ startTime, endTime: '' });
    else append({ startTime: '', endTime: '' });
  };

  useEffect(() => {
    const startTime = getCurrentTimePlusTenMinutes();

    if (startTime) form.setValue('timeSlots', [{ startTime, endTime: '' }]);
  }, [form.getValues('date')]);

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>Configurar Horários de Atendimento</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base font-bold">
                    Data do Atendimento
                  </FormLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: ptBR })
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <Icon
                            name="LuCalendar"
                            className="ml-auto h-4 w-4 opacity-50"
                          />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={date => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                        disabled={date => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0); // Define o início do dia atual
                          return date < today; // Desabilita datas anteriores ao dia atual
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="space-y-0">
                    Escolha uma data para disponibilizar horários para
                    agendamento pelos clientes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues('date') && (
              <div className="animate-fade-up space-y-4">
                <Label>
                  Configure os horários disponíveis para atendimento. Os
                  clientes poderão agendar dentro dos períodos selecionados.
                </Label>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-start space-x-2">
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`timeSlots.${index}.startTime`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              htmlFor={`timeSlots.${index}.startTime`}
                              className="text-xs"
                            >
                              Horário Inicial:
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={`timeSlots.${index}.startTime`}
                                placeholder="Ex: 10:10"
                                type="time"
                                autoComplete="off"
                                onChange={e => {
                                  field.onChange(e); // Aciona o onChange do react-hook-form
                                  validateStartTime(index, e.target.value); // Validação específica
                                }}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField
                        control={form.control}
                        name={`timeSlots.${index}.endTime`}
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel
                              htmlFor={`timeSlots.${index}.endTime`}
                              className="text-xs"
                            >
                              Horário Final
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={`timeSlots[${index}].endTime`}
                                placeholder="Ex: 10:10"
                                type="time"
                                autoComplete="off"
                                onChange={e => {
                                  field.onChange(e); // Aciona o onChange do react-hook-form
                                  validateEndTime(index, e.target.value); // Validação específica
                                }}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        aria-label="Remove time slot"
                        className="mt-7"
                      >
                        <Icon name="LuX" className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addNewTime} variant="outline">
                  Adicionar Novo Horário
                </Button>

                <Button type="submit" className="w-full">
                  Salvar Horários Disponíveis
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
