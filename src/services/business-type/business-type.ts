import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/use-auth';

export interface BusinessTypeProps {
  id: number;
  label: string;
  icon: string;
}

export interface BusinessTypeResponse {
  businessTypes: BusinessTypeProps[];
}

const getBusinessType = async (
  token: string,
): Promise<BusinessTypeResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business-type`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      cache: 'no-cache',
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro ao buscar serviços: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
};

export const useGetBusinessType = () => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['useGetBusinessType', 'businessType'],
    queryFn: () => getBusinessType(token),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });
};
