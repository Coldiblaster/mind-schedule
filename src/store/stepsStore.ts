import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define a tipagem para os steps
export interface Step {
  id: number;
  value: string;
  label: string;
  description: string;
  active: boolean;
  complete: boolean;
}

interface StepsState {
  steps: Step[];
  currentStepIndex: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  resetSteps: () => void;
}

// Array de steps inicial
const initialSteps: Step[] = [
  {
    id: 1,
    value: 'negocio',
    label: 'Sobre o seu negócio',
    description: 'Começando a conhecer melhor o seu negócio',
    active: true,
    complete: false,
  },
  {
    id: 2,
    value: 'localizacao',
    label: 'Localização',
    description: 'Com seu endereço, ajudamos a encontrarem você',
    active: false,
    complete: false,
  },
  {
    id: 3,
    value: 'servicos',
    label: 'Serviços sugeridos',
    description: 'Defina preços, tempo de trabalho para os seus serviços',
    active: false,
    complete: false,
  },
  {
    id: 4,
    value: 'expediente',
    label: 'Expediente',
    description: 'Configure os horários de atendimento',
    active: false,
    complete: false,
  },
];

export const useStepsStore = create<StepsState>()(
  persist(
    (set, get) => ({
      steps: initialSteps,
      currentStepIndex: 0,

      // Avança para o próximo step
      nextStep: () => {
        const { steps, currentStepIndex } = get();
        const nextIndex = Math.min(currentStepIndex + 1, steps.length - 1);

        set(state => ({
          currentStepIndex: nextIndex,
          steps: state.steps.map((step, index) => ({
            ...step,
            active: index === nextIndex,
            complete: index === currentStepIndex ? true : step.complete,
          })),
        }));
      },

      // Volta para o step anterior
      prevStep: () => {
        const { currentStepIndex } = get();
        const prevIndex = Math.max(currentStepIndex - 1, 0);

        set(state => ({
          currentStepIndex: prevIndex,
          steps: state.steps.map((step, index) => ({
            ...step,
            active: index === prevIndex,
          })),
        }));
      },

      // Vai diretamente para um step específico
      goToStep: (index: number) => {
        set(state => ({
          currentStepIndex: index,
          steps: state.steps.map((step, i) => ({
            ...step,
            active: i === index,
            complete: i < index || step.complete, // Marca os steps anteriores como completos
          })),
        }));
      },

      // Reseta os steps para o estado inicial
      resetSteps: () => {
        set(() => ({
          steps: initialSteps,
          currentStepIndex: 0,
        }));
      },
    }),
    {
      name: 'steps-storage', // Nome do localStorage
    },
  ),
);
