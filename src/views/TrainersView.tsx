"use client";
import React from "react";
import TrainerModal from "@/components/TrainerModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useTrainerModal } from "@/hooks/useTrainer/useTrainerModal";
import { useTrainerDelete } from "@/hooks/useTrainer/useTrainerDelete";
import { useTrainers } from "@/hooks/useTrainer/useTrainers";
import SpinnerLoader from "@/components/SpinnerLoader";
import TrainersTable from "@/components/Tables/TrainersTable";

export default function TrainersView() {
  const { trainers, loading, error, getTrainers } = useTrainers();

  const {
    open,
    mode,
    form,
    loading: loadingModal,
    error: errorModal,
    gyms,
    gymsLoading,
    gymsError,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  } = useTrainerModal(getTrainers);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    trainerToDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useTrainerDelete(getTrainers);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar los entrenadores: {error}</p>;
  }

  return (
    <main>
      {/* Encabezado de la página */}
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de entrenadores
        </h1>
      </header>

      <TrainersTable
        trainers={trainers}
        handleOpen={handleOpen}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Aquí se integrarán los modales cuando existan los hooks y el modal de entrenador */}
      <TrainerModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
        loading={loadingModal}
        error={errorModal}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
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
            : `¿Seguro que deseas eliminar "${trainerToDelete?.fullName}"?`
        }
      />
    </main>
  );
}