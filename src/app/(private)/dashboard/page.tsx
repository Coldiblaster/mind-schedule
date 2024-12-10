'use client';

import { useState } from 'react';

import { MetricCards } from '@/components/metric-cards';
import { RecentBookings } from '@/components/recent-bookings';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AvailableTimes } from '@/containers/private/agenda/available-times';

export default function Dashboard() {
  const [businessType, setBusinessType] = useState('barbershop');

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Painel de Controle
        </h2>
        <div className="flex items-center space-x-2">
          <Select value={businessType} onValueChange={setBusinessType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o tipo de negócio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="barbershop">Barbearia</SelectItem>
              <SelectItem value="psychologist">Psicólogo</SelectItem>
              <SelectItem value="mechanic">Mecânico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-4">
        <MetricCards businessType={businessType} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <AvailableTimes />
          <RecentBookings businessType={businessType} />
        </div>
      </div>
    </div>
  );
}
