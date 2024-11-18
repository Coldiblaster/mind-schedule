'use client';

import { useCallback, useMemo } from 'react';

import { Icon } from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStepsStore } from '@/store/steps-store';

import { HeaderAuth } from '../header-auth';
import {
  Confirmation,
  LocationForm,
  ScheduleForm,
  SegmentForm,
  ServicesForm,
} from './steps';

export function SignUp() {
  const { steps, currentStepIndex, nextStep, goToStep, prevStep, resetSteps } =
    useStepsStore();

  const activeStep = steps[currentStepIndex];

  const renderForm = useMemo(() => {
    switch (activeStep.id) {
      case 1:
        return <SegmentForm title={activeStep.description} onNext={nextStep} />;
      case 2:
        return (
          <LocationForm
            title={activeStep.description}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <ServicesForm
            title={activeStep.description}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <ScheduleForm
            title={activeStep.description}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 5:
        return <Confirmation />;
      default:
        return null;
    }
  }, [activeStep, nextStep, prevStep, resetSteps]);

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
        className="mb-4"
      >
        <TabsList
          variant="secondary"
          className="grid w-full grid-cols-5 md:gap-2"
        >
          {steps.map((step, index) => (
            <TabsTrigger
              key={step.value}
              value={step.value}
              disabled={
                !step.complete && index > steps.findIndex(s => s.active)
              }
              className={`flex h-full flex-col items-center justify-start p-1 text-center md:p-2 lg:p-3`}
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

              <span className="text-[10px] md:text-xs xl:text-sm">
                {step.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="rounded-none">
        <CardContent className="overflow-x-hidden bg-background p-4 lg:p-6">
          {renderForm}
        </CardContent>
      </Card>

      {activeStep.id === 5 && (
        <div className="mx-auto mt-8 max-w-lg text-center text-sm text-gray-400">
          <p>
            {`Ao clicar em "Efetuar cadastro", você concorda com nossos `}
            <a href="#" className="text-blue-400 hover:underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-blue-400 hover:underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
