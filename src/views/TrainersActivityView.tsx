"use client";
import React from "react";
import { useTrainers } from "@/hooks/useTrainer/useTrainers";
import { useGyms } from "@/hooks/useGym/useGyms";
import { useTrainersActivity } from "@/hooks/useTrainersActivity/useTrainersActivity";
import ActivitySummaryCard from "@/components/ActivitySummaryCard";
import DateRangePicker from "@/components/DateRangePicker";
import { formatCurrency } from "@/utils/formatCurrency";
import SpinnerLoader from "@/components/SpinnerLoader";
import UserPlansTable from "@/components/Tables/UserPlansTable";
import SalesTable from "@/components/Tables/SalesTable";
import NewUsersTable from "@/components/Tables/NewUsersTable";
import AttendanceTable from "@/components/Tables/AttendanceTable";
import { Select, SelectItem } from "@heroui/react";

export default function TrainersActivityView() {
  const { trainers, loading: trainersLoading } = useTrainers();
  const { gyms, loading: gymsLoading } = useGyms();

  const {
    data,
    summary,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    applyFilters,
  } = useTrainersActivity();

  const handleStartDateChange = (date: string) => {
    updateFilters({ startDate: date });
  };

  const handleEndDateChange = (date: string) => {
    updateFilters({ endDate: date });
  };

  const handleTrainerChange = (trainerId: string) => {
    updateFilters({
      trainerId: trainerId ? Number(trainerId) : undefined,
    });
  };

  const handleGymChange = (gymId: string) => {
    updateFilters({
      gymId: gymId ? Number(gymId) : undefined,
    });
  };

  if (loading || trainersLoading || gymsLoading) {
    return <SpinnerLoader />;
  }

  return (
    <main>
      <header className="mb-6">
        <h1 className="text-4xl font-semibold text-gray-800">
          Actividad de Entrenadores
        </h1>
        <p className="text-gray-600 mt-2">
          Resumen de actividades en el período seleccionado
        </p>
      </header>

      {/* Filtros */}
      <section className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros</h2>

        <div className="space-y-6">
          {/* Rango de fechas */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Período</h3>
            <DateRangePicker
              startDate={filters.startDate || ""}
              endDate={filters.endDate || ""}
              onStartDateChange={handleStartDateChange}
              onEndDateChange={handleEndDateChange}
              disabled={loading}
            />
          </div>

          {/* Filtros de entrenador y gimnasio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label={<span className="text-sm font-medium text-gray-900">Entrenador</span>}
                labelPlacement="outside"
                placeholder="Todos los entrenadores"
                size="md"
                variant="faded"
                selectedKeys={
                  filters.trainerId ? [String(filters.trainerId)] : []
                }
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  handleTrainerChange(String(key));
                }}
                className="w-full"
                isDisabled={loading || trainersLoading}
              >
                {trainers.map((trainer) => (
                  <SelectItem key={trainer.id} textValue={trainer.fullName}>
                    {trainer.fullName}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Select
                label={
                  <span className="text-sm font-medium text-gray-900">
                    Gimnasio
                  </span>
                }
                labelPlacement="outside"
                placeholder="Todos los gimnasios"
                size="md"
                variant="faded"
                selectedKeys={filters.gymId ? [String(filters.gymId)] : []}
                onSelectionChange={(keys) => {
                  const key = Array.from(keys)[0];
                  handleGymChange(String(key));
                }}
                className="w-full"
                isDisabled={loading || gymsLoading}
              >
                {gyms.map((gym) => (
                  <SelectItem key={gym.id} textValue={gym.name}>
                    {gym.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              onClick={applyFilters}
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
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
                  Cargando...
                </>
              ) : (
                "Aplicar Filtros"
              )}
            </button>
            <button
              onClick={clearFilters}
              disabled={loading}
              className="px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {/* Resumen */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ActivitySummaryCard
          title="Total Ingresos"
          value={formatCurrency(summary.totalRevenue.toString())}
          color="green"
          icon={
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          }
        />
        <ActivitySummaryCard
          title="Planes Vendidos"
          value={summary.totalPlans}
          color="blue"
          icon={
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <ActivitySummaryCard
          title="Productos Vendidos"
          value={summary.totalSales}
          color="purple"
          icon={
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <ActivitySummaryCard
          title="Asistencias"
          value={summary.totalAttendance}
          color="orange"
          icon={
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          }
        />
      </section>

      {/* Tablas de datos */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Planes vendidos */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Planes Vendidos ({data.userPlans.length})
            </h2>
          </div>
          <div className="h-auto">
            {data.userPlans.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay planes vendidos en este período
              </p>
            ) : (
              <UserPlansTable userPlans={data.userPlans} />
            )}
          </div>
        </div>

        {/* Ventas de productos */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Ventas de Productos ({data.sales.length})
            </h2>
          </div>
          <div className="h-auto">
            {data.sales.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay ventas de productos en este período
              </p>
            ) : (
              <SalesTable sales={data.sales} />
            )}
          </div>
        </div>

        {/* Usuarios registrados */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Usuarios Registrados ({data.newUsers.length})
            </h2>
          </div>
          <div className="h-auto">
            {data.newUsers.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay usuarios registrados en este período
              </p>
            ) : (
              <NewUsersTable newUsers={data.newUsers} />
            )}
          </div>
        </div>

        {/* Asistencias */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-300 mb-10">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Asistencias ({data.attendance.length})
            </h2>
          </div>
          <div className="h-auto">
            {data.attendance.length === 0 ? (
              <p className="text-gray-500 p-6">
                No hay asistencias registradas en este período
              </p>
            ) : (
              <AttendanceTable attendance={data.attendance} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
