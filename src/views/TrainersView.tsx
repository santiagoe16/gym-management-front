"use client";
import React from "react";
import TrainerModal from "@/components/TrainerModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useTrainerModal } from "@/hooks/useTrainerModal";
import { useTrainerDelete } from "@/hooks/useTrainerDelete";
import { useTrainers } from "@/hooks/useTrainers";

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
  } = useTrainerDelete(getTrainers);

  return (
    <main className="p-6">
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de entrenadores
        </h1>
      </header>

      {/* Sección de acciones */}
      <section className="flex justify-end mb-16">
        <button className="btn-primary" onClick={() => handleOpen()}>
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>{" "}
          Agregar entrenador
        </button>
      </section>

      {/* Sección de la tabla de entrenadores */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        {loading ? (
          <p className="text-gray-500 p-4">Cargando entrenadores...</p>
        ) : error ? (
          <p className="text-red-500 p-4">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Cédula</th>
                <th className="px-6 py-3">Celular</th>
                <th className="px-6 py-3">Horario</th>
                <th className="px-6 py-3">Nombre de gimnasio</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {trainers.map((trainer, idx) => (
                <tr
                  key={trainer.cedula}
                  className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap"
                >
                  <td className="px-6 py-4">{trainer.name}</td>
                  <td className="px-6 py-4">{trainer.cedula}</td>
                  <td className="px-6 py-4">{trainer.phone}</td>
                  <td className="px-6 py-4">{trainer.schedule}</td>
                  <td className="px-6 py-4">{trainer.gym.name}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleOpen(trainer)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-blue-600 hover:underline ml-2"
                      onClick={() => handleDeleteClick(trainer)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
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
        message={`¿Seguro que deseas eliminar "${trainerToDelete?.name}"?`}
      />
    </main>
  );
}
