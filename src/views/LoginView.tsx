"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logoLine from "../../public/logoLinefit.png";
import logoLine2 from "../../public/logoLinefit2.png";
import Image from "next/image";
import { useAuth } from "@/context/authContext";

export default function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor llena todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Formato de correo electrónico invalido.");
      return;
    }

    setError("");

    try {
      await login(email, password);
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="flex-grow px-8 flex flex-col xl:flex-row justify-center items-center container mx-auto">
        <div className="w-full lg:w-1/2 xl:mb-0 lg:mb-16 mb-10 flex justify-center items-center">
          <Image
            src={logoLine2}
            className=" w-auto md:max-w-[550px] h-auto "
            alt="Line fitness logo"
            priority
          />
        </div>

        {/* Contenedor del Formulario */}
        <div className="w-full z-10 lg:w-1/2 flex justify-start items-center">
          <div className="w-full flex justify-center ">
            <form noValidate onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
              <div className="flex flex-col w-full mb-2">
                <label htmlFor="email" className="mb-2 text-gray-900 font-medium">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Escribe tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="mb-2 text-gray-900 font-medium">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  placeholder="Escribe tu confirmación"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-1">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="uppercase w-full h-[40px] mt-6 mb-2 bg-blue-600 hover:bg-blue-700  text-white py-2  rounded-[8px]"
              >
                Iniciar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
