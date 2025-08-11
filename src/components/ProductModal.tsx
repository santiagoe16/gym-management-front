"use client";
import React, { useState } from "react";
import ProductModalProps from "@/types/modals/productsModal";
import { formatPriceInput, parsePriceInput } from "@/utils/formatCurrency";

export default function ProductModal({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  mode = "add",
  gyms = [],
  gymsLoading = false,
  gymsError = null,
}: ProductModalProps) {
  if (!open) return null;

  const handlePriceChange = (value: string) => {
    const formattedValue = formatPriceInput(value);
    const numericValue = parsePriceInput(formattedValue);
    
    // Crear un evento sintético para mantener compatibilidad
    const syntheticEvent = {
      target: {
        name: 'price',
        value: numericValue.toString()
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onChange(syntheticEvent);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black/50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-xs">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === "edit" ? "Editar producto" : "Crear nuevo producto"}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Cerrar modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nombre del producto"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Precio
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={formatPriceInput(form.price.toString())}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Ej: 50,000"
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={form.quantity === 0 ? "" : form.quantity}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Cantidad"
                  required
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="gymId"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Gimnasio
                </label>
                {gymsLoading ? (
                  <p className="text-gray-500 text-sm">Cargando gimnasios...</p>
                ) : gymsError ? (
                  <p className="text-red-500 text-sm">{gymsError}</p>
                ) : (
                  <select
                    name="gymId"
                    id="gymId"
                    value={form.gymId}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  >
                    <option value={0} disabled>
                      Selecciona un gimnasio
                    </option>
                    {gyms.map((gym) => (
                      <option key={gym.id} value={gym.id}>
                        {gym.name} - {gym.address}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button type="submit" className="btn-primary">
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
                {mode === "edit" ? "Guardar cambios" : "Agregar producto"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
