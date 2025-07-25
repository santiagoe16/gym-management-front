import { useState } from "react";
import { addGymService, updateGymService } from "@/services/gymsService";
import { Gym, CreateGymDTO } from "@/types/gym";
import { mapGymToCreateDTO } from "@/utils/mappers";

export function useGymModal(getGyms: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const initialForm: CreateGymDTO = {
    name: "",
    address: "",
  };
  const [form, setForm] = useState<CreateGymDTO>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (editData?: Gym) => {
    setOpen(true);
    if (editData) {
      const { id, ...formData } = editData;
      setForm(formData);
      setEditId(id);
      setMode("edit");
    } else {
      setForm(initialForm);
      setEditId(null);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditId(null);
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addGym = async (gym: CreateGymDTO) => {
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