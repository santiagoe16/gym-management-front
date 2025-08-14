"use client"
import React from 'react';
import { Gym } from '@/types/gym';
import { Trainer } from '@/types/trainer';

interface AdminFiltersProps {
  gyms: Gym[];
  trainers: Trainer[];
  selectedGymId: number | undefined;
  selectedTrainerId: number | undefined;
  onGymChange: (id: number | undefined) => void;
  onTrainerChange: (id: number | undefined) => void;
}

export const AdminFilters: React.FC<AdminFiltersProps> = ({
  gyms,
  trainers,
  selectedGymId,
  selectedTrainerId,
  onGymChange,
  onTrainerChange,
}) => {
  return (
    <section className="bg-white rounded-lg shadow-lg border border-gray-300 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filtros de Administrador</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gym Filter */}
        <div>
          <label htmlFor="selectedGym" className="block mb-2 text-sm font-medium text-gray-900">
            Gimnasio
          </label>
          <select
            id="selectedGym"
            value={selectedGymId || ''}
            onChange={(e) => onGymChange(e.target.value ? Number(e.target.value) : undefined)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Todos los gimnasios</option>
            {gyms.map((gym) => (
              <option key={gym.id} value={gym.id}>
                {gym.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trainer Filter */}
        <div>
          <label htmlFor="selectedTrainer" className="block mb-2 text-sm font-medium text-gray-900">
            Entrenador
          </label>
          <select
            id="selectedTrainer"
            value={selectedTrainerId || ''}
            onChange={(e) => onTrainerChange(e.target.value ? Number(e.target.value) : undefined)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">Todos los entrenadores</option>
            {trainers.map((trainer) => (
              <option key={trainer.documentId} value={trainer.id}>
                {trainer.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
