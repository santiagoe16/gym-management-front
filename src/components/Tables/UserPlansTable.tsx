import React from "react";
import ReusableTable from "../ReusableTable";
import type { UserPlan } from "@/types/activity";
import { formatCurrency } from "@/utils/formatCurrency";
import { utcToColombiaDate } from "@/utils/formatDate";
import { PaymentTypeLabels } from "@/types/paymentType";

const columns = [
  { name: "CLIENTE", uid: "user.fullName" },
  { name: "PLAN", uid: "plan.name" },
  { name: "PRECIO", uid: "plan.price" },
  { name: "PAGO", uid: "paymentType" },
  { name: "VENDEDOR", uid: "createdBy.fullName" },
  { name: "FECHA", uid: "createdAt" },
];

interface UserPlansTableProps {
  userPlans: UserPlan[];
  date?: boolean;
}

export default function UserPlansTable({ userPlans, date = true }: UserPlansTableProps) {
  const filteredColumns = date
    ? columns
    : columns.filter((col) => col.uid !== "createdAt");

  const renderCell = React.useCallback((userPlan: UserPlan, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.') 
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', userPlan)
      : userPlan[columnKey as keyof UserPlan];

    switch (columnKey) {
      case "plan.price":
        return formatCurrency(cellValue as number);
      case "paymentType":
        return (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              cellValue === "cash"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {PaymentTypeLabels[cellValue as keyof typeof PaymentTypeLabels] || "N/A"}
          </span>
        );
      case "createdAt":
        return utcToColombiaDate(cellValue as string);
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <ReusableTable<UserPlan>
      columns={filteredColumns}
      data={userPlans}
      renderCell={renderCell}
    />
  );
}
