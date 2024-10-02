'use client';

import { Scheduling } from '@/containers/schedule/scheduling';
// import YourSchedule from '@/containers/schedule/your-schedule';
import { MultiStepFormProvider } from '@/hooks/multistep-form';

export default function Schedule() {
  return (
    <div className="flex h-full w-full flex-col gap-3 md:flex-row">
      <MultiStepFormProvider>
        <Scheduling />
      </MultiStepFormProvider>
      {/* <YourSchedule /> */}
    </div>
  );
}
