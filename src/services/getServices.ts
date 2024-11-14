interface ISegments {
  businessTypeId: number;
}

export const getServices = async (
  { businessTypeId }: ISegments,
  token: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/service-suggestion/generate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ businessTypeId }),
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
