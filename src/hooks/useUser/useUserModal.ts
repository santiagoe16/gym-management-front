import { useState, useEffect } from "react";
import { addUserService, updateUserService } from "@/services/userService";
import { usePlans } from "../usePlan/usePlans";
import { useGyms } from "../useGym/useGyms";
import User from "@/types/user";

export function useUserModal(getUsers: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialForm: User = {
    name: "",
    cedula: 0,
    phone: 0,
    plan: {
      "name": "Plan Fit Pro",
      // "price": 120000,
      "gym":{
        "id": 3,
        "name": "Strong Life Gym",
        "address": "Boulevard 789, Ciudad"
      },
      "duration": 90
    },
    gym: { name: "", address: "" },
  };

  const [form, setForm] = useState(initialForm);
  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const addUser = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await addUserService(user);
      getUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actualizar usuario
  const updateUser = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateUserService(user);
      getUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (editData?: User) => {
    setOpen(true);
    if (editData) {
      setForm(editData);
      setMode("edit");
    } else {
      setForm(initialForm);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "gym") {
      const gymObj = gyms.find((g) => g.id === Number(e.target.value));
      setForm({ ...form, gym: gymObj || { id: 0, name: "", address: "" } });
    } else if (e.target.name === "plan") {
      const planObj = plans.find((p) => p.id === Number(e.target.value));
      setForm({ ...form, plan: planObj || { id: 0, name: "", price: 0, gym: { id: 0, name: "", address: "" }, duration: 0 } });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "add") {
      addUser(form);
      getUsers();
    } else {
      updateUser(form);
      getUsers();
    }

    handleClose();
  };

  return {
    open,
    mode,
    form,
    loading,
    error,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  };
}
