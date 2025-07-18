import  User  from "@/types/user";

// Servicio para manejar usuarios usando mocks
export async function getUsersService(): Promise<User[]> {
  const res = await fetch("/mocks/users.json");
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
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