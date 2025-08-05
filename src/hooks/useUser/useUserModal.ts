import { useState, useEffect } from "react";
import { addUserService, updateUserService } from "@/services/userService";
import { usePlans } from "../usePlan/usePlans";
import { useGyms } from "../useGym/useGyms";
import { User, CreateUserDTO } from "@/types/user";
import { mapUserToCreateDTO } from "@/utils/mappers";

export function useUserModal(getUsers?: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const initialForm: CreateUserDTO = {
    email: "",
    fullName: "",
    documentId: "",
    phoneNumber: "",
    planId: 0,
    gymId: 0,
  };

  const [form, setForm] = useState(initialForm);
  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const handleOpen = (editData?: User) => {
    setOpen(true);
    if (editData) {
      const formData = mapUserToCreateDTO(editData);
      setForm(formData);
      setEditId(editData.id);
      setMode("edit");
    } else {
      setForm(initialForm);
      setMode("add");
    }
  };

  const addUser = async (user: CreateUserDTO) => {
    setLoading(true);
    setError(null);
    try {
      await addUserService(user);
      getUsers?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (user: CreateUserDTO) => {
    if (!editId) return;
    setLoading(true);
    setError(null);
    try {
      await updateUserService(editId, user);
      getUsers?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "gymId" || name === "planId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "add") {
      addUser(form);
    } else {
      updateUser(form);
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
