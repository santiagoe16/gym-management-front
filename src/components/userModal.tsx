"use client";
import React, { useState } from "react";
import UserModalProps from "@/types/modals/userModal";

export default function UserModal({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  mode = "add",
  plans = [],
  plansLoading = false,
  plansError = null,
  gyms = [],
  gymsLoading = false,
  gymsError = null,
}: UserModalProps) {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-40">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === "edit" ? "Editar usuario" : "Crear nuevo usuario"}
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
              <div className="col-span-2">
                <label
                  htmlFor="cedula"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Cedula
                </label>
                <input
                  type="number"
                  name="cedula"
                  id="cedula"
                  value={form.cedula === 0 ? "" : form.cedula}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Cédula"
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
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Celular
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  value={form.phone === 0 ? "" : form.phone}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Celular"
                  required
                  onKeyDown={(e) => {
                    if (["e", "E", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="plan"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Plan
                </label>
                {plansLoading ? (
                  <p className="text-gray-500 text-sm">Cargando planes...</p>
                ) : plansError ? (
                  <p className="text-red-500 text-sm">{plansError}</p>
                ) : (
                  <select
                    name="plan"
                    id="plan"
                    value={form.plan?.id ?? 0}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  >
                    <option value={0} disabled>
                      Selecciona un plan
                    </option>
                    {plans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {plan.duration} días - ${plan.price}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="gym"
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
                    name="gym"
                    id="gym"
                    value={form.gym?.id ?? 0}
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
                {mode === "edit" ? "Guardar cambios" : "Agregar usuario"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
