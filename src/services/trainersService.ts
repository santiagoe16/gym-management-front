import { TRAINER_ENDPOINTS } from "@/constants/apiEndopoints";
import {
  TrainerListResponseSchema,
  TrainerResponseSchema,
  TrainerRequestSchema,
  EditTrainerRequestSchema
} from "@/schemas/trainer.schemas";
import { Trainer, CreateTrainerDTO, EditTrainerDTO } from "@/types/trainer";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

export async function getTrainersService(): Promise<Trainer[]> {
  try {
    const res = await fetchWithAuth(TRAINER_ENDPOINTS.TRAINERS_ALL);
    const data = await res.json();

    try {
      const trainers: Trainer[] = TrainerListResponseSchema.parse(data);

      return trainers;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getTrainersService error:", err);
    throw err;
  }
}

export async function addTrainerService(
  trainer: CreateTrainerDTO
): Promise<Trainer> {
  // Validación de entrada
  const parseResult = TrainerRequestSchema.safeParse(trainer);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del entrenador inválidos");
  }

  const validTrainer = parseResult.data;

  try {
    // Enviar el cuerpo validado al backend
    const res = await fetchWithAuth(TRAINER_ENDPOINTS.TRAINERS_ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validTrainer),
    });

    const data = await res.json();

    // Validar respuesta del servidor
    const trainer: Trainer = TrainerResponseSchema.parse(data);
    return trainer;
  } catch (err) {
    console.error("addTrainerService error:", err);
    throw new Error("Error al agregar entrenador");
  }
}

export async function updateTrainerService(
  selectedTrainerId: number,
  trainer: EditTrainerDTO
): Promise<Trainer> {
  console.log("servicio put")
  const parsedForm = TrainerRequestSchema.safeParse(trainer);

  if (!parsedForm.success) {
    console.error("TrainerRequestSchema validation failed:", parsedForm.error.format());
    throw new Error("Datos del entrenador inválidos");
  }

  const filteredForm = removeEmptyFields(parsedForm.data);

  try {
    const res = await fetchWithAuth(TRAINER_ENDPOINTS.TRAINERS_EDIT + selectedTrainerId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm),
    });

    const data = await res.json();
   
    // Validar respuesta del servidor
    const updatedTrainer: Trainer = TrainerResponseSchema.parse(data);
    return updatedTrainer;
  } catch (err) {
    console.error("updateTrainerService error:", err);
    throw new Error("Error al actualizar entrenador");
  }
}

export async function deleteTrainerService(id: number): Promise<number> {
  // Aquí normalmente harías un DELETE
  return id;
}
