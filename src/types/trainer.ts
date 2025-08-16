import { Gym } from "./gym";

export interface Trainer {
  id: number;
  fullName: string;
  documentId: string;
  phoneNumber: string;
  scheduleStart: string;
  scheduleEnd: string;
  gym: Gym;
}
