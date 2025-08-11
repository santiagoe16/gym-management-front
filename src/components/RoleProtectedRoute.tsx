"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({ 
  children, 
  allowedRoles 
}: RoleProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Si no hay usuario, redirigir al login
        router.replace("/login");
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        // Si el usuario no tiene el rol permitido, redirigir según su rol
        if (user.role === "trainer") {
          router.replace("/trainer/users");
        } else if (user.role === "admin") {
          router.replace("/admin/users");
        } else {
          router.replace("/login");
        }
        return;
      }
    }
  }, [user, loading, router, allowedRoles]);

  if (loading) {
    return <p className="text-center mt-10">Cargando...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Redirigiendo...</p>;
  }

  if (!allowedRoles.includes(user.role)) {
    return <p className="text-center mt-10">Acceso denegado. Redirigiendo...</p>;
  }

  return <>{children}</>;
}
