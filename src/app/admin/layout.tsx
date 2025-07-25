"use client";

import Sidebar from "@/components/AdminSidebar";
import LayoutContainer from "@/layouts/LayoutContainer";
import PrivateRoute from "@/components/PrivateRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <Sidebar>
        <main className="bg-gray-100">
          <LayoutContainer>{children}</LayoutContainer>
        </main>
      </Sidebar>
    </PrivateRoute>
  );
}
