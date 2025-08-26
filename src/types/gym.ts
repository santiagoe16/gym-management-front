export interface Gym {
  id: number;
  name: string;
  address: string;
  isActive: boolean;
}

export interface CreateGymDTO {
  name: string;
  address: string;
  isActive?: boolean;
}

export type UpdateGymDTO = Partial<CreateGymDTO>;