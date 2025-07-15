import Gym from "@/types/gym"

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  form: {
    name: string;
    cedula: string;
    phone: string;
    plan: string;
    gym: import("@/types/gym").Gym;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode?: "add" | "edit";
  plans: import("@/services/plansService").Plans[];
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