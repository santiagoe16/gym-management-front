import User from "@/types/user";
import UserMeasurements from "@/types/user"
import fetchWithAuth from "@/utils/fetchWithAuth"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Servicio para manejar usuarios usando mocks
export async function getUsersService(): Promise<User[]> {
  const res = await fetchWithAuth(`${API_URL}/api/v1/users/`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
}

export async function getUserByIdService(id: number): Promise<UserMeasurements | null> {
  try {
    const res = await fetch("/mocks/usersmeasurements.json");
    if (!res.ok) throw new Error("Error al obtener usuarios");

    const users: UserMeasurements[] = await res.json();

    const user = users.find((user) => user.id === id);
    return user || null;
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return null;
  }
}

export async function addUserService(user: User): Promise<User> {
  // Aquí normalmente harías un POST
  return { ...user, id: Date.now() };
}

export async function updateUserService(user: User): Promise<User> {
  // Aquí normalmente harías un PUT/PATCH
  return user;
}

export async function deleteUserService(id: number): Promise<number> {
  // Aquí normalmente harías un DELETE
  return id;
}
