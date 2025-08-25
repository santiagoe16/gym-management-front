import { z } from "zod";
import { Plan } from "@/types/plan";
import { Gym } from "@/types/gym";
import { is } from "zod/locales";

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

// 3. Schema para Plan (forzado a coincidir con la interfaz)
export const PlanResponseSchema: z.ZodType<Plan> = z
  .object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    duration_days: z.number(),
    is_active: z.boolean(),
    gym: GymSchema.nullable().optional(),
    gym_id: z.number(),
    days: z.number().nullable().optional(), 
    role: z.enum(["regular", "taquillero"]),
  })
  .transform((data): Plan => ({
    id: data.id,
    name: data.name,
    price: data.price,
    durationDays: data.duration_days,
    isActive: data.is_active,
    gym: data.gym ?? undefined,
    gymId: data.gym_id,
    days: data.days ?? undefined, 
    role: data.role,
  }));

// 4. Schema para lista
export const PlanListResponseSchema = z.array(PlanResponseSchema);

// Este es solo el schema base sin transformar
const PlanFormSchema = z.object({
  name: z.string().optional(),
  price: z.string(),
  durationDays: z.number(),
  gymId: z.number(),
  days: z.number().nullable().optional(),
  role: z.enum(["regular", "taquillero"]),
});

export const PlanRequestSchema = PlanFormSchema.transform((data) => ({
  name: data.name,
  price: data.price,
  duration_days: data.durationDays,
  gym_id: data.gymId,
  is_active: true, // Siempre se envía como true al crear/actualizar
  days: data.days, // puede ser null o undefined
  role: data.role,
}));