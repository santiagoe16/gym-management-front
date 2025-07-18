import Gym from "@/types/gym"
import  User  from "@/types/user";
import Plan from "@/types/plan"

export default interface UserModalProps {
  open: boolean;
  onClose: () => void;
  form: User;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode?: "add" | "edit";
  plans: Plan[];
  plansLoading: boolean;
  plansError: string | null;
  gyms: Gym[];
  gymsLoading: boolean;
  gymsError: string | null;
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}