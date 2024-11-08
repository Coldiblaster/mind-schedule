import { useQuery } from '@tanstack/react-query';

import { LocationData } from '@/schemas/schemas-sign-up';

export const getAddress = async (cep: string): Promise<LocationData> => {
  if (!/^\d{8}$/.test(cep)) {
    throw new Error('CEP inválido');
  }

  const response = await fetch(`/api/cep/${cep}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`Erro ao obter o endereço: ${response.statusText}`);
  }

  return response.json();
};

export const useGetAddress = (cep: string | undefined) => {
  return useQuery({
    queryKey: ['userMetadata', cep],
    queryFn: () => {
      if (!cep || cep.length !== 8) {
        throw new Error('CEP deve ter exatamente 8 caracteres');
      }
      return getAddress(cep);
    },
    enabled: Boolean(cep && cep.length === 8), // Garante que o query só será ativado com um CEP válido
    refetchOnWindowFocus: false,
  });
};
