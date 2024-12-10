import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { useAuth } from '@/hooks/use-auth';

const currentDate = new Date();

const today = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
);

export const AvailabilitySchema = z.object({
  date: z.preprocess(
    arg => (typeof arg === 'string' ? new Date(arg) : arg),
    z.date().refine(date => date >= today, {
      message: 'A data deve ser a atual ou uma data futura.',
    }),
  ),
  timeSlots: z
    .array(
      z.object({
        startTime: z.preprocess(
          arg => (typeof arg === 'string' ? new Date(arg) : arg),
          z.date(),
        ),
        endTime: z.preprocess(
          arg => (typeof arg === 'string' ? new Date(arg) : arg),
          z.date(),
        ),
      }),
    )
    .nonempty('É necessário adicionar ao menos um horário.'),
});

export type AvailabilityProps = z.infer<typeof AvailabilitySchema>;

export const postAvailability = async (
  data: AvailabilityProps,
  token: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/availability`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: 'no-cache',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro cadastrar horários: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
};

export const usePostAvailability = () => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (data: AvailabilityProps) => postAvailability(data, token),
  });
};
