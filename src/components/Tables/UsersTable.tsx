import React from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Chip } from "@heroui/chip";
import { User as HeroUser } from "@heroui/user";
import ReusableTable from "../ReusableTable";
import { capitalize } from "@/utils/stringUtils";
import {
  PlusIcon,
  VerticalDotsIcon,
  SearchIcon,
  ChevronDownIcon,
} from "../Icons";
import type { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { colombiaISOToColombiaDate } from "@/utils/formatDate";

const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" },
];

interface UsersTableProps {
  users: User[];
  handleOpen: (user?: User) => void;
  handleDeleteClick?: (user: User) => void;
  role: "admin" | "trainer";
}

export default function UsersTable({
  users,
  handleOpen,
  handleDeleteClick,
  role,
}: UsersTableProps) {
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<any>("all");
  const router = useRouter();

  const isAdmin = role === "admin";

  const columns = React.useMemo(() => [
    { name: "NOMBRE", uid: "fullName", sortable: true },
    { name: "CÉDULA", uid: "documentId" },
    { name: "CELULAR", uid: "phoneNumber" },
    { name: "PLAN", uid: "activePlan" },
    { name: "INICIO PLAN", uid: "activePlan.purchasedAt" },
    { name: "VIGENCIA", uid: "activePlan.expiresAt" },
    { name: "GIMNASIO", uid: "gym" },
    ...(isAdmin ? [{ name: "ESTADO", uid: "status" }] : []),
    { name: "ACCIONES", uid: "actions" },
  ], [isAdmin]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.fullName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      isAdmin &&
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(
          user.activePlan ? "active" : "inactive"
        )
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, isAdmin]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "fullName":
        return (
          <div style={{ display: "inline-flex", minWidth: "220px" }}>
            <HeroUser name={cellValue as string} description={user.documentId} />
          </div>
        );
      case "activePlan":
        return user.activePlan ? user.activePlan.plan.name : "Inactivo";
      case "gym":
        return user.gym.name;
      case "status":
        return (
          <Chip
            className="capitalize"
            color={user.activePlan ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.activePlan ? "Activo" : "Inactivo"}
          </Chip>
        );
      case "activePlan.purchasedAt":
      case "activePlan.expiresAt":
        return user.activePlan
          ? colombiaISOToColombiaDate(user.activePlan?.expiresAt as string)
          : "Inactivo";
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
                <DropdownItem
                  key="view"
                  onClick={() => router.push(`/${role}/users/${user.id}`)}
                >
                  Ver
                </DropdownItem>
                <DropdownItem key="edit" onClick={() => handleOpen(user)}>
                  Editar
                </DropdownItem>
                                {isAdmin ? (
                  <DropdownItem
                    key="delete"
                    onClick={() => handleDeleteClick && handleDeleteClick(user)}
                    className="text-danger"
                    color="danger"
                  >
                    Eliminar
                  </DropdownItem>
                ) : null}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue as React.ReactNode;
    }
  }, [isAdmin, role, router, handleOpen, handleDeleteClick]);

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
            className="w-full sm:max-w-[44%] "
            variant="faded"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {isAdmin ? (
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            ) : null}
            <Button
              color="primary"
              startContent={<PlusIcon />}
              onPress={() => handleOpen()}
            >
              {isAdmin ? "Agregar Nuevo" : "Agregar Usuario"}
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
  }, [filterValue, statusFilter, onSearchChange, users.length, handleOpen, isAdmin]);

  return (
    <ReusableTable<User>
      columns={columns}
      data={filteredItems}
      renderCell={renderCell}
      topContent={topContent}
    />
  );
}
