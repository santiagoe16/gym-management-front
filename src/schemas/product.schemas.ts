import { z } from "zod";
import { Product } from "@/types/product";
import { GymResponseSchema } from "./gym.schemas";

// 3. Schema para Product (forzado a coincidir con la interfaz)
export const ProductResponseSchema: z.ZodType<Product> = z
  .object({
    // Snake case desde API
    id: z.number(),
    name: z.string(),
    price: z.string(),
    quantity: z.number(),
    is_active: z.boolean(),
    gym: GymResponseSchema,
    gym_id: z.number(),
  })
  .transform(
    (data): Product => ({
      id: data.id,
      name: data.name,
      isActive: data.is_active,
      price: parseFloat(data.price),
      quantity: data.quantity,
      gym: data.gym,
    })
  );

// Schema para lista
export const ProductListResponseSchema = z.array(ProductResponseSchema);

export const ProductFormSchema = z.object({
  name: z.string().optional(),
  price: z.string(),
  quantity: z.number(),
  gymId: z.number(),
});

// Schema para crear
export const ProductRequestSchema = ProductFormSchema.transform((data) => ({
  name: data.name,
  price: data.price,
  is_active: true,
  quantity: data.quantity,
  gym_id: data.gymId,
}));
