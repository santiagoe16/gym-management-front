import { useEffect, useState, useCallback } from "react";
import { getUsersService } from "@/services/userService";
import  {User}  from "@/types/user";


export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios (memorizada para evitar recreación)
  const getUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUsersService();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error al obtener usuarios");
    } finally {
      setLoading(false);
    }
  }, []);

  // Cargar al montar el componente
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      await getUsers();
    };

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false; // Evita setState en un componente desmontado
    };
  }, [getUsers]);

  return {
    users,
    loading,
    error,
    getUsers,
  };
}