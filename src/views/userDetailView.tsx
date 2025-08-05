"use client";
import { useRouter } from "next/navigation";
import { useUserById } from "@/hooks/useUser/useUserById";
import { useUserMeasurements } from "@/hooks/useMeasurements/useUserMeasurements";
import { UserMeasurements } from "@/types/measurements";
import BodyMeasurementsDisplay from "@/components/BodyMeasurementsDisplay";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import UserModal from "@/components/userModal";

type Props = {
  userId: number;
};

export default function UserDetailView({ userId }: Props) {
  const router = useRouter();
  const {
    user,
    loading: userLoading,
    error: userError,
    getUserById,
  } = useUserById(userId);

  const {
    userMeasurements,
    loading: measurementsLoading,
    error: measurementsError,
    getUserMeasurements,
  } = useUserMeasurements(userId);

  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  } = useUserModal(getUserById);

  const lastMeasurements: UserMeasurements | null = userMeasurements?.[0];

  const error = userError || measurementsError;

  if (userLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>Usuario no encontrado.</p>;

  return (
    <main>
      {/* Header con botones de navegación */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver
        </button>

        <div className="flex gap-3">
          <button className="btn-primary" onClick={() => handleOpen(user)}>
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
            Editar usuario
          </button>
        </div>
      </div>

      {/* Información del Usuario */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {user.fullName}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Teléfono
            </label>
            <p className="text-gray-900">{user.phoneNumber}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Documento
            </label>
            <p className="text-gray-900">{user.documentId}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">
              Gimnasio
            </label>
            <p className="text-gray-900">{user.gym?.name || "N/A"}</p>
          </div>
        </div>

        {/* Información del plan activo */}
        {user.active_plan && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">
                  Plan Activo: {user.active_plan.plan.name}
                </h3>
                <p className="text-sm text-green-600">
                  Expira: {user.active_plan.expiresAt}
                </p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Activo
              </span>
            </div>
          </div>
        )}

        {/* Información de mediciones */}
        {lastMeasurements && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Peso Actual
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {lastMeasurements.weight} kg
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Altura
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {lastMeasurements.height} cm
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Última Medición
              </label>
              <p className="text-lg font-semibold text-gray-900">
                {lastMeasurements.measurementDate}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Medidas Corporales*/}
      <BodyMeasurementsDisplay
        userMeasurements={lastMeasurements}
        getUserMeasurements={getUserMeasurements}
        userId={userId}
      />

      {/* Historial de Mediciones */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Historial de Mediciones
        </h2>

        {userMeasurements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Peso (kg)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Altura (cm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pecho (cm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abdomen (cm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Caderas (cm)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registrado por
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userMeasurements.map((measurement, index) => (
                  <tr
                    key={measurement.id}
                    className={index === 0 ? "bg-blue-50" : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.measurementDate}
                      {index === 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Más reciente
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.chest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.abdomen}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.hips}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {measurement.user.fullName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {measurement.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay historial de mediciones para este usuario.
          </p>
        )}
      </div>
      <UserModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
        plans={plans}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
      />
    </main>
  );
}
