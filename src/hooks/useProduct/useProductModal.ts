import { useState } from "react";
import { Product } from "@/types/product";
export function useProductModal(getProducts: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const initialForm = {
    name: "",
    price: 0,
    quantity: 0,
  }
  const [form, setForm] = useState<Product>(initialForm);

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario (add/edit)
    getProducts()
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
