import { useState } from "react";

export function usePlanModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
  });

  const handleOpen = (editData?: typeof form) => {
    setOpen(true);
    if (editData) {
      setForm(editData);
      setMode("edit");
    } else {
      setForm({
        name: "",
        price: "",
        duration: "",
      });
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      price: "",
      duration: "",
    });
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //manejar envío de formulario (add/edit)
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
  };
}
