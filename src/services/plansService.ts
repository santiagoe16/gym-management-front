import { PLAN_ENDPOINTS } from "@/constants/apiEndopoints";
import Plan from "@/types/plan";
import fetchWithAuth from "@/utils/fetchWithAuth";

export async function getPlansService(): Promise<Plan[]> {
  try {
    const res = await fetchWithAuth(PLAN_ENDPOINTS.PLANS_ALL);

    try {
      const plans: Plan[] = await res.json();
      console.log(plans)
      return plans;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getPlansService error:", err);
    throw err;
  }
}
