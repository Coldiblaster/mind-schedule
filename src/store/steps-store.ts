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
    label: 'Seu negócio',
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
    label: 'Serviços',
    description:
      'Adicione detalhes como preços e duração para cada serviço oferecido.',
    active: false,
    complete: false,
  },
  {
    id: 4,
    value: 'expediente',
    label: 'Expediente',
    description:
      'Defina os horários em que seu negócio estará disponível para atendimento.',
    active: false,
    complete: false,
  },
  {
    id: 5,
    value: 'finalizado',
    label: 'Tudo certo',
    description: 'Seu cadastro foi finalizado com sucesso',
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
      onRehydrateStorage: () => state => {
        if (!state) return; // Não há estado salvo no localStorage

        // Map para otimizar a busca de steps existentes no estado
        const existingStepsMap = new Map(
          state.steps.map(step => [step.id, step]),
        );

        // Flag para verificar se houve alterações
        let stepsChanged = false;

        // Atualizando os steps (mapeando a lista de initialSteps)
        const updatedSteps = initialSteps.map(newStep => {
          const existingStep = existingStepsMap.get(newStep.id);

          // Se o step já existe, compara e atualiza os campos se houver diferenças
          if (existingStep) {
            // Verifica se há diferenças nos campos label e description
            const updatedStep: Step = { ...existingStep };
            let stepUpdated = false;

            if (existingStep.label !== newStep.label) {
              updatedStep.label = newStep.label;
              stepUpdated = true;
            }

            if (existingStep.description !== newStep.description) {
              updatedStep.description = newStep.description;
              stepUpdated = true;
            }

            // Se houve alguma alteração, marca como alterado
            if (stepUpdated) {
              stepsChanged = true;
              return updatedStep;
            }

            // Caso não haja alteração, retorna o step original
            return existingStep;
          }

          // Se o step não existir no estado, adiciona o novo step
          stepsChanged = true;
          return newStep;
        });

        // Verifica se há algum step existente no estado que não está em initialSteps
        // Caso algum step tenha sido removido no initialSteps, ele será descartado.
        const updatedStepsSet = new Set(updatedSteps.map(step => step.id));

        // Não adiciona novamente steps já presentes no estado
        const stepsToAdd = initialSteps.filter(
          newStep => !updatedStepsSet.has(newStep.id),
        );

        // Adiciona novos steps ao final, se houver algum
        if (stepsToAdd.length > 0) {
          updatedSteps.push(...stepsToAdd);
          stepsChanged = true;
        }

        // Se houve qualquer alteração, atualiza o estado
        if (stepsChanged) {
          state.steps = updatedSteps;
        }
      },
    },
  ),
);
