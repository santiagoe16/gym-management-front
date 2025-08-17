import { useState } from "react";
import react from "react";
import { deleteUserService } from "@/services/userService";

export function useUserDelete(getUsers: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    // // Eliminar usuario
    setLoading(true);
    setError(null);
    try {
      await deleteUserService(userToDelete.id);
      getUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    setShowConfirm(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  return {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    userToDelete,
    loading,
    error,
  };
}
