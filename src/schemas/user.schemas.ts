import { z } from "zod";
import { User, CreateUserDTO, ActivePlan } from "@/types/user";
import { Gym } from "@/types/gym";
import { PlanResponseSchema } from "./plan.schemas";

const GymSchema: z.ZodType<Gym> = z
  .object({
    id: z.number(),
    name: z.string().min(2),
    address: z.string(),
  })
  .transform(
    (gym): Gym => ({
      id: gym.id,
      name: gym.name,
      address: gym.address,
    })
  );

export const ActivePlanSchema: z.ZodType<ActivePlan> = z
  .object({
    id: z.number(),
    user_id: z.number(),
    plan_id: z.number(),
    purchased_price: z.string(),
    purchased_at: z.string(),
    expires_at: z.string(),
    created_by_id: z.number(),
    plan: PlanResponseSchema,
  })
  .transform(
    (data): ActivePlan => ({
      id: data.id,
      userId: data.user_id,
      planId: data.plan_id,
      purchasedPrice: data.purchased_price,
      purchasedAt: data.purchased_at,
      expiresAt: data.expires_at,
      createdById: data.created_by_id,
      plan: data.plan,
    })
  );

export const UserResponseSchema: z.ZodType<User> = z
  .object({
    id: z.number(),
    email: z.string(),
    full_name: z.string(),
    document_id: z.string(),
    phone_number: z.string(),
    gym: GymSchema,
    active_plan: ActivePlanSchema.nullable(),
    created_at: z.string(),
    updated_at: z.string(),
  })
  .transform(
    (data): User => ({
      id: data.id,
      email: data.email,
      fullName: data.full_name,
      documentId: data.document_id,
      phoneNumber: data.phone_number,
      gym: data.gym,
      activePlan: data.active_plan,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  );

export const UserListResponseSchema = z.array(UserResponseSchema);

const UserFormSchema = z.object({
  email: z.string(),
  fullName: z.string(),
  documentId: z.string(),
  phoneNumber: z.string(),
  gymId: z.number(),
  planId: z.number(),
});

export const UserRequestSchema = UserFormSchema.transform((data): any => ({
  email: data.email,
  full_name: data.fullName,
  document_id: data.documentId,
  phone_number: data.phoneNumber,
  gym_id: data.gymId,
  plan_id: data.planId,
}));

export const EditUserRequestSchema = UserFormSchema.transform((data): any => ({
  email: data.email,
  full_name: data.fullName,
  document_id: data.documentId,
  phone_number: data.phoneNumber,
  gym_id: data.gymId,
  plan_id: data.planId,
}));

