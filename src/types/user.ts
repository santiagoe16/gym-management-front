import {Gym} from "@/types/gym";
import {Plan} from "@/types/plan";

export type ActivePlan = {
  id: number;
  userId: number;
  planId: number;
  purchasedPrice: string;
  purchasedAt: string;
  expiresAt: string;
  createdById: number;
  plan: Plan;
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
}

export type createdBy = {
  email: string;
  phoneNumber: string;
  fullName: string;
  documentId: string;
}