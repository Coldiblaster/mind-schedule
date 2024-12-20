'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

import AppointmentForm from '@/components/appointment-form';
import AppointmentList from '@/components/appointment-list';
import DailyAppointments from '@/components/daily-appointments';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Appointment {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
}

export default function AppointmentScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (newAppointment: Omit<Appointment, 'id'>) => {
    const appointmentWithId = {
      ...newAppointment,
      id: `${newAppointment.date.getTime()}-${newAppointment.startTime}-${newAppointment.endTime}`,
    };
    setAppointments([...appointments, appointmentWithId]);
  };

  const removeAppointment = (id: string) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const dailyAppointments = appointments.filter(
    appointment =>
      appointment.date.toDateString() === selectedDate?.toDateString(),
  );

  return (
    <div className="w-full space-y-8 p-0">
      <h1 className="mb-8 text-3xl font-bold">Agendamento de Horários</h1>

      <Separator />

      <Tabs defaultValue="calendar" className="flex w-full flex-col gap-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="list">Lista de Agendamentos</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="border bg-background">
              <CardHeader>
                <CardTitle>Selecione a Data</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  classNames={{
                    months:
                      'w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                    month: 'w-full space-y-4',
                    caption:
                      'flex justify-center pt-1 relative items-center w-full',
                    caption_label: 'text-sm font-medium',
                    nav: 'space-x-1 flex items-center',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex w-full',
                    head_cell:
                      'text-muted-foreground rounded-md w-full font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2',
                    cell: 'text-center text-sm relative p-0 hover:bg-accent hover:text-accent-foreground rounded-md focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent w-full',
                    day: 'h-9 w-full rounded-md p-0 font-normal aria-selected:opacity-100',
                    day_selected:
                      'bg-primary rounded-md text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                    day_today: 'bg-accent text-accent-foreground',
                    day_outside: 'text-muted-foreground opacity-50',
                    day_disabled: 'text-muted-foreground opacity-50',
                    day_range_middle:
                      'aria-selected:bg-accent aria-selected:text-accent-foreground',
                    day_hidden: 'invisible',
                  }}
                  mode="single"
                  selected={selectedDate}
                  onSelect={date => setSelectedDate(date || undefined)}
                  disabled={date => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Define o início do dia atual
                    return date < today; // Desabilita datas anteriores ao dia atual
                  }}
                  initialFocus
                />
              </CardContent>
            </Card>
            <Card className="border bg-background">
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Adicionar Horário para ${format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}`
                    : 'Selecione uma data para ver os horários'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <AppointmentForm
                    onAddAppointment={addAppointment}
                    selectedDate={selectedDate}
                    existingAppointments={appointments.filter(
                      a => a.date.getTime() === selectedDate?.getTime(),
                    )}
                  />
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                    Selecione uma data no calendário para adicionar horários
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-2 border bg-background">
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Horários para ${format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}`
                    : 'Selecione uma data para ver os horários'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DailyAppointments
                  appointments={dailyAppointments}
                  onRemoveAppointment={removeAppointment}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="list">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle>Horários Agendados</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <AppointmentList
                  appointments={appointments}
                  onRemoveAppointment={removeAppointment}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
