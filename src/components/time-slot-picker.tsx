import {
  addHours,
  addMinutes,
  format,
  isToday,
  isWithinInterval,
  parse,
  startOfHour,
} from 'date-fns';
import React from 'react';

import { Button } from '@/components/ui/button';

interface TimeSlotPickerProps {
  date: Date;
  duration: number;
  existingAppointments: { startTime: string; endTime: string }[];
  onSelectTimeSlot: (start: string, end: string) => void;
}

const BUSINESS_HOURS_START = 8;
const BUSINESS_HOURS_END = 18;

export function TimeSlotPicker({
  date,
  duration,
  existingAppointments,
  onSelectTimeSlot,
}: TimeSlotPickerProps) {
  const generateTimeSlots = () => {
    const slots = [];
    let currentTime: Date;

    if (isToday(date)) {
      const now = new Date();
      currentTime = startOfHour(addHours(now, 1));
    } else {
      currentTime = parse(`${BUSINESS_HOURS_START}:00`, 'HH:mm', date);
    }

    const endOfDay = parse(`${BUSINESS_HOURS_END}:00`, 'HH:mm', date);

    while (currentTime < endOfDay) {
      const slotStart = format(currentTime, 'HH:mm');
      const slotEnd = format(addMinutes(currentTime, duration), 'HH:mm');

      const isAvailable = !existingAppointments.some(appointment => {
        const appointmentStart = parse(appointment.startTime, 'HH:mm', date);
        const appointmentEnd = parse(appointment.endTime, 'HH:mm', date);
        return (
          isWithinInterval(currentTime, {
            start: appointmentStart,
            end: appointmentEnd,
          }) ||
          isWithinInterval(addMinutes(currentTime, duration - 1), {
            start: appointmentStart,
            end: appointmentEnd,
          })
        );
      });

      if (isAvailable) {
        slots.push({ start: slotStart, end: slotEnd });
      }

      currentTime = addMinutes(currentTime, 30); // Incremento de 30 minutos para mais opções
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="grid h-full grid-cols-2 gap-2 2xl:grid-cols-4">
      {timeSlots.map((slot, index) => (
        <Button
          key={index}
          variant="outline"
          size="xs"
          onClick={() => onSelectTimeSlot(slot.start, slot.end)}
          className="w-full"
        >
          {slot.start} - {slot.end}
        </Button>
      ))}
    </div>
  );
}
