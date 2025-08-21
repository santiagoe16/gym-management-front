"use client";
import React from "react";
import UserModal from "@/components/userModal";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useUsers } from "@/hooks/useUser/useUsers";
import SpinnerLoader from "@/components/SpinnerLoader";
import TrainerUsersTable from "@/components/Tables/TrainerUsersTable";

export default function TrainerUsersView() {
  const { users, loading, error, getUsers } = useUsers();

  const {
    open,
    mode,
    form,
    loading: modalLoading,
    error: modalError,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  } = useUserModal(getUsers);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <main className="min-h-screen">
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de usuarios
        </h1>
      </header>

      <TrainerUsersTable users={users} handleOpen={handleOpen} />

      <UserModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={modalError}
        mode={mode}
        plans={plans}
        loading={modalLoading}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
      />
    </main>
  );
}