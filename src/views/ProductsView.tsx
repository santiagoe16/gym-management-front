"use client";
import React from "react";
import ProductModal from "@/components/ProductModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useProductModal } from "@/hooks/useProduct/useProductModal";
import { useProductDelete } from "@/hooks/useProduct/useProductDelete";
import { useProducts } from "@/hooks/useProduct/useProducts";
import SpinnerLoader from "@/components/SpinnerLoader";
import ProductsTable from "@/components/Tables/ProductsTable";

export default function ProductsView() {
  const { products, loading, error, getProducts } = useProducts();

  const {
    open,
    mode,
    form,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    loading: productLoading,
    error: productError,
    gyms,
    gymsLoading,
    gymsError
  } = useProductModal(getProducts);

  const {
    handleDeleteClick,
    handleConfirmDelete,
    handleCancelDelete,
    showConfirm,
    productDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useProductDelete(getProducts);

  if (loading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <p className="text-red-500">Error al cargar los productos: {error}</p>;
  }

  return (
    <main>
      {/* Encabezado de la página */}
      <header className="mb-12">
        <h1 className="text-4xl font-semibold text-gray-800">
          Inventario de productos
        </h1>
      </header>

      <ProductsTable
        products={products}
        handleOpen={handleOpen}
        handleDeleteClick={handleDeleteClick}
      />

      <ProductModal
        open={open}
        onClose={handleClose}
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={productLoading}
        error={productError}
        mode={mode}
        gyms={gyms}
        gymsLoading={gymsLoading}
        gymsError={gymsError}
      />
      <ConfirmModal
        open={showConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={
          deleteLoading
            ? "Eliminando..."
            : deleteError
            ? `Error: ${deleteError}`
            : `¿Seguro que deseas eliminar "${productDelete?.name}"?`
        }
      />
    </main>
  );
}