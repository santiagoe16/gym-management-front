import { useEffect, useState } from "react";
import { getUserByIdService } from "@/services/userService";
import { User } from "@/types/user";

export function useUserById(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserById = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await getUserByIdService(userId);
      setUser(data);
    } catch (err: any) {
      const fallback = "No se pudo cargar la información del usuario.";
      setError(err?.message || fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserById();
  }, [userId]);

  return {
    user,
    loading,
    error,
    getUserById,
  };
}
