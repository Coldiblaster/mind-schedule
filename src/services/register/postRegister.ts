import { useMutation } from '@tanstack/react-query';

import { CreateAccountData } from '@/schemas/schemas-sign-up';

export const postRegister = async (body: CreateAccountData) => {
  const response = await fetch(`${process.env.API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-cache',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro ao cadastrar usuário: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: CreateAccountData) => postRegister(data),
  });
};
