"use client";
import React, { useState } from "react";
import ProductModal from "@/components/ProductModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useProductModal } from "@/hooks/useProductModal";
import { useProductDelete } from "@/hooks/useProductDelete";

export default function ProductsView() {
  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  } = useProductModal();

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    productToDelete,
  } = useProductDelete();

  // Ejemplo de datos de producto
  const productos = [{ name: "Creatina", price: "80000", cantidad: "25" },{ name: "Creatina", price: "80000", cantidad: "25" }];

  return (
    <main className="p-6">
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Inventario de productos
        </h1>
      </header>

      {/* Sección de acciones */}
      <section className="flex justify-end mb-16">
        <button
          className="btn-primary"
          onClick={() => handleOpen()}
        >
          + Agregar producto
        </button>
      </section>

      {/* Sección de la tabla de productos */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
            <tr>
              <th className="px-6 py-3">Producto</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Cantidad</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {productos.map((prod, idx) => (
              <tr
                key={idx}
                className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors"
              >
                <td className="px-6 py-4">{prod.name}</td>
                <td className="px-6 py-4">${prod.price}</td>
                <td className="px-6 py-4">{prod.cantidad}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleOpen(prod)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-blue-600 hover:underline ml-2"
                    onClick={() => handleDeleteClick(prod)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <ProductModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`¿Seguro que deseas eliminar "${productToDelete?.name}"?`}
      />
    </main>
  );
}
