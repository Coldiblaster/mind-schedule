// src/services/userService.ts
import { useQuery } from '@tanstack/react-query';

const getPutMetadata = async (userId: string) => {
  const response = await fetch('/api/user/put-user-metadata', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao salvar metadados do usuário');
  }

  return response.json();
};

export const usePutMetadata = (userId: string | null | undefined) => {
  return useQuery({
    queryKey: ['usePutMetadata', userId],
    queryFn: () => getPutMetadata(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
