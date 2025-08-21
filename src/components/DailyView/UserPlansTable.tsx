"use client"

import React from 'react';
import { UserPlan } from '@/types/userPlan';
import { formatCurrency } from '@/utils/formatCurrency';
import { PaymentType } from '@/types/paymentType';

interface UserPlansTableProps {
  userPlans: UserPlan[];
  loading: boolean;
  error: string | null;
}

export const UserPlansTable: React.FC<UserPlansTableProps> = React.memo(({ userPlans, loading, error }) => {
  console.log("userPlans", userPlans);
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Planes Vendidos ({userPlans.length})</h2>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 p-6">Cargando planes...</p>
        ) : error ? (
          <p className="text-red-500 p-6">{error}</p>
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
              {userPlans.map((userPlan, index) => (
                <tr
                      key={`${userPlan.user.id}`}
                      className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors" 
                    >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{userPlan.user.fullName}</p>
                      <p className="text-xs text-gray-500">DC: {userPlan.user.documentId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-sm">{userPlan.plan.name}</p>
                      <p className="text-xs text-gray-500">{formatCurrency(userPlan.plan.price)}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{userPlan.createdBy.fullName}</td>
                  <td className="px-4 py-3 text-sm">
                    {userPlan.paymentType === PaymentType.CASH ? 'Efectivo' : 'Transferencia'}
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

UserPlansTable.displayName = 'UserPlansTable';
