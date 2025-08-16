"use client"
import React, { useState, useMemo, useCallback } from "react";
import SaleModal from "@/components/SaleModal";
import UserModal from "@/components/userModal";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useAuth } from "@/context/authContext";
import { createAttendanceService } from "@/services/attendanceService";
import { getUserByDocumentIdService } from "@/services/userService";
import {
  AdminFilters,
  AttendanceCard,
  SummaryCard,
  AttendanceTable,
  SalesTable,
  UserPlansTable,
} from "@/components/DailyView";
import { useDailyViewData } from "@/hooks/useDaily/useDailyViewData";
import { useAttendance } from "@/hooks/useDaily/useAttendance";
import { useSales } from "@/hooks/useDaily/useSales";

export default function DailyView() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [selectedGymId, setSelectedGymId] = useState<number | undefined>(undefined);
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | undefined>(undefined);

  const {
    attendance,
    sales,
    userPlans,
    gyms,
    trainers,
    loading: dailyViewLoading,
    error: dailyViewError,
    loadAllData,
    loadAttendance,
    loadSales,
    loadUserPlans,
  } = useDailyViewData(selectedGymId, selectedTrainerId);

  const { 
    open: saleModalOpen, 
    products, 
    productsLoading, 
    productsError, 
    loading: saleLoading, 
    error: saleError, 
    form: saleForm, 
    handleOpen: handleSaleOpen, 
    handleClose: handleSaleClose, 
    handleChange: handleSaleChange, 
    handleSubmit: handleSaleSubmit 
  } = useSales(() => {
    loadSales(); // Reload sales after a new sale
    loadUserPlans(); // Reload user plans if a plan was sold
  });

  const reloadAllData = useCallback(async () => {
    await loadAllData();
  }, [loadAllData]);

  const { 
    open: userModalOpen, 
    mode: userModalMode, 
    form: userForm, 
    loading: userLoading, 
    error: userError, 
    handleOpen: handleUserOpen, 
    handleClose: handleUserClose, 
    handleChange: handleUserChange, 
    handleSubmit: handleUserSubmit, 
    plans, 
    plansLoading, 
    plansError, 
    gyms: modalGyms, 
    gymsLoading, 
    gymsError 
  } = useUserModal(async () => {
    reloadAllData(); // Reload all data after user creation/update
    handleUserClose();
    if (userForm.documentId) {
      try {
        await createAttendanceService(userForm.documentId, {});
        loadAttendance(); // Reload attendance after creating it
      } catch (error) {
        console.error("Error al registrar asistencia automáticamente:", error);
      }
    }
  });

  const handleUserNotFound = useCallback((documentId: string) => {
    handleUserOpen();
    const event = { target: { name: "documentId", value: documentId } } as React.ChangeEvent<HTMLInputElement>;
    handleUserChange(event);
  }, [handleUserOpen, handleUserChange]);

  const handleUserNoPlan = useCallback(async (documentId: string) => {
    try {
      const user = await getUserByDocumentIdService(documentId);
      handleUserOpen(user);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }, [handleUserOpen]);

  const { 
    documentId, 
    loading: attendanceSubmitLoading, 
    error: attendanceSubmitError, 
    handleDocumentIdChange, 
    handleSubmit: handleAttendanceSubmit, 
    clearDocumentId 
  } = useAttendance(
    () => loadAttendance(), // Only reload attendance after submission
    handleUserNotFound,
    handleUserNoPlan
  );

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Bogota",
    });
  };

  const totalSales = useMemo(() => {
    const productSales = sales.reduce((total, sale) => total + parseFloat(sale.totalAmount), 0);
    const planSales = userPlans.reduce((total, userPlan) => total + parseFloat(userPlan.plan.price), 0);
    return productSales + planSales;
  }, [sales, userPlans]);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Resumen Diario</h1>
        <p className="text-gray-600 capitalize">{getCurrentDate()}</p>
      </header>

      {isAdmin && (
        <AdminFilters 
          gyms={gyms}
          trainers={trainers}
          selectedGymId={selectedGymId}
          selectedTrainerId={selectedTrainerId}
          onGymChange={setSelectedGymId}
          onTrainerChange={setSelectedTrainerId}
        />
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <AttendanceCard 
          onSuccess={loadAttendance} // Call specific loader
          onUserNotFound={handleUserNotFound}
          onUserNoPlan={handleUserNoPlan}
        />
        <SummaryCard 
          totalSales={totalSales}
          onSellProductClick={handleSaleOpen}
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <AttendanceTable 
          attendance={attendance}
          loading={dailyViewLoading}
          error={dailyViewError}
        />
        <SalesTable 
          sales={sales}
          loading={dailyViewLoading}
          error={dailyViewError}
        />
        <UserPlansTable 
          userPlans={userPlans}
          loading={dailyViewLoading}
          error={dailyViewError}
        />
      </section>

      <SaleModal
        open={saleModalOpen}
        onClose={handleSaleClose}
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        form={saleForm}
        onChange={handleSaleChange}
        onSubmit={handleSaleSubmit}
        loading={saleLoading}
        error={saleError}
      />

      <UserModal
        open={userModalOpen}
        onClose={() => {
          handleUserClose();
        }}
        loading={userLoading}
        form={userForm}
        onChange={handleUserChange}
        onSubmit={handleUserSubmit}
        mode={userModalMode}
        plans={plans}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={modalGyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
      />
    </main>
  );
}
