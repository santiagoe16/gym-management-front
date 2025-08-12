import { z } from "zod";
import { UserResponseSchema } from "./user.schemas";
import { PlanResponseSchema } from "./plan.schemas";
import { PaymentType } from "@/types/paymentType";

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
  created_at: z.string(), // ISO datetime string
  updated_at: z.string(), // ISO datetime string
  payment_type: z.enum(["cash", "transfer"]),
  purchased_price: z.string(),
  purchased_at: z.string(), // ISO datetime string
  expires_at: z.string(), // ISO datetime string
  created_by_id: z.number(),
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
  paymentType: data.payment_type as PaymentType,
  purchasedPrice: data.purchased_price,
  purchasedAt: data.purchased_at,
  expiresAt: data.expires_at,
  createdById: data.created_by_id,
  user: data.user,
  plan: data.plan,
  createdBy: data.created_by,
}));

// Schema para lista de userPlans
export const UserPlanListResponseSchema = z.array(UserPlanResponseSchema);
