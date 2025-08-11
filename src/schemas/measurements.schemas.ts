import { z } from "zod";
import { UserMeasurements, CreateMeasurementsDTO } from "@/types/measurements";
import { UserResponseSchema } from "./user.schemas";

// 1. Schema para la respuesta (GET)
export const UserMeasurementsResponseSchema: z.ZodType<UserMeasurements> = z
  .object({
    id: z.number(),
    user_id: z.number(),
    weight: z.number(),
    height: z.number(),
    chest: z.number(),
    shoulders: z.number(),
    biceps_right: z.number(),
    biceps_left: z.number(),
    forearms_left: z.number(),
    forearms_right: z.number(),
    abdomen: z.number(),
    hips: z.number(),
    thighs_left: z.number(),
    thighs_right: z.number(),
    calves_left: z.number(),
    calves_right: z.number(),
    notes: z.string(),
    measurement_date: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user: UserResponseSchema,
  })
  .transform((data): UserMeasurements => ({
    id: data.id,
    userId: data.user_id,
    weight: data.weight,
    height: data.height,
    chest: data.chest,
    shoulders: data.shoulders,
    bicepsRight: data.biceps_right,
    bicepsLeft: data.biceps_left,
    forearmsLeft: data.forearms_left,
    forearmsRight: data.forearms_right,
    abdomen: data.abdomen,
    hips: data.hips,
    thighsLeft: data.thighs_left,
    thighsRight: data.thighs_right,
    calvesLeft: data.calves_left,
    calvesRight: data.calves_right,
    notes: data.notes,
    measurementDate: data.measurement_date,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    user: data.user
  }));

// 2. Lista de mediciones
export const UserMeasurementsListSchema = z.array(UserMeasurementsResponseSchema);

// 3. Formulario base para crear/editar
const UserMeasurementsFormSchema = z.object({
  userId: z.number(),
  weight: z.coerce.number(),
  height: z.coerce.number(),
  chest: z.coerce.number(),
  shoulders: z.coerce.number(),
  bicepsRight: z.coerce.number(),
  bicepsLeft: z.coerce.number(),
  forearmsLeft: z.coerce.number(),
  forearmsRight: z.coerce.number(),
  abdomen: z.coerce.number(),
  hips: z.coerce.number(),
  thighsLeft: z.coerce.number(),
  thighsRight: z.coerce.number(),
  calvesLeft: z.coerce.number(),
  calvesRight: z.coerce.number(),
  notes: z.string(),
});

// 4. Schema para crear (App → API)
export const UserMeasurementsRequestSchema = UserMeasurementsFormSchema.transform(
  (data) => ({
    user_id: data.userId,
    weight: data.weight,
    height: data.height,
    chest: data.chest,
    shoulders: data.shoulders,
    biceps_right: data.bicepsRight,
    biceps_left: data.bicepsLeft,
    forearms_left: data.forearmsLeft,
    forearms_right: data.forearmsRight,
    abdomen: data.abdomen,
    hips: data.hips,
    thighs_left: data.thighsLeft,
    thighs_right: data.thighsRight,
    calves_left: data.calvesLeft,
    calves_right: data.calvesRight,
    notes: data.notes,
  })
);

