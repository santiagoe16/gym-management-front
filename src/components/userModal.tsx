"use client";
import React from "react";
import UserModalProps from "@/types/modals/userModal";
import { PaymentTypeLabels } from "@/types/paymentType";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { PlusIcon } from "./Icons";

export default function UserModal({
  open,
  onClose,
  form,
  onChange,
  onSubmit,
  loading = false,
  mode = "add",
  plans = [],
  plansLoading = false,
  plansError = null,
  gyms = [],
  gymsLoading = false,
  gymsError = null,
  highlightPlan = false,
  error = null,
}: UserModalProps) {
  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-black/50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-xs">
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
                <Input
                  label={
                    <span className="text-gray-900 font-medium">
                      Nombre del usuario
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Nombre del usuario"
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
              <div className="col-span-2">
                <Input
                  label={
                    <span className="text-gray-900 font-medium">
                      Correo electrónico
                    </span>
                  }
                  labelPlacement="outside"
                  size="md"
                  variant="faded"
                  placeholder="Ingresa tu correo electrónico"
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={onChange}
                  isRequired
                />
              </div>
              <div
                className={`col-span-2 p-4 border rounded-lg ${
                  highlightPlan ? "border-red-500" : "border-gray-200"
                }`}
              >
                {highlightPlan && (
                  <p className="text-sm text-red-500 mb-2">
                    El usuario no tiene un plan activo. Por favor, selecciona un
                    nuevo plan.
                  </p>
                )}
                {plansError ? (
                  <p className="text-red-500 text-sm">{plansError}</p>
                ) : (
                  <Select
                    id="planId"
                    name="planId"
                    variant="faded"
                    label={
                      <span className="text-gray-900 font-medium">Plan</span>
                    }
                    placeholder="Selecciona un plan"
                    labelPlacement="outside"
                    selectedKeys={form.planId ? [String(form.planId)] : []}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys).pop() ?? "";
                      const event = {
                        target: {
                          name: "planId",
                          value: key,
                        },
                      } as unknown as React.ChangeEvent<HTMLSelectElement>;
                      onChange(event);
                    }}
                    className="w-full"
                    isRequired
                  >
                    {plans.map((plan) => (
                      <SelectItem key={plan.id} textValue={plan.name}>
                        {plan.name} - {plan.durationDays} días -{" "}
                        {plan.days && `${plan.days} -`} ${plan.price}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>
              <div className="col-span-2">
                <Select
                  id="paymentType"
                  name="paymentType"
                  label={
                    <span className="text-gray-900 font-medium">
                      Método de pago
                    </span>
                  }
                  placeholder="Selecciona un método de pago"
                  labelPlacement="outside"
                  selectedKeys={form.paymentType ? [form.paymentType] : []}
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys).pop() as string | undefined;
                    const event = {
                      target: {
                        name: "paymentType",
                        value: key ?? "",
                      },
                    } as unknown as React.ChangeEvent<HTMLSelectElement>;
                    onChange(event);
                  }}
                  className="w-full"
                  variant="faded"
                  isRequired
                >
                  {Object.entries(PaymentTypeLabels).map(([value, label]) => (
                    <SelectItem key={value}>{label}</SelectItem>
                  ))}
                </Select>
              </div>
              {mode == "edit" && (
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
                        const key = Array.from(keys).pop() as
                          | string
                          | undefined;
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
              )}
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
                {mode === "edit" ? "Guardar cambios" : "Agregar usuario"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
