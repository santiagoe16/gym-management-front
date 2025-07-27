"use client";
import React from "react";
import TrainerModalProps from "@/types/modals/trainerModal";

export default function TrainerModal({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  mode = "add",
  loading = false,
  error = null,
  gyms = [],
  gymsLoading = false,
  gymsError = null,
}: TrainerModalProps) {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-40">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-xs">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === "edit" ? "Editar entrenador" : "Crear nuevo entrenador"}
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
            {error && (
              <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>
            )}
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nombre del entrenador"
                  required={mode === "add"}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="fullName"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Nombre del entrenador"
                  required={mode === "add"}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="documentId"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Cédula
                </label>
                <input
                  type="number"
                  name="documentId"
                  id="documentId"
                  value={form.documentId}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Cédula"
                  required={mode === "add"}
                  onKeyDown={(e) => {
                    if (["e", "E", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Celular
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Celular"
                  required={mode === "add"}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              {/* <div className="col-span-2">
                <label
                  htmlFor="horario"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Horario
                </label>
                <input
                  type="text"
                  name="horario"
                  id="horario"
                  value={form.schedule}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Horario"
                  required
                />
              </div> */}
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
                    name="gymId"
                    id="gym"
                    value={form.gymId}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required={mode === "add"}
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
              <div className="col-span-2">
                <label
                  htmlFor="password"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Contraseña"
                  required={mode === "add"}
                />
              </div>
            </div>
            <div className="flex justify-end w-full">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span>Guardando...</span>
                ) : (
                  <>
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
                    {mode === "edit" ? "Guardar cambios" : "Agregar entrenador"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 