import { Gym } from "./gym";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gym: Gym;
  isActive: boolean;
}
export interface CreateProductDTO {
  name: string;
  price: string; // String to handle currency formatting
  quantity: number;
  gymId: number;
  isActive?: boolean;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
