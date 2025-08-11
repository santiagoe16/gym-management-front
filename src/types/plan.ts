import {Gym} from "@/types/gym";

export interface Plan {
  id: number;
  name: string;
  price: string;
  gymId: number,
  gym?: Gym;
  durationDays: number;
  days?: number,
  role: "regular" | "taquillero",
}

export interface CreatePlanDTO {
  name: string;
  price: string;
  durationDays: number;
  gymId: number,
  days?: number,
  role: "regular" | "taquillero",
}

export interface UpdatePlanDTO {
  id: number;
  price: string;
  durationDays: number;
  gymId: number,
  days?: number
  role: "regular" | "taquillero",
}