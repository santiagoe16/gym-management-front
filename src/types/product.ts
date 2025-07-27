import { Gym } from "./gym";

export interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  gymId: number,
  gym: Gym;
} 

export interface CreateProductDTO {
  name: string;
  price: string;
  quantity: number;
  gymId: number,
}

export interface UpdateProductDTO {
  price: string;
  durationDays: number;
  gymId: number,
}