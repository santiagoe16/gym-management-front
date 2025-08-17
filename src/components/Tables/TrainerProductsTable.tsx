import React from "react";
import {
  Input,
} from "@heroui/react";
import ReusableTable from "../ReusableTable";
import { SearchIcon } from "../Icons";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

const columns = [
  { name: "PRODUCTO", uid: "name", sortable: true },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "CANTIDAD", uid: "quantity", sortable: true },
  { name: "GIMNASIO", uid: "gym.name", sortable: true },
];

interface TrainerProductsTableProps {
  products: Product[];
}

export default function TrainerProductsTable({
  products,
}: TrainerProductsTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [products, filterValue]);

  const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.') 
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', product)
      : product[columnKey as keyof Product];

    switch (columnKey) {
      case "price":
        return formatCurrency(cellValue as number);
      default:
        return cellValue as React.ReactNode;
    }
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            variant="faded"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} productos
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, products.length]);

  return (
    <ReusableTable<Product>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}
