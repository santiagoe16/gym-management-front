import { useState, useEffect } from "react";
import {
  addTrainerService,
  updateTrainerService,
} from "@/services/trainersService";
import { useGyms } from "../useGym/useGyms";
import Trainer from "@/types/trainer";

export function useTrainerModal(getTrainers: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const initialForm = {
    name: "",
    cedula: "",
    phone: "",
    schedule: "",
    gym: { name: "", address: "" },
    password: "",
  };
  const [form, setForm] = useState<Trainer>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const handleOpen = (editData?: typeof form) => {
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
      setForm({ ...form, gym: gymObj || form.gym });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addTrainer = async (trainer: any) => {
    setLoading(true);
    setError(null);
    try {
      await addTrainerService(trainer);
      getTrainers();
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateTrainer = async (trainer: any) => {
    setLoading(true);
    setError(null);
    try {
      await updateTrainerService(trainer);
      getTrainers();
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
      addTrainer(form);
      getTrainers;
    } else {
      updateTrainer(form);
      getTrainers;
    }
  };

  return {
    open,
    mode,
    form,
    loading,
    error,
    gyms,
    gymsLoading,
    gymsError,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  };
}
