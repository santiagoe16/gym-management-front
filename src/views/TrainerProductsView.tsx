"use client";
import React from "react";
import { useProducts } from "@/hooks/useProduct/useProducts";
import SpinnerLoader from "@/components/SpinnerLoader";
import TrainerProductsTable from "@/components/Tables/TrainerProductsTable";

export default function TrainerProductsView() {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return (
      <p className="text-red-500">Error al cargar los productos: {error}</p>
    );
  }
  return (
    <main>
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">
          Listado de productos
        </h1>
      </header>
      <TrainerProductsTable products={products} />
    </main>
  );
}
