import { useState, useEffect } from "react";
import { addTrainerService, updateTrainerService } from "@/services/trainersService";
import { getGymsService } from "@/services/gymsService";
import { Gym } from "@/types/gym";

export function useTrainerModal(getTrainers: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState({
    name: "",
    cedula: "",
    phone: "",
    schedule: "",
    gym: { id: 0, name: "", address: "" } as Gym,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [gymsLoading, setGymsLoading] = useState(false);
  const [gymsError, setGymsError] = useState<string | null>(null);

  useEffect(() => {
    setGymsLoading(true);
    setGymsError(null);
    getGymsService()
      .then((data) => setGyms(data))
      .catch((err) => setGymsError(err.message))
      .finally(() => setGymsLoading(false));
  }, []);

  const handleOpen = (editData?: typeof form) => {
    setOpen(true);
    if (editData) {
      setForm(editData);
      setMode("edit");
    } else {
      setForm({
        name: "",
        cedula: "",
        phone: "",
        schedule: "",
        gym: { id: 0, name: "", address: "" },
        password: "",
      });
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      cedula: "",
      phone: "",
      schedule: "",
      gym: { id: 0, name: "", address: "" },
      password: "",
    });
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
    } else {
      updateTrainer(form);
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
