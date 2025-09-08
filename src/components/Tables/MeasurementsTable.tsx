import React from "react";
import ReusableTable from "../ReusableTable";
import { UserMeasurements } from "@/types/measurements";
import { utcToColombiaDate } from "@/utils/formatDate";

interface MeasurementsTableProps {
  userMeasurements: UserMeasurements[];
}

export default function MeasurementsTable({ userMeasurements }: MeasurementsTableProps) {
  const columns = React.useMemo(() => [
    { name: "FECHA", uid: "measurementDate", sortable: true },
    { name: "PESO (KG)", uid: "weight" },
    { name: "ALTURA (CM)", uid: "height" },
    { name: "PECHO (CM)", uid: "chest" },
    { name: "HOMBROS (CM)", uid: "shoulders" },
    { name: "BICEPS D. (CM)", uid: "bicepsRight" },
    { name: "BICEPS I. (CM)", uid: "bicepsLeft" },
    { name: "ANTEBRAZO D. (CM)", uid: "forearmsRight" },
    { name: "ANTEBRAZO I. (CM)", uid: "forearmsLeft" },
    { name: "ABDOMEN (CM)", uid: "abdomen" },
    { name: "CADERAS (CM)", uid: "hips" },
    { name: "MUSLO D. (CM)", uid: "thighsRight" },
    { name: "MUSLO I. (CM)", uid: "thighsLeft" },
    { name: "PANTORRILLA D. (CM)", uid: "calvesRight" },
    { name: "PANTORRILLA I. (CM)", uid: "calvesLeft" },
    { name: "REGISTRADO POR", uid: "recordedBy" },
    { name: "NOTAS", uid: "notes" },
  ], []);

  const renderCell = React.useCallback((measurement: UserMeasurements, columnKey: React.Key) => {
    switch (columnKey) {
      case "measurementDate":
        return utcToColombiaDate(measurement.measurementDate);
      case "recordedBy":
        return measurement.recordedBy.fullName;
      case "notes":
        return measurement.notes || "-";
      default:
        const cellValue = measurement[columnKey as keyof UserMeasurements];
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <ReusableTable<UserMeasurements>
      columns={columns}
      data={userMeasurements}
      renderCell={renderCell}
    />
  );
}
