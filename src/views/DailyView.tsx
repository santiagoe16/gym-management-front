"use client";
import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
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
} from "@/components/DailyView";
import { useDailyViewData } from "@/hooks/useDaily/useDailyViewData";
import { useAttendance } from "@/hooks/useDaily/useAttendance";
import { useSales } from "@/hooks/useDaily/useSales";
import AttendanceTable from "@/components/Tables/AttendanceTable";
import SalesTable from "@/components/Tables/SalesTable";
import UserPlansTable from "@/components/Tables/UserPlansTable";
import ShowToast from "@/components/ShowToast";
import { addToast } from "@heroui/toast";

export default function DailyView() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [selectedGymId, setSelectedGymId] = useState<number | undefined>(
    undefined
  );
  const [selectedTrainerId, setSelectedTrainerId] = useState<
    number | undefined
  >(undefined);

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
    handleSubmit: handleSaleSubmit,
  } = useSales(() => {
    loadSales();
    loadUserPlans();
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
    gymsError,
  } = useUserModal(async () => {
    reloadAllData(); // Reload all data after user creation/update
    handleUserClose();
    if (userForm.documentId) {
      try {
        const user = await createAttendanceService(userForm.documentId, {});
        ShowToast(user);
        loadAttendance(); // Reload attendance after creating it
      } catch (error) {
        console.error("Error al registrar asistencia automáticamente:", error);
      }
    }
  });

  const handleUserNotFound = useCallback(
    (documentId: string) => {
      handleUserOpen();
      const event = {
        target: { name: "documentId", value: documentId },
      } as React.ChangeEvent<HTMLInputElement>;
      handleUserChange(event);
    },
    [handleUserOpen, handleUserChange]
  );

  const handleUserNoPlan = useCallback(
    async (documentId: string) => {
      try {
        const user = await getUserByDocumentIdService(documentId);
        handleUserOpen(user);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    },
    [handleUserOpen]
  );

  const {
    documentId,
    loading: attendanceSubmitLoading,
    error: attendanceSubmitError,
    handleDocumentIdChange,
    handleSubmit: handleAttendanceSubmit,
    clearDocumentId,
  } = useAttendance(
    () => loadAttendance(),
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
    const productSales = sales.reduce(
      (total, sale) => total + parseFloat(sale.totalAmount),
      0
    );
    const planSales = userPlans.reduce(
      (total, userPlan) => total + parseFloat(userPlan.plan.price),
      0
    );
    return productSales + planSales;
  }, [sales, userPlans]);

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(`ws://localhost:8001/user/${user?.id}`);

    ws.current.onopen = () => {
      console.log("Conectado al servidor de huellas");
    };

    ws.current.onmessage = (event) => {
      console.log("Respuesta del backend:", event.data);
      const response = JSON.parse(event.data);
      if (response.type === "fingerprint_connected") {
        addToast({
          title: "Conexión de huella dactilar establecida",
          description: "La conexión de huella dactilar se ha establecido correctamente.",
          color: "success",
          timeout: 10000,
        });
      }
    };

    ws.current.onclose = () => {
      console.log("Conexión cerrada");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Resumen Diario
        </h1>
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
          onSuccess={loadAttendance}
          onUserNotFound={handleUserNotFound}
          onUserNoPlan={handleUserNoPlan}
        />
        <SummaryCard
          totalSales={totalSales}
          onSellProductClick={handleSaleOpen}
        />
      </section>

      <section className="grid grid-cols-1 gap-10">
        {/* Asistencias */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Asistencias ({attendance.length})
            </h2>
          </div>
          <div className="h-auto">
            {attendance.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay asistencias registradas en este período
              </p>
            ) : (
              <AttendanceTable attendance={attendance} />
            )}
          </div>
        </div>

        {/* Ventas de productos */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Ventas de Productos ({sales.length})
            </h2>
          </div>
          <div className="h-auto">
            {sales.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay ventas de productos en este período
              </p>
            ) : (
              <SalesTable date={false} sales={sales} />
            )}
          </div>
        </div>

        {/* Planes vendidos */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Planes Vendidos ({userPlans.length})
            </h2>
          </div>
          <div className="h-auto">
            {userPlans.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay planes vendidos en este período
              </p>
            ) : (
              <UserPlansTable date={false} userPlans={userPlans} />
            )}
          </div>
        </div>
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
        error={userError}
      />
    </main>
  );
}
