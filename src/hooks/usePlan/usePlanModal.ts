import { useState } from "react";
import Plan from "@/types/plan";
import { Gym } from "@/types/gym";
import { useGyms } from "../useGym/useGyms";

export function usePlanModal(getPlans: () => void) {
  const initialForm: Plan = {
    name: "",
    price: 0,
    gym: { name: "", address: "" },
    duration: 0,
  };
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState<Plan>(initialForm);
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
    const { name, value } = e.target;
    
    if (name === "gym") {
      // Buscar el gimnasio completo por ID
      const selectedGym = gyms.find(gym => gym.id === parseInt(value));
      setForm({ ...form, gym: selectedGym || { id: 0, name: "", address: "" } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //manejar envío de formulario (add/edit)
    getPlans()
    handleClose();
  };

  return {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    gyms,
    gymsLoading,
    gymsError
  };
}
