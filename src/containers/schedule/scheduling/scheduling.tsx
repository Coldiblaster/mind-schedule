'use client';

import { useMultiStepForm } from '@/hooks/multistep-form';

import { Step01 } from './step-01';
import { Step02 } from './step-02';

export function Scheduling() {
  const { data } = useMultiStepForm();

  return (
    <div className="relative flex min-h-full w-full flex-col items-start gap-4 rounded-lg bg-muted p-4 md:max-w-lg md:gap-6 md:p-12">
      {data.stepNumber === 1 && <Step01 />}
      {data.stepNumber === 2 && <Step02 />}
    </div>
  );
}
