import { Gym } from "./gym";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gym: Gym;
}
export interface CreateProductDTO {
  name: string;
  price: string; // String to handle currency formatting
  quantity: number;
  gymId: number;
}