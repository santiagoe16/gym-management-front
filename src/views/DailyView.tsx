"use client";
import React, { useState } from "react";
import SaleModal from "@/components/SaleModal";
import UserModal from "@/components/userModal";
import { useDaily } from "@/hooks/useDaily/useDaily";
import { useAttendance } from "@/hooks/useDaily/useAttendance";
import { useSales } from "@/hooks/useDaily/useSales";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useUserPlans } from "@/hooks/useDaily/useUserPlans";
import { useAuth } from "@/context/authContext";
import { useGyms } from "@/hooks/useGym/useGyms";
import { useTrainers } from "@/hooks/useTrainer/useTrainers";
import { createAttendanceService } from "@/services/attendanceService";
import { utcISOToColombiaDate, utcISOToColombiaTime, utcISOToColombiaDateTime, colombiaISOToColombiaTime, colombiaISOToColombiaDate } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatCurrency";

export default function DailyView() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Estados para filtros (solo para administradores)
  const [selectedGymId, setSelectedGymId] = useState<number | undefined>(
    undefined
  );
  const [selectedTrainerId, setSelectedTrainerId] = useState<
    number | undefined
  >(undefined);

  const {
    attendance: allAttendance,
    sales: allSales,
    attendanceLoading,
    salesLoading,
    attendanceError,
    salesError,
    loadDailyData,
  } = useDaily();

  // Hooks para filtros (solo se cargan si es admin)
  const { gyms } = useGyms();
  const { trainers } = useTrainers();

  // Hook para planes vendidos
  const {
    userPlans: allUserPlans,
    loading: userPlansLoading,
    error: userPlansError,
    loadUserPlans,
  } = useUserPlans(
    undefined, // No purchasedAt filter - always current day
    isAdmin ? selectedGymId : undefined,
    isAdmin ? selectedTrainerId : undefined
  );

  // Funciones de filtrado
  const filterAttendance = (attendance: typeof allAttendance) => {
    if (!isAdmin || (!selectedGymId && !selectedTrainerId)) {
      return attendance;
    }

    return attendance.filter((record) => {
      const matchesGym = !selectedGymId || record.gymId === selectedGymId;
      const matchesTrainer = !selectedTrainerId || record.recordedById === selectedTrainerId;
      return matchesGym && matchesTrainer;
    });
  };

  const filterSales = (sales: typeof allSales) => {
    if (!isAdmin || (!selectedGymId && !selectedTrainerId)) {
      return sales;
    }

    return sales.filter((sale) => {
      const matchesGym = !selectedGymId || sale.gymId === selectedGymId;
      const matchesTrainer = !selectedTrainerId || sale.soldById === selectedTrainerId;
      return matchesGym && matchesTrainer;
    });
  };

  const filterUserPlans = (userPlans: typeof allUserPlans) => {
    if (!isAdmin || (!selectedGymId && !selectedTrainerId)) {
      return userPlans;
    }

    // Encontrar el documentId del trainer seleccionado
    const selectedTrainer = trainers.find(trainer => trainer.id === selectedTrainerId);
    const selectedTrainerDocumentId = selectedTrainer?.documentId;

    return userPlans.filter((userPlan) => {
      // Para user plans, necesitamos filtrar por el gimnasio del usuario y el creador
      const matchesGym = !selectedGymId || userPlan.user.gym.id === selectedGymId;
      const matchesTrainer = !selectedTrainerId || (userPlan.createdBy && userPlan.createdBy.documentId === selectedTrainerDocumentId);
      return matchesGym && matchesTrainer;
    });
  };

  // Datos filtrados
  const attendance = filterAttendance(allAttendance);
  const sales = filterSales(allSales);
  const userPlans = filterUserPlans(allUserPlans);

  // Hook para el modal de usuario
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
    // Después de crear el usuario, recargar datos
    await loadDailyData();
    await loadUserPlans(); // También recargar planes vendidos
    handleUserClose();

    // Intentar registrar asistencia automáticamente con el documento que se acaba de crear
    if (userForm.documentId) {
      try {
        const attendanceData = {
          // notes: undefined // Por ahora sin funcionalidad
        };
        await createAttendanceService(userForm.documentId, attendanceData);
        clearDocumentId();
        await loadDailyData(); // Recargar datos después de registrar asistencia
        await loadUserPlans(); // También recargar planes vendidos después de la asistencia
      } catch (error) {
        console.error("Error al registrar asistencia automáticamente:", error);
      }
    }
  });

  // Función para manejar cuando el usuario no existe
  const handleUserNotFound = (documentId: string) => {
    // Pre-llenar el formulario con el documento de identificación
    handleUserOpen();
    // Actualizar el formulario con el documentId
    const event = {
      target: {
        name: "documentId",
        value: documentId,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    handleUserChange(event);
  };

  const {
    documentId,
    loading: attendanceSubmitLoading,
    error: attendanceSubmitError,
    handleDocumentIdChange,
    handleSubmit: handleAttendanceSubmit,
    clearDocumentId,
  } = useAttendance(() => loadDailyData(), handleUserNotFound);

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
  } = useSales(() => loadDailyData());

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("es-CO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/Bogota"
    });
  };

  const getTotalSales = () => {
    // Sumar ventas de productos
    const productSales = sales.reduce(
      (total, sale) => total + parseFloat(sale.totalAmount),
      0
    );
    
    // Sumar ventas de planes
    const planSales = userPlans.reduce(
      (total, userPlan) => total + parseFloat(userPlan.plan.price),
      0
    );
    
    return productSales + planSales;
  };

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">
          Resumen Diario
        </h1>
        <p className="text-gray-600 capitalize">{getCurrentDate()}</p>
      </header>

      {/* Admin Filters Section */}
      {isAdmin && (
        <section className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Filtros de Administrador
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Gym Filter */}
            <div>
              <label
                htmlFor="selectedGym"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Gimnasio
              </label>
              <select
                id="selectedGym"
                value={selectedGymId || ""}
                onChange={(e) =>
                  setSelectedGymId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Todos los gimnasios</option>
                {gyms.map((gym) => (
                  <option key={gym.id} value={gym.id}>
                    {gym.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trainer Filter */}
            <div>
              <label
                htmlFor="selectedTrainer"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Entrenador
              </label>
              <select
                id="selectedTrainer"
                value={selectedTrainerId || ""}
                onChange={(e) =>
                  setSelectedTrainerId(
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Todos los entrenadores</option>
                {trainers.map((trainer) => (
                  <option key={trainer.documentId} value={trainer.id}>
                    {trainer.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Registrar Asistencia
          </h2>

          {attendanceSubmitError && (
            <div className="mb-4 p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
              {attendanceSubmitError}
            </div>
          )}

          <form onSubmit={handleAttendanceSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="documentId"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Documento de Identificación
              </label>
              <input
                type="text"
                id="documentId"
                value={documentId}
                onChange={handleDocumentIdChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Ingresa el documento de identificación"
                required
              />
            </div>
            <button
              type="submit"
              disabled={attendanceSubmitLoading}
              className="w-full btn-primary"
            >
              {attendanceSubmitLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Registrando...
                </>
              ) : (
                <>
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
                  </svg>
                  Registrar Asistencia
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sales Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ventas del Día
          </h2>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(getTotalSales().toString())}
              </p>
              <p className="text-sm text-gray-600">Total vendido hoy</p>
            </div>
            <button onClick={handleSaleOpen} className="w-full btn-primary">
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 18 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
              </svg>
              Vender Producto
            </button>
          </div>
        </div>
      </section>

      {/* Tables Section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Attendance Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Asistencias de Hoy ({attendance.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            {attendanceLoading ? (
              <p className="text-gray-500 p-6">Cargando asistencias...</p>
            ) : attendanceError ? (
              <p className="text-red-500 p-6">{attendanceError}</p>
            ) : attendance.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay asistencias registradas hoy
              </p>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
                  <tr>
                    <th className="px-4 py-3 text-xs">Nombre</th>
                    <th className="px-4 py-3 text-xs">Hora</th>
                    <th className="px-4 py-3 text-xs">Plan</th>
                    <th className="px-4 py-3 text-xs">Vigencia</th>
                    <th className="px-4 py-3 text-xs">Registrado por</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {attendance.map((record) => (
                    <tr
                      key={record.id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">
                            {record.user.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            DC: {record.user.documentId}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {colombiaISOToColombiaTime(record.checkInTime)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {record.user.activePlan?.plan.name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {record.user.activePlan?.expiresAt
                          ? colombiaISOToColombiaDate(record.user.activePlan.expiresAt)
                          : "Sin fecha"}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {record.recordedBy.fullName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Ventas de Hoy ({sales.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            {salesLoading ? (
              <p className="text-gray-500 p-6">Cargando ventas...</p>
            ) : salesError ? (
              <p className="text-red-500 p-6">{salesError}</p>
            ) : sales.length === 0 ? (
              <p className="text-gray-500 p-6">No hay ventas registradas hoy</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
                  <tr>
                    <th className="px-4 py-3 text-xs">Producto</th>
                    <th className="px-4 py-3 text-xs">Precio</th>
                    <th className="px-4 py-3 text-xs">Cantidad</th>
                    <th className="px-4 py-3 text-xs">Total</th>
                    <th className="px-4 py-3 text-xs">Vendedor</th>
                    <th className="px-4 py-3 text-xs">Met. pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-sm">
                        {sale.product.name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formatCurrency(sale.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm">{sale.quantity}</td>
                      <td className="px-4 py-3 font-medium text-green-600 text-sm">
                        {formatCurrency(sale.totalAmount)}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {sale.soldBy.fullName}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {sale.paymentType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* User Plans Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Planes Vendidos ({userPlans.length})
            </h2>
          </div>
          <div className="overflow-x-auto">
            {userPlansLoading ? (
              <p className="text-gray-500 p-6">Cargando planes...</p>
            ) : userPlansError ? (
              <p className="text-red-500 p-6">{userPlansError}</p>
            ) : userPlans.length === 0 ? (
              <p className="text-gray-500 p-6">No hay planes vendidos hoy</p>
            ) : (
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
                  <tr>
                    <th className="px-4 py-3 text-xs">Cliente</th>
                    <th className="px-4 py-3 text-xs">Plan</th>
                    <th className="px-4 py-3 text-xs">Vendedor</th>
                    <th className="px-4 py-3 text-xs">Met. pago</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700">
                  {userPlans.map((userPlan) => (
                    <tr
                      key={userPlan.id}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">
                            {userPlan.user.fullName}
                          </p>
                          <p className="text-xs text-gray-500">
                            DC: {userPlan.user.documentId}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-sm">
                            {userPlan.plan.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatCurrency(userPlan.plan.price)}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{userPlan.createdBy.fullName}</td>
                      <td className="px-4 py-3 text-sm">
                        {userPlan.paymentType}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Sale Modal */}
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

      {/* User Registration Modal */}
      <UserModal
        open={userModalOpen}
        onClose={handleUserClose}
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
