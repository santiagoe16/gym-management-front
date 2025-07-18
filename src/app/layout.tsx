// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";

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
      <body className="bg-gray-100 min-h-screen ">{children}</body>
    </html>
  );
}
