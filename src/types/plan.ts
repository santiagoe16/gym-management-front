import {Gym} from "@/types/gym";

export interface Plan {
  id: number;
  name: string;
  price: string;
  gymId: number,
  gym: Gym;
  durationDays: number;
}

export interface CreatePlanDTO {
  name: string;
  price: string;
  durationDays: number;
  gymId: number,
}

export interface UpdatePlanDTO {
  id: number;
  price: string;
  durationDays: number;
  gymId: number,
}