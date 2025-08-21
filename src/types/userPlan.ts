import { z } from 'zod';
import { UserPlanResponseSchema } from '@/schemas/userPlan.schemas';

export type UserPlan = z.infer<typeof UserPlanResponseSchema>;
