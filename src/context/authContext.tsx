// components/AuthProvider.tsx
"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { UserAutenticate } from "@/types/user";
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
    localStorage.setItem("token", data.access_token);

    if (data.user.role == "trainer") {
      router.push("/trainer/users");
    } else {
      router.push("/admin/users");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
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
