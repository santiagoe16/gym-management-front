"use client";
import Image from "next/image";
import { UserMeasurements } from "@/types/measurements";
import useMeasurementForm from "@/hooks/useMeasurements/useMeasurementForm";

type Props = {
  userMeasurements?: UserMeasurements;
  getUserMeasurements: () => void;
  userId: number;
};

export default function BodyMeasurementsDisplay({
  userMeasurements,
  getUserMeasurements,
  userId,
}: Props) {
  const { form, handleChange, handleSubmit } = useMeasurementForm({
    userMeasurements,
    getUserMeasurements,
    userId,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 overflow-x-hidden">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Medidas Corporales Actuales(Cm)
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-[300px] sm:max-w-[600px] h-[400px] sm:h-[800px]">
            <Image
              src="/body.png"
              alt="Cuerpo humano"
              fill
              className="object-contain pointer-events-none z-0"
              priority
            />

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[20%] left-[57%] lg:top-[22%] lg:left-[57%]"
            >
              <svg className="lg:w-32 lg:h-10 w-12 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
              <span className="mr-1">Pecho:</span>
              <input
                type="number"
                name="chest"
                id="chest"
                value={form.chest}
                onChange={handleChange}
                className="measurements-input"
              />
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[27%] left-[67%] lg:top-[28%] lg:left-[67%]"
            >
              <svg className="lg:w-32 lg:h-10 w-12 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
              <span className="mr-1">Bíceps:</span>
              <input
                type="number"
                name="bicepsRight"
                id="bicepsRight"
                value={form.bicepsRight}
                onChange={handleChange}
                className="measurements-input"
              />
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[35%] left-[70%] lg:top-[36%] lg:left-[70%]"
            >
              <svg className="lg:w-32 lg:h-10 w-6 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
              <span className="mr-1">Antebrazo:</span>
              <input
                type="number"
                name="forearmsRight"
                id="forearmsRight"
                value={form.forearmsRight}
                onChange={handleChange}
                className="measurements-input"
              />
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[53%] left-[60%] lg:top-[53%] lg:left-[60%]"
            >
              <svg className="lg:w-32 lg:h-10 w-16 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
              <span className="mr-1">Muslo</span>
              <input
                type="number"
                name="thighsRight"
                id="thighsRight"
                value={form.thighsRight}
                onChange={handleChange}
                className="measurements-input"
              />
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[73%] left-[60%] lg:top-[75%] lg:left-[61%]"
            >
              <svg className="lg:w-32 lg:h-10 w-10 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
              <span className="mr-1">Pantorrilla</span>
              <input
                type="number"
                name="calvesRight"
                id="calvesRight"
                value={form.calvesRight}
                onChange={handleChange}
                className="measurements-input"
              />
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[26%] left-[-4%] lg:top-[28%] lg:left-[-2%]"
            >
              <span className="mr-1">Bíceps:</span>
              <input
                type="number"
                name="bicepsLeft"
                id="bicepsLeft"
                value={form.bicepsLeft}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-30 lg:h-10 w-10 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[34%] left-[-10%] lg:top-[36%] lg:left-[-15%]"
            >
              <span className="mr-1">Antebrazo:</span>
              <input
                type="number"
                name="forearmsLeft"
                id="forearmsLeft"
                value={form.forearmsLeft}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-46 lg:h-10 w-8 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
            </div>

            {/* Abdomen */}
            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[41%] left-[-10%] lg:top-[40%] lg:left-[0%]"
            >
              <span className="mr-1">Abdomen:</span>
              <input
                type="number"
                name="abdomen"
                id="abdomen"
                value={form.abdomen}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-40 lg:h-10 w-22 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                  transform="rotate(-9 0 20)"
                />
              </svg>
            </div>

            {/* Caderas */}
            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[48%] left-[-10%] lg:top-[47%] lg:left-[0%]"
            >
              <span className="mr-1">Caderas:</span>
              <input
                type="number"
                name="hips"
                id="hips"
                value={form.hips}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-40 lg:h-10 w-22 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                  transform="rotate(-7 0 20)"
                />
              </svg>
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[55%] left-[-10%] lg:top-[54%] lg:left-[0%]"
            >
              <span className="mr-1">Muslo:</span>
              <input
                type="number"
                name="thighsLeft"
                id="thighsLeft"
                value={form.thighsLeft}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-40 lg:h-10 w-22 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                  transform="rotate(-4 0 20)"
                />
              </svg>
            </div>

            <div
              className="absolute text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center top-[73%] left-[-8%] lg:top-[75%] lg:left-[2%]"
            >
              <span className="mr-1">Pantorrilla:</span>
              <input
                type="number"
                name="calvesLeft"
                id="calvesLeft"
                value={form.calvesLeft}
                onChange={handleChange}
                className="measurements-input"
              />
              <svg className="lg:w-34 lg:h-10 w-12 h-8">
                <line
                  x1="0"
                  y1="50%"
                  x2="93%"
                  y2="50%"
                  stroke="#474646"
                  className="stroke-[#474646] stroke-[2] lg:stroke-[4]"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center align-middle gap-4 mt-6 px-4">
          <div className=" text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center">
            <span className="mr-1">Peso: (kg):</span>
            <input
              type="number"
              name="weight"
              id="weight"
              value={form.weight}
              onChange={handleChange}
              className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-14 h-10 p-3"
            />
          </div>
          <div className=" text-black-600 text-xs lg:text-sm lg:font-semibold flex items-center">
            <span className="mr-1">Altura: (Cm):</span>
            <input
              type="number"
              name="height"
              id="height"
              value={form.height}
              onChange={handleChange}
              className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-14 h-10 p-3"
            />
          </div>
        </div>

        <div className=" text-black-600 text-xs lg:text-sm lg:font-semibold flex flex-col items-center justify-center mt-6">
          <span className="mr-1">Notas::</span>
          <textarea
            name="notes"
            id="notes"
            value={form.notes}
            onChange={handleChange}
            className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-70 h-20 p-3"
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 btn-primary transition-colors font-medium"
          >
            Agregar Nueva Medición
          </button>
        </div>
      </form>
    </div>
  );
}
