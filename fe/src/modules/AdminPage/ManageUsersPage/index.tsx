import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import type { User } from "./types";

export default function ManageUsersPage() {
    const data: User[] = [
        {
            id: "1",
            name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            role: "Admin",
            status: "Active",
            joinDate: new Date("2023-01-15"),
            lastActive: new Date("2023-06-20"),
        },
        {
            id: "2",
            name: "Trần Thị B",
            email: "tranthib@example.com",
            role: "Mentor",
            status: "Active",
            joinDate: new Date("2023-02-10"),
            lastActive: new Date("2023-06-18"),
        },
        {
            id: "3",
            name: "Lê Văn C",
            email: "levanc@example.com",
            role: "Learner",
            status: "Pending",
            joinDate: new Date("2023-03-05"),
            lastActive: new Date("2023-06-15"),
        },
        {
            id: "4",
            name: "Phạm Thị D",
            email: "phamthid@example.com",
            role: "Learner",
            status: "Deactivated",
            joinDate: new Date("2023-01-20"),
            lastActive: new Date("2023-03-10"),
        },
        {
            id: "5",
            name: "Hoàng Văn E",
            email: "hoangvane@example.com",
            role: "Mentor",
            status: "Active",
            joinDate: new Date("2023-02-15"),
            lastActive: new Date("2023-06-19"),
        },
        {
            id: "6",
            name: "Vũ Thị F",
            email: "vuthif@example.com",
            role: "Learner",
            status: "Active",
            joinDate: new Date("2023-03-10"),
            lastActive: new Date("2023-06-17"),
        },
        {
            id: "7",
            name: "Đặng Văn G",
            email: "dangvang@example.com",
            role: "Learner",
            status: "Active",
            joinDate: new Date("2023-04-05"),
            lastActive: new Date("2023-06-16"),
        },
        {
            id: "8",
            name: "Bùi Thị H",
            email: "buithih@example.com",
            role: "Mentor",
            status: "Pending",
            joinDate: new Date("2023-04-15"),
            lastActive: new Date("2023-05-20"),
        },
        {
            id: "9",
            name: "Ngô Văn I",
            email: "ngovani@example.com",
            role: "Learner",
            status: "Deactivated",
            joinDate: new Date("2023-01-25"),
            lastActive: new Date("2023-02-28"),
        },
        {
            id: "10",
            name: "Đinh Thị K",
            email: "dinhthik@example.com",
            role: "Mentor",
            status: "Active",
            joinDate: new Date("2023-02-20"),
            lastActive: new Date("2023-06-21"),
        },
        {
            id: "11",
            name: "Dương Văn L",
            email: "duongvanl@example.com",
            role: "Learner",
            status: "Active",
            joinDate: new Date("2023-03-15"),
            lastActive: new Date("2023-06-22"),
        },
        {
            id: "12",
            name: "Lý Thị M",
            email: "lythim@example.com",
            role: "Learner",
            status: "Pending",
            joinDate: new Date("2023-05-10"),
            lastActive: new Date("2023-06-15"),
        },
    ];

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
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}
