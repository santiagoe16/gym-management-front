import { Product } from "@/types/product";

export async function getProductsService(): Promise<Product[]> {
  const res = await fetch("/mocks/products.json");
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
} 