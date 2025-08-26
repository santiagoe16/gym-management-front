import {Gym} from "@/types/gym"
import  {CreateUserDTO, User}  from "@/types/user";
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
  editUser?: User | null;
  plans: Plan[];
  plansLoading: boolean;
  plansError: string | null;
  gyms: Gym[];
  gymsLoading: boolean;
  gymsError: string | null;
  error: string | null;
}
