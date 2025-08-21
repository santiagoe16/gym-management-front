import { User, createdBy } from "./user";
import { Plan } from "./plan";
import { Product } from "./product";
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

export interface NewUser {
  id: number;
  fullName: string;
  documentId: string;
  gym: Gym;
  createdAt: string;
}

export interface Attendance {
  id: number;
  userId: number;
  gymId: number;
  checkInTime: string;
  recordedById: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  gym: Gym;
  recordedBy: {
    documentId: string;
    fullName: string;
  };
}

export interface CreateAttendanceDTO {
  // notes: undefined // Por ahora sin funcionalidad
}



