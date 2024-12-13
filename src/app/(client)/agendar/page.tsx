'use client';

import { useState } from 'react';

import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function SchedulePage() {
  const [date, setDate] = useState<Date>(new Date(2024, 9, 4)); // October 4, 2024
  const [selectedTime, setSelectedTime] = useState<string | null>('10:30');

  const timeSlots = ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 p-4 md:flex-row">
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <span className="text-sm font-medium text-primary-foreground">
                VB
              </span>
            </div>
            <div>
              <h2 className="font-semibold">30 minutos </h2>
              <p className="text-sm text-muted-foreground">Consulta</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="PiVideoCamera" size="20" />
            <span>Vídeo chamada</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="PiClock" size="20" />
            <span>30 minutos</span>
          </div>
        </div>
      </div>
      <Card className="flex-[2]">
        <CardHeader>
          <CardTitle>Urulogista</CardTitle>
          <p></p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8 md:flex-row">
            <Calendar
              mode="single"
              selected={date}
              onSelect={date => date && setDate(date)}
              className="rounded-md border"
              month={new Date(2024, 9)}
            />
            <ScrollArea className="h-[300px] rounded-md border md:w-[200px]">
              <div className="space-y-2 p-4">
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
