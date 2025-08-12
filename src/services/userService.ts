import { CreateUserDTO, User } from "@/types/user";
import {UserMeasurements} from "@/types/measurements";
import fetchWithAuth from "@/utils/fetchWithAuth";
import { USER_ENDPOINTS } from "@/constants/apiEndopoints";
import { UserListResponseSchema, UserRequestSchema, UserResponseSchema } from "@/schemas/user.schemas";
import { removeEmptyFields } from "@/utils/removeEmptyFields";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Servicio para manejar usuarios usando mocks
export async function getUsersService(): Promise<User[]> {
  const res = await fetchWithAuth(USER_ENDPOINTS.USERS_ALL);
  const data = await res.json();

  try {
    return UserListResponseSchema.parse(data);
  } catch {
    throw new Error("Respuesta del servidor inválida");
  }
}

export async function getUserByIdService(
  id: number
): Promise<User> {
  try {
    const res = await fetchWithAuth(USER_ENDPOINTS.USER_BY_ID + id);
    const data = await res.json();

    try {
      const user: User = UserResponseSchema.parse(data);
      return user;
    } catch (err) {
      throw new Error("Error al parsear la respuesta del servidor");
    }
  } catch (err) {
    console.error("getUserByIdService error:", err);
    throw err;
  }
}

export async function addUserService(
  user: CreateUserDTO
): Promise<User> {
  // Validación de entrada
  const parseResult = UserRequestSchema.safeParse(user);
  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del entrenador inválidos");
  }

  const validUser = parseResult.data;

  try {
    // Enviar el cuerpo validado al backend
    const res = await fetchWithAuth(USER_ENDPOINTS.USERS_ADD, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validUser),
    });

    const data = await res.json();

    // Validar respuesta del servidor
    const addedUser: User = UserResponseSchema.parse(data);
    return addedUser;
  } catch (err) {
    console.error("addUserService error:", err);
    throw new Error("Error al agregar entrenador");
  }
}

export async function updateUserService(
  selectedUserId: number,
  user: CreateUserDTO
): Promise<User> {
  console.log("Updating user with ID:", selectedUserId);
  const parseResult = UserRequestSchema.safeParse(user);

  if (!parseResult.success) {
    console.log(parseResult.error.issues);
    throw new Error("Datos del usuario inválidos");
  }

  const filteredForm = removeEmptyFields(parseResult.data);
  
  try {
    const res = await fetchWithAuth(USER_ENDPOINTS.USERS_UPDATE + selectedUserId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredForm),
    });

    const data = await res.json();
   
    // Validar respuesta del servidor
    const updatedUser: User = UserResponseSchema.parse(data);
    return updatedUser;
  } catch (err) {
    console.error("updateUserService error:", err);
    throw new Error("Error al actualizar usuario");
  }
}

export async function deleteUserService(id: number): Promise<number> {
  const res = await fetchWithAuth(USER_ENDPOINTS.USERS_DELETE + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ is_active: false }),
  });

  if (!res.ok) {
    console.log(res)
    const errorBody = await res.json();
    console.error("Código de error:", res.status);
    throw new Error(errorBody.datail || `Error HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.message;
}

