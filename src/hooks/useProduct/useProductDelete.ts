import { useState } from "react";
import { Product } from "@/types/product";
import { deleteProdutcService } from "@/services/productsService";

export function useProductDelete(getProducts: () => void) {
  const [showConfirm, setShowConfirm] = useState(false);
    const [productDelete, setProductDelete] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleDeleteClick = (product: Product) => {
      setProductDelete(product);
      setShowConfirm(true);
    };
  
    const handleConfirmDelete = async () => {
      setLoading(true);
      setError(null);
      try {
        await deleteProdutcService(productDelete.id);
        getProducts();
        setShowConfirm(false);
        setProductDelete(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleCancelDelete = () => {
      setShowConfirm(false);
      setProductDelete(null);
    };
  
    return { handleDeleteClick, handleConfirmDelete, handleCancelDelete, showConfirm, productDelete, loading, error };
}
