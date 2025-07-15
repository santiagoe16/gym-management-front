import { Gym } from "../types/gym";
export interface Trainer {
  id?: number;
  name: string;
  cedula: string;
  phone: string;
  schedule: string;
  gym: Gym;
}