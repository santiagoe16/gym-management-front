"use client";
import React from "react";
import GymModal from "@/components/GymModal";
import { useGyms } from "@/hooks/useGym/useGyms";
import { useGymModal } from "@/hooks/useGym/useGymModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useGymDelete } from "@/hooks/useGym/useGymDelete";
import SpinnerLoader from "@/components/SpinnerLoader";
import GymsTable from "@/components/Tables/GymsTable";

export default function GymsView() {
  const { gyms, loading, error, getGyms } = useGyms();
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
  } = useGymModal(getGyms);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    gymToDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useGymDelete(getGyms);

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <main >
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de gimnasios
        </h1>
      </header>
      
      <GymsTable
        gyms={gyms}
        handleOpen={handleOpen}
        handleDeleteClick={handleDeleteClick}
      />
      <GymModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
        loading={modalLoading}
        error={modalError}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={
          deleteLoading
            ? "Eliminando..."
            : deleteError
            ? `Error: ${deleteError}`
            : `¿Seguro que deseas eliminar "${gymToDelete?.name}"?`
        }
      />
    </main>
  );
}