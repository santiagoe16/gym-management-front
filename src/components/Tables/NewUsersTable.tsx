import React from "react";
import ReusableTable from "../ReusableTable";
import type { NewUser } from "@/types/activity";
import { utcToColombiaDate } from "@/utils/formatDate";

const columns = [
  { name: "NOMBRE", uid: "fullName" },
  { name: "DOCUMENTO", uid: "documentId" },
  { name: "GIMNASIO", uid: "gym.name" },
  { name: "FECHA", uid: "createdAt" },
];

interface NewUsersTableProps {
  newUsers: NewUser[];
}

export default function NewUsersTable({ newUsers }: NewUsersTableProps) {
  const renderCell = React.useCallback((user: NewUser, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.')
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', user)
      : user[columnKey as keyof NewUser];

    switch (columnKey) {
      case "createdAt":
        return utcToColombiaDate(cellValue as string);
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <ReusableTable<NewUser>
      columns={columns}
      data={newUsers}
      renderCell={renderCell}
    />
  );
}
