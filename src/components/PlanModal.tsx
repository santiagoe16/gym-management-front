"use client";
import React from "react";
import PlanModaltype from "@/types/modals/plansModal";
import {
  formatPriceInput,
  handlePriceInputChange,
  parsePriceInput,
} from "@/utils/formatCurrency";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { PlusIcon } from "./Icons";

export default function PlanModal({
  open,
  onClose,
  form,
  loading,
  error,
  onChange,
  onSubmit,
  mode = "add",
  gyms = [],
  gymsLoading = false,
  gymsError = null,
}: PlanModaltype) {
  if (!open) return null;

  const handlePriceChange = (value: string) => {
    const formattedValue = formatPriceInput(value);
    const numericValue = parsePriceInput(formattedValue);

    // Crear un evento sintético para mantener compatibilidad
    const syntheticEvent = {
      target: {
        name: "price",
        value: numericValue.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black/50 bg-opacity-40">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-xs">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {mode === "edit" ? "Editar plan" : "Crear nuevo plan"}
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
                    <span className="text-gray-900 font-medium">
                      Nombre del plan
                    </span>
                  }
                  id="name"
                  name="name"
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Nombre del plan"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                      onChange(e as React.ChangeEvent<HTMLInputElement>)}
                  required
                />
              </div>
              <div className="col-span-2">
                {gymsError ? (
                  <p className="text-red-500 text-sm">{gymsError}</p>
                ) : (
                  <Select
                    isLoading={gymsLoading}
                    label={
                      <span className="text-gray-900 font-medium">
                        Gimnasio
                      </span>
                    }
                    labelPlacement="outside"
                    id="gymId"
                    name="gymId"
                    placeholder="Selecciona un gimnasio"
                    selectedKeys={form.gymId ? [String(form.gymId)] : []}
                    onSelectionChange={(keys) => {
                      // simular el mismo comportamiento que un <select> nativo
                      const key = Array.from(keys).pop() as string | undefined;
                      const event = {
                        target: {
                          name: "gymId",
                          value: key ? Number(key) : 0,
                        },
                      } as unknown as React.ChangeEvent<HTMLSelectElement>;
                      onChange(event);
                    }}
                    className="w-full"
                    variant="faded"
                  >
                    {gyms.map((gym) => (
                      <SelectItem key={String(gym.id)} textValue={gym.name}>
                        {gym.name} - {gym.address}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="col-span-2">
                <Select
                  label={
                    <span className="text-gray-900 font-medium">
                      Tipo de Plan
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Selecciona un tipo de plan"
                  selectedKeys={[form.role]}
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    onChange({
                      target: { name: "role", value: key },
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  isRequired
                >
                  <SelectItem key="regular">Regular</SelectItem>
                  <SelectItem key="taquillero">Taquillero</SelectItem>
                </Select>
              </div>
              {form.role === "taquillero" && (
                <div className="col-span-2">
                  <Input
                    label={
                      <span className="text-gray-900 font-medium">
                        Días de duración de taquilla
                      </span>
                    }
                    labelPlacement="outside"
                    size="md"
                    variant="faded"
                    type="number"
                    placeholder="Duración en días"
                    value={form.days === 0 ? "" : String(form.days)}
                    onChange={(e) =>
                      onChange(e as React.ChangeEvent<HTMLInputElement>)
                    }
                    required
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
              )}
              <div className="col-span-2 sm:col-span-1">
                <Input
                  type="text"
                  name="price"
                  id="price"
                  labelPlacement="outside"
                  label={
                    <span className="text-gray-900 font-medium">Precio</span>
                  }
                  variant="faded"
                  placeholder="Ej: 50,000"
                  isRequired
                  value={
                    form.price ? formatPriceInput(form.price.toString()) : ""
                  }
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input
                  type="number"
                  name="durationDays"
                  id="durationDays"
                  label={<span className="text-gray-900 font-medium">Duración en días</span>}
                  labelPlacement="outside"
                  variant="faded"
                  placeholder="Duración en días"
                  isRequired
                  value={form.durationDays === 0 ? "" : form.durationDays.toString()}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="max-w-xs"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex justify-end w-full">
              <Button type="submit" className="btn-primary" startContent={loading ? "" : <PlusIcon />}>
                {mode === "edit" ? "Guardar cambios" : "Agregar plan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
