import { Trainer } from "@/types/trainer";

export async function getTrainersService(): Promise<Trainer[]> {
  const res = await fetch("/mocks/trainers.json");
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function addTrainerService(trainer: Trainer): Promise<Trainer> {
  // Aquí normalmente harías un POST
  return { ...trainer, id: Date.now() };
}

export async function updateTrainerService(trainer: Trainer): Promise<Trainer> {
  // Aquí normalmente harías un PUT/PATCH
  return trainer;
}

export async function deleteTrainerService(id: number): Promise<number> {
  // Aquí normalmente harías un DELETE
  return id;
} 