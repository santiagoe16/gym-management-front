"use client"

import React from 'react';
import { Sale } from '@/types/activity';
import { formatCurrency } from '@/utils/formatCurrency';
import { PaymentType } from '@/types/paymentType';

interface SalesTableProps {
  sales: Sale[];
  loading: boolean;
  error: string | null;
}

export const SalesTable: React.FC<SalesTableProps> = React.memo(({ sales, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Ventas de Hoy ({sales.length})</h2>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 p-6">Cargando ventas...</p>
        ) : error ? (
          <p className="text-red-500 p-6">{error}</p>
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
                <tr key={sale.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-sm">{sale.product.name}</td>
                  <td className="px-4 py-3 text-sm">{formatCurrency(sale.unitPrice)}</td>
                  <td className="px-4 py-3 text-sm">{sale.quantity}</td>
                  <td className="px-4 py-3 font-medium text-green-600 text-sm">{formatCurrency(sale.totalAmount)}</td>
                  <td className="px-4 py-3 text-sm">{sale.soldBy.fullName}</td>
                  <td className="px-4 py-3 text-sm">
                    {sale.paymentType === PaymentType.CASH ? 'Efectivo' : 'Transferencia'}
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

SalesTable.displayName = 'SalesTable';
