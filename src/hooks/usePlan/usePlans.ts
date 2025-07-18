import { useEffect, useState } from "react";
import { getPlansService } from "@/services/plansService";
import { Plan } from "@/types/plan";

export function usePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPlansService();
      setPlans(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    getPlans,
  };
} 