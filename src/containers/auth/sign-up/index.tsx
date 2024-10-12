'use client';

import { useRouter } from 'next/navigation';

import { Icon } from '@/components/icon';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStepsStore } from '@/store/stepsStore';

const businessTypes = [
  { icon: '✂️', label: 'Salão de Beleza' },
  { icon: '💆', label: 'Clínica de Estética' },
  { icon: '💈', label: 'Barbearia' },
  { icon: '👣', label: 'Podologia' },
  { icon: '💅', label: 'Esmalteria' },
  { icon: '👨‍⚕️', label: 'Clínica médica' },
  { icon: '💆‍♂️', label: 'SPA e massagem' },
  { icon: '🐾', label: 'Pet e Veterinário' },
  { icon: '🎨', label: 'Estúdio de tatuagem' },
  { icon: '🦷', label: 'Clínica odontológica' },
  { icon: '🏋️', label: 'Personal e fitness' },
  { icon: '❓', label: 'Outros segmentos' },
];

export function SignUp() {
  const router = useRouter();
  const { steps, currentStepIndex, nextStep, goToStep } = useStepsStore();

  const activeStep = steps[currentStepIndex];

  return (
    <div className="flex h-full w-full animate-fade justify-center p-4 animate-delay-150 animate-duration-500 md:p-8">
      <div className="absolute right-0 top-8 flex w-full justify-between gap-2 px-8 md:right-8 md:w-auto md:gap-4">
        <div className="flex items-center gap-2 md:hidden">
          <Icon name="LuBrain" className="h-5 w-5" />
          <span className="font-semibold">mind.schedule</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" onClick={() => router.push('/')}>
            Fazer login
          </Button>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex h-full w-full flex-col justify-center gap-4 overflow-y-auto">
        <Tabs
          value={activeStep.value}
          onValueChange={value =>
            goToStep(steps.findIndex(step => step.value === value))
          }
          className="mb-8"
        >
          <TabsList className="grid w-full grid-cols-4 gap-2">
            {steps.map((step, index) => (
              <TabsTrigger
                key={step.value}
                value={step.value}
                className={`flex h-20 flex-col items-center justify-start px-2 py-1 text-center xl:h-16 ${step.active ? 'border-blue-600' : ''}`}
              >
                <span className="mb-2 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 text-white lg:h-8 lg:w-8">
                  {index + 1}
                </span>
                <span className="text-wrap text-xs xl:text-nowrap">
                  {step.label}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="mt-4 flex h-12 items-center justify-center text-center text-sm font-bold text-foreground">
          {activeStep.description}
        </div>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <h2 className="mb-4 text-2xl font-bold">Segmento de atuação</h2>
            <p className="mb-6 text-gray-600">
              Para que você tenha um ambiente personalizado, é importante saber
              qual o seu tipo de negócio.
            </p>
            <div className="grid gap-2 md:grid-cols-2 lg:gap-4">
              {businessTypes.map(type => (
                <Button
                  key={type.label}
                  variant="outline"
                  className="justify-start px-1 text-left lg:px-4"
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.label}
                </Button>
              ))}
            </div>

            <Button className="mt-6 w-full" onClick={nextStep}>
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
