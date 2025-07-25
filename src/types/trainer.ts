import { Gym } from "./gym";

export interface Trainer {
  id: number;
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  role: 'trainer';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  gym: Gym;
}

export interface CreateTrainerDTO {
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  gymId: number;
  role: 'trainer';
  password: string;
}

export type EditTrainerDTO = Partial<Omit<CreateTrainerDTO, "role">> & {
  id: number;
};