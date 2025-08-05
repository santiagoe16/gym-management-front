// src/utils/mappers.ts
import { Trainer, CreateTrainerDTO } from "@/types/trainer"; // Ajusta la ruta si es necesario
import { Gym, CreateGymDTO } from "@/types/gym";
import { CreateUserDTO, User } from "@/types/user";

export function mapTrainerToCreateDTO(trainer: Trainer): CreateTrainerDTO {
  return {
    email: trainer.email,
    fullName: trainer.fullName,
    documentId: trainer.documentId,
    phoneNumber: trainer.phoneNumber,
    gymId: trainer.gym.id,
    role: "trainer",
    scheduleStart: trainer.scheduleStart || "",
    scheduleEnd: trainer.scheduleEnd || "",
    password: "",
  };
}

export function mapUserToCreateDTO(user: User): CreateUserDTO {
  return {
    email: user.email,
    fullName: user.fullName,
    documentId: user.documentId,
    phoneNumber: user.phoneNumber,
    gymId: user.gym.id,
    planId: user.active_plan?.planId || 0,
  };
}

export function mapGymToCreateDTO(gym: Gym): CreateGymDTO {
  return {
    name: gym.name,
    address: gym.address,
  };
}
