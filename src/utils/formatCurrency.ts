/**
 * Formatea un número como precio en pesos colombianos
 * @param amount - El monto a formatear (puede ser string o number)
 * @returns String formateado como precio en pesos colombianos
 */
export const formatCurrency = (amount: string | number): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return '$0';
  }

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount).replace('COP', '').trim();
};

/**
 * Formatea un input de precio mientras el usuario escribe
 * @param value - El valor del input
 * @returns Valor formateado para mostrar en el input
 */
export const formatPriceInput = (value: string): string => {
  // Remover todo excepto números
  const numericValue = value.replace(/[^\d]/g, '');
  
  if (!numericValue) {
    return '';
  }

  // Convertir a número y formatear
  const number = parseInt(numericValue);
  return new Intl.NumberFormat('es-CO').format(number);
};

/**
 * Convierte un valor formateado de vuelta a número para enviar al backend
 * @param formattedValue - Valor formateado del input
 * @returns Número sin formato
 */
export const parsePriceInput = (formattedValue: string): number => {
  const numericValue = formattedValue.replace(/[^\d]/g, '');
  return parseInt(numericValue) || 0;
};

/**
 * Maneja el cambio en un input de precio, formateando automáticamente
 * @param value - Nuevo valor del input
 * @param onChange - Función callback para actualizar el estado
 * @param fieldName - Nombre del campo a actualizar
 */
export const handlePriceInputChange = (
  value: string,
  onChange: (field: string, value: string) => void,
  fieldName: string
) => {
  const formattedValue = formatPriceInput(value);
  onChange(fieldName, formattedValue);
};
