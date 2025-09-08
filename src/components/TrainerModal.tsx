"use client";
import React from "react";
import TrainerModalProps from "@/types/modals/trainerModal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { PlusIcon } from "./Icons";

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
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black/50">
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
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">Nombre</span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Nombre del entrenador"
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  isRequired
                />
              </div>
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">Email</span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Correo electrónico"
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={onChange}
                  isRequired
                />
              </div>
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">Cédula</span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Cédula"
                  type="number"
                  name="documentId"
                  id="documentId"
                  value={form.documentId}
                  onChange={onChange}
                  isRequired
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">Celular</span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Celular"
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={onChange}
                  isRequired
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (["e", "E", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className="col-span-1">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">
                      Horario de entrada
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="5 a.m."
                  type="text"
                  name="scheduleStart"
                  id="scheduleStart"
                  value={form.scheduleStart}
                  onChange={onChange}
                  isRequired
                />
              </div>
              <div className="col-span-1">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">
                      Horario de salida
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="1 p.m."
                  type="text"
                  name="scheduleEnd"
                  id="scheduleEnd"
                  value={form.scheduleEnd}
                  onChange={onChange}
                  isRequired
                />
              </div>
              <div className="col-span-2">
                {gymsError ? (
                  <p className="text-red-500 text-sm">{gymsError}</p>
                ) : (
                  <Select
                    id="gymId"
                    name="gymId"
                    variant="faded"
                    label={
                      <span className="text-gray-900 font-medium">
                        Gimnasio
                      </span>
                    }
                    placeholder="Selecciona un gimnasio"
                    labelPlacement="outside"
                    selectedKeys={form.gymId ? [String(form.gymId)] : []}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys).pop() ?? "";
                      const event = {
                        target: {
                          name: "gymId",
                          value: key,
                        },
                      } as unknown as React.ChangeEvent<HTMLSelectElement>;
                      onChange(event);
                    }}
                    className="w-full"
                    isRequired
                    isLoading={gymsLoading}
                  >
                    {gyms.map((gym) => (
                      <SelectItem key={gym.id} textValue={gym.name}>
                        {gym.name} - {gym.address}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">
                      Contraseña
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={onChange}
                  isRequired={mode === "add"}
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end w-full">
              <Button
                color="primary"
                isLoading={loading}
                startContent={loading ? "" : <PlusIcon />}
                type="submit"
                className="font-semibold"
              >
                {mode === "edit" ? "Guardar cambios" : "Agregar entrenador"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
