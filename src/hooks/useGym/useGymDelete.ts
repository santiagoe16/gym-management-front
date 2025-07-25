import { useState } from "react";
import { deleteGymService } from "@/services/gymsService";
import { Gym } from "@/types/gym";

export function useGymDelete(getGyms: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [gymToDelete, setGymToDelete] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (gym: Gym) => {
    setGymToDelete(gym);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!gymToDelete) return;
    setLoading(true);
    setError(null);
    try {
      await deleteGymService(gymToDelete.id);
      getGyms();
      setShowConfirm(false);
      setGymToDelete(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setGymToDelete(null);
  };

  return {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    gymToDelete,
    loading,
    error,
  };
} 