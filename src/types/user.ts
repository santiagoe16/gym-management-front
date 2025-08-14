import {Gym} from "@/types/gym";
import {Plan} from "@/types/plan";
import {PaymentType} from "@/types/paymentType";

export type ActivePlan = {
  id: number;
  userId: number;
  planId: number;
  purchasedPrice: string;
  purchasedAt: string;
  expiresAt: string;
  createdById: number;
  paymentType?: PaymentType;
  plan: Plan;
  days: number | null;
};

export type User = {
  id: number;
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  gym: Gym;
  activePlan: ActivePlan | null | undefined;
  createdAt: string;
  updatedAt: string;
};

export interface CreateUserDTO {
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  gymId: number;
  planId: number;
  paymentType: PaymentType;
}

export type createdBy = {
  email: string;
  phoneNumber: string;
  fullName: string;
  documentId: string;
}
