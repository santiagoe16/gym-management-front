import { useEffect, useMemo, useState } from "react";
import { UserMeasurements, CreateMeasurementsDTO } from "@/types/measurements";
import { addUserMeasurementsService } from "@/services/measurementsService";
import { useAuth } from "@/context/authContext";

type UseMeasurementFormParams = {
  userMeasurements?: UserMeasurements;
  getUserMeasurements: () => void;
  userId: number;
};

export default function useMeasurementForm({
  userMeasurements,
  getUserMeasurements,
  userId,
}: UseMeasurementFormParams) {
  const initialForm: CreateMeasurementsDTO = useMemo(
    () => ({
      userId: userId,
      weight: "",
      height: "",
      chest: "",
      shoulders: "",
      bicepsRight: "",
      bicepsLeft: "",
      forearmsLeft: "",
      forearmsRight: "",
      abdomen: "",
      hips: "",
      thighsLeft: "",
      thighsRight: "",
      calvesLeft: "",
      calvesRight: "",
      notes: "",
    } as any), // Bypassing type check for initial form state
    [userId]
  );
  const authenticateUser = useAuth();
  const [form, setForm] = useState<CreateMeasurementsDTO>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userMeasurements) {
      setForm({
        userId: userId,
        weight: userMeasurements.weight,
        height: userMeasurements.height,
        chest: userMeasurements.chest,
        shoulders: userMeasurements.shoulders,
        bicepsRight: userMeasurements.bicepsRight,
        bicepsLeft: userMeasurements.bicepsLeft,
        forearmsLeft: userMeasurements.forearmsLeft,
        forearmsRight: userMeasurements.forearmsRight,
        abdomen: userMeasurements.abdomen,
        hips: userMeasurements.hips,
        thighsLeft: userMeasurements.thighsLeft,
        thighsRight: userMeasurements.thighsRight,
        calvesLeft: userMeasurements.calvesLeft,
        calvesRight: userMeasurements.calvesRight,
        notes: userMeasurements.notes || "",
      });
    }
  }, [userMeasurements]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: ["userId", "recordedById"].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authenticateUser.user) return;
    setLoading(true);
    setError(null);
    try {
      await addUserMeasurementsService(form, authenticateUser.user?.gymId);
      getUserMeasurements();
    } catch (err: any) {
      setError(err?.message || "Ocurrió un error al guardar las medidas.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    handleChange,
    handleSubmit,
  };
}
