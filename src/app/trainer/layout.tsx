"use client";

import TrainerSidebar from "@/components/TrainerSidebar";
import LayoutContainer from "@/layouts/LayoutContainer";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedRoute allowedRoles={["trainer"]}>
      <TrainerSidebar>
        <main className="bg-gray-100">
          <LayoutContainer>{children}</LayoutContainer>
        </main>
      </TrainerSidebar>
    </RoleProtectedRoute>
  );
}
