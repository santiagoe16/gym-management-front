import { useState, useEffect } from "react";
import {
  addTrainerService,
  updateTrainerService,
} from "@/services/trainersService";
import { useGyms } from "../useGym/useGyms";
import { Trainer, CreateTrainerDTO } from "@/types/trainer";
import { mapTrainerToCreateDTO } from "@/utils/mappers";

export function useTrainerModal(getTrainers: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(
    null
  );
  const initialForm: CreateTrainerDTO = {
    email: "",
    fullName: "",
    documentId: "",
    phoneNumber: "",
    role: "trainer",
    gymId: 0,
    password: "",
  };
  const [form, setForm] = useState<CreateTrainerDTO>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const handleOpen = (editData?: Trainer) => {
    setOpen(true);
    if (editData) {
      const formData = mapTrainerToCreateDTO(editData);
      setSelectedTrainerId(editData.id)
      setForm(formData);
      setMode("edit");
    } else {
      setForm(initialForm);
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialForm);
    setSelectedTrainerId(null);
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
      [name]: name === "gymId" ? Number(value) : value,
    }));
  };

  const addTrainer = async (trainer: CreateTrainerDTO) => {
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
    console.log("updatetrainer", selectedTrainerId)
    if (!selectedTrainerId) return;
    setLoading(true);
    setError(null);
    try {
      await updateTrainerService(selectedTrainerId, trainer);
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
