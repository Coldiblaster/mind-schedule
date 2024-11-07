import { useQuery } from '@tanstack/react-query';

import { CreateCompanySchema } from './type';

export const getRegister = async (body: CreateCompanySchema) => {
  const response = await fetch(`/api/register/post-user`, {
    method: 'POST',
    body: JSON.stringify(body),
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar usuário: ' + response.statusText);
  }

  return response.json();
};

export const useRegister = (data: CreateCompanySchema) => {
  return useQuery({
    queryKey: ['registerMetadata', data],
    queryFn: () => getRegister(data),
    refetchOnWindowFocus: false,
  });
};
