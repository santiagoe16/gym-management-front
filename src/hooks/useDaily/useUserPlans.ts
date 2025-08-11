import { useState, useEffect } from "react";
import { UserPlan } from "@/types/userPlan";
import { getDailyUserPlans } from "@/services/userPlansService";

export function useUserPlans(
  purchasedAt?: string,
  gymId?: number,
  trainerId?: number
) {
  const [userPlans, setUserPlans] = useState<UserPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserPlans = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getDailyUserPlans(purchasedAt, gymId, trainerId);
      setUserPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar planes vendidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserPlans();
  }, [purchasedAt, gymId, trainerId]);

  return {
    userPlans,
    loading,
    error,
    loadUserPlans,
  };
}
