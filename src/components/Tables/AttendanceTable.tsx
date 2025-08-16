import React from "react";
import ReusableTable from "../ReusableTable";
import type { Attendance } from "@/types/activity";
import { utcToColombiaDate, utcToColombiaTime } from "@/utils/formatDate";

const columns = [
  { name: "USUARIO", uid: "user.fullName" },
  { name: "HORA", uid: "checkInTime" },
  { name: "REGISTRADO POR", uid: "recordedBy.fullName" },
  { name: "FECHA", uid: "checkInDate" },
];

interface AttendanceTableProps {
  attendance: Attendance[];
}

export default function AttendanceTable({ attendance }: AttendanceTableProps) {
  const renderCell = React.useCallback((record: Attendance, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.')
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', record)
      : record[columnKey as keyof Attendance];

    switch (columnKey) {
      case "checkInTime":
        return utcToColombiaTime(record.checkInTime as string);
      case "checkInDate":
        return utcToColombiaDate(record.checkInTime as string);
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <ReusableTable<Attendance>
      columns={columns}
      data={attendance}
      renderCell={renderCell}
    />
  );
}
