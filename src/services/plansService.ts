import { PLAN_ENDPOINTS } from "@/constants/apiEndopoints";
import {CreatePlanDTO, Plan, UpdatePlanDTO} from "@/types/plan";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { PlanListResponseSchema, PlanResponseSchema, PlanRequestSchema } from "@/schemas/plan.schemas";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

export async function getPlansService(): Promise<Plan[]> {
  try {
    const res = await fetchWithAuth(PLAN_ENDPOINTS.PLAN_BASE);
    const data = await res.json();

    try {
      const plans: Plan[] = PlanListResponseSchema.parse(data)
      return plans;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getPlansService error:", err);
    throw err;
  }
}

export async function addPlanService(
  plan: CreatePlanDTO
): Promise<Plan> {
  // Validación de entrada
  const parseResult = PlanRequestSchema.safeParse(plan);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del plan inválidos");
  }

  const validPlan = parseResult.data;

  try {
    // Enviar el cuerpo validado al backend
    const res = await fetchWithAuth(PLAN_ENDPOINTS.PLAN_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validPlan),
    });

    const data = await res.json();

    // Validar respuesta del servidor
    const addedPlan: Plan = PlanResponseSchema.parse(data);
    return addedPlan;
  } catch (err) {
    console.error("addPlanService error:", err);
    throw new Error("Error al agregar plan");
  }
}

export async function updatePlanService(
  selectedPlanId: number,
  plan: UpdatePlanDTO
): Promise<Plan> {
  const parseResult = PlanRequestSchema.safeParse(plan);

  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del plan inválidos");
  }

  const filteredForm = removeEmptyFields(parseResult.data);

  try {
    const res = await fetchWithAuth(PLAN_ENDPOINTS.PLAN_BASE + selectedPlanId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm),
    });

    const data = await res.json();
   
    // Validar respuesta del servidor
    const updatedPlan: Plan = PlanResponseSchema.parse(data);
    return updatedPlan;
  } catch (err) {
    console.error("updatePlanService error:", err);
    throw new Error("Error al actualizar plan");
  }
}

export async function deletePlanService(id: number): Promise<number> {
  // Aquí normalmente harías un DELETE
  const res = await fetchWithAuth(PLAN_ENDPOINTS.PLAN_BASE + id, {
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
