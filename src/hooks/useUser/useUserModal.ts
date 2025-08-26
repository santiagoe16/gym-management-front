import { useState, useCallback, useEffect, useRef } from "react";
import { addUserService, updateUserService } from "@/services/userService";
import { usePlans } from "../usePlan/usePlans";
import { useGyms } from "../useGym/useGyms";
import { User, CreateUserDTO } from "@/types/user";
import { PaymentType } from "@/types/paymentType";
import { mapUserToCreateDTO } from "@/utils/mappers";
import { addToast } from "@heroui/toast";

export function useUserModal(getUsers?: () => void) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

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
      setEditUser(editData);
      console.log("editData", editData);
      setMode("edit");
    } else {
      setForm(initialForm);
      setMode("add");
      setEditUser(null);
    }
  }, []);

  const handleClose = useCallback(() => {
    console.log("Modal closed");
    setForm(initialForm);
    setMode("add");
    setEditUser(null);
    setError(null);
    setOpen(false);
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
          const userAdded = await addUserService(user);
          console.log("userAdded", userAdded);
          setLoading(false);

          addToast({ title: "Usuario agregado", description: "El usuario ha sido agregado exitosamente", color: "success" });
          handleOpen(userAdded);

        } else if (mode === "edit" && editUser) {
          await updateUserService(editUser.id, user);
        }
        getUsers?.();
      } catch (err: any) {
        if (isMountedRef.current) {
          const errorMessage = err.response?.data?.detail || err.message || "Error en la operación";
          setError(errorMessage);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [mode, editUser, getUsers]
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
    editUser,
    plans,
    plansLoading,
    plansError,
    gyms,
    gymsLoading,
    gymsError,
  };
}
