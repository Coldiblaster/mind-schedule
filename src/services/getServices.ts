import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/hooks/use-auth';

interface ServiceSuggestionBody {
  businessTypeId?: number;
  segment?: string;
}

export interface ServiceSuggestionProps {
  id: string;
  description?: string;
  time: number;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  value: number;
}

export interface ServiceSuggestionResponse {
  services: ServiceSuggestionProps[];
}

export const getServiceSuggestion = async (
  { businessTypeId, segment }: ServiceSuggestionBody,
  token: string,
): Promise<ServiceSuggestionResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/service-suggestion/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        businessTypeId,
        segment,
      }),
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

export const useServiceSuggestion = (
  { businessTypeId, segment }: ServiceSuggestionBody,
  enabled: boolean,
) => {
  const { token } = useAuth();

  return useQuery({
    queryKey: ['useServiceSuggestion', businessTypeId, segment, token],
    queryFn: () => getServiceSuggestion({ businessTypeId, segment }, token),
    enabled: !!token && enabled && !!businessTypeId && !!segment,
    refetchOnWindowFocus: false,
  });
};
