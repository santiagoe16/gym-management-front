import { useState } from "react";
import { deletePlanService } from "@/services/plansService";

export function usePlanDelete(getPlans: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = (plan: any) => {
    setPlanToDelete(plan);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await deletePlanService(planToDelete.id);
      getPlans();
      setShowConfirm(false);
      setPlanToDelete(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setPlanToDelete(null);
  };

  return { handleDeleteClick, handleConfirmDelete, handleCancelDelete, showConfirm, planToDelete };
}
