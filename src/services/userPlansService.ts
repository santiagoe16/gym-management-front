import fetchWithAuth from "@/utils/fetchWithAuth";
import { UserPlan } from "@/types/activity";
import { UserPlanListResponseSchema } from "@/schemas/userPlan.schemas";
import { USER_PLANS_ENDPOINTS } from "@/constants/apiEndopoints";
import { PaymentType } from "@/types/paymentType";
import { getColombiaCurrentDateYMD } from "@/utils/formatDate";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export interface CreateUserPlanDTO {
  planId: number;
  paymentType: PaymentType;
}

export const getDailyUserPlans = async (
  purchasedAt?: string,
  gymId?: number,
  trainerId?: number
): Promise<UserPlan[]> => {
  let url = `${API_BASE_URL}/api/v1/user-plans/daily`;
  
  const params = new URLSearchParams();
  
  // Si no se proporciona fecha, usar la fecha actual en formato YYYY-MM-DD
  const currentDate = getColombiaCurrentDateYMD()
  params.append('purchased_at', currentDate);
  
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

export const createUserPlanService = async (
  documentId: string,
  userPlanData: CreateUserPlanDTO
): Promise<UserPlan> => {
  try {
    const response = await fetchWithAuth(`${USER_PLANS_ENDPOINTS.USER_PLANS_CREATE}${documentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPlanData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("respuesta del servidor createUserPlan", data);
    return data;
  } catch (err) {
    console.error("createUserPlanService error:", err);
    throw err;
  }
};
