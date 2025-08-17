"use client";
import React from "react";
import { useAttendance } from "@/hooks/useDaily/useAttendance";
import { Button } from "@heroui/react";

interface AttendanceCardProps {
  onSuccess: () => void;
  onUserNotFound: (documentId: string) => void;
  onUserNoPlan: (documentId: string) => void;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  onSuccess,
  onUserNotFound,
  onUserNoPlan,
}) => {
  const {
    documentId,
    loading: attendanceSubmitLoading,
    error: attendanceSubmitError,
    handleDocumentIdChange,
    handleSubmit: handleAttendanceSubmit,
  } = useAttendance(onSuccess, onUserNotFound, onUserNoPlan);

  return (
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
        <Button
          type="submit"
          isLoading={attendanceSubmitLoading}
          disabled={attendanceSubmitLoading}
          className="w-full btn-primary"
        >
          {attendanceSubmitLoading ? (
            ""
          ) : (
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
          )}
          Registrar Asistencia
        </Button>
      </form>
    </div>
  );
};
