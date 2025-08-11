import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { CreateSaleDTO } from "@/types/sale";
import { createSaleService } from "@/services/salesService";
import { getActiveProductsService } from "@/services/productsService";

export function useSales(onSuccess: () => void) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    product_id: 0,
    quantity: 0,
  });

  const loadProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const productsData = await getActiveProductsService();
      setProducts(productsData);
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Error al cargar productos");
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadProducts();
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setError(null);
    setForm({
      product_id: 0,
      quantity: 0,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
    setForm({
      product_id: 0,
      quantity: 0,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "product_id" || name === "quantity" ? parseInt(value) || 0 : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.product_id === 0) {
      setError("Por favor selecciona un producto");
      return;
    }

    if (form.quantity <= 0) {
      setError("Por favor ingresa una cantidad válida");
      return;
    }

    const selectedProduct = products.find(p => p.id === form.product_id);
    if (selectedProduct && form.quantity > selectedProduct.quantity) {
      setError(`Stock insuficiente. Disponible: ${selectedProduct.quantity}`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const saleData: CreateSaleDTO = {
        productId: form.product_id,
        quantity: form.quantity,
        gymId: selectedProduct?.gymId || 0,
      };

      await createSaleService(saleData);
      handleClose();
      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error al realizar la venta");
    } finally {
      setLoading(false);
    }
  };

  return {
    open,
    products,
    productsLoading,
    productsError,
    loading,
    error,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  };
}
