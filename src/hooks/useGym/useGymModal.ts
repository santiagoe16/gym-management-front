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
  const [editGym, setEditGym] = useState<Gym | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = (editData?: Gym) => {
    setOpen(true);
    if (editData) {
      const { id, isActive, ...formData } = editData;
      setForm(formData);
      setEditGym(editData);
      setMode("edit");
    } else {
      setForm(initialForm);
      setEditGym(null);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setEditGym(null);
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

  const updateGym = async (gym: CreateGymDTO) => {
    if (!editGym?.id) return;
    setLoading(true);
    setError(null);
    try {
      if (editGym.name === gym.name) {
        const { name, ...updatedGym } = { ...gym };
        await updateGymService(editGym.id, updatedGym);
      } else {
        await updateGymService(editGym.id, gym);
      }
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
    } else {
      updateGym(form);
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

 