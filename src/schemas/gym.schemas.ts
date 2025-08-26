import { Gym } from '@/types/gym';
import { z } from 'zod';

export const GymFormSchema = z.object({
  name: z.string().optional(),
  address: z.string(),
});

export const GymRequestSchema = GymFormSchema.transform((data) => ({
  name: data.name,
  address: data.address,
  is_active: true,
}));

export const GymResponseSchema: z.ZodType<Gym> = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    is_active: z.boolean(),
  })
  .transform((data): Gym => ({
    id: data.id,
    name: data.name,
    address: data.address,
    isActive: data.is_active,
  }));

export const GymListResponseSchema = z.array(GymResponseSchema);
