import { useState } from "react";
import { deleteTrainerService } from "@/services/trainersService";

export function useTrainerDelete(getTrainers: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [trainerToDelete, setTrainerToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (trainer: any) => {
    setTrainerToDelete(trainer);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteTrainerService(trainerToDelete.id);
      getTrainers();
      setShowConfirm(false);
      setTrainerToDelete(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setTrainerToDelete(null);
  };

  return {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    trainerToDelete,
    loading,
    error,
  };
} 