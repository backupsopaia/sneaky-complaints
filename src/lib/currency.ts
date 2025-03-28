
/**
 * Formata um valor para a moeda Kwanza angolano (AOA)
 * @param value O valor a ser formatado
 * @param includeSymbol Se deve incluir o símbolo da moeda (Kz)
 * @returns O valor formatado
 */
export const formatAOA = (value: number, includeSymbol: boolean = true): string => {
  const formattedValue = new Intl.NumberFormat('pt-AO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
  
  return includeSymbol ? `${formattedValue} Kz` : formattedValue;
};

/**
 * Constantes de moeda para uso no sistema
 */
export const CURRENCY = {
  code: 'AOA',
  symbol: 'Kz',
  name: 'Kwanza angolano',
  locale: 'pt-AO',
};
