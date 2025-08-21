import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import ReusableTable from "../ReusableTable";
import {
  PlusIcon,
  VerticalDotsIcon,
  SearchIcon,
  ChevronDownIcon,
} from "../Icons";
import type { Plan } from "@/types/plan";
import { formatCurrency } from "@/utils/formatCurrency";

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "GIMNASIO", uid: "gym" },
  { name: "DURACIÓN (días)", uid: "duration", sortable: true },
  { name: "TAQUILLERA", uid: "taquillera" },
  { name: "ACCIONES", uid: "actions" },
];

interface PlansTableProps {
  plans: Plan[];
  handleOpen: (plan?: Plan) => void;
  handleDeleteClick: (plan: Plan) => void;
}

export default function PlansTable({
  plans,
  handleOpen,
  handleDeleteClick,
}: PlansTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredPlans = [...plans];

    if (hasSearchFilter) {
      filteredPlans = filteredPlans.filter((plan) =>
        plan.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredPlans;
  }, [plans, filterValue]);

  const renderCell = React.useCallback((plan: Plan, columnKey: React.Key) => {
    const cellValue = plan[columnKey as keyof Plan];

    switch (columnKey) {
      case "gym":
        if (!plan.gym) return "Sin gimnasio asignado";
        return plan.gym.name;
      
      case "duration":
        return plan.durationDays;

      case "price":
        return formatCurrency(plan.price);

      case "taquillera":
        return plan.days 
        
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
                <DropdownItem key="edit" onClick={() => handleOpen(plan)}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  onClick={() => handleDeleteClick(plan)}
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
            variant="faded"
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
            Total {plans.length} planes
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, plans.length, handleOpen]);

  return (
    <ReusableTable<Plan>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}