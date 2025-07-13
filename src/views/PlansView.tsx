"use client";
import React, { useState } from "react";
import PlanModal from "@/components/PlanModal";
import ConfirmModal from "@/components/ConfirmModal";
import { usePlanModal } from "@/hooks/usePlanModal";
import { usePlanDelete } from "@/hooks/usePlanDelete";

export default function PlansView() {
  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  } = usePlanModal();

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    planToDelete,
  } = usePlanDelete();

  // Ejemplo de datos de planes
  const planes = [
    { name: "Mensual", price: "70000", duration: "30" },
    { name: "Trimestral", price: "180000", duration: "90" },
  ];

  return (
    <main className="p-6">
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Planes
        </h1>
      </header>

      {/* Sección de acciones */}
      <section className="flex justify-end mb-16">
        <button
          className="btn-primary"
          onClick={() => handleOpen()}
        >
          + Agregar plan
        </button>
      </section>

      {/* Sección de la tabla de planes */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors">
            <tr>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Duración (días)</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {planes.map((plan, idx) => (
              <tr
                key={idx}
                className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors"
              >
                <td className="px-6 py-4">{plan.name}</td>
                <td className="px-6 py-4">${plan.price}</td>
                <td className="px-6 py-4">{plan.duration}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleOpen(plan)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-blue-600 hover:underline ml-2"
                    onClick={() => handleDeleteClick(plan)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <PlanModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`¿Seguro que deseas eliminar "${planToDelete?.name}"?`}
      />
    </main>
  );
}
