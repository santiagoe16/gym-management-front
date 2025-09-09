"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { addToast } from "@heroui/toast";
import { useAuth } from "./authContext";

interface WebSocketContextType {
  sendMessage: (message: string) => void;
  lastMessage: MessageEvent | null;
  isConnected: boolean;
  clearLastMessage: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

  useEffect(() => {
    console.log("WebSocketProvider useEffect triggered", { loading, user });

    if (loading) {
      console.log("Auth is loading, waiting...");
      return;
    }

    if (!user?.id || !user?.gymId) {
      console.log(
        "User not available or missing IDs, closing socket if exists."
      );
      if (socketRef.current) {
        socketRef.current.close();
      }
      return;
    }

    console.log(
      `Attempting to connect WebSocket for user ${user.id} at gym ${user.gymId}`
    );

    const token = localStorage.getItem("token");
    const socket = new WebSocket(
      `wss://gym-management-back-production.up.railway.app/user/${token}`
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ Conectado al WS");
      setIsConnected(true);
    };

    socket.onclose = () => {
      console.log("❌ WS cerrado");
      setIsConnected(false);
    };

    socket.onmessage = (event) => {
      console.log("Respuesta del backend:", JSON.parse(event.data));
      setLastMessage(event);

      const response = JSON.parse(event.data);
      if (response.type === "fingerprint_connected") {
        addToast({
          title: "Lector de huellas conectado",
          description: "El lector de huellas se ha conectado correctamente.",
          color: "success",
          timeout: 5000,
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
      addToast({
        title: "Error de WebSocket",
        description:
          "No se pudo conectar con el servidor de huellas. Asegúrate de que esté encendido.",
        color: "danger",
        timeout: 10000,
      });
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [user, loading]);

  const sendMessage = useCallback((message: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      console.log("Mensaje enviado al WS:", message);
    } else {
      console.error("WebSocket no está conectado.");
    }
  }, []);

  const clearLastMessage = useCallback(() => {
    setLastMessage(null);
  }, []);

  return (
    <WebSocketContext.Provider
      value={{ sendMessage, lastMessage, isConnected, clearLastMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error(
      "useWebSocket debe ser usado dentro de un WebSocketProvider"
    );
  }
  return context;
};
