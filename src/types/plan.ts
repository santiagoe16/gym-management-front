import {Gym} from "@/types/gym";

export interface Plan {
  id?: number;
  name: string;
  price: number;
  gym: Gym;
  duration: number;
}

export default Plan;
