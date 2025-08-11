import { Product } from "./product";
import { User } from "./user";
import { Gym } from "./gym";

export interface Sale {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: string;
  totalAmount: string;
  saleDate: string;
  soldById: number;
  gymId: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
  soldBy: User;
  paymentType: string;
  gym: Gym;
}

export interface CreateSaleDTO {
  productId: number;
  quantity: number;
  gymId: number;
}
