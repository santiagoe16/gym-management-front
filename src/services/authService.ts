import { RegisterData } from "@/types/auth";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { AUTH_ENDPOINTS } from "@/constants/apiEndopoints";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerUserService(data: RegisterData) {
  const response = await fetch(`${API_URL}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password: data.password,
      confirm_password: data.confirmPassword,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    //Lanza un error con el mensaje del backend si existe
    throw new Error(
      resData?.error || resData?.message || "Error al registrar usuario"
    );
  }

  return resData;
}

export async function loginService(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(AUTH_ENDPOINTS.lOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  }
  export async function logout(): Promise<void> {}

