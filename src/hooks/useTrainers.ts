import { useEffect, useState } from "react";
import { getTrainersService } from "@/services/trainersService";

export function useTrainers() {
  const [trainers, setTrainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener entrenadores
  const getTrainers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrainersService();
      setTrainers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return {
    trainers,
    loading,
    error,
    getTrainers,
  };
}
