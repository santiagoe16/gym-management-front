"use client";
import React, { useState } from "react";
import ProductModalProps from "@/types/modals/productsModal";
import { formatPriceInput, parsePriceInput } from "@/utils/formatCurrency";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { PlusIcon } from "./Icons";

export default function ProductModal({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  loading = false,
  error = null,
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
        name: "price",
        value: numericValue.toString(),
      },
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
                <Input
                  type="text"
                  name="name"
                  id="name"
                  label={
                    <span className="text-gray-900 font-medium">Nombre</span>
                  }
                  labelPlacement="outside"
                  placeholder="Nombre del producto"
                  isRequired
                  variant="faded"
                  value={form.name}
                  onChange={onChange}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input
                  type="text"
                  name="price"
                  id="price"
                  label={
                    <span className="text-gray-900 font-medium">Precio</span>
                  }
                  labelPlacement="outside"
                  variant="faded"
                  placeholder="Ej: 50,000"
                  isRequired
                  value={formatPriceInput(form.price.toString())}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="max-w-xs"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  label={
                    <span className="text-gray-900 font-medium">Cantidad</span>
                  }
                  labelPlacement="outside"
                  placeholder="Cantidad"
                  variant="faded"
                  isRequired
                  value={form.quantity === 0 ? "" : form.quantity.toString()}
                  onChange={onChange}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  className="max-w-xs"
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
                {mode === "edit" ? "Guardar cambios" : "Agregar product"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
