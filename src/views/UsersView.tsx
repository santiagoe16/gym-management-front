"use client";
import React, { useState } from "react";
import UserModal from "@/components/userModal";
import { useUserModal } from "@/hooks/useUser/useUserModal";
import { useUserDelete } from "@/hooks/useUser/useUserDelete";
import ConfirmModal from "@/components/ConfirmModal";
import { useUsers } from "@/hooks/useUser/useUsers";
import Link from "next/link";
import { utcToColombiaDate } from "@/utils/formatDate";

export default function UsersView() {
  const { users, loading, error, getUsers } = useUsers();
  
  
  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  } = useUserModal(getUsers);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    userToDelete,
  } = useUserDelete(getUsers);

  // Ejemplo de datos de producto

  return (
    <main>
      {/* Encabezado de la página */}
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
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
        {loading ? (
          <p className="text-gray-500">Cargando usuarios...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Cedula</th>
                <th className="px-6 py-3">Celular</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Inicio plan</th>
                <th className="px-6 py-3">Vigencia</th>
                <th className="px-6 py-3">Gimnasio</th>
                <th className="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {users.map((user, idx) => (
                <tr
                  key={user.documentId}
                  className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap"
                >
                  <td className="px-6 py-4">{user.fullName}</td>
                  <td className="px-6 py-4">{user.documentId}</td>
                  <td className="px-6 py-4">{user.phoneNumber}</td>
                  <td className="px-6 py-4">
                    {user.activePlan?.plan.name || "Inactivo"}{" "}
                  </td>
                  <td className="px-6 py-4">
                    {user.activePlan?.purchasedAt
                      ? utcToColombiaDate(user.activePlan.purchasedAt)
                      : "Inactivo"}
                  </td>
                  <td className="px-6 py-4">
                    {user.activePlan?.expiresAt
                      ? utcToColombiaDate(user.activePlan.expiresAt)
                      : "Inactivo"}
                  </td>
                  <td className="px-6 py-4">{user.gym.name}</td>
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
                    <Link
                      href={`users/${user.id}`}
                      className="text-blue-600 hover:underline ml-2"
                    >
                      Ver usuario
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <UserModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        mode={mode}
        plans={plans}
        plansLoading={plansLoading}
        plansError={plansError}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`¿Seguro que deseas eliminar "${userToDelete?.fullName}"?`}
      />
    </main>
  );
}
