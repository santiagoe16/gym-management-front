import { z } from "zod";
import { Plan } from "@/types/plan";
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

// 3. Schema para Plan (forzado a coincidir con la interfaz)
export const PlanResponseSchema: z.ZodType<Plan> = z
  .object({
    id: z.number(),
    name: z.string(),
    price: z.string(),
    duration_days: z.number(),
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
    gym: data.gym ?? undefined,
    gymId: data.gym_id,
    days: data.days ?? undefined, // null → undefined
    role: data.role,
  }));

// 4. Schema para lista
export const PlanListResponseSchema = z.array(PlanResponseSchema);

// Este es solo el schema base sin transformar
const PlanFormSchema = z.object({
  name: z.string(),
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
  days: data.days, // puede ser null o undefined
  role: data.role,
}));