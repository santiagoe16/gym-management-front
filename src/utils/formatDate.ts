/**
 * Convierte una fecha UTC a una fecha y hora en la zona horaria de Colombia.
 * @param utcDate Fecha en UTC (string o Date)
 * @returns Fecha y hora en formato local colombiano (ej: "06/08/2025, 2:30 p. m.")
 */
export function utcToColombiaDateTime(utcDate: string | Date): string {
  // Asegurarse de que la entrada sea una cadena de texto
  const dateString =
    typeof utcDate === "string" ? utcDate : utcDate.toISOString();

  // Agregar la 'Z' si no está presente
  const formattedDateString = dateString.endsWith("Z")
    ? dateString
    : dateString + "Z";

  const date = new Date(formattedDateString);

  return date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function utcToColombiaDate(utcDate: string | Date): string {
  const dateString =
    typeof utcDate === "string" ? utcDate : utcDate.toISOString();

  const formattedDateString = dateString.endsWith("Z")
    ? dateString
    : dateString + "Z";

  const date = new Date(formattedDateString);

  return date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour12: true,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * Convierte una fecha UTC a solo hora en la zona horaria de Colombia.
 * @param utcDate Fecha en UTC (string o Date)
 * @returns Hora en formato local colombiano (ej: "2:30 p. m.")
 */
export function utcToColombiaTime(utcDate: string | Date): string {
  const dateString =
    typeof utcDate === "string" ? utcDate : utcDate.toISOString();

  const formattedDateString = dateString.endsWith("Z")
    ? dateString
    : dateString + "Z";

  const date = new Date(formattedDateString);

  return date.toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Convierte una fecha local de Colombia a UTC.
 * @param colombiaDate Fecha en la hora local de Colombia (Date)
 * @returns Fecha en UTC (Date)
 */
export function colombiaToUTC(colombiaDate: Date): Date {
  const localISO = colombiaDate.toLocaleString("sv-SE", {
    timeZone: "America/Bogota",
  });

  // Convertir la fecha local (Bogotá) a una nueva fecha en UTC
  const localDate = new Date(localISO + "Z"); // El "Z" indica que es UTC
  return new Date(localDate.toISOString());
}


/**
 * Obtiene la fecha actual en formato YYYY-MM-DD para la zona horaria de Colombia.
 * @returns Fecha en formato YYYY-MM-DD (ej: "2025-08-09")
 */
export function getColombiaCurrentDateYMD(): string {
  const now = new Date();

  // Opciones para formatear la fecha como YYYY-MM-DD
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Formatea la fecha y luego la reordena para obtener YYYY-MM-DD
  const formattedDate = now.toLocaleString("es-CO", options);
  // El formato predeterminado en "es-CO" es DD/MM/YYYY.
  // Por lo tanto, separamos y reordenamos las partes.
  const [day, month, year] = formattedDate.split('/');

  return `${year}-${month}-${day}`;
}

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD para la zona horaria UTC.
 * @returns Fecha en formato YYYY-MM-DD (ej: "2025-08-09")
 */
export function getCurrentUTCDateYMD(): string {
  const now = new Date();

  const year = now.getUTCFullYear();
  
  // getUTCMonth() devuelve un valor de 0 a 11, por lo que sumamos 1.
  // Usamos padStart() para asegurarnos de que el mes tenga 2 dígitos.
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  
  // Usamos padStart() para asegurarnos de que el día tenga 2 dígitos.
  const day = String(now.getUTCDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Convierte una fecha en formato YYYY-MM-DD de Colombia a UTC para envío al backend.
 * @param colombiaDateString Fecha en formato YYYY-MM-DD en zona horaria de Colombia
 * @returns Fecha en formato YYYY-MM-DD en UTC
 */
export function colombiaDateStringToUTC(colombiaDateString: string): string {
  // Crear una fecha en la zona horaria de Colombia
  const [year, month, day] = colombiaDateString.split('-').map(Number);
  
  // Crear fecha en Colombia (mes - 1 porque Date usa 0-11 para meses)
  const colombiaDate = new Date();
  colombiaDate.setFullYear(year, month - 1, day);
  colombiaDate.setHours(0, 0, 0, 0);
  
  // Convertir a UTC
  const utcDate = colombiaToUTC(colombiaDate);
  
  // Formatear como YYYY-MM-DD
  const utcYear = utcDate.getUTCFullYear();
  const utcMonth = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const utcDay = String(utcDate.getUTCDate()).padStart(2, '0');
  
  return `${utcYear}-${utcMonth}-${utcDay}`;
}

/**
 * Convierte una fecha en formato YYYY-MM-DD de Colombia al inicio del día en UTC (00:00:00).
 * @param colombiaDateString Fecha en formato YYYY-MM-DD en zona horaria de Colombia
 * @returns Fecha y hora en formato ISO UTC (YYYY-MM-DDTHH:mm:ss.sssZ) para inicio del día
 */
export function colombiaDateToUTCStartOfDay(colombiaDateString: string): string {
  const [year, month, day] = colombiaDateString.split('-').map(Number);
  
  // Crear fecha en Colombia al inicio del día (00:00:00)
  const colombiaDate = new Date();
  colombiaDate.setFullYear(year, month - 1, day);
  colombiaDate.setHours(0, 0, 0, 0);
  
  // Convertir a UTC
  const utcDate = colombiaToUTC(colombiaDate);
  
  return utcDate.toISOString();
}

/**
 * Convierte una fecha en formato YYYY-MM-DD de Colombia al final del día en UTC (23:59:59.999).
 * @param colombiaDateString Fecha en formato YYYY-MM-DD en zona horaria de Colombia
 * @returns Fecha y hora en formato ISO UTC (YYYY-MM-DDTHH:mm:ss.sssZ) para final del día
 */
export function colombiaDateToUTCEndOfDay(colombiaDateString: string): string {
  const [year, month, day] = colombiaDateString.split('-').map(Number);
  
  // Crear fecha en Colombia al final del día (23:59:59.999)
  const colombiaDate = new Date();
  colombiaDate.setFullYear(year, month - 1, day);
  colombiaDate.setHours(23, 59, 59, 999);
  
  // Convertir a UTC
  const utcDate = colombiaToUTC(colombiaDate);
  
  return utcDate.toISOString();
}

/**
 * Convierte una fecha UTC en formato YYYY-MM-DD a fecha de Colombia para mostrar en el frontend.
 * @param utcDateString Fecha en formato YYYY-MM-DD en UTC
 * @returns Fecha en formato YYYY-MM-DD en zona horaria de Colombia
 */
export function utcDateStringToColombia(utcDateString: string): string {
  const utcDate = new Date(utcDateString + 'T00:00:00Z');

  return utcDate.toLocaleDateString('sv-SE', {
    timeZone: 'America/Bogota'
  });
}

/**
 * Convierte una fecha/hora ISO UTC a fecha y hora en Colombia.
 * @param isoDateString Fecha en formato ISO UTC (ej: "2024-01-15T10:30:00Z")
 * @returns Fecha y hora en formato local colombiano
 */
export function utcISOToColombiaDateTime(isoDateString: string): string {
  if (!isoDateString) return '';
  
  // Asegurar que la fecha tenga la 'Z' al final si no la tiene
  const formattedDateString = isoDateString.endsWith('Z') 
    ? isoDateString 
    : isoDateString + 'Z';
  
  const date = new Date(formattedDateString);
  
  return date.toLocaleString("es-CO", {
    timeZone: "America/Bogota",
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte una fecha/hora ISO UTC a solo fecha en Colombia.
 * @param isoDateString Fecha en formato ISO UTC
 * @returns Fecha en formato local colombiano (DD/MM/YYYY)
 */
export function utcISOToColombiaDate(isoDateString: string): string {
  if (!isoDateString) return '';
  
  const formattedDateString = isoDateString.endsWith('Z') 
    ? isoDateString 
    : isoDateString + 'Z';
  
  const date = new Date(formattedDateString);
  
  return date.toLocaleDateString("es-CO", {
    timeZone: "America/Bogota",
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Convierte una fecha/hora ISO UTC a solo hora en Colombia.
 * @param isoDateString Fecha en formato ISO UTC
 * @returns Hora en formato local colombiano
 */
export function utcISOToColombiaTime(isoDateString: string): string {
  if (!isoDateString) return '';
  
  // Si la fecha no tiene 'Z' ni información de zona horaria, asumimos que es UTC
  let formattedDateString = isoDateString;
  if (!isoDateString.endsWith('Z') && !isoDateString.includes('+') && !isoDateString.includes('-', 10)) {
    formattedDateString = isoDateString + 'Z';
  }
  
  const date = new Date(formattedDateString);
  
  // Si la fecha es inválida, intentar parseando como UTC directamente
  if (isNaN(date.getTime())) {
    const utcDate = new Date(isoDateString + 'Z');
    return utcDate.toLocaleTimeString("es-CO", {
      timeZone: "America/Bogota",
      hour12: true,
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return date.toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte una fecha/hora que ya está en timezone de Colombia (del backend) a hora local.
 * Esta función es específica para cuando el backend devuelve fechas ya en timezone de Colombia.
 * @param colombiaDateString Fecha en formato ISO que ya está en timezone de Colombia
 * @returns Hora en formato local colombiano
 */
export function colombiaISOToColombiaTime(colombiaDateString: string): string {
  if (!colombiaDateString) return '';
  
  // El backend devuelve fechas en timezone de Colombia, pero sin información de zona horaria
  // Necesitamos parsearla como si fuera local de Colombia, no UTC
  const date = new Date(colombiaDateString);
  
  // Si la fecha es inválida, intentar diferentes formatos
  if (isNaN(date.getTime())) {
    return '';
  }
  
  // Como la fecha ya está en timezone de Colombia, solo necesitamos formatearla
  return date.toLocaleTimeString("es-CO", {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte una fecha/hora que ya está en timezone de Colombia (del backend) a fecha local.
 * @param colombiaDateString Fecha en formato ISO que ya está en timezone de Colombia
 * @returns Fecha en formato local colombiano
 */
export function colombiaISOToColombiaDate(colombiaDateString: string): string {
  if (!colombiaDateString) return '';
  
  const date = new Date(colombiaDateString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return date.toLocaleDateString("es-CO", {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * Convierte una fecha/hora que ya está en timezone de Colombia (del backend) a fecha y hora local.
 * @param colombiaDateString Fecha en formato ISO que ya está en timezone de Colombia
 * @returns Fecha y hora en formato local colombiano
 */
export function colombiaISOToColombiaDateTime(colombiaDateString: string): string {
  if (!colombiaDateString) return '';
  
  const date = new Date(colombiaDateString);
  
  if (isNaN(date.getTime())) {
    return '';
  }
  
  return date.toLocaleString("es-CO", {
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Convierte una fecha/hora local de Colombia a formato ISO UTC para envío al backend.
 * @param colombiaDateTime Fecha y hora en Colombia (Date object)
 * @returns Fecha en formato ISO UTC
 */
export function colombiaDateTimeToUTCISO(colombiaDateTime: Date): string {
  // Convertir la fecha local de Colombia a UTC
  const utcDate = colombiaToUTC(colombiaDateTime);
  return utcDate.toISOString();
}

/**
 * Obtiene la fecha y hora actual en Colombia en formato ISO UTC.
 * @returns Fecha y hora actual en formato ISO UTC
 */
export function getCurrentColombiaDateTimeAsUTC(): string {
  const now = new Date();
  // Obtener la fecha actual en Colombia
  const colombiaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Bogota"}));
  return colombiaDateTimeToUTCISO(colombiaTime);
}

/**
 * Parsea una fecha ISO y la convierte a formato YYYY-MM-DD para inputs de fecha.
 * @param isoDateString Fecha en formato ISO
 * @returns Fecha en formato YYYY-MM-DD
 */
export function parseISOToDateInput(isoDateString: string): string {
  if (!isoDateString) return '';
  
  const date = new Date(isoDateString);
  return date.toLocaleDateString('sv-SE', {
    timeZone: 'America/Bogota'
  });
}

/**
 * Valida si una cadena es una fecha ISO válida.
 * @param dateString Cadena a validar
 * @returns true si es una fecha ISO válida
 */
export function isValidISODate(dateString: string): boolean {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  return !isNaN(date.getTime()) && dateString.includes('T');
}
