import { User } from "./user";
import { Gym } from "./gym";
import { ActivePlan } from "./user";

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
  notes?: string;
}

export type recordedBy = {
  email: string;
  phoneNumber: string;
  fullName: string;
  documentId: string;
}