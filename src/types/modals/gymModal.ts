import Gym from "@/types/gym";

export interface GymModalProps {
  open: boolean;
  onClose: () => void;
  form: Gym;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  mode?: "add" | "edit";
  loading?: boolean;
  error?: string | null;
}
