import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { ActionCell } from "./action-cell";

import type { User } from "../types";

export const columns: ColumnDef<User>[] = [
    {
        id: "index",
        header: "No.",
        cell: ({ row }) => <div>{row.index + 1}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="dark:text-gray-200">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="dark:text-gray-200">{row.getValue("email")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="dark:text-gray-200">{row.getValue("role")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        status === "Active"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : status === "Pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        accessorKey: "joinDate",
        header: "Join Date",
        cell: ({ row }) => {
            const joinDate = row.getValue("joinDate") as Date;
            return (
                <div className="dark:text-gray-200">
                    {format(joinDate, "dd/MM/yyyy")}
                </div>
            );
        },
    },
    {
        accessorKey: "lastActive",
        header: "Last Active",
        cell: ({ row }) => {
            const lastActive = row.getValue("lastActive") as Date;
            return (
                <div className="dark:text-gray-200">
                    {format(lastActive, "dd/MM/yyyy")}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            return <ActionCell user={user} />;
        },
    },
];
