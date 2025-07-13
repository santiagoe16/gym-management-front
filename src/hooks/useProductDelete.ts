import { useState } from "react";
import react from "react";

export function useProductDelete() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);

  const handleDeleteClick = (prod: any) => {
    setProductToDelete(prod);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    // Aquí va la lógica para eliminar el producto (por ejemplo, llamada a API)
    // Ejemplo: productos.splice(productos.indexOf(productToDelete), 1);
    setShowConfirm(false);
    setProductToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  return({handleDeleteClick, handleConfirmDelete, handleCancelDelete, showConfirm, productToDelete})
}
