import { Gym, CreateGymDTO, UpdateGymDTO } from "@/types/gym";
import { GYM_ENDPOINTS } from "@/constants/apiEndopoints";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { GymListResponseSchema, GymRequestSchema, GymResponseSchema } from "@/schemas/gym.schemas";

export async function getGymsService(): Promise<Gym[]> {

  const res = await fetch(GYM_ENDPOINTS.GYM_ACTIVE);

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
    const data = await res.json();
    const gyms: Gym[] = GymListResponseSchema.parse(data);
    return gyms;
  } catch (err) {
    throw new Error("Error al parsear la respuesta del servidor");
  }
}

export async function addGymService(gym: CreateGymDTO): Promise<Gym> {
  const parseResult = GymRequestSchema.safeParse(gym);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del gimnasio inválidos");
  }

  try {
    const res = await fetchWithAuth(GYM_ENDPOINTS.GYM_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseResult.data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al agregar gimnasio");
    }

    const data = await res.json();

    const addedGym: Gym = GymResponseSchema.parse(data);
    console.log("addedGym", addedGym)
    if (!addedGym.isActive && addedGym.name === gym.name) {
        const { name, ...updatedGym } = { ...gym};
        await updateGymService(addedGym.id, updatedGym);
    }
    return addedGym;
  } catch (err) {
    console.error("addGymService error:", err);
    throw new Error("Error al agregar gimnasio");
  }
}

export async function updateGymService(id: number, gym: UpdateGymDTO): Promise<Gym> {
    const parseResult = GymRequestSchema.safeParse(gym);
    if (!parseResult.success) {
        throw new Error("Datos del gimnasio inválidos");
    }

  try {
    const res = await fetchWithAuth(GYM_ENDPOINTS.GYM_BASE + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parseResult.data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al actualizar gimnasio");
    }

    const data = await res.json();

    const updatedGym: Gym = GymResponseSchema.parse(data);
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
