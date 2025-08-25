'use client';
import React from 'react';
import UserModal from '@/components/userModal';
import { useUserModal } from '@/hooks/useUser/useUserModal';
import { useUserDelete } from '@/hooks/useUser/useUserDelete';
import ConfirmModal from '@/components/ConfirmModal';
import { useUsers } from '@/hooks/useUser/useUsers';
import UsersTable from '@/components/Tables/UsersTable';
import SpinnerLoader from '@/components/SpinnerLoader';
import ShowToast from '@/components/ShowToast';

export default function UsersView() {
  const { users, loading, error, getUsers } = useUsers();

  const {
    open,
    mode,
    form,
    loading: modalLoading,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    editId,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
    error: modalError,
  } = useUserModal(getUsers);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    userToDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useUserDelete(getUsers);

  if (loading) {
    return <SpinnerLoader/>;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar los usuarios: {error}</p>;
  }

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de usuarios
        </h1>
      </header>

      <UsersTable
        users={users}
        handleOpen={handleOpen}
        handleDeleteClick={handleDeleteClick}
        role="admin"
      />

      <UserModal
        open={open}
        onClose={handleClose}
        form={form}
        loading={modalLoading}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editId={editId}
        mode={mode}
        plans={plans}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
        error={modalError}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={
          deleteLoading
            ? 'Eliminando...'
            : deleteError
            ? `Error: ${deleteError}`
            : `¿Seguro que deseas eliminar "${userToDelete?.fullName}"?`
        }
      />
    </main>
  );
}
