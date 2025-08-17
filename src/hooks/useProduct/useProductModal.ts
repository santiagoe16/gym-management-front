import { useState } from "react";
import { Product, CreateProductDTO } from "@/types/product";
import { addProductService, updateProductService } from "@/services/productsService";
import { useGyms } from "../useGym/useGyms";


export function useProductModal(getProducts: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initialForm: CreateProductDTO = {
    name: "",
    price: "",
    quantity: 0,
    gymId: 0
  }
  const [form, setForm] = useState<CreateProductDTO>(initialForm);
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const handleOpen = (editData?: Product) => {
    setOpen(true);

    if (editData) {
      const { id, gym, price, ...formData } = editData;
      setForm({ gymId: gym.id, price: price.toString(), ...formData });
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "gymId" || name === "quantity" ? Number(value) : value,
    }));
  };

  const addProduct = async (product: CreateProductDTO) => {
    setLoading(true);
    setError(null);
    try {
      await addProductService(product);
      getProducts();
      handleClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product: CreateProductDTO) => {
    if (!editId) return;
    setLoading(true);
    setError(null);
    try {
      await updateProductService(editId, product);
      getProducts();
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
      addProduct(form);
    } else {
      updateProduct(form);
    }
  };

  return {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    loading,
    error,
    gyms,
    gymsLoading,
    gymsError,
  };
}
