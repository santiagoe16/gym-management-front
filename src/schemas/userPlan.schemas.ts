import { z } from "zod";
import { UserResponseSchema } from "./user.schemas";
import { PlanResponseSchema } from "./plan.schemas";

// Schema para el creador (createdBy)
const CreatedBySchema = z.object({
  document_id: z.string(),
  full_name: z.string(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
}).transform((data) => ({
  documentId: data.document_id,
  fullName: data.full_name,
  email: data.email || "",
  phoneNumber: data.phone_number || "",
}));

// Schema para la respuesta del servidor (snake_case)
const UserPlanServerSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  plan_id: z.number(),
  is_active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  payment_type: z.string(),
  user: UserResponseSchema,
  plan: PlanResponseSchema,
  created_by: CreatedBySchema,
});

// Schema para la respuesta transformada (camelCase)
export const UserPlanResponseSchema = UserPlanServerSchema.transform((data) => ({
  id: data.id,
  userId: data.user_id,
  planId: data.plan_id,
  isActive: data.is_active,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  paymentType: data.payment_type === "cash" ? "Efectivo": "transferencia",
  user: data.user,
  plan: data.plan,
  createdBy: data.created_by,
}));

// Schema para lista de userPlans
export const UserPlanListResponseSchema = z.array(UserPlanResponseSchema);
