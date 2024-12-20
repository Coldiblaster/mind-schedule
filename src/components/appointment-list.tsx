import { format, isEqual } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Icon } from './icon';

interface Appointment {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onRemoveAppointment: (id: string) => void;
}

export default function AppointmentList({
  appointments,
  onRemoveAppointment,
}: AppointmentListProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredAppointments = selectedDate
    ? appointments.filter(appointment =>
      isEqual(appointment.date, selectedDate),
    )
    : appointments;

  const sortedAppointments = [...filteredAppointments].sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="date-filter">Filtrar por data</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground',
              )}
            >
              <Icon name="LuCalendar" className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, 'PPP', { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {selectedDate && (
          <Button variant="ghost" onClick={() => setSelectedDate(undefined)}>
            Limpar filtro
          </Button>
        )}
      </div>

      <AnimatePresence>
        {sortedAppointments.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="my-4 text-center text-gray-500"
          >
            Nenhum horário agendado para{' '}
            {selectedDate
              ? format(selectedDate, "d 'de' MMMM", { locale: ptBR })
              : 'os dias selecionados'}
            .
          </motion.p>
        ) : (
          sortedAppointments.map(appointment => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 flex items-center justify-between rounded-lg bg-muted p-4 shadow"
            >
              <div>
                <p className="font-semibold">
                  {format(appointment.date, "EEEE, d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
                <p>
                  {appointment.startTime} - {appointment.endTime}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveAppointment(appointment.id)}
                aria-label="Remover agendamento"
              >
                <Icon name="LuTrash" className="h-4 w-4" />
              </Button>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
}
