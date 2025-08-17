"use client";
import React from "react";
import { Gym } from "@/types/gym";
import { Trainer } from "@/types/trainer";
import { Select, SelectItem } from "@heroui/react";

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
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Filtros de Administrador
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gym Filter */}
        <div>
          <label
            htmlFor="selectedGym"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Gimnasio
          </label>

          <Select
            id="selectedGym"
            placeholder="Todos los gimnasios"
            selectedKeys={selectedGymId ? [String(selectedGymId)] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys).pop() as string | undefined;
              onGymChange(key ? Number(key) : undefined);
            }}
            className="w-full"
            variant="bordered"
          >
            {gyms.map((gym) => (
              <SelectItem key={String(gym.id)} textValue={gym.name}>
                {gym.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Trainer Filter */}
        <div>
          <label
            htmlFor="selectedTrainer"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Entrenador
          </label>
          <Select
            id="selectedTrainer"
            placeholder="Todos los entrenadores"
            selectedKeys={selectedTrainerId ? [String(selectedTrainerId)] : []}
            onSelectionChange={(keys) => {
              const key = Array.from(keys).pop() as string | undefined;
              onTrainerChange(key ? Number(key) : undefined);
            }}
            className="w-full"
            variant="bordered"
          >
            {trainers.map((trainer) => (
              <SelectItem key={String(trainer.id)}>
                {trainer.fullName}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </section>
  );
};
