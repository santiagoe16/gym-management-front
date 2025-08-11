import fetchWithAuth from "@/utils/fetchWithAuth";
import { UserPlan } from "@/types/userPlan";
import { UserPlanListResponseSchema } from "@/schemas/userPlan.schemas";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export const getDailyUserPlans = async (
  purchasedAt?: string,
  gymId?: number,
  trainerId?: number
): Promise<UserPlan[]> => {
  let url = `${API_BASE_URL}/api/v1/user-plans/daily`;
  
  const params = new URLSearchParams();
  
  // Si no se proporciona fecha, usar la fecha actual en formato YYYY-MM-DD
  const dateToUse = purchasedAt || new Date().toISOString().split('T')[0];
  params.append('purchased_at', dateToUse);
  
  if (gymId) params.append('gym_id', gymId.toString());
  if (trainerId) params.append('trainer_id', trainerId.toString());
  
  url += `?${params.toString()}`;
  console.log(url)
  const response = await fetchWithAuth(url);
  
  if (!response.ok) {
    throw new Error(`Error al obtener planes vendidos: ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log("respuesta del servidor userPlans", data);
  return UserPlanListResponseSchema.parse(data);
};
