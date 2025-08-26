import React from "react";
import ReusableTable from "../ReusableTable";
import type { Sale } from "@/types/activity";
import { formatCurrency } from "@/utils/formatCurrency";
import { colombiaISOToColombiaDate } from "@/utils/formatDate";
import { PaymentTypeLabels } from "@/types/paymentType";

const columns = [
  { name: "PRODUCTO", uid: "product.name" },
  { name: "PRECIO", uid: "price" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "TOTAL", uid: "totalAmount" },
  { name: "PAGO", uid: "paymentType" },
  { name: "VENDEDOR", uid: "soldBy.fullName" },
  { name: "FECHA", uid: "saleDate" },
  { name: "GIMNASIO", uid: "gym.name" },

];

interface SalesTableProps {
  sales: Sale[];
  date?: boolean;
}

export default function SalesTable({ sales, date = true }: SalesTableProps) {
  const filteredColumns = date
  ? columns
  : columns.filter((col) => col.uid !== "saleDate");

  const renderCell = React.useCallback((sale: Sale, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes(".")
      ? columnKey
          .toString()
          .split(".")
          .reduce((acc: any, key: string) => (acc ? acc[key] : ""), sale)
      : sale[columnKey as keyof Sale];

    switch (columnKey) {
      case "price":
        return formatCurrency(sale.unitPrice);

      case "totalAmount":
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
            {PaymentTypeLabels[cellValue as keyof typeof PaymentTypeLabels] ||
              "N/A"}
          </span>
        );
      case "saleDate":
        return colombiaISOToColombiaDate(cellValue as string);
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  return (
    <ReusableTable<Sale>
      columns={filteredColumns}
      data={sales}
      renderCell={renderCell}
    />
  );
}
