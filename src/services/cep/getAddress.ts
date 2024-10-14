// src/services/useCep.ts

export const getAddress = async (cep: string) => {
  const response = await fetch(`/api/cep/${cep}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Erro ao obter o endereço: ' + response.statusText);
  }

  return response.json();
};
