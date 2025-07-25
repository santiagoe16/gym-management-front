import { useEffect, useState } from "react";
import { getTrainersService } from "@/services/trainersService";
import {Trainer} from "@/types/trainer";

export function useTrainers() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
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
      const fallback = "No se pudieron cargar los entrenadores.";
      setError(err?.message || fallback);
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
