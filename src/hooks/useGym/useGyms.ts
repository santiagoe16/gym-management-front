import { useEffect, useState } from "react";
import { getGymsService } from "@/services/gymsService";
import { Gym } from "@/types/gym";

export function useGyms() {
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGyms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGymsService();
      setGyms(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGyms();
  }, []);

  return {
    gyms,
    loading,
    error,
    getGyms,
  };
} 