export interface Gym {
  id: number;
  name: string;
  address: string;
}

export interface CreateGymDTO {
  name: string;
  address: string;
}