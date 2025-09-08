import React from "react";
import ReusableTable from "../ReusableTable";
import type { Attendance } from "@/types/activity";
import { colombiaISOToColombiaDate, colombiaISOToColombiaTime } from "@/utils/formatDate";
import { User as HeroUser } from "@heroui/user";
import Link from "next/link";
import { Eye } from "lucide-react";

const columns = [
  { name: "USUARIO", uid: "user.fullName" },
  { name: "HORA", uid: "checkInTime" },
  { name: "PLAN", uid: "planName" },
  { name: "Vigencia", uid: "expiresAt" },
  { name: "REGISTRADO POR", uid: "recordedBy.fullName" },
  { name: "FECHA", uid: "checkInDate" },
  { name: "ACCIONES", uid: "actions" },
];

interface AttendanceTableProps {
  attendance: Attendance[];
  role: "admin" | "trainer";
}

export default function AttendanceTable({ attendance, role }: AttendanceTableProps) {
  const renderCell = React.useCallback(
    (record: Attendance, columnKey: React.Key) => {
      const cellValue = columnKey.toString().includes(".")
        ? columnKey
            .toString()
            .split(".")
            .reduce((acc: any, key: string) => (acc ? acc[key] : ""), record)
        : record[columnKey as keyof Attendance];

      switch (columnKey) {
        case "user.fullName":
          return (
            <div style={{ display: "inline-flex", minWidth: "220px" }}>
              <HeroUser
                name={cellValue as string}
                description={record.user.documentId}
              />
            </div>
          );
        case "planName":
          return record.user.activePlan?.plan.name || "Sin plan";

        case "expiresAt":
          return record.user.activePlan?.expiresAt
            ? colombiaISOToColombiaDate(record.user.activePlan.expiresAt)
            : "Sin fecha";

        case "checkInTime":
          return colombiaISOToColombiaTime(record.checkInTime as string);

        case "checkInDate":
          return colombiaISOToColombiaDate(record.checkInTime as string);

        case "recordedBy.fullName":
          return record.recordedBy.fullName;

        case "actions":
          return <Link href={`/${role}/users/${record.user.id}`}><Eye strokeWidth={1.8} /></Link>;

        default:
          return cellValue as React.ReactNode;
      }
    },
    [role]
  );

  return (
    <ReusableTable<Attendance>
      columns={columns}
      data={attendance}
      renderCell={renderCell}
    />
  );
}
