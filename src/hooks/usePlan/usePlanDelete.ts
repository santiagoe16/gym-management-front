import { useState } from "react";

export function usePlanDelete(getPlans: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<any>(null);

  const handleDeleteClick = (plan: any) => {
    setPlanToDelete(plan);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    // Aquí va la lógica para eliminar el plan (por ejemplo, llamada a API)
    setShowConfirm(false);
    setPlanToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setPlanToDelete(null);
  };

  return { handleDeleteClick, handleConfirmDelete, handleCancelDelete, showConfirm, planToDelete };
}
