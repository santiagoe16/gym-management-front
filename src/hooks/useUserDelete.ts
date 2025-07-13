import { useState } from "react";
import react from "react";

export function useUserDelete() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    // Aquí va la lógica para eliminar el producto (por ejemplo, llamada a API)
    // Ejemplo: productos.splice(productos.indexOf(productToDelete), 1);
    setShowConfirm(false);
    setUserToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setUserToDelete(null);
  };

  return({handleDeleteClick, handleConfirmDelete, handleCancelDelete, showConfirm, userToDelete})
}
