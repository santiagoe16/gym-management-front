"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logoLine from "../../public/logoLinefit.png";
import logoLine2 from "../../public/logoLinefit2.png";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { useGyms } from "@/hooks/useGym/useGyms";
import { Button, Input, Select, SelectItem } from "@heroui/react";

export default function LoginView() {
  const { gyms, loading, error: gymError, getGyms } = useGyms();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGymId) {
      setError("Por favor selecciona un gimnasio.");
      return;
    }

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
      await login(email, password, selectedGymId);
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión. Intenta de nuevo.");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <div className="grow px-8 flex flex-col xl:flex-row justify-center items-center container mx-auto">
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
            <form
              noValidate
              onSubmit={handleSubmit}
              className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"
            >
              <div className="flex flex-col w-full mb-2">
                { gymError ? (
                  <p className="text-red-500 text-sm">{gymError}</p>
                ) : (
                  <Select
                    label="Gimnasio"
                    isLoading={loading}
                    placeholder="Selecciona un gimnasio"
                    selectedKeys={selectedGymId ? [String(selectedGymId)] : []}
                    onSelectionChange={(keys) => {
                      const key = Array.from(keys)[0];
                      setSelectedGymId(Number(key));
                    }}
                    className="w-full"
                  >
                    {gyms.map((gym) => (
                      <SelectItem key={gym.id} textValue={gym.name}>
                        {gym.name} - {gym.address}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              </div>

              <div className="flex flex-col w-full mb-2">
                <Input
                  label={<span className="text-gray-900 font-medium">Correo electrónico</span>}
                  labelPlacement="outside"
                  size={"lg"}
                  placeholder="ingresa tu correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <Input
                  label={<span className="text-gray-900 font-medium">Contraseña</span>}
                  labelPlacement="outside"
                  size={"lg"}
                  placeholder="ingresa tu contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

              <Button
                type="submit"
                className="uppercase w-full h-[40px] mt-6 mb-2 bg-blue-600 hover:bg-blue-700  text-white py-2  rounded-[8px]"
              >
                Iniciar sesión
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
