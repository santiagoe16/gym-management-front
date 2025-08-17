"use client";
import React, { useState } from "react";
import PlanModal from "@/components/PlanModal";
import ConfirmModal from "@/components/ConfirmModal";
import { usePlanModal } from "@/hooks/usePlan/usePlanModal";
import { usePlanDelete } from "@/hooks/usePlan/usePlanDelete";
import { usePlans } from "@/hooks/usePlan/usePlans";
import { useGyms } from "@/hooks/useGym/useGyms";
import PlansTable from "@/components/Tables/PlansTable";
import SpinnerLoader from "@/components/SpinnerLoader";

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
    loading,
    error,
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
    loading: deleteLoading,
    error: deleteError,
  } = usePlanDelete(getPlans);

  if (plansLoading) {
    return <SpinnerLoader />;
  }

  if (plansError) {
    return <p className="text-red-500">Error al cargar los planes: {plansError}</p>;
  }

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de Planes
        </h1>
      </header>

      {/* Sección de la tabla de planes */}
      <PlansTable plans={plans} handleOpen={handleOpen} handleDeleteClick={handleDeleteClick} />
      <PlanModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        loading={loading}
        error={error}
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
        message={
          deleteLoading
            ? "Eliminando..."
            : deleteError
            ? `Error: ${deleteError}`
            : `¿Seguro que deseas eliminar "${planToDelete?.name}"?`
        }
      />
    </main>
  );
}
