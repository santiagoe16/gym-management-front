import {Gym} from "@/types/gym";
import {CreatePlanDTO} from "@/types/plan";

export default interface PlanModaltype {
  open: boolean;
  onClose: () => void;
  form: CreatePlanDTO;
  loading: boolean;
  error: string | null;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode?: "add" | "edit";
  gyms?: Gym[];             
  gymsLoading?: boolean;
  gymsError?: string | null;
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}
