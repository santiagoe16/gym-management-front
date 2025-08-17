import { PRODUCT_ENDPOINTS } from "@/constants/apiEndopoints";
import { Product, CreateProductDTO } from "@/types/product";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { ProductListResponseSchema, ProductResponseSchema, ProductRequestSchema } from "@/schemas/product.schemas";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

export async function getProductsService(): Promise<Product[]> {
  try {
    const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ALL);
    const data = await res.json();

    try {
      const products: Product[] = ProductListResponseSchema.parse(data)
      return products;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getProductsService error:", err);
    throw err;
  }
}

export async function getActiveProductsService(): Promise<Product[]> {
  try {
    const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ACTIVE);
    const data = await res.json();

    try {
      const products: Product[] = ProductListResponseSchema.parse(data)
      return products;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getActiveProductsService error:", err);
    throw err;
  }
}

export async function addProductService(
  product: CreateProductDTO
): Promise<Product> {
  // Validación de entrada
  const parseResult = ProductRequestSchema.safeParse(product);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del producto inválidos");
  }

  const validProduct = parseResult.data;

  try {
    const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validProduct),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al agregar producto");
    }

    const data = await res.json();

    // Validar respuesta del servidor
    const addedProduct: Product = ProductResponseSchema.parse(data);
    return addedProduct;
  } catch (err) {
    console.error("addPlanService error:", err);
    throw new Error("Error al agregar plan");
  }
}

export async function updateProductService(
  selectedProductId: number,
  product: CreateProductDTO
): Promise<Product> {
  const parseResult = ProductRequestSchema.safeParse(product);

  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del producto inválidos");
  }

  const filteredForm = removeEmptyFields(parseResult.data);

  try {
    const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ADD + selectedProductId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Error al actualizar producto");
    }

    const data = await res.json();
   
    // Validar respuesta del servidor
    const updatedProduct: Product = ProductResponseSchema.parse(data);
    return updatedProduct;
  } catch (err) {
    console.error("updatePlanService error:", err);
    throw new Error("Error al actualizar plan");
  }
}

export async function deleteProdutcService(id: number): Promise<number> {
  const res = await fetchWithAuth(PRODUCT_ENDPOINTS.PRODUCTS_ALL + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: false }),
  });

  if (!res.ok) {
    console.log(res)
    const errorBody = await res.json();
    console.error("Código de error:", res.status);
    throw new Error(errorBody.datail || `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.message;
}
