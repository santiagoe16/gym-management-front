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
  //añadir un usuario reducido de quien creo el plan
  plan: Plan;
};

export type User = {
  id: number;
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  gym: Gym;
  active_plan: ActivePlan | null;
};

export interface CreateUserDTO {
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  gymId: number;
  planId: number;
}
