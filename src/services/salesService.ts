import { Sale, CreateSaleDTO } from "@/types/sale";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { SALES_ENDPOINTS } from "@/constants/apiEndopoints";
import {
  SaleListResponseSchema,
  SaleRequestSchema,
  SaleResponseSchema,
} from "@/schemas/sale.schemas";

export async function getDailySalesService(
  date: string,
  gymId?: number,
  trainerId?: number
): Promise<Sale[]> {
  try {
    const params = new URLSearchParams();
    params.append('sale_date', date);
    if (gymId) params.append('gym_id', gymId.toString());
    if (trainerId) params.append('trainer_id', trainerId.toString());

    const url = `${SALES_ENDPOINTS.SALES_DAILY}?${params.toString()}`;

    const res = await fetchWithAuth(url);

    if (!res.ok) {
      throw new Error(`Error HTTP ${res.status}`);
    }

    const data = await res.json();
    return SaleListResponseSchema.parse(data);
  } catch (err) {
    console.error("getDailySalesService error:", err);
    throw err;
  }
}

export async function createSaleService(sale: CreateSaleDTO): Promise<Sale> {
  console.log("Datos de venta a enviar:", sale);
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
