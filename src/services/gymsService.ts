import { Gym, CreateGymDTO } from "@/types/gym";
import { GYM_ENDPOINTS } from "@/constants/apiEndopoints";
import fetchWithAuth from "@/utils/fetchWithAuth";

export async function getGymsService(): Promise<Gym[]> {

  const res = await fetch(GYM_ENDPOINTS.GYM_BASE);

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const errorBody = await res.json();
      message = errorBody?.message || message;
    } catch (_) {
      // ignore parse error, keep generic message
    }
    const error = new Error(message);
    (error as any).status = res.status;
    throw error;
  }

  try {
    const gyms: Gym[] = await res.json();
    return gyms;
  } catch (err) {
    throw new Error("Error al parsear la respuesta del servidor");
  }
}

export async function addGymService(gym: CreateGymDTO): Promise<Gym> {
  // Validación de entrada

  try {
    const res = await fetchWithAuth(GYM_ENDPOINTS.GYM_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gym),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al agregar gimnasio");
    }

    const data = await res.json();

    // Validar respuesta del servidor
    const addedGym: Gym = data;
    return addedGym;
  } catch (err) {
    console.error("addGymService error:", err);
    throw new Error("Error al agregar gimnasio");
  }
}

export async function updateGymService(gym: Gym): Promise<Gym> {
  try {
    const res = await fetchWithAuth(GYM_ENDPOINTS.GYM_BASE + gym.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gym),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al actualizar gimnasio");
    }

    const data = await res.json();

    const updatedGym: Gym = data;
    return updatedGym;
  } catch (err) {
    console.error("updateGymService error:", err);
    throw new Error("Error al actualizar gimnasio");
  }
}

export async function deleteGymService(id: number): Promise<string> {
  const res = await fetchWithAuth(GYM_ENDPOINTS.GYM_BASE + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: false }),
  });

  if (!res.ok) {
    console.log(res)
    const errorBody = await res.json();
    console.error("Código de error:", res.status);
    throw new Error(errorBody.datail || `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.message;
}
