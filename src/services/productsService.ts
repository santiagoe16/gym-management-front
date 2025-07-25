import { PRODUCT_ENDPOINTS } from "@/constants/apiEndopoints";
import { Product } from "@/types/product";
import fetchWithAuth from "@/utils/fetchWithAuth";

export async function getProductsService(): Promise<Product[]> {
  try {
    const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ALL);

    try {
      const products: Product[] = await res.json();
      return products;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getProductsService error:", err);
    throw err;
  }
} 