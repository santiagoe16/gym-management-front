"use client";
import React from "react";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";
import { PaymentType, PaymentTypeLabels } from "@/types/paymentType";

interface SaleModalProps {
  open: boolean;
  onClose: () => void;
  products: Product[];
  productsLoading: boolean;
  productsError: string | null;
  form: {
    productId: number;
    quantity: number;
    paymentType: PaymentType;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export default function SaleModal({
  open,
  onClose,
  products,
  productsLoading,
  productsError,
  form,
  onChange,
  onSubmit,
  loading,
  error,
}: SaleModalProps) {
  if (!open) return null;

  const selectedProduct = products.find(p => p.id === form.productId);

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full max-h-full bg-black/50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow-xs">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Vender Producto
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
          
          {error && (
            <div className="p-4 mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg mx-4 mt-4">
              {error}
            </div>
          )}

          <form className="p-4 md:p-5" onSubmit={onSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="product_id"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Producto
                </label>
                {productsLoading ? (
                  <p className="text-gray-500 text-sm">Cargando productos...</p>
                ) : productsError ? (
                  <p className="text-red-500 text-sm">{productsError}</p>
                ) : (
                  <select
                    name="productId"
                    id="productId"
                    value={form.productId}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  >
                    <option value={0} disabled>
                      Selecciona un producto
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatCurrency(product.price)} (Stock: {product.quantity})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Cantidad
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={form.quantity === 0 ? "" : form.quantity}
                  onChange={onChange}
                  min="1"
                  max={selectedProduct?.quantity || 999}
                  className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    selectedProduct && form.quantity > selectedProduct.quantity
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="Cantidad a vender"
                  required
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {selectedProduct && (
                  <div className="mt-1">
                    <p className="text-sm text-gray-500">
                      Stock disponible: {selectedProduct.quantity}
                    </p>
                    {form.quantity > selectedProduct.quantity && (
                      <p className="text-sm text-red-600 font-medium">
                        ⚠️ No puedes vender más de {selectedProduct.quantity} unidades
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="paymentType"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Tipo de Pago
                </label>
                <select
                  name="paymentType"
                  id="paymentType"
                  value={form.paymentType}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                >
                  {Object.entries(PaymentTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && form.quantity > 0 && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">Resumen de venta:</p>
                  <p className="text-sm text-gray-600">
                    Producto: {selectedProduct.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Precio unitario: {formatCurrency(selectedProduct.price)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Cantidad: {form.quantity}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    Total: {formatCurrency(selectedProduct.price * form.quantity)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end w-full">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={
                  loading || 
                  form.productId === 0 || 
                  form.quantity === 0 || 
                  (selectedProduct && form.quantity > selectedProduct.quantity)
                }
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
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
                    Realizar Venta
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
