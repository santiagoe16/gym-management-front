import React from "react";
import {
  Input,
} from "@heroui/input";
import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {Button} from "@heroui/button";
import ReusableTable from "../ReusableTable";
import { VerticalDotsIcon, SearchIcon, PlusIcon } from "../Icons";
import type { Gym } from "@/types/gym";

const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DIRECCIÓN", uid: "address" },
  { name: "ACCIONES", uid: "actions" },
];

interface GymsTableProps {
  gyms: Gym[];
  handleOpen: (gym?: Gym) => void;
  handleDeleteClick: (gym: Gym) => void;
}

export default function GymsTable({
  gyms,
  handleOpen,
  handleDeleteClick,
}: GymsTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredGyms = [...gyms];

    if (hasSearchFilter) {
      filteredGyms = filteredGyms.filter((gym) =>
        gym.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredGyms;
  }, [gyms, filterValue]);

  const renderCell = React.useCallback((gym: Gym, columnKey: React.Key) => {
    const cellValue = gym[columnKey as keyof Gym];

    switch (columnKey) {
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
                <DropdownItem key="edit" onClick={() => handleOpen(gym)}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  onClick={() => handleDeleteClick(gym)}
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
            variant="faded"
          />
          <div className="flex gap-3">
            <Button
              color="primary"
              startContent={<PlusIcon />}
              onPress={() => handleOpen()}
            >
              Agregar Gimnasio
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {gyms.length} gimnasios
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, gyms.length, handleOpen]);

  return (
    <ReusableTable<Gym>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}