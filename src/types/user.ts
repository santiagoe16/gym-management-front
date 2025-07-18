import Gym from "@/types/gym";
import Plan from "@/types/plan";

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default interface User {
  id?: number;
  name: string;
  cedula: number;
  phone: number;
  plan: Plan;
  gym: Gym;
}
