// import { z } from "zod";
// import User from "@/types/user";

// export const RawUserSchema = z.object({
//   id: z.number(),
//   email: z.string(),
//   full_name: z.string(),
//   document_id: z.string(),
//   phone_number: z.string(),
//   gym_id: z.number(),
//   role: z.string(),
//   is_active: z.boolean(),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

// export const RawUserArraySchema = z.array(RawUserSchema);

// // Esta función transforma de snake_case a camelCase según tu tipo User
// export function transformUser(raw: z.infer<typeof RawUserSchema>): User {
//   return {
//     id: raw.id,
//     email: raw.email,
//     fullName: raw.full_name,
//     documentId: raw.document_id,
//     phoneNumber: raw.phone_number,
//     gymId: raw.gym_id,
//     role: raw.role,
//     isActive: raw.is_active,
//     createdAt: raw.created_at,
//     updatedAt: raw.updated_at,
//   };
// }