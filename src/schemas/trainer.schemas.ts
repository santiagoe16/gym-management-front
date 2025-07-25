import { z } from "zod";
import { Trainer, CreateTrainerDTO } from "@/types/trainer";
import { Gym } from "@/types/gym";

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

// 3. Schema para Trainer (forzado a coincidir con la interfaz)
export const TrainerResponseSchema: z.ZodType<Trainer> = z
  .object({
    // Snake case desde API
    id: z.number(),
    full_name: z.string(),
    document_id: z.string(),
    phone_number: z.string(),
    role: z.literal("trainer"),
    email: z.string(),
    is_active: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    gym: GymSchema,
  })
  .transform(
    (data): Trainer => ({
      // Camel case para el frontend
      id: data.id,
      fullName: data.full_name,
      documentId: data.document_id,
      phoneNumber: data.phone_number,
      role: data.role,
      email: data.email,
      isActive: data.is_active,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      gym: data.gym, // Ya transformado por GymSchema
    })
  );

// 4. Schema para lista
export const TrainerListResponseSchema = z.array(TrainerResponseSchema);

// 👇 Este es solo el schema base sin transformar
const TrainerFormSchema = z.object({
  fullName: z.string(),
  documentId: z.string(),
  phoneNumber: z.string(),
  role: z.literal("trainer"),
  email: z.string(),
  password: z.string(),
  gymId: z.number(),
});

// ✅ Schema para crear
export const TrainerRequestSchema = TrainerFormSchema.transform((data) => ({
  full_name: data.fullName,
  document_id: data.documentId,
  phone_number: data.phoneNumber,
  role: data.role,
  email: data.email,
  password: data.password,
  gym_id: data.gymId,
}));

// ✅ Schema para editar (permite campos opcionales)
export const EditTrainerRequestSchema = TrainerFormSchema.partial().transform((data) => ({
  full_name: data.fullName,
  document_id: data.documentId,
  phone_number: data.phoneNumber,
  role: data.role,
  email: data.email,
  password: data.password,
  gym_id: data.gymId,
}));