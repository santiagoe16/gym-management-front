import { Sale, CreateSaleDTO } from "@/types/sale";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { SALES_ENDPOINTS } from "@/constants/apiEndopoints";
import {
  SaleListResponseSchema,
  SaleRequestSchema,
  SaleResponseSchema,
} from "@/schemas/sale.schemas";

export async function getDailySalesService(date: string): Promise<Sale[]> {
  try {
    const res = await fetchWithAuth(
      `${SALES_ENDPOINTS.SALES_DAILY}?sale_date=${date}`
    );

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    console.log("respuesta del servidor sales", data);
    return SaleListResponseSchema.parse(data);
  } catch (err) {
    console.error("getDailySalesService error:", err);
    throw err;
  }
}

export async function createSaleService(sale: CreateSaleDTO): Promise<Sale> {
  const parseResult = SaleRequestSchema.safeParse(sale);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos de venta inválidos");
  }

  const validSales= parseResult.data;
  try {
    const res = await fetchWithAuth(SALES_ENDPOINTS.SALES_CREATE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validSales),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || `Error HTTP ${res.status}`);
    }

    const data = await res.json();
    return SaleResponseSchema.parse(data);
  } catch (err) {
    console.error("createSaleService error:", err);
    throw err;
  }
}
