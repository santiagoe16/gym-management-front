import {User} from "@/types/user";
import { recordedBy } from "./attendance";

export interface UserMeasurements {
  id: number;
  userId: number;
  weight: number;
  height: number;
  chest: number;
  shoulders: number;
  bicepsRight: number;
  bicepsLeft: number;
  forearmsLeft: number;
  forearmsRight: number;
  abdomen: number;
  hips: number;
  thighsLeft: number;
  thighsRight: number;
  calvesLeft: number;
  calvesRight: number;
  notes: string;
  measurementDate: string; 
  createdAt: string; 
  updatedAt: string; 
  user: User; 
  recordedBy: recordedBy;
}
export interface CreateMeasurementsDTO {
  userId: number;
  weight: number;
  height: number;
  chest: number;
  shoulders: number;
  bicepsRight: number;
  bicepsLeft: number;
  forearmsLeft: number;
  forearmsRight: number;
  abdomen: number;
  hips: number;
  thighsLeft: number;
  thighsRight: number;
  calvesLeft: number;
  calvesRight: number;
  notes: string;
}
