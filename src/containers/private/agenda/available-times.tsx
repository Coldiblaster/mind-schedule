'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import ServiceHoursInput from './service-hours-input';

interface Schedule {
  date: string;
  hours: string[];
}

export function AvailableTimes() {
  const [schedules] = React.useState<Schedule[]>([
    { date: '2024-03-05', hours: ['09:00', '10:00', '14:00', '15:00'] },
    { date: '2024-03-06', hours: ['11:00', '13:00', '16:00'] },
    { date: '2024-03-07', hours: ['09:30', '10:30', '14:30', '15:30'] },
  ]);

  // const [newDate, setNewDate] = React.useState('');
  // const [newHour, setNewHour] = React.useState('');

  // const addSchedule = () => {
  //   if (newDate && newHour) {
  //     setSchedules(prevSchedules => {
  //       const existingDate = prevSchedules.find(s => s.date === newDate);
  //       if (existingDate) {
  //         return prevSchedules.map(s =>
  //           s.date === newDate
  //             ? { ...s, hours: [...s.hours, newHour].sort() }
  //             : s,
  //         );
  //       } else {
  //         return [...prevSchedules, { date: newDate, hours: [newHour] }].sort(
  //           (a, b) => a.date.localeCompare(b.date),
  //         );
  //       }
  //     });
  //     setNewDate('');
  //     setNewHour('');
  //   }
  // };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Horários Disponíveis</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Horário</Button>
          </DialogTrigger>
          <DialogContent>
            <ServiceHoursInput />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {schedules.map((schedule, index) => (
            <div key={index}>
              <h3 className="mb-2 font-semibold">
                {new Date(schedule.date).toLocaleDateString('pt-BR')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {schedule.hours.map((hour, hourIndex) => (
                  <Button key={hourIndex} variant="outline" size="sm">
                    {hour}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
