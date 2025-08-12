import { Product } from "./product";
import { User } from "./user";
import { Gym } from "./gym";
import { PaymentType } from "./paymentType";

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
  paymentType: PaymentType;
  gym: Gym;
}

export interface CreateSaleDTO {
  productId: number;
  quantity: number;
  paymentType: PaymentType;
  gymId: number;
}
