import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { DropdownTrigger, Dropdown, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import ReusableTable from "../ReusableTable";
import { VerticalDotsIcon, SearchIcon, PlusIcon } from "../Icons";
import type { User } from "@/types/user";
import { utcToColombiaDate } from "@/utils/formatDate";
import Link from "next/link";

const columns = [
  { name: "NOMBRE", uid: "fullName", sortable: true },
  { name: "CEDULA", uid: "documentId" },
  { name: "CELULAR", uid: "phoneNumber" },
  { name: "PLAN", uid: "activePlan.plan.name", sortable: true },
  { name: "INICIO PLAN", uid: "activePlan.purchasedAt", sortable: true },
  { name: "VIGENCIA", uid: "activePlan.expiresAt", sortable: true },
  { name: "GIMNASIO", uid: "gym.name", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

interface TrainerUsersTableProps {
  users: User[];
  handleOpen: (user?: User) => void;
}

export default function TrainerUsersTable({
  users,
  handleOpen,
}: TrainerUsersTableProps) {
  const [filterValue, setFilterValue] = React.useState("");

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = columnKey.toString().includes('.') 
      ? columnKey.toString().split('.').reduce((acc: any, key: string) => acc ? acc[key] : '', user)
      : user[columnKey as keyof User];

    switch (columnKey) {
      case "activePlan.purchasedAt":
      case "activePlan.expiresAt":
        return cellValue ? utcToColombiaDate(cellValue as string) : "Inactivo";
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
                <DropdownItem key="edit" onClick={() => handleOpen(user)}>
                  Editar
                </DropdownItem>
                <DropdownItem key="measurements" onClick={() => handleOpen(user)}>
                  Medidas
                </DropdownItem>
                <DropdownItem key="view" as={Link} href={`users/${user.id}`}>
                  Ver usuario
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
              Agregar Usuario
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} usuarios
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, users.length, handleOpen]);

  return (
    <ReusableTable<User>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}
