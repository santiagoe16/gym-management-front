import {CreateTrainerDTO} from "@/types/trainer";
import {Gym} from "@/types/gym";

export default interface TrainerModalProps {
    open: boolean;
    onClose: () => void;
    form: CreateTrainerDTO;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    mode: "add" | "edit";
    loading: boolean;
    error: string | null;
    gyms: Gym[];
    gymsLoading: boolean;
    gymsError: string | null;
  }
  