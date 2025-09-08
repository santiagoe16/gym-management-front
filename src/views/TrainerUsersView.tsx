"use client";
import React from "react";
import UserModal from "@/components/userModal";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useUsers } from "@/hooks/useUser/useUsers";
import SpinnerLoader from "@/components/SpinnerLoader";
import UsersTable from "@/components/Tables/UsersTable";

export default function TrainerUsersView() {
  const { users, loading, error, getUsers } = useUsers();

  const {
    open,
    mode,
    form,
    editUser,
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
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de usuarios
        </h1>
      </header>

      <UsersTable users={users} handleOpen={handleOpen} role="trainer" />

      <UserModal
        open={open}
        onClose={handleClose}
        form={form}
        loading={modalLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editUser={editUser}
        mode={mode}
        plans={plans}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
        error={modalError}
      />
    </main>
  );
}