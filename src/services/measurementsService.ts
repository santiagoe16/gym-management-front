import { MEASUREMENTS_ENDPOINTS } from "@/constants/apiEndopoints";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { UserMeasurements, CreateMeasurementsDTO } from "@/types/measurements";
import {
  UserMeasurementsListSchema,
  UserMeasurementsResponseSchema,
  UserMeasurementsRequestSchema,
} from "@/schemas/measurements.schemas";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

export async function getUserMeasurementsService(
  id: number
): Promise<UserMeasurements[]> {
  try {
    const res = await fetchWithAuth(
      MEASUREMENTS_ENDPOINTS.MEASUREMENTS_ID_ALL + id
    );
    const data = await res.json();

    try {
      const Measurements: UserMeasurements[] =
        UserMeasurementsListSchema.parse(data);
      return Measurements;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getUserMeasurementsService error:", err);
    throw err;
  }
}

export async function addUserMeasurementsService(
  measurements: CreateMeasurementsDTO,
  gymId: number
): Promise<UserMeasurements> {
  // Validación de entrada
  const parseResult = UserMeasurementsRequestSchema.safeParse(measurements);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos de medidas inválidos");
  }

  const validMeasurements = parseResult.data;

  try {
    // Enviar el cuerpo validado al backend
    const res = await fetchWithAuth(
      MEASUREMENTS_ENDPOINTS.MEASUREMENTS_ADD + "?gym_id=" + gymId,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validMeasurements),
      }
    );

    const data = await res.json();

    // Validar respuesta del servidor
    const addedMeasurements: UserMeasurements =
      UserMeasurementsResponseSchema.parse(data);
    return addedMeasurements;
  } catch (err) {
    console.error("addUserMeasurementsService error:", err);
    throw new Error("Error al agregar medidas de usuario");
  }
}

export async function updateUserMeasurementsService(
  id: number,
  measurements: CreateMeasurementsDTO
): Promise<UserMeasurements> {
  const parseResult = UserMeasurementsRequestSchema.safeParse(measurements);

  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos de las medidas de usuario inválidos");
  }

  const filteredForm = removeEmptyFields(parseResult.data);

  try {
    const res = await fetchWithAuth(
      MEASUREMENTS_ENDPOINTS.MEASUREMENTS_UPDATE + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filteredForm),
      }
    );

    const data = await res.json();

    // Validar respuesta del servidor
    const updatedMeasurements: UserMeasurements =
      UserMeasurementsResponseSchema.parse(data);
    return updatedMeasurements;
  } catch (err) {
    console.error("updateUserMeasurementsService error:", err);
    throw new Error("Error al actualizar las medidas");
  }
}

export async function deleteUserMeasurementsService(
  id: number
): Promise<number> {
  const res = await fetchWithAuth(
    MEASUREMENTS_ENDPOINTS.MEASUREMENTS_DELETE + id,{
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive: false }),
  });

  if (!res.ok) {
    console.log(res);
    const errorBody = await res.json();
    console.error("Código de error:", res.status);
    throw new Error(errorBody.datail || `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.message;
}
