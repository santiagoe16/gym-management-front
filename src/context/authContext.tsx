"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { UserAutenticate } from "@/types/auth";
import { loginService } from "@/services/authService";

type AuthContextType = {
  user: UserAutenticate | null;
  login: (email: string, password: string, gymId: number) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserAutenticate | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Verifica si ya hay usuario autenticado al cargar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, gym_id: number) => {
    const data = await loginService({ email, password, gym_id });

    setUser(data.user);

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.accessToken);

    if (data.user.role == "trainer") {
      router.push("/trainer/users");
    } else {
      router.push("/admin/users");
    }
  };

  const logout = () => {
    try {
      // Limpiar estado del usuario
      setUser(null);
      
      // Limpiar localStorage de forma segura
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      
      // Limpiar cualquier otro dato sensible que pueda existir
      localStorage.removeItem("gymId");
      localStorage.removeItem("userRole");
      
      // Limpiar sessionStorage también por seguridad
      sessionStorage.clear();
      
      // Forzar redirección y reemplazo del historial para evitar volver atrás
      router.replace("/login");
      
      // Opcional: Recargar la página para limpiar cualquier estado residual
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
      
    } catch (error) {
      console.error("Error durante el logout:", error);
      // En caso de error, forzar redirección
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return context;
};
