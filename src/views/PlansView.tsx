"use client";
import React, { useState } from "react";
import PlanModal from "@/components/PlanModal";
import ConfirmModal from "@/components/ConfirmModal";
import { usePlanModal } from "@/hooks/usePlan/usePlanModal";
import { usePlanDelete } from "@/hooks/usePlan/usePlanDelete";
import { usePlans } from "@/hooks/usePlan/usePlans";
import { useGyms } from "@/hooks/useGym/useGyms";

export default function PlansView() {
  const {
    plans,
    loading: plansLoading,
    error: plansError,
    getPlans,
  } = usePlans();

  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    gyms,
    gymsLoading,
    gymsError
  } = usePlanModal(getPlans);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    planToDelete,
  } = usePlanDelete(getPlans);

  return (
    <main>
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">Planes</h1>
      </header>

      {/* Sección de acciones */}
      <section className="flex justify-end mb-16">
        <button className="btn-primary" onClick={() => handleOpen()}>
          + Agregar plan
        </button>
      </section>

      {/* Sección de la tabla de planes */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
            <tr className="whitespace-nowrap">
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Duración (días)</th>
              <th className="px-6 py-3">Gimnasio</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {plans.map((plan, idx) => (
              <tr
                key={idx}
                className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap"
              >
                <td className="px-6 py-4">{plan.name}</td>
                <td className="px-6 py-4">${plan.price}</td>
                <td className="px-6 py-4">{plan.durationDays}</td>
                <td className="px-6 py-4">{plan.gym.name}</td>
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
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
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
