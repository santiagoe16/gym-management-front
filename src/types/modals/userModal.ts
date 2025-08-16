import {Gym} from "@/types/gym"
import  {CreateUserDTO}  from "@/types/user";
import {Plan} from "@/types/plan"

export default interface UserModalProps {
  open: boolean;
  onClose: () => void;
  form: CreateUserDTO;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  mode?: "add" | "edit";
  plans: Plan[];
  plansLoading: boolean;
  plansError: string | null;
  gyms: Gym[];
  gymsLoading: boolean;
  gymsError: string | null;
  highlightPlan?: boolean;
}
