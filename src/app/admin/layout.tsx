"use client";

import Sidebar from "@/components/AdminSidebar";
import LayoutContainer from "@/layouts/LayoutContainer";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleProtectedRoute allowedRoles={["admin"]}>
      <Sidebar>
        <main className="bg-[#fafafa] min-h-screen">
          <LayoutContainer>{children}</LayoutContainer>
        </main>
      </Sidebar>
    </RoleProtectedRoute>
  );
}
