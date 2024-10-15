import { isCEP } from 'brazilian-values';
import { z } from 'zod';

export const BusinessSchema = z.object({
  businessType: z.object({
    id: z.number().min(1, 'Selecione um tipo de negócio'),
    label: z.string(),
  }),
});

export const LocationSchema = z.object({
  cep: z.string().refine(isCEP, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
  complement: z.string().optional(),
});

export const ServiceSchema = z.object({
  name: z.string().min(1, 'Nome do serviço é obrigatório'),
  price: z.string().min(1, 'Preço é obrigatório'),
  duration: z.string().min(1, 'Duração é obrigatória'),
});

export const ScheduleSchema = z.object({
  opening: z.string().min(1, 'Horário de abertura é obrigatório'),
  closing: z.string().min(1, 'Horário de fechamento é obrigatório'),
});

// Tipos derivados dos schemas Zod
export type BusinessData = z.infer<typeof BusinessSchema>;
export type LocationData = z.infer<typeof LocationSchema>;
export type ServiceData = z.infer<typeof ServiceSchema>;
export type ScheduleData = z.infer<typeof ScheduleSchema>;
