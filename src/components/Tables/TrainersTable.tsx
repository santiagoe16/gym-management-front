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
import type { Trainer } from "@/types/trainer";

const columns = [
  { name: "NOMBRE", uid: "fullName", sortable: true },
  { name: "CÉDULA", uid: "documentId" },
  { name: "CELULAR", uid: "phoneNumber" },
  { name: "HORARIO DE ENTRADA", uid: "scheduleStart" },
  { name: "HORARIO DE SALIDA", uid: "scheduleEnd" },
  { name: "GIMNASIO", uid: "gym.name", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

interface TrainersTableProps {
  trainers: Trainer[];
  handleOpen: (trainer?: Trainer) => void;
  handleDeleteClick: (trainer: Trainer) => void;
}

export default function TrainersTable({
  trainers,
  handleOpen,
  handleDeleteClick,
}: TrainersTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredTrainers = [...trainers];

    if (hasSearchFilter) {
      filteredTrainers = filteredTrainers.filter((trainer) =>
        trainer.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredTrainers;
  }, [trainers, filterValue]);

  const renderCell = React.useCallback((trainer: Trainer, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.') 
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', trainer)
      : trainer[columnKey as keyof Trainer];

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
                <DropdownItem key="edit" onClick={() => handleOpen(trainer)}>
                  Editar
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  onClick={() => handleDeleteClick(trainer)}
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
              Agregar Entrenador
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {trainers.length} entrenadores
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, trainers.length, handleOpen]);

  return (
    <ReusableTable<Trainer>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}
