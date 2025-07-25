"use client";
import React from "react";
import GymModal from "@/components/GymModal";
import { useGyms } from "@/hooks/useGym/useGyms";
import { useGymModal } from "@/hooks/useGym/useGymModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useGymDelete } from "@/hooks/useGym/useGymDelete";

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

  return (
    <main >
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de gimnasios
        </h1>
      </header>
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
          Agregar gimnasio
        </button>
      </section>
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        {loading ? (
          <p className="text-gray-500 p-4">Cargando gimnasios...</p>
        ) : error ? (
          <p className="text-red-500 p-4">{error}</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Dirección</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {gyms.map((gym) => (
                <tr
                  key={gym.id}
                  className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap"
                >
                  <td className="px-6 py-4">{gym.name}</td>
                  <td className="px-6 py-4">{gym.address}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleOpen(gym)}
                    >
                      Editar
                    </button>
                    <button
                      className="text-blue-600 hover:underline ml-2"
                      onClick={() => handleDeleteClick(gym)}
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
