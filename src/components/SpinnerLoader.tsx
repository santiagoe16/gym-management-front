import { Spinner } from "@heroui/spinner";

interface SpinnerLoaderProps {
  className?: string;
}

export default function SpinnerLoader({ className }: SpinnerLoaderProps) {
  const containerClassName = className || "flex items-center justify-center h-[80vh]";

  return (
    <div className={containerClassName}>
      <Spinner
        color="primary"
        size="lg"
        classNames={{
          circle1: "w-24 h-24 border-[7px]",
          circle2: "w-24 h-24 border-[7px]",
        }}
      />
    </div>
  );
}
