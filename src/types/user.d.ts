import { Gym } from "./gym";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface User {
  id?: number;
  name: string;
  cedula: string;
  phone: string;
  plan: string;
  gym: Gym;
}
