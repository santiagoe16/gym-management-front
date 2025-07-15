import { Gym } from "@/types/gym";

export async function getGymsService(): Promise<Gym[]> {
  const res = await fetch("/mocks/gyms.json");
  if (!res.ok) throw new Error("Error al obtener gimnasios");
  return res.json();
}

export async function addGymService(gym: Omit<Gym, 'id'>): Promise<Gym> {
  // Aquí iría la lógica real de POST
  return gym as Gym;
}

export async function updateGymService(gym: Gym): Promise<Gym> {
  // Aquí iría la lógica real de PUT
  return gym;
}

export async function deleteGymService(id: number): Promise<void> {
  // Aquí iría la lógica real de DELETE
  return;
} 