import { User } from "./user";
import { Plan } from "./plan";
import { createdBy } from "./user";
import { PaymentType } from "./paymentType";

export interface UserPlan {
  id: number;
  userId: number;
  planId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  paymentType: PaymentType;
  purchasedPrice: string;
  purchasedAt: string;
  expiresAt: string;
  createdById: number;
  user: User;
  plan: Plan;
  createdBy: createdBy; 
}
