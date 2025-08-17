import { addToast, Button, cn } from "@heroui/react";
import { User } from "@/types/user";
import { colombiaISOToColombiaDate } from "@/utils/formatDate";
import getRemainingDays from "@/utils/getRemainingDays";

export default function ShowToast({ user }: { user: User }) {
  return addToast({
    title: `Ingreso exitoso, ${user.fullName}!`,
    description: (
      <div className="flex flex-col">
        {user.activePlan?.plan.name && (
          <span>Plan: {user.activePlan.plan.name}</span>
        )}
        {user.activePlan?.expiresAt && (
          <span>
            Expira: {colombiaISOToColombiaDate(user.activePlan.expiresAt)} (
            {getRemainingDays(user.activePlan.expiresAt)} días restantes)
          </span>
        )}
      </div>
    ),
    timeout: 10000,
    color: "success",
    classNames: {
      base: cn([
        "bg-default-50 shadow-sm",
        "border border-l-8 rounded-md rounded-l-none",
        "flex flex-col items-start",
        "border-green-200 border-l-green-500",
      ]),
      icon: "w-6 h-6 fill-current",
    },
    endContent: <div className="ms-11 my-2 flex gap-x-2"></div>,
  });
}
