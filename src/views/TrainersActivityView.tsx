"use client";
import React, { useState } from "react";
import { useTrainers } from "@/hooks/useTrainer/useTrainers";

// Datos de ejemplo

const usuariosRegistrados = [
  { nombre: "Carlos Ruiz", cedula: "111222333", plan: "Mensual" },
  { nombre: "Laura Torres", cedula: "444555666", plan: "Trimestral" },
];

const ventasRealizadas = [
  { producto: "Proteína", cantidad: 2, total: 120000 },
  { producto: "Creatina", cantidad: 1, total: 80000 },
];

export default function TrainersActivityView() {
  const {trainers, loading: TrainersLoading, error: TrainersError} = useTrainers()
  const [trainer, setTrainer] = useState<string | undefined>(undefined);

  const [fecha, setFecha] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  });

  return (
    <main>
      <header className="mb-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Actividad de entrenador
        </h1>
      </header>

      {/* Selectores */}
      <section className="flex flex-col md:flex-row gap-4 mb-8">
        <div>
          <label htmlFor="trainer" className="block mb-1 text-sm font-medium text-gray-700">Entrenador</label>
          <select
            id="trainer"
            name="trainer"
            className="border border-gray-300 rounded-sm p-2 w-full"
            value={trainer ?? 0}
            onChange={e => setTrainer(e.target.value)}
          >
            <option value={0} disabled>Elige un entrenador</option>
            {trainers.map(e => (
              <option key={e.cedula} value={e.cedula}>{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            className="border border-gray-300 rounded-sm p-2 w-full"
            value={fecha}
            onChange={e => setFecha(e.target.value)}
          />
        </div>
      </section>

      {/* Tabla de usuarios registrados */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Usuarios registrados ese día</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Cédula</th>
                <th className="px-6 py-3">Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {usuariosRegistrados.map((user, idx) => (
                <tr key={user.cedula} className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap">
                  <td className="px-6 py-4">{user.nombre}</td>
                  <td className="px-6 py-4">{user.cedula}</td>
                  <td className="px-6 py-4">{user.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Tabla de ventas realizadas */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Ventas realizadas</h2>
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg border-gray-300 border">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-200 text-left text-gray-600 uppercase text-sm font-medium">
              <tr className="whitespace-nowrap">
                <th className="px-6 py-3">Producto</th>
                <th className="px-6 py-3">Cantidad</th>
                <th className="px-6 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {ventasRealizadas.map((venta, idx) => (
                <tr key={idx} className="odd:bg-white even:bg-gray-100 border-b border-gray-200 hover:bg-[#ebebeb] transition-colors whitespace-nowrap">
                  <td className="px-6 py-4">{venta.producto}</td>
                  <td className="px-6 py-4">{venta.cantidad}</td>
                  <td className="px-6 py-4">${venta.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
} 