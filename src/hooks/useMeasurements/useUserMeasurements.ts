import { useEffect, useState } from "react";
import { getUserMeasurementsService } from "@/services/measurementsService";
import { UserMeasurements } from "@/types/measurements";

export function useUserMeasurements(user_id: number) {
  const [userMeasurements, setUserMeasurements] = useState<UserMeasurements[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserMeasurements = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUserMeasurementsService(user_id);
      setUserMeasurements(data);
    } catch (err: any) {
      const fallback = "No se pudieron cargar las medidas del usuario.";
      setError(err?.message || fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserMeasurements();
  }, [user_id]);

  return {
    userMeasurements,
    loading,
    error,
    getUserMeasurements,
  };
} 