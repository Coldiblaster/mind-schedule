import { ServiceData } from '@/schemas/schemas-sign-up';

export const createService = async (data: ServiceData) => {
  const response = await fetch(`${process.env.API_URL}/service`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-cache',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro ao criar serviço: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
};
