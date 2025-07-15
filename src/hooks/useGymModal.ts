import { useState } from "react";
import { addGymService, updateGymService } from "@/services/gymsService";
import { Gym } from "@/types/gym";

export function useGymModal(getGyms: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<Omit<Gym, "id">>({
    name: "",
    address: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (editData?: Gym) => {
    setOpen(true);
    if (editData) {
      setForm({ name: editData.name, address: editData.address });
      setEditId(editData.id);
      setMode("edit");
    } else {
      setForm({ name: "", address: "" });
      setEditId(null);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: "", address: "" });
    setEditId(null);
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addGym = async (gym: Omit<Gym, "id">) => {
    setLoading(true);
    setError(null);
    try {
      await addGymService(gym);
      getGyms();
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateGym = async (gym: Gym) => {
    setLoading(true);
    setError(null);
    try {
      await updateGymService(gym);
      getGyms();
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
      addGym(form);
    } else if (editId !== null) {
      updateGym({ ...form, id: editId });
    }
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
  };
} 