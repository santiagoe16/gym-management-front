"use client";
import React, { useState } from "react";
import UserModal from "@/components/userModal";
import { useUserModal } from "@/hooks/useUserModal";
import { useUserDelete } from "@/hooks/useUserDelete";
import ConfirmModal from "@/components/ConfirmModal";

export default function UsersView() {
  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  } = useUserModal();

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    userToDelete,
  } = useUserDelete();

  // Ejemplo de datos de producto
  const users = [
    {
      name: "santiago espinal",
      cedula: "1028233499",
      phone: "3194795972",
      plan: "MES",
    },
    {
      name: "santiago espinal",
      cedula: "1028233429",
      phone: "3194795972",
      plan: "MES",
    },
  ];

  return (
    <main className="p-6">
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold dark:text-gray-100 text-gray-800">
          Listado de usuarios
        </h1>
      </header>

      {/* Sección de acciones */}
      <section className="flex justify-end mb-16">
        <button className="btn-primary" onClick={() => handleOpen()}>
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
          </svg>{" "}
          Agregar usuario
        </button>
      </section>

      {/* Sección de la tabla de productos */}
      <section className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Cedula</th>
              <th className="px-6 py-3">Celular</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-700">
            {users.map((user, idx) => (
              <tr
                key={user.cedula}
                className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.cedula}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.plan}</td>
                <td className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleOpen(user)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-blue-600 hover:underline ml-2"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <UserModal
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
        message={`¿Seguro que deseas eliminar "${userToDelete?.name}"?`}
      />
    </main>
  );
}
