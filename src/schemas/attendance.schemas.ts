import { z } from "zod";
import { Attendance } from "@/types/activity";
import { UserResponseSchema } from "./user.schemas";
import { GymResponseSchema } from "./gym.schemas";
import { CreatedBySchema } from "./userPlan.schemas";

// Schema para Attendance Response (convierte snake_case a camelCase)
export const AttendanceResponseSchema: z.ZodType<Attendance> = z
  .object({
    // Snake case desde API
    id: z.number(),
    user_id: z.number(),
    gym_id: z.number(),
    check_in_time: z.string(), // ISO datetime string
    recorded_by_id: z.number(),
    created_at: z.string(), // ISO datetime string
    updated_at: z.string(), // ISO datetime string
    user: UserResponseSchema,
    gym: GymResponseSchema,
    recorded_by: CreatedBySchema,
  })
  .transform(
    (data): Attendance => ({
      id: data.id,
      userId: data.user_id,
      gymId: data.gym_id,
      checkInTime: data.check_in_time,
      recordedById: data.recorded_by_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      user: data.user,
      gym: data.gym,
      recordedBy: data.recorded_by,
    })
  );

// Schema para lista de attendance
export const AttendanceListResponseSchema = z.array(AttendanceResponseSchema);

// Schema para crear attendance (convierte camelCase a snake_case)
const AttendanceFormSchema = z.object({
  notes: z.string().optional(),
});

export const AttendanceRequestSchema = AttendanceFormSchema.transform((data) => ({
  notes: data.notes,
}));
