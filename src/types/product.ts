import { Gym } from "./gym";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gym: Gym;
}