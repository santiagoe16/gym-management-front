import React, { useState, useEffect } from "react";
import { useWebSocket } from "../context/WebSocketContext";
import SpinnerLoader from "./SpinnerLoader";
import { CheckCircle, XCircle, Fingerprint } from "lucide-react";
import { Spinner } from "@heroui/spinner";
import { set } from "zod";

interface FingerprintEnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number | null;
  userName: string;
}

type EnrollmentStatus =
  | "idle"
  | "initializing"
  | "waiting_for_user"
  | "enrollment_started"
  | "capturing_first_finger"
  | "first_finger_enrolled"
  | "capturing_second_finger"
  | "enrollment_completed"
  | "error"
  | "ws_disconnected";

export const FingerprintEnrollmentModal: React.FC<
  FingerprintEnrollmentModalProps
> = ({ isOpen, onClose, userId, userName }) => {
  const { sendMessage, lastMessage, isConnected } = useWebSocket();
  const [status, setStatus] = useState<EnrollmentStatus>("idle");
  const [message, setMessage] = useState(
    "Iniciando proceso de enrolamiento..."
  );
  const [capturesNeeded] = useState(4);
  const [firstFingerCaptures, setFirstFingerCaptures] = useState(0);
  const [secondFingerCaptures, setSecondFingerCaptures] = useState(0);

  useEffect(() => {
    console.log(userId);
    if (isOpen && userId) {
      if (!isConnected) {
        setStatus("ws_disconnected");
        setMessage(
          "No se pudo conectar con el servicio de huellas. Asegúrate de que esté activo y recarga la página."
        );
        return;
      }
      // Reset states on open
      setStatus("initializing");
      setMessage(`Iniciando enrolamiento para ${userName}...`);
      setFirstFingerCaptures(0);
      setSecondFingerCaptures(0);

      // Iniciar la comunicación con el backend para el enrolamiento
      console.log(
        "Iniciando enrolamiento para",
        JSON.stringify({ type: "user", id: userId })
      );
      sendMessage(JSON.stringify({ type: "user", id: userId }));
      setStatus("waiting_for_user");
      setMessage("Esperando confirmación del servidor...");
    } else if (!isOpen) {
      setStatus("idle");
    }
  }, [isOpen, userId, userName, isConnected, sendMessage]);

  // Efecto para manejar los mensajes entrantes del WebSocket
  useEffect(() => {
    if (!lastMessage?.data || !isOpen) return;
    console.log("Mensaje recibido del WebSocket:", lastMessage.data);

    const data = JSON.parse(lastMessage.data);

    // Solo reaccionar a los mensajes relevantes para el enrolamiento
    switch (data.type) {
      case "user_established":
        setStatus("enrollment_started");
        setMessage(
          "Servidor listo. Por favor, coloque el primer dedo en el lector."
        );
        break;
      case "enrollment_started":
        setStatus("capturing_first_finger");
        setMessage("Lector activado. Coloque el primer dedo.");
        break;
      case "capture_success":
        if (
          status === "capturing_first_finger" ||
          status === "first_finger_enrolled"
        ) {
          setFirstFingerCaptures((prev) => Math.min(prev + 1, capturesNeeded));
        } else if (status === "capturing_second_finger") {
          setSecondFingerCaptures((prev) => Math.min(prev + 1, capturesNeeded));
        }
        // El mensaje se actualiza en el efecto de abajo para evitar re-renders conflictivos
        break;
      case "first_finger_enrolled":
        console.log("First finger enrolleddddddddddddddddddddd");
        setStatus("capturing_second_finger");
        setFirstFingerCaptures(capturesNeeded);
        setMessage(
          "Primer dedo registrado. Ahora coloque el segundo dedo en el lector."
        );
        break;
      case "enrollment_completed":
        setStatus("enrollment_completed");
        setSecondFingerCaptures(capturesNeeded);
        setMessage(data.message || "¡Enrolamiento completado exitosamente!");
        break;
      case "error":
        setStatus("error");
        setMessage(data.message || "Ocurrió un error durante el enrolamiento.");
        break;
      default:
        setStatus("error");
        setMessage(data.message || "Ocurrió un error durante el enrolamiento.");
    }
  }, [lastMessage, isOpen, status]); // Depender de status para re-evaluar

  // Efecto para actualizar el mensaje de captura
  useEffect(() => {
    if (status === "capturing_first_finger") {
      setMessage(
        `¡Captura exitosa! (${firstFingerCaptures}/${capturesNeeded})`
      );
    } else if (status === "capturing_second_finger") {
      setMessage(
        `¡Captura exitosa! (${secondFingerCaptures}/${capturesNeeded})`
      );
    }
  }, [firstFingerCaptures, secondFingerCaptures, status, capturesNeeded]);

  const handleClose = () => {
    if (
      status !== "enrollment_completed" &&
      status !== "error" &&
      isConnected
    ) {
      sendMessage(JSON.stringify({ type: "cancel_enrollment" }));
    }
    setStatus("idle");
    onClose();
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (status) {
      case "ws_disconnected":
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <XCircle className="w-24 h-24 text-yellow-500" />
            <h3 className="text-2xl font-bold mt-4 text-gray-800">
              Sin Conexión
            </h3>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        );
      case "initializing":
      case "waiting_for_user":
        return (
          <div className="flex flex-col items-center justify-center pe-18 p-8 text-center">
            <Spinner
              color="primary"
              size="lg"
              classNames={{
                circle1: "w-20 h-20 border-[7px]",
                circle2: "w-20 h-20 border-[7px]",
              }}
            />
          </div>
        );
      case "capturing_first_finger":
      case "capturing_second_finger":
        const captures =
          status === "capturing_first_finger"
            ? firstFingerCaptures
            : secondFingerCaptures;
        const step = status === "capturing_first_finger" ? 1 : 2;
        return (
          <div className="flex flex-col items-center justify-center p-8">
            <Fingerprint className="w-24 h-24 text-blue-500 animate-pulse" />
            <h3 className="text-xl font-semibold mt-4">
              Registrando {step === 1 ? "Primer" : "Segundo"} Dedo
            </h3>
            <p className="mt-2 text-gray-600">{message}</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(captures / capturesNeeded) * 100}%` }}
              ></div>
            </div>
            <p className="mt-2 font-bold text-2xl">
              {captures}/{capturesNeeded}
            </p>
          </div>
        );
      case "enrollment_completed":
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle className="w-24 h-24 text-green-500" />
            <h3 className="text-2xl font-bold mt-4 text-gray-800">¡Éxito!</h3>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        );
      case "error":
        return (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <XCircle className="w-24 h-24 text-red-500" />
            <h3 className="text-2xl font-bold mt-4 text-gray-800">Error</h3>
            <p className="mt-2 text-gray-600">{message}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 max-h-[500px]">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Ingresar Huella Digital
          </h2>
          <p className="text-sm text-gray-500">Usuario: {userName}</p>
        </div>
        <div className="p-6">{renderContent()}</div>
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {status === "enrollment_completed" || status === "error"
              ? "Cerrar"
              : "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};
