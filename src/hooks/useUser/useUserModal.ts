import { useState, useCallback, useEffect, useRef } from "react";
import { addUserService, updateUserService } from "@/services/userService";
import { usePlans } from "../usePlan/usePlans";
import { useGyms } from "../useGym/useGyms";
import { User, CreateUserDTO } from "@/types/user";
import { PaymentType } from "@/types/paymentType";
import { mapUserToCreateDTO } from "@/utils/mappers";

export function useUserModal(getUsers?: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const initialForm: CreateUserDTO = {
    email: "",
    fullName: "",
    documentId: "",
    phoneNumber: "",
    planId: 0,
    gymId: 0,
    paymentType: PaymentType.CASH,
  };

  const [form, setForm] = useState(initialForm);

  const { plans, loading: plansLoading, error: plansError } = usePlans();
  const { gyms, loading: gymsLoading, error: gymsError } = useGyms();

  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false; 
    };
  }, []);

  const handleOpen = useCallback((editData?: User) => {
    setOpen(true);
    if (editData) {
      setForm(mapUserToCreateDTO(editData));
      setEditId(editData.id);
      setMode("edit");
    } else {
      setForm(initialForm);
      setMode("add");
      setEditId(null);
    }
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setForm(initialForm);
    setMode("add");
    setEditId(null);
    setError(null);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({
        ...prev,
        [name]: name === "gymId" || name === "planId" ? Number(value) : value,
      }));
    },
    []
  );

  const saveUser = useCallback(
    async (user: CreateUserDTO) => {
      setLoading(true);
      setError(null);
      try {
        if (mode === "add") {
          await addUserService(user);
        } else if (mode === "edit" && editId) {
          await updateUserService(editId, user);
        }
        getUsers?.();
        if (isMountedRef.current) {
          handleClose();
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setError(err.message || "Error en la operación");
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [mode, editId, getUsers, handleClose]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      saveUser(form);
    },
    [saveUser, form]
  );

  return {
    open,
    mode,
    form,
    loading,
    error,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  };
}
