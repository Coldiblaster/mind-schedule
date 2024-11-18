import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@/hooks/use-auth';
import { CreateAccountProps } from '@/schemas/schemas-sign-up';

export const postRegister = async (data: CreateAccountProps, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export const usePostRegister = (data: CreateAccountProps) => {
  const { token } = useAuth();

  return useMutation({
    mutationFn: () => postRegister(data, token),
  });
};
