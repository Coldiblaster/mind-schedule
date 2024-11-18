import { useMutation } from '@tanstack/react-query';

import { UserPrivateMetadata } from '@/types/user-types';

interface PutMetadataProps extends UserPrivateMetadata {
  userId: string | null | undefined;
}

const putPutMetadata = async (data: PutMetadataProps) => {
  const response = await fetch('/api/user/put-user-metadata', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    throw new Error('Erro ao salvar metadados do usuário');
  }

  return response.json();
};

export const usePutMetadata = (data: PutMetadataProps) => {
  return useMutation({
    mutationFn: () => putPutMetadata(data),
  });
};
