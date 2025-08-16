import { useState } from "react";
import { CreateAttendanceDTO } from "@/types/activity";
import { createAttendanceService } from "@/services/attendanceService";

export function useAttendance(onSuccess: () => void, onUserNotFound?: (documentId: string) => void, onUserNoPlan?: (documentId: string) => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [documentId, setDocumentId] = useState("");

  const handleDocumentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentId(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!documentId.trim()) {
      setError("Por favor ingresa el documento de identificación");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const attendanceData: CreateAttendanceDTO = {
        // notes: undefined // Por ahora sin funcionalidad
      };

      await createAttendanceService(documentId.trim(), attendanceData);
      setDocumentId("");
      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error al registrar asistencia";
      
      // Verificar si el error indica que el usuario no existe
      if (errorMessage.includes("Usuario no encontrado") || 
          errorMessage.includes("User not found") ||
          errorMessage.includes("404") ||
          errorMessage.includes("no existe")) {
        // Llamar al callback para mostrar el modal de registro
        onUserNotFound?.(documentId.trim());
      } 
      // Verificar si el error indica que el usuario no tiene plan activo
      else if (errorMessage.includes("no tiene un plan activo") ||
               errorMessage.includes("El usuario no tiene un plan activo válido") ||
               errorMessage.includes("plan ha expirado") ||
               errorMessage.includes("sin días") ||
               errorMessage.includes("plan taquillero")) {
        // Llamar al callback para mostrar el modal de asignación de plan
        onUserNoPlan?.(documentId.trim());
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearDocumentId = () => {
    setDocumentId("");
  };

  return {
    documentId,
    loading,
    error,
    handleDocumentIdChange,
    handleSubmit,
    clearDocumentId,
  };
}
