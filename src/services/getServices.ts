export const getServices = async () => {
  const response = await fetch(`${process.env.API_URL}/service`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Erro ao buscar serviços: ${errorData.message || response.statusText}`,
    );
  }

  return response.json();
};
