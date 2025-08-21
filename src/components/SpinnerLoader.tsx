import { Spinner } from "@heroui/spinner";

export default function SpinnerLoader() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <Spinner
        color="primary"
        size="lg"
        classNames={{ // tamaño del contenedor
          circle1: "w-24 h-24 border-[7px]", // círculo interno
          circle2: "w-24 h-24 border-[7px]", // círculo interno
        }}
      />
    </div>
  );
}
