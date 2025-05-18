import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { useEffect, useState } from "react";

import DataTable from "@/common/components/table/data-table";
import DataTablePagination from "@/common/components/table/data-table-pagination";
import { userServices } from "@/common/services/userServices";

import { ActionCell } from "./components/action-cell";
import type { User } from "./types";

const getRoleString = (role: number) => {
    switch (role) {
        case 0:
            return "Admin";
        case 1:
            return "Learner";
        case 2:
            return "Mentor";
    }
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="dark:text-gray-200">
                {row.original.userDetail.fullName}
            </div>
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
            <div className="dark:text-gray-200">
                {getRoleString(row.original.role)}
            </div>
        ),
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("isActive") as boolean;
            return (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        status
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : // : status === "Pending"
                              //   ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                              "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
                >
                    {status ? "Active" : "Deactivated"}
                </span>
            );
        },
    },
    {
        accessorKey: "createdAt",
        header: "Join Date",
        cell: ({ row }) => {
            const joinDate = new Date(row.getValue("createdAt"));
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
            const lastActive = new Date(row.getValue("lastActive"));
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

function useUsers(pageNumber: number = 1, pageSize: number = 10) {
    const [users, setUsers] = useState<User[]>([]);
    const [totalUserCount, setTotalUserCount] = useState(0);

    useEffect(() => {
        async function fetchUsers() {
            const result = await userServices.get(pageNumber, pageSize);
            setUsers(result.data?.items || []);
            setTotalUserCount(result.data?.totalCount || 0);
        }

        fetchUsers();
    }, [pageSize, pageNumber]);

    return { users, totalUserCount };
}

export default function ManageUsersPage() {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const { users, totalUserCount } = useUsers(pageNumber, pageSize);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Users Management
                    </h1>
                    <p className="text-gray-500">
                        Manage users roles and permissions on the platform
                    </p>
                </div>
            </div>

            <div className="rounded-lg border shadow-sm">
                <div className="border-b px-6 py-5">
                    <h2 className="text-xl font-semibold">Users List</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage all users on the system and change their roles,
                        status
                    </p>
                </div>
                <div className="p-6">
                    <DataTable data={users} columns={columns} />
                    <div className="mt-4">
                        <DataTablePagination
                            pageSizeList={[5, 8, 10]}
                            pageSize={pageSize}
                            pageNumber={pageNumber}
                            totalRecords={totalUserCount}
                            onPageNumberChanged={setPageNumber}
                            onPageSizeChanged={(pageSize: number) => {
                                setPageSize(pageSize);
                                setPageNumber(1);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
