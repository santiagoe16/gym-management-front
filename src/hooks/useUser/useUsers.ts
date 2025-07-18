import { useEffect, useState } from "react";
import { getUsersService } from "@/services/userService";
import  User  from "@/types/user";


export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener usuarios
  const getUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsersService();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return {
    users,
    loading,
    error,
    getUsers,
  };
}
