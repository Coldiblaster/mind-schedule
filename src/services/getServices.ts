import { ServiceSuggestion } from '@/containers/auth/sign-up/steps';

interface ISegments {
  businessType: number;
}

export const getServiceSuggestion = async (
  businessType: ISegments,
  token: string,
): Promise<ServiceSuggestion> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/service-suggestion/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        businessTypeId: businessType.id,
        segment: businessType.label,
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
