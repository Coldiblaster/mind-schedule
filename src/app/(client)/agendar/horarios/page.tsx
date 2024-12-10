'use client';

import { useState } from 'react';
import { PiAlarmThin, PiCalendarThin } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Schedules() {
  const [date, setDate] = useState<Date | undefined>(new Date('09-12-2024'));
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    console.log('Selected time:', value);
  };
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Escolha sua data e hora</CardTitle>
        <CardDescription>
          Escolha a especialidade que deseja agendar
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 bg-gray-100 p-4">
        <Card className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <PiCalendarThin size={24} className="text-muted-foreground" />
            <p>Data do agendamento</p>
          </div>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mt-2"
              lang="pt-br"
              initialFocus
            />
          </div>
        </Card>
        <Card className="flex flex-col gap-2 p-4">
          <div className="flex items-center gap-2">
            <PiAlarmThin size={24} className="text-muted-foreground" />
            <p>Horários disponíveis</p>
          </div>
          <RadioGroup
            value={selectedTime}
            onValueChange={handleTimeChange}
            className="mt-4 grid grid-cols-3 gap-2"
          >
            {['09:00', '10:00', '11:00', '17:00', '18:00'].map(time => (
              <Label
                key={time}
                className={`flex cursor-pointer items-center justify-center rounded-lg border p-4 transition-colors ${
                  selectedTime === time
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <RadioGroupItem value={time} className="sr-only" />
                {time}
              </Label>
            ))}
          </RadioGroup>
        </Card>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg">
          Agendar
        </Button>
      </CardFooter>
    </Card>
  );
}
