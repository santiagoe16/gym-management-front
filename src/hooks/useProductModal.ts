import { useState } from "react";

export function useProductModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [form, setForm] = useState({
    name: "",
    price: "",
    cantidad: ""
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
        cantidad: ""
      });
      setMode("add");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: "",
      price: "",
      cantidad: "",
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
    // Aquí puedes manejar el envío del formulario (add/edit)
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
