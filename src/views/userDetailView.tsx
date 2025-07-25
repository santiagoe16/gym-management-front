"use client";
import Image from "next/image";
import { useUsers } from "@/hooks/useUser/useUsers";
import { getUserByIdService } from "@/services/userService";
import { useEffect, useState } from "react";
import UserMeasurements from "@/types/user";

type Props = {
  userId: number;
};

export default function UserDetailView({ userId }: Props) {
  const [user, setUser] = useState<UserMeasurements | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserByIdService(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <p>Cargando...</p>;

  const m = user.measurements;

  return (
    <main className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Medidas de {user.name}</h1>

      <div className="relative w-full max-w-[600px] h-[800px]">
        <Image
          src="/body.png"
          alt="Cuerpo humano"
          fill
          className="object-contain"
          priority
        />
        <div
          className="absolute text-black-600 text-sm font-semibold flex items-center"
          style={{ top: "28%", left: "67%" }}
        >
          <svg className="w-32 h-10">
            <line
              x1="0"
              y1="50%"
              x2="93%"
              y2="50%"
              stroke="#474646"
              strokeWidth="4"
            />
          </svg>
          <span className="ml-2 mr-2 text-[17px]">cm</span>
          <input
            type="bicep"
            name="bicep"
            id="bicep"
            value={m.bicep === 0 ? "" : m.bicep}
            // onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-10 p-2"
            required
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div
          className="absolute text-black-600 text-sm font-semibold flex items-center"
          style={{ top: "36%", left: "70%" }}
        >
          <svg className="w-32 h-10">
            <line
              x1="0"
              y1="50%"
              x2="93%"
              y2="50%"
              stroke="#474646"
              strokeWidth="4"
            />
          </svg>
          <span className="ml-2 mr-2 text-[17px]">cm</span>
          <input
            type="number"
            name="forearm"
            id="forearm"
            value={m.forearm === 0 ? "" : m.forearm}
            // onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-10 p-2"
            required
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div
          className="absolute text-black-600 text-sm font-semibold flex items-center"
          style={{ top: "40%", left: "0%", transform: "rotate(0deg)" }}
        >
          <span className="mr-2 text-[17px]">cm</span>
          <input
            type="number"
            name="abdomen"
            id="abdomen"
            value={m.abdomen === 0 ? "" : m.abdomen}
            // onChange={onChange}
            className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-10 p-2"
            required
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <svg className="w-40 h-10">
            <line
              x1="0"
              y1="50%"
              x2="93%"
              y2="50%"
              stroke="#474646"
              strokeWidth="4"
            />
          </svg>
        </div>
        <div
          className="absolute text-black-600 text-sm font-semibold flex items-center"
          style={{ top: "54%", left: "0%", transform: "rotate(0deg)" }}
        >
          <span className="mr-2 text-[17px]">cm</span>
          <input
            type="number"
            name="glutes"
            id="glutes"
            value={m.glutes === 0 ? "" : m.glutes}
            // onChange={onChange}
            className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-16 h-10 p-2"
            required
            onKeyDown={(e) => {
              if (["e", "E", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
          <svg className="w-40 h-10">
            <line
              x1="0"
              y1="50%"
              x2="93%"
              y2="50%"
              stroke="#474646"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
