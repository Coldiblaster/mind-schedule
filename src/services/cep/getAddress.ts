import { useQuery } from '@tanstack/react-query';

import { LocationData } from '@/schemas/schemas-sign-up';

export const getAddress = async (cep: string): Promise<LocationData> => {
  const response = await fetch(`/api/cep/${cep}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao obter o endereço: ' + response.statusText);
  }

  return response.json();
};

export const useGetAddress = (cep: string | undefined) => {
  return useQuery({
    queryKey: ['userMetadata', cep],
    queryFn: () => getAddress(cep!),
    enabled: cep?.length === 8,
    refetchOnWindowFocus: false,
  });
};
