import {
  addMinutes,
  format,
  isAfter,
  isBefore,
  isToday,
  parse,
  setHours,
  setMinutes,
} from 'date-fns';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

import { TimeSlotPicker } from './time-slot-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const isSameTime = (date1: Date, date2: Date) => {
  return (
    date1.getHours() === date2.getHours() &&
    date1.getMinutes() === date2.getMinutes()
  );
};

const DURATION_OPTIONS = [
  { value: '30', label: '30 minutos' },
  { value: '60', label: '1 hora' },
  { value: '90', label: '1 hora e 30 minutos' },
  { value: '120', label: '2 horas' },
];

interface AppointmentFormProps {
  onAddAppointment: (appointment: {
    date: Date;
    startTime: string;
    endTime: string;
  }) => void;
  selectedDate: Date;
  existingAppointments: { startTime: string; endTime: string }[];
}

export default function AppointmentForm({
  onAddAppointment,
  selectedDate,
  existingAppointments,
}: AppointmentFormProps) {
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      startTime: '',
      endTime: '',
    },
  });

  const [duration, setDuration] = useState('60');

  const startTime = watch('startTime');

  useEffect(() => {
    if (selectedDate && isToday(selectedDate)) {
      const now = new Date();
      const initialTime = addMinutes(now, 10);
      const formattedTime = format(initialTime, 'HH:mm');
      setValue('startTime', formattedTime);
    } else {
      setValue('startTime', '');
    }
    setValue('endTime', '');
  }, [selectedDate, setValue]);

  const validateTime = (value: string, fieldName: 'startTime' | 'endTime') => {
    if (!selectedDate) return 'Selecione uma data primeiro';

    const currentTime = addMinutes(new Date(), 10);
    const selectedDateTime = parse(value, 'HH:mm', selectedDate);

    if (fieldName === 'startTime') {
      if (isBefore(selectedDateTime, currentTime)) {
        return 'O horário de início deve ser pelo menos 10 minutos após o horário atual';
      }
    } else {
      const startDateTime = parse(startTime, 'HH:mm', selectedDate);
      if (isBefore(selectedDateTime, startDateTime)) {
        return 'O horário de término deve ser posterior ao horário de início';
      }
    }

    if (isAfter(selectedDateTime, setHours(setMinutes(selectedDate, 59), 23))) {
      return 'O horário não pode ser após o fim do dia (23:59)';
    }

    // Verificar sobreposição
    const hasOverlap = existingAppointments.some(appointment => {
      const existingStart = parse(appointment.startTime, 'HH:mm', selectedDate);
      const existingEnd = parse(appointment.endTime, 'HH:mm', selectedDate);
      const newStart =
        fieldName === 'startTime'
          ? selectedDateTime
          : parse(startTime, 'HH:mm', selectedDate);
      const newEnd =
        fieldName === 'endTime'
          ? selectedDateTime
          : parse(watch('endTime'), 'HH:mm', selectedDate);

      return (
        (isAfter(newStart, existingStart) && isBefore(newStart, existingEnd)) ||
        (isAfter(newEnd, existingStart) && isBefore(newEnd, existingEnd)) ||
        (isBefore(newStart, existingStart) && isAfter(newEnd, existingEnd)) ||
        isSameTime(newStart, existingStart) ||
        isSameTime(newEnd, existingEnd)
      );
    });

    if (hasOverlap) {
      toast({
        title: 'Horário Indisponível',
        description: 'Este horário se sobrepõe a um horário já cadastrado.',
        variant: 'destructive',
      });
      return 'Este horário se sobrepõe a um horário já cadastrado';
    }

    return true;
  };

  const onSubmit = async (data: { startTime: string; endTime: string }) => {
    if (selectedDate) {
      onAddAppointment({
        date: selectedDate,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      toast({
        title: 'Horário Agendado',
        description: `Agendamento realizado para ${format(selectedDate, 'dd/MM/yyyy')} das ${data.startTime} às ${data.endTime}.`,
      });
      setValue('startTime', '');
      setValue('endTime', '');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-4 lg:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="space-y-2">
          <Label htmlFor="duration">Duração para sugestões</Label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a duração" />
            </SelectTrigger>
            <SelectContent>
              {DURATION_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4 space-y-2">
          <Label>Horários sugeridos</Label>
          <TimeSlotPicker
            date={selectedDate}
            duration={parseInt(duration)}
            existingAppointments={existingAppointments}
            onSelectTimeSlot={(start, end) => {
              setValue('startTime', start);
              setValue('endTime', end);
            }}
          />
        </div>
      </div>
      <div className="flex h-full w-full max-w-[280px] flex-col justify-between gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Horário de Início</Label>
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: 'Horário de início é obrigatório',
              validate: value => validateTime(value, 'startTime'),
            }}
            render={({ field }) => (
              <Input
                id="startTime"
                type="time"
                disabled={!selectedDate}
                {...field}
                className={errors.startTime ? 'border-red-500' : ''}
              />
            )}
          />
          {errors.startTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.startTime.message as string}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">Horário de Término</Label>
          <Controller
            name="endTime"
            control={control}
            rules={{
              required: 'Horário de término é obrigatório',
              validate: value => validateTime(value, 'endTime'),
            }}
            render={({ field }) => (
              <Input
                id="endTime"
                type="time"
                disabled={!selectedDate}
                {...field}
                className={errors.endTime ? 'border-red-500' : ''}
              />
            )}
          />
          {errors.endTime && (
            <p className="mt-1 text-sm text-red-500">
              {errors.endTime.message as string}
            </p>
          )}
        </div>
        <Button type="submit" disabled={!selectedDate || isSubmitting}>
          {isSubmitting ? 'Adicionando...' : 'Adicionar Horário'}
        </Button>
      </div>
    </motion.form>
  );
}
