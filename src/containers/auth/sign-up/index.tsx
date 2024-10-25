'use client';

import { useCallback, useMemo } from 'react';

import { Icon } from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStepsStore } from '@/store/steps-store';

import { HeaderAuth } from '../header-auth';
import {
  LocationForm,
  ScheduleForm,
  SegmentForm,
  ServicesForm,
  SuccessCreate,
} from './steps';

export function SignUp() {
  const { steps, currentStepIndex, nextStep, goToStep, prevStep, resetSteps } =
    useStepsStore();

  const activeStep = steps[currentStepIndex];

  // Memoiza o formulário para evitar re-renderizações desnecessárias
  const renderForm = useMemo(() => {
    switch (activeStep.id) {
      case 1:
        return <SegmentForm onNext={nextStep} />;
      case 2:
        return <LocationForm onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <ServicesForm onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <ScheduleForm onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <SuccessCreate resetSteps={resetSteps} />;
      default:
        return null;
    }
  }, [activeStep, nextStep, prevStep, resetSteps]);

  // Função callback para troca de abas, otimizada com useCallback
  const handleTabChange = useCallback(
    (value: string) => goToStep(steps.findIndex(step => step.value === value)),
    [goToStep, steps],
  );

  return (
    <div className="flex h-full w-full animate-fade flex-col gap-4 overflow-y-auto py-4 animate-delay-150 animate-duration-500 md:py-8">
      <HeaderAuth />

      <Tabs
        value={activeStep.value}
        onValueChange={handleTabChange}
        className="mb-8"
      >
        <TabsList className="grid w-full grid-cols-5 md:gap-2">
          {steps.map((step, index) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              disabled={
                !step.complete && index > steps.findIndex(s => s.active)
              }
              className={`flex h-full flex-col items-center justify-start p-3 text-center ${step.active ? 'border-blue-600' : ''}`}
            >
              <div
                className={`${step.complete && 'bg-green-600'} mb-2 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 lg:h-8 lg:w-8`}
              >
                {step.complete ? (
                  <Icon name="MdCheck" className="text-white" size={18} />
                ) : (
                  <span className="text-white">{index + 1}</span>
                )}
              </div>

              <span className="text-wrap text-xs xl:text-nowrap">
                {step.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 flex h-12 items-center justify-center text-sm font-bold text-foreground transition-all md:justify-start">
        {activeStep.description}
      </div>

      <Card className="rounded-none">
        <CardContent className="overflow-x-hidden bg-background p-4 lg:p-6">
          {renderForm}
        </CardContent>
      </Card>
    </div>
  );
}
