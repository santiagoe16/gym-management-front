import { useState } from "react";
import { createUserPlanService, CreateUserPlanDTO } from "@/services/userPlansService";

export function useCreateUserPlan() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserPlan = async (documentId: string, userPlanData: CreateUserPlanDTO) => {
    setLoading(true);
    setError(null);

    try {
      const response = await createUserPlanService(documentId, userPlanData);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al crear el plan de usuario";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUserPlan,
    loading,
    error,
  };
}
