import { z } from "zod";
import { Product } from "@/types/product";
import { Gym } from "@/types/gym";

const GymSchema: z.ZodType<Gym> = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
  })
  .transform(
    (gym): Gym => ({
      id: gym.id,
      name: gym.name,
      address: gym.address,
    })
  );

// 3. Schema para Product (forzado a coincidir con la interfaz)
export const ProductResponseSchema: z.ZodType<Product> = z
  .object({
    // Snake case desde API
    id: z.number(),
    name: z.string(),
    price: z.string(),
    quantity: z.number(),
    gym: GymSchema,
    gym_id: z.number(),
  })
  .transform(
    (data): Product => ({
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      gym: data.gym, 
      gymId: data.gym_id,
    })
  );

// Schema para lista
export const ProductListResponseSchema = z.array(ProductResponseSchema);

const ProductFormSchema = z.object({
  name: z.string(),
  price: z.string(),
  quantity: z.number(),
  gymId: z.number(),
});

// Schema para crear
export const ProductRequestSchema = ProductFormSchema.transform((data) => ({
  name: data.name,
  price: data.price,
  quantity: data.quantity,
  gym_id: data.gymId,
}));
