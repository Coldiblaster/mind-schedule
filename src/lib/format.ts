type FormatDistanceProps = {
  distance: string | number;
  precisionDigits?: number;
  covertType?: 'meters' | 'kilometers';
};

/**
 * Essa função recebe uma distância em metros e retorna a distância formatada
 * @param {object} props
 * @param {string | number} props.distance - A distância em metros
 * @param {number} [props.precisionDigits=1] - A quantidade de casas decimais
 * @param {string} [props.covertType="meters"] - O tipo de unidade de medida
 * @returns {string}
 *
 * @example formatDistance({ distance: 1234 }) => "1.2km"
 */
export const formatDistance = ({
  distance,
  precisionDigits = 1,
  covertType = 'meters',
}: FormatDistanceProps): string => {
  const numberDistance = Number(distance);

  if (numberDistance < 1000 && covertType === 'meters') {
    return `${numberDistance}m`;
  }
  const km = numberDistance / 1000;
  return `${km.toFixed(precisionDigits)}km`;
};

/**
 * Essa função um valor minutos e retorna o valor formatado em horas, minutos ou dias
 * @param {number} minutes
 * @returns {string}
 *
 * @example "30" => "30min"
 * @example "60" => "1h"
 * @example "1440" => "1d"
 */

export const formatDuration = (minutes: number): string => {
  const numberMinutes = Number(minutes);

  if (numberMinutes < 60) {
    return `${numberMinutes}min`;
  }
  if (numberMinutes < 1440) {
    return `${Math.floor(numberMinutes / 60)}h`;
  }
  return `${Math.floor(numberMinutes / 1440)}d`;
};

/**
 * Essa função recebe um nome e retorna o nome com a primeira letra capitalizada
 * @param {string} userName
 * @returns {string}
 *
 * @example "john Doe" => "John Doe"
 */
export const capitalizarFirstLatterName = (userName: string): string => {
  return userName
    .split(' ')
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .join(' ');
};

/**
 * Essa função recebe um nome completo e retorna o nome com a primeira letra de cada palavra capitalizada
 * @param {string} userName
 * @returns {string}
 *
 * @example "john d Doe" => "John Doe"
 */
export const capitalizarFullName = (userName: string): string => {
  const names = userName?.trim().split(' ') || [];

  if (names.length > 1) {
    return capitalizarFirstLatterName(`${names[0]} ${names[names.length - 1]}`);
  }

  return capitalizarFirstLatterName(userName);
};

/**
 * Essa função recebe um telefone e retorna o telefone formatado
 * @param {string} phone
 * @returns {string}
 *
 * @example 12345678901 => (12) 34567-8901
 * @example 1234567890 => (12) 3456-7890
 */
export const formatPhone = (phone: string): string => {
  return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
};

/**
 * Essa função recebe um valor e retorna o valor formatado em moeda
 * @param {number} value
 * @returns {string}
 *
 * @example 1234.56 => R$ 1.234,56
 * @example 1234 => R$ 1.234,00
 */
export const formatCurrency = (value: number): string => {
  return value?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

/**
 * Essa função recebe um CPF e retorna o CPF formatado
 * @param {string} cpf
 * @returns {string}
 *
 * @example 12345678901 => 123.456.789-01
 */
export const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * Essa função recebe um CNPJ e retorna o CNPJ formatado
 * @param {string} cnpj
 * @returns {string}
 *
 * @example 12345678901234 => 12.345.678/9012-34
 */
export const formatCNPJ = (cnpj: string): string => {
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

/**
 * Essa função recebe uma placa normal ou mercosul e retorna a placa formatada
 * @param {string} plate
 * @returns {string}
 *
 * @example ABC1234 => ABC-1234
 * @example abc1234 => ABC-1234
 * @example abc1A23 => ABC-1A23
 */
export const formatPlate = (plate: string): string => {
  return plate
    .toUpperCase()
    .replace(/^([A-Z]{3})(\d)([A-Z]?)(\d{2,3})$/, '$1-$2$3$4');
};

/**
 * Essa função recebe uma placa normal ou mercosul e retorna a placa formatada
 * @param {string} creditCard
 * @returns {string}
 *
 * @example 1234567890123456 => 1234 5678 9012 3456
 */
export const formatCreditCard = (creditCard: string): string => {
  return creditCard.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
};

/**
 * Essa função recebe um cep e retorna o cep formatado
 * @param {string} cep
 * @returns {string}
 *
 * @example 12345678 => 12345-678
 */
export const formatCEP = (cep: string = ''): string => {
  const digitsOnly = cep.replace(/\D/g, '');
  if (!digitsOnly) return '';
  return digitsOnly
    .substring(0, 8)
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(\d{3})(\d)/, '$1$2');
};
