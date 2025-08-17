import { useState } from "react";
import { Plan, CreatePlanDTO } from "@/types/plan";
import { useGyms } from "../useGym/useGyms";
import { addPlanService, updatePlanService } from "@/services/plansService";

export function usePlanModal(getPlans: () => void) {
  const initialForm: CreatePlanDTO = {
    name: "",
    price: "",
    gymId: 0,
    durationDays: 0,
    role: "regular",
    days: undefined,
  };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<CreatePlanDTO>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const handleOpen = (editData?: Plan) => {
    setOpen(true);
    if (editData) {
      const { id, ...formData } = editData;
      setForm(formData);
      setEditId(id);
      setMode("edit");
    } else {
      setEditId(null);
      setForm(initialForm);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditId(null);
    setForm(initialForm);
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ["gymId", "durationDays", "days"].includes(name) ? Number(value) : value,
    }));
  };
  const addPlan = async (plan: CreatePlanDTO) => {
    setLoading(true);
    setError(null);
    try {
      await addPlanService(plan);
      getPlans();
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (plan: any) => {
    if (!editId) return;
    setLoading(true);
    setError(null);
    try {
      await updatePlanService(editId, plan);
      getPlans();
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      addPlan(form);
    } else {
      updatePlan(form);
    }
  };

  return {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    loading,
    error,
    gyms,
    gymsLoading,
    gymsError,
  };
}
