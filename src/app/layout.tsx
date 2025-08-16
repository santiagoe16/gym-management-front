// app/layout.tsx
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { HeroUIProvider } from "@heroui/react";

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
          <AuthProvider>{children}</AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
