import {Gym} from "@/types/gym";
import {Plan} from "@/types/plan";

export interface UserAutenticate {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default interface User {
  id?: number;
  fullName: string;
  email: string;
  documentId: string;
  phoneNumber: string;
  plan: Plan;
  gym: Gym;
}

export default interface UserMeasurements {
  id?: number;
  name: string;
  documentId: string;
  phoneNumber: string;
  plan: Plan;
  gym: Gym;
  measurements: {
    chest?: number;
    bicep?: number;
    forearm?: number;
    abdomen?: number;
    glutes?: number;
    thigh?: number;
    calf?: number;
    weight?: number;
    height?: number;
    date?: string;
  };
}
