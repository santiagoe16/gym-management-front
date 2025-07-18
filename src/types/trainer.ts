import { Gym } from "./gym";
export default interface Trainer {
  id?: number;
  name: string;
  cedula: string;
  phone: string;
  schedule: string;
  gym: Gym;
  password?: string
}