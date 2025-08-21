import React from "react";
import ReusableTable from "../ReusableTable";
import type { Attendance } from "@/types/activity";
import { utcToColombiaDate, utcToColombiaTime } from "@/utils/formatDate";
import { User as HeroUser } from "@heroui/user";
import { Button } from "@heroui/button";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { VerticalDotsIcon } from "../Icons";
import Link from "next/link";

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
}

export default function AttendanceTable({ attendance }: AttendanceTableProps) {
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
            <HeroUser
              name={cellValue as string}
              description={record.user.documentId}
            />
          );
        case "planName":
          console.log(record);
          return record.user.activePlan?.plan.name || "Sin plan";

        case "expiresAt":
          return record.user.activePlan?.expiresAt
            ? utcToColombiaDate(record.user.activePlan.expiresAt)
            : "Sin fecha";

        case "checkInTime":
          return utcToColombiaTime(record.checkInTime as string);

        case "checkInDate":
          return utcToColombiaDate(record.checkInTime as string);

        case "recordedBy.fullName":
          return record.recordedBy.fullName;

        case "actions":
          return <Link className="text-blue-500 hover:underline" href={`/admin/users/${record.user.id}`}>Ver</Link>;

        default:
          return cellValue as React.ReactNode;
      }
    },
    []
  );

  return (
    <ReusableTable<Attendance>
      columns={columns}
      data={attendance}
      renderCell={renderCell}
    />
  );
}
