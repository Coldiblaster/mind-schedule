'use client';

import { useSignIn, useSignUp } from '@clerk/nextjs';
import { OAuthStrategy } from '@clerk/types';
import Image from 'next/image';
import { useCallback, useMemo } from 'react';

import SignInForm from '@/app/sign-in/[[...sign-in]]';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
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

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const activeStep = steps[currentStepIndex];

  const signInWith = (strategy: OAuthStrategy) => {
    if (signIn) {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/login-callback',
        redirectUrlComplete: '/login-callback',
      });
    }
    return null;
  };

  // Memoiza o formulário para evitar re-renderizações desnecessárias
  const renderForm = useMemo(() => {
    switch (activeStep.id) {
      case 1:
        return <SegmentForm onNext={nextStep} onBack={prevStep} />;
      case 2:
        return <LocationForm onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <ServicesForm onNext={nextStep} onBack={prevStep} />;
      case 4:
        return <ScheduleForm onNext={nextStep} onBack={prevStep} />;
      case 5:
        return <Confirmation resetSteps={resetSteps} />;
      default:
        return null;
    }
  }, [activeStep, nextStep, prevStep, resetSteps]);

  // Função callback para troca de abas, otimizada com useCallback
  const handleTabChange = useCallback(
    (value: string) => goToStep(steps.findIndex(step => step.value === value)),
    [goToStep, steps],
  );

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // Verifica se o usuário precisa de uma conta nova
    const userNeedsToBeCreated =
      signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      // Cria a conta do usuário com OAuth e redireciona
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/login-callback',
        redirectUrlComplete: '/login-callback',
      });
    } else {
      // Se o usuário já tem uma conta, faz o login com OAuth
      signInWith(strategy);
    }
  }

  return (
    <div className="flex h-full w-full animate-fade flex-col gap-4 overflow-y-auto py-4 animate-delay-150 animate-duration-500 md:py-8">
      <HeaderAuth />
      <div className="mx-auto flex max-w-[350px] flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Nova conta</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie sua agenda, finanças e mais em um só lugar.
          </p>
        </div>
        <Button
          variant="outline"
          className="flex w-full gap-2"
          onClick={() => handleSignIn('oauth_google')}
        >
          <Image
            src="/logos/icons8-google.svg"
            width={24}
            height={24}
            alt="Logo google"
          />
          Criar conta com Google
        </Button>
        <div className="inline-flex w-full items-center justify-center">
          <hr className="my-3 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700" />
          <p className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-center text-muted-foreground dark:bg-gray-900">
            ou
          </p>
        </div>
        <SignInForm />
      </div>
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
              className={`flex h-full flex-col items-center justify-start p-1 text-center md:p-2 lg:p-3 ${step.active ? 'border-blue-600' : ''}`}
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

              <span className="text-[10px] md:text-sm">{step.label}</span>
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
