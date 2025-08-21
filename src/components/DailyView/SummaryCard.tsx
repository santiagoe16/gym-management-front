"use client"

import React from 'react';
import { formatCurrency } from '@/utils/formatCurrency';
import { Button } from '@heroui/button';

interface SummaryCardProps {
  totalSales: number;
  onSellProductClick: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ totalSales, onSellProductClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ventas del Día</h2>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalSales.toString())}</p>
          <p className="text-sm text-gray-600">Total vendido hoy</p>
        </div>
        <Button onClick={onSellProductClick} className="w-full btn-primary">
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 18 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
          </svg>
          Vender Producto
        </Button>
      </div>
    </div>
  );
};
