
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { WebSocketProvider } from "@/context/WebSocketContext";

export const metadata: Metadata = {
  title: "Sistema de gimnasio",
  description: "Control de ingresos, ventas y usuarios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen ">
        <HeroUIProvider>
          <ToastProvider placement="top-center" maxVisibleToasts={10} />
          <AuthProvider>
            <WebSocketProvider>{children}</WebSocketProvider>
          </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
