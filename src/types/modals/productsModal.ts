import { Product } from "../product";

export default interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  form: Product;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  mode?: "add" | "edit";
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}