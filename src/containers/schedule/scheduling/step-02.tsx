'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AvailableTimes } from '@/components/available-times';
import { CardProfessional } from '@/components/card-professional';
import { Icon } from '@/components/icon';
// import { toast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { AvailableTimesProps } from '@/data/mock/professional';
import { useMultiStepForm } from '@/hooks/multistep-form';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const FormSchema = z.object({
  selectedDate: z.date({
    required_error: 'A date of birth is required.',
  }),
});

export function Step02() {
  const { updatePropertyForm, data } = useMultiStepForm();
  const { toast } = useToast();

  const { professional } = data;

  const [open, setOpen] = useState(false); // Estado para controlar o Popover
  const [availableTimes, setAvailableTimes] = useState<AvailableTimesProps>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const handleSelectedDate = (selectedDate: Date) => {
    // Atualiza o campo com a data selecionada
    setOpen(false);

    if (!selectedDate || !professional?.time) return;

    // Filtra o dia correspondente à data selecionada
    const availableTimesForSelectedDate = professional.time.find(
      availableTime =>
        availableTime.day.toDateString() === selectedDate.toDateString(),
    );

    if (availableTimesForSelectedDate) {
      // Atualiza o estado com os horários disponíveis do dia selecionado
      setAvailableTimes(availableTimesForSelectedDate);

      // Chama a função de submit para salvar a data selecionada no form

      console.log(
        'Horários disponíveis para o dia selecionado:',
        availableTimesForSelectedDate,
      );
    } else {
      setAvailableTimes(undefined);
      console.log('Nenhum horário disponível para essa data.');
    }
  };

  const handleBackStep = () => {
    updatePropertyForm({ stepNumber: data.stepNumber - 1 });
  };

  return (
    <div className="flex w-full animate-fade flex-col gap-4">
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          className="hover:bg-background/40"
          size="icon"
          variant="ghost"
          onClick={handleBackStep}
        >
          <Icon name="LuArrowLeftCircle" size={20} />
        </Button>

        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold md:text-2xl">Agende sua consulta</h1>
          <span className="text-xs text-muted-foreground md:text-sm">
            Selecione uma data e horário disponíveis
          </span>
        </div>
      </div>

      <div className="w-full rounded-md border border-muted-foreground/30 p-4 shadow-lg">
        <CardProfessional
          avatar={professional.avatar}
          name={professional.name}
          specialty={professional.specialty}
          advice={professional.advice}
          className="p-0"
          professionalDetails
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="selectedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base font-bold">Data</FormLabel>
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
                          <span>Selecione uma data</span>
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
                        date && handleSelectedDate(date);
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
                  Selecione uma data para visualizar os horários disponíveis
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.getValues('selectedDate') && (
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Horários</h1>

              <div className="flex flex-col gap-3">
                {availableTimes?.morning && (
                  <AvailableTimes
                    label="Manhã"
                    times={availableTimes?.morning}
                  />
                )}

                {availableTimes?.afternoon && (
                  <AvailableTimes
                    label="Tarde"
                    times={availableTimes?.afternoon}
                  />
                )}

                {availableTimes?.night && (
                  <AvailableTimes label="Noite" times={availableTimes?.night} />
                )}

                {!availableTimes && (
                  <span className="text-sm">
                    Nenhum horário disponível para essa data.
                  </span>
                )}
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
