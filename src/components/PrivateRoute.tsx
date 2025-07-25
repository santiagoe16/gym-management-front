"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login"); // Redirige si no hay usuario
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p className="text-center mt-10">Cargando...</p>; // Spinner opcional
  }

  return <>{children}</>;
}
