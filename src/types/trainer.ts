import { Gym } from "./gym";

export interface Trainer {
  id: number;
  fullName: string;
  email: string;
  documentId: string;
  phoneNumber: string;
  scheduleStart: string;
  scheduleEnd: string;
  gym: Gym;
}

export interface CreateTrainerDTO {
  email: string;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  scheduleStart: string;
  scheduleEnd: string;
  gymId: number;
  role?: "trainer";
  password?: string;
}

export interface EditTrainerDTO {
  email?: string;
  fullName?: string;
  documentId?: string;
  phoneNumber?: string;
  scheduleStart?: string;
  scheduleEnd?: string;
  gymId?: number;
  password?: string;
}

export interface TrainerListResponse extends Trainer {}

export interface TrainerResponse extends Trainer {}


