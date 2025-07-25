"use client";

import TrainerSidebar from "@/components/TrainerSidebar";
import LayoutContainer from "@/layouts/LayoutContainer";
import PrivateRoute from "@/components/PrivateRoute";

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivateRoute>
      <TrainerSidebar>
        <main className="bg-gray-100">
          <LayoutContainer>{children}</LayoutContainer>
        </main>
      </TrainerSidebar>
    </PrivateRoute>
  );
}
