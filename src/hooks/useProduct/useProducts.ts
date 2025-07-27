import { useEffect, useState } from "react";
import { getProductsService } from "@/services/productsService";
import { Product } from "@/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsService();
      console.log(data)
      setProducts(data);
    } catch (err: any) {
      const fallback = "No se pudieron cargar los productos.";
      setError(err?.message || fallback);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    loading,
    error,
    getProducts,
  };
} 