'use client';

import { Card } from '@/components/ui/card';
import { useMultiStepForm } from '@/hooks/use-multistep-form';

import { Step01 } from './step-01';
import { Step02 } from './step-02';

export function Scheduling() {
  const { data } = useMultiStepForm();

  return (
    <Card className="min-h-full w-full md:max-w-lg">
      {data.stepNumber === 1 && <Step01 />}
      {data.stepNumber === 2 && <Step02 />}
    </Card>
  );
}
