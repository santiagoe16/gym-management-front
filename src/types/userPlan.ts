import { User } from "./user";
import { Plan } from "./plan";
import { createdBy } from "./user";
import { string } from "zod";

export interface UserPlan {
  id: number;
  userId: number;
  planId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  paymentType: string;
  user: User;
  plan: Plan;
  createdBy: createdBy; 
}
