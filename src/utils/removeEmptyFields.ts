export function removeEmptyFields<T extends Record<string, any>>(data: T): Partial<T> {
    const filtered: Partial<T> = {};
    for (const key in data) {
      if (
        data[key] !== '' &&
        data[key] !== null &&
        data[key] !== undefined
      ) {
        filtered[key] = data[key];
      }
    }
    return filtered;
  }
  