"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import SpinnerLoader from "./SpinnerLoader";

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
    return <SpinnerLoader />;
  }

  return <>{children}</>;
}
