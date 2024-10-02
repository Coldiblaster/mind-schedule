import React from 'react';

import { Button } from '@/components/ui/button'; // Supondo que o componente Button esteja neste caminho
import { TimeProps } from '@/data/mock/professional';

interface AvailableTimesProps {
  label: string;
  times?: TimeProps[];
}

export const AvailableTimes = ({ label, times }: AvailableTimesProps) => {
  return (
    <div className="flex animate-fade flex-col gap-2">
      <span className="text-sm">{label}</span>
      <div className="flex flex-wrap gap-2">
        {times?.map(({ available, time }, index) => (
          <Button
            className="w-[76px]"
            key={index}
            disabled={!available}
            type="button"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};
