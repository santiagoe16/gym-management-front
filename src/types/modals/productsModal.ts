import { Gym } from "../gym";
import { Product, CreateProductDTO } from "../product";

export default interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  form: CreateProductDTO;
  loading?: boolean;
  error?: string | null;
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