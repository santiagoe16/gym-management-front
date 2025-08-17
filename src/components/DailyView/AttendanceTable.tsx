"use client"

import React from 'react';
import Link from 'next/link';
import { Attendance } from '@/types/activity';
import { colombiaISOToColombiaTime, colombiaISOToColombiaDate } from '@/utils/formatDate';

interface AttendanceTableProps {
  attendance: Attendance[];
  loading: boolean;
  error: string | null;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = React.memo(({ attendance, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Asistencias de Hoy ({attendance.length})</h2>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 p-6">Cargando asistencias...</p>
        ) : error ? (
          <p className="text-red-500 p-6">{error}</p>
        ) : attendance.length === 0 ? (
          <p className="text-gray-500 p-6">No hay asistencias registradas hoy</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr>
                <th className="px-4 py-3 text-xs">Nombre</th>
                <th className="px-4 py-3 text-xs">Hora</th>
                <th className="px-4 py-3 text-xs">Plan</th>
                <th className="px-4 py-3 text-xs">Vigencia</th>
                <th className="px-4 py-3 text-xs">Registrado por</th>
                <th className="px-4 py-3 text-xs">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {attendance.map((record) => (
                <tr key={record.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{record.user.fullName}</p>
                      <p className="text-xs text-gray-500">DC: {record.user.documentId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{colombiaISOToColombiaTime(record.checkInTime)}</td>
                  <td className="px-4 py-3 text-sm">
                    {record.user.activePlan?.plan.name}
                    {record.user.activePlan?.days ? ` - ${record.user.activePlan?.days} días` : ''}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {record.user.activePlan?.expiresAt
                      ? colombiaISOToColombiaDate(record.user.activePlan.expiresAt)
                      : 'Sin fecha'}
                  </td>
                  <td className="px-4 py-3 text-sm">{record.recordedBy.fullName}</td>
                  <td className="px-4 py-3 text-sm">
                    <Link href={`users/${record.userId}`} className="text-blue-600 hover:underline ml-2">
                      Ver usuario
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
});

AttendanceTable.displayName = 'AttendanceTable';
