import { z } from 'zod';
import { SaleRequestSchema } from '@/schemas/sale.schemas';
import { Product } from "./product";
import { User } from "./user";
import { PaymentType } from "./paymentType";
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
  paymentType: PaymentType;
  gym: Gym;
}

export interface CreateSaleDTO {
  productId: number;
  quantity: number;
  paymentType: PaymentType;
  gymId: number;
}