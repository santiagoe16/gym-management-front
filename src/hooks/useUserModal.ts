import { useState } from "react";

export function useUserModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState({
    name: "",
    cedula: "",
    phone: "",
    plan: "",
  });

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
        plan: "",
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
      plan: "",
    });
    setMode("add");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      cedula: form.cedula ? Number(form.cedula) : undefined,
      phone: form.phone ? Number(form.phone) : undefined,
    };
    // Usar data para guardar/enviar
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
