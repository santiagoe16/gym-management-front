"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import SpinnerLoader from "@/components/SpinnerLoader";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Si no hay usuario, redirigir al login
        router.replace("/login");
      } else {
        // Si hay usuario, redirigir según su rol
        if (user.role === "trainer") {
          router.replace("/trainer/users");
        } else if (user.role === "admin") {
          router.replace("/admin/users");
        } else {
          router.replace("/login");
        }
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <SpinnerLoader />
    );
  }

  return (
    <SpinnerLoader />
  );
}
