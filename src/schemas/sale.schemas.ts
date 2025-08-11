import { z } from "zod";
import { Sale, CreateSaleDTO } from "@/types/sale";
import { ProductResponseSchema } from "./product.schemas";
import { UserResponseSchema } from "./user.schemas";

// Schema para Sale Response (convierte snake_case a camelCase)
export const SaleResponseSchema: z.ZodType<Sale> = z
  .object({
    // Snake case desde API
    id: z.number(),
    product_id: z.number(),
    quantity: z.number(),
    unit_price: z.string(),
    total_amount: z.string(),
    sale_date: z.string(),
    sold_by_id: z.number(),
    gym_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    product: ProductResponseSchema,
    sold_by: UserResponseSchema,
    payment_type: z.string(),
    gym: z.object({
      id: z.number(),
      name: z.string(),
      address: z.string(),
    }),
  })
  .transform(
    (data): Sale => ({
      id: data.id,
      productId: data.product_id,
      quantity: data.quantity,
      unitPrice: data.unit_price,
      totalAmount: data.total_amount,
      saleDate: data.sale_date,
      soldById: data.sold_by_id,
      gymId: data.gym_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      product: data.product,
      soldBy: data.sold_by,
      paymentType: data.payment_type === "cash" ? "Efectivo": "transferencia",
      gym: data.gym,
    })
  );

// Schema para lista de sales
export const SaleListResponseSchema = z.array(SaleResponseSchema);

// Schema para crear sale (convierte camelCase a snake_case)
const SaleFormSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  gymId: z.number(),
});

export const SaleRequestSchema = SaleFormSchema.transform((data) => ({
  product_id: data.productId,
  quantity: data.quantity,
  gym_id: data.gymId,
}));
