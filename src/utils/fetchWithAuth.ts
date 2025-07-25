export default async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

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
      message = errorBody?.message || message;
    } catch (_) {
      // ignore parse error, keep generic message
    }
    const error = new Error(message);
    (error as any).status = res.status;
    throw error;
  }

  return res;
}
