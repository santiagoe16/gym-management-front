"use client";
import React from "react";
import { useProducts } from "@/hooks/useProduct/useProducts";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TrainerProductsView() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <main>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Encabezado de la página */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-10">
          Inventario de productos
        </h1>
      </header>

      {/* Sección de la tabla de productos */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
            <tr className="whitespace-nowrap">
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Cantidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap"
              >
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Estado vacío */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay productos disponibles
            </h3>
            <p className="text-gray-500">
              No se encontraron productos en el catálogo.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
