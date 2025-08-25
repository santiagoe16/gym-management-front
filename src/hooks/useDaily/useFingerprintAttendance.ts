"use client";

import { useEffect } from "react";
import { useWebSocket } from "@/context/WebSocketContext";
import { createAttendanceService } from "@/services/attendanceService"; // Assuming this service exists
import { addToast } from "@heroui/toast";
import { CreateAttendanceDTO } from "@/types/activity";
import ShowToast from "@/components/ShowToast";

export const useFingerprintAttendance = (loadAttendance: () => void, handleUserNoPlan: (documentId: string) => void) => {
  const { lastMessage, isConnected } = useWebSocket();

  useEffect(() => {
    if (!isConnected || !lastMessage?.data) {
      return;
    }

    const handleFingerprintMessage = async (data: any) => {
      if (data.type === "user_found" && data.document_id) {
        try {
          const attendanceData: CreateAttendanceDTO = {
            notes: "registrado",
          };
          const user = await createAttendanceService(data.document_id, attendanceData);
          loadAttendance();
          ShowToast(user);
        } catch (error: any) {
          addToast({
            title: "Error al Registrar Asistencia",
            description: error.message || "No se pudo registrar la asistencia.",
            color: "danger",
            timeout: 7000,
          });
          if (error.message && error.message.includes("El usuario no tiene un plan activo válido")) {
            handleUserNoPlan(data.document_id);
          }
        }
      } else if (data.type === "user_not_found") {
        addToast({
          title: "Usuario no Encontrado",
          description: "La huella no coincide con ningún usuario registrado.",
          color: "warning",
          timeout: 7000,
        });
      }
    };

    let data;
    try {
      data = JSON.parse(lastMessage.data);
    } catch (error) {
      // Ignore messages that are not valid JSON
      return;
    }

    handleFingerprintMessage(data);
  }, [lastMessage, isConnected]);
};
