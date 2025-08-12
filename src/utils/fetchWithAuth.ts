export default async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Si la sesión expiró
  if (res.status === 401) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Sesión expirada. Redireccionando al login.");
  }

  if (!res.ok) {
    let message = `Error ${res.status}`;
    try {
      const errorBody = await res.json();
      // Soporte para estructuras { detail: "..."} o { message: "..." }
      message = errorBody?.detail || errorBody?.message || message;
    } catch {
      // Si no se puede parsear, dejamos el genérico
    }

    const error = new Error(message);
    (error as any).status = res.status;
    throw error;
  }

  return res;
}