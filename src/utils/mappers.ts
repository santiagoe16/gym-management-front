// src/utils/mappers.ts
import { Trainer, CreateTrainerDTO } from '@/types/trainer'; // Ajusta la ruta si es necesario
import {Gym, CreateGymDTO} from '@/types/gym';

export function mapTrainerToCreateDTO(trainer: Trainer): CreateTrainerDTO {
  return {
    email: trainer.email,
    fullName: trainer.fullName,
    documentId: trainer.documentId,
    phoneNumber: trainer.phoneNumber,
    gymId: trainer.gym.id,
    role: 'trainer',
    password: '', 
  };
}

export function mapGymToCreateDTO(gym: Gym): CreateGymDTO {
  return {
  name: gym.name,
  address: gym.address,
  };
}
