// src/utils/mappers.ts
import { Trainer, CreateTrainerDTO } from "@/types/trainer"; // Ajusta la ruta si es necesario
import { Gym } from "@/types/gym";
import { CreateUserDTO, User } from "@/types/user";
import { PaymentType } from "@/types/paymentType";

export function mapTrainerToCreateDTO(trainer: Trainer) {
  return {
    email: trainer.email,
    fullName: trainer.fullName,
    documentId: trainer.documentId,
    phoneNumber: trainer.phoneNumber,
    gymId: trainer.gym.id,
    role: "trainer" as const,
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
    planId: user.activePlan?.planId || 0,
    paymentType: user.activePlan?.paymentType || PaymentType.CASH,
  };
}

export function mapGymToCreateDTO(gym: Gym) {
  return {
    name: gym.name,
    address: gym.address,
  };
}
