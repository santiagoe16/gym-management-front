export interface Plans {
  id?: number;
  name: string;
  price: number;
  gym_name: string;
  duration: number;
}

export async function getPlansService(): Promise<Plans[]> {
  const res = await fetch("/mocks/plans.json");
  if (!res.ok) throw new Error("Error al obtener planes");
  return res.json();
}
