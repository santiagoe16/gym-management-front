import React from "react";
import {
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import ReusableTable from "../ReusableTable";
import { VerticalDotsIcon, SearchIcon, PlusIcon } from "../Icons";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

const columns = [
  { name: "PRODUCTO", uid: "name", sortable: true },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "CANTIDAD", uid: "quantity", sortable: true },
  { name: "GIMNASIO", uid: "gym.name", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

interface ProductsTableProps {
  products: Product[];
  handleOpen: (product?: Product) => void;
  handleDeleteClick: (product: Product) => void;
}

export default function ProductsTable({
  products,
  handleOpen,
  handleDeleteClick,
}: ProductsTableProps) {
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
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit" onClick={() => handleOpen(product)}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  onClick={() => handleDeleteClick(product)}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
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
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={<PlusIcon />}
              onPress={() => handleOpen()}
            >
              Agregar Nuevo
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {products.length} productos
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, products.length, handleOpen]);

  return (
    <ReusableTable<Product>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}
