import {User} from "@/types/user";

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
  measurementDate: string; //type date
  createdAt: string; //type date
  updatedAt: string; //type date
  user: User
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
