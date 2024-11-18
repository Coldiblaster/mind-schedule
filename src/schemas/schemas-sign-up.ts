import { isCEP } from 'brazilian-values';
import { z } from 'zod';

import { cepRegex } from './mask';

export const AddressSchema = z.object({
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
  id: z.string(),
  title: z.string().min(1, 'Nome do serviço é obrigatório'),
  description: z.string().min(1, 'Descrição do serviço é obrigatório'),
  value: z.number().min(1, 'Preço é obrigatório'),
  time: z.number().min(1, 'Duração é obrigatória'),
});

export const OperatingHoursSchema = z.object({
  days: z.array(
    z.object({
      startTime: z.string().min(1, 'Hora de início é obrigatória'),
      endTime: z.string().min(1, 'Hora de término é obrigatória'),
      isOpen: z.boolean(),
      weekday: z.string().min(1, 'Dia da semana é obrigatório'),
    }),
  ),
});

export const OmittedServiceSchema = ServiceSchema.omit({ id: true });

export const CreateAccountSchema = z.object({
  businessTypeId: z.number().optional(),
  customSegment: z.string().optional(),
  address: AddressSchema,
  services: z.array(OmittedServiceSchema).optional(),
  operatingHours: OperatingHoursSchema,
  email: z.string().email('O e-mail deve ser um endereço válido'),
  providerId: z.string(),
});

// Tipos derivados dos schemas Zod
export type BusinessProps = z.infer<typeof BusinessSchema>;
export type AddressProps = z.infer<typeof AddressSchema>;
export type ServiceProps = z.infer<typeof ServiceSchema>;
export type OperatingHoursProps = z.infer<typeof OperatingHoursSchema>;
export type CreateAccountProps = z.infer<typeof CreateAccountSchema>;
