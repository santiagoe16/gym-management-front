import { Gym } from "@/types/gym";
import { GYM_ENDPOINTS } from "@/constants/apiEndopoints";
import fetchWithAuth from "@/utils/fetchWithAuth"

export async function getGymsService(): Promise<Gym[]> {
  try {
    const res = await fetchWithAuth(GYM_ENDPOINTS.GYMS_ALL);

    try {
      const gyms: Gym[] = await res.json();
      return gyms;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getGymsService error:", err);
    // Re-lanzamos el error para que lo capture el hook
    throw err;
  }
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