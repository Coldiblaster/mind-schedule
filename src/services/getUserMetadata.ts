import { useQuery } from '@tanstack/react-query';

import { UserPrivateMetadata } from '@/types/user-types';

const getUserMetadata = async (
  userId: string,
): Promise<UserPrivateMetadata> => {
  const response = await fetch('/api/user/get-user-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Erro ao obter metadados do usuário');
  }

  return response.json();
};

export const useUserMetadata = (userId: string | undefined) => {
  return useQuery<UserPrivateMetadata>({
    queryKey: ['userMetadata', userId],
    queryFn: () => getUserMetadata(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
};
