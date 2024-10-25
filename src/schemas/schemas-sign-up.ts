import { isCEP } from 'brazilian-values';
import { z } from 'zod';

import { cepRegex } from './mask';

export const LocationSchema = z.object({
  cep: z.string().regex(cepRegex, 'CEP inválido').refine(isCEP, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  complement: z.string().optional(),
});

export const BusinessSchema = z.object({
  businessType: z.object({
    id: z.number().min(1, 'Selecione um tipo de negócio'),
    label: z.string(),
  }),
});

export const ServiceSchema = z.object({
  name: z.string().min(1, 'Nome do serviço é obrigatório'),
  price: z.string().min(1, 'Preço é obrigatório'),
  duration: z.string().min(1, 'Duração é obrigatória'),
});

export const ScheduleSchema = z.object({
  open: z
    .string()
    .min(1, 'Horário de abertura é obrigatório')
    .regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido (HH:MM)'),
  close: z
    .string()
    .min(1, 'Horário de fechamento é obrigatório')
    .regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido (HH:MM)'),
  days: z
    .array(
      z.object({
        day: z.enum([
          'Segunda',
          'Terça',
          'Quarta',
          'Quinta',
          'Sexta',
          'Sábado',
          'Domingo',
        ]),
        open: z
          .string()
          .regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido (HH:MM)'),
        close: z
          .string()
          .regex(/^\d{2}:\d{2}$/, 'Formato de horário inválido (HH:MM)'),
        isOpen: z.boolean().default(true), // Caso queira definir se está aberto ou fechado
      }),
    )
    .nonempty('É necessário ter pelo menos um dia cadastrado'),
});

// Tipos derivados dos schemas Zod
export type BusinessData = z.infer<typeof BusinessSchema>;
export type LocationData = z.infer<typeof LocationSchema>;
export type ServiceData = z.infer<typeof ServiceSchema>;
export type ScheduleData = z.infer<typeof ScheduleSchema>;
