"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import SpinnerLoader from "./SpinnerLoader";

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
    return <SpinnerLoader />;
  }

  if (!user) {
    return <SpinnerLoader />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <SpinnerLoader />;
  }

  return <>{children}</>;
}
