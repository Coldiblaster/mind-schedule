import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Icon } from './icon';

interface DailyAppointmentsProps {
  appointments: Array<{
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
  }>;
  onRemoveAppointment: (id: string) => void;
}

export default function DailyAppointments({
  appointments,
  onRemoveAppointment,
}: DailyAppointmentsProps) {
  const sortedAppointments = [...appointments].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  return (
    <ScrollArea className="h-[200px] pr-4">
      {sortedAppointments.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {sortedAppointments.map(appointment => (
            <div
              key={appointment.id}
              className="flex items-center justify-between gap-2 rounded-lg border p-2 text-sm"
            >
              <span className="font-semibold">
                {appointment.startTime} - {appointment.endTime}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemoveAppointment(appointment.id)}
                className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Icon name="LuTrash2" className="h-4 w-4" />
                <span className="sr-only">Remover agendamento</span>
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Nenhum horário agendado para esta data
        </div>
      )}
    </ScrollArea>
  );
}
