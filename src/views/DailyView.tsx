"use client"

import React, { useState, useMemo, useCallback } from "react";
import SaleModal from "@/components/SaleModal";
import UserModal from "@/components/userModal";
import { useDaily } from "@/hooks/useDaily/useDaily";
import { useSales } from "@/hooks/useDaily/useSales";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useUserPlans } from "@/hooks/useDaily/useUserPlans";
import { useAuth } from "@/context/authContext";
import { useGyms } from "@/hooks/useGym/useGyms";
import { useTrainers } from "@/hooks/useTrainer/useTrainers";
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

export default function DailyView() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [selectedGymId, setSelectedGymId] = useState<number | undefined>(undefined);
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | undefined>(undefined);

  const { gyms } = useGyms();
  const { trainers } = useTrainers();

  const { 
    attendance, 
    sales, 
    attendanceLoading, 
    salesLoading, 
    attendanceError, 
    salesError, 
    loadDailyData 
  } = useDaily(selectedGymId, selectedTrainerId);
  
  const { 
    userPlans, 
    loading: userPlansLoading, 
    error: userPlansError, 
    loadUserPlans 
  } = useUserPlans(undefined, selectedGymId, selectedTrainerId);

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
  } = useSales(loadDailyData);

  const reloadAllData = useCallback(async () => {
    await loadDailyData();
    await loadUserPlans();
  }, [loadDailyData, loadUserPlans]);

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
    reloadAllData();
    handleUserClose();
    if (userForm.documentId) {
      try {
        await createAttendanceService(userForm.documentId, {});
        reloadAllData();
      } catch (error) {
        console.error("Error al registrar asistencia automáticamente:", error);
      }
    }
  });

  const [highlightPlan, setHighlightPlan] = useState(false);

  const handleUserNotFound = useCallback((documentId: string) => {
    handleUserOpen();
    const event = { target: { name: "documentId", value: documentId } } as React.ChangeEvent<HTMLInputElement>;
    handleUserChange(event);
  }, [handleUserOpen, handleUserChange]);

  const handleUserNoPlan = useCallback(async (documentId: string) => {
    try {
      const user = await getUserByDocumentIdService(documentId);
      handleUserOpen(user);
      setHighlightPlan(true);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  }, [handleUserOpen]);

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
          onSuccess={reloadAllData}
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
          loading={attendanceLoading}
          error={attendanceError}
        />
        <SalesTable 
          sales={sales}
          loading={salesLoading}
          error={salesError}
        />
        <UserPlansTable 
          userPlans={userPlans}
          loading={userPlansLoading}
          error={userPlansError}
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
          setHighlightPlan(false);
        }}
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
        highlightPlan={highlightPlan}
      />
    </main>
  );
}