// src/utils/mappers.ts
import { Trainer, CreateTrainerDTO } from '@/types/trainer'; // Ajusta la ruta si es necesario

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
