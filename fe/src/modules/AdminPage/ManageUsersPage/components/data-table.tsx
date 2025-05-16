"use client";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
} from "@tanstack/react-table";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/common/components/ui/table";

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [globalFilter, setGlobalFilter] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, columnId, filterValue) => {
            const value = row.getValue(columnId) as string;
            if (!value) return false;
            return value.toLowerCase().includes(filterValue.toLowerCase());
        },
        state: {
            sorting,
            columnFilters,
            rowSelection,
            globalFilter,
        },
    });

    // Update page number state when table pagination changes
    const currentPage = table.getState().pagination.pageIndex + 1;
    if (pageNumber !== currentPage) {
        setPageNumber(currentPage);
    }

    return (
        <div>
            <div className="flex items-center gap-2 py-4">
                <div className="relative w-full max-w-sm">
                    <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                    <Input
                        placeholder="Search by name or email..."
                        value={globalFilter}
                        onChange={(event) =>
                            setGlobalFilter(event.target.value)
                        }
                        className="pl-8"
                    />
                </div>
                <Select
                    value={
                        (table.getColumn("role")?.getFilterValue() as string) ??
                        ""
                    }
                    onValueChange={(value: string) => {
                        table
                            .getColumn("role")
                            ?.setFilterValue(
                                value === "all" ? undefined : value,
                            );
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All roles" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All roles</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Mentor">Mentor</SelectItem>
                        <SelectItem value="Learner">Learner</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    value={
                        (table
                            .getColumn("status")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onValueChange={(value: string) => {
                        table
                            .getColumn("status")
                            ?.setFilterValue(
                                value === "all" ? undefined : value,
                            );
                    }}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All statuses" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All statuses</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Deactivated">Deactivated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex items-center space-x-2">
                    <Select
                        value={`${table.getState().pagination.pageSize}`}
                        onValueChange={(value: string) => {
                            table.setPageSize(Number(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue
                                placeholder={
                                    table.getState().pagination.pageSize
                                }
                            />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">First page</span>
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className="sr-only">Previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from(
                                { length: Math.min(5, table.getPageCount()) },
                                (_, i) => {
                                    // Logic to show pagination numbers centered around current page
                                    let pageIndex = 0;
                                    const currentPageIndex =
                                        table.getState().pagination.pageIndex;
                                    const pageCount = table.getPageCount();

                                    if (pageCount <= 5) {
                                        // Show all pages if 5 or fewer
                                        pageIndex = i;
                                    } else if (currentPageIndex < 3) {
                                        // At start, show first 5 pages
                                        pageIndex = i;
                                    } else if (
                                        currentPageIndex >
                                        pageCount - 4
                                    ) {
                                        // At end, show last 5 pages
                                        pageIndex = pageCount - 5 + i;
                                    } else {
                                        // In middle, show 2 before and 2 after current
                                        pageIndex = currentPageIndex - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageIndex}
                                            variant={
                                                currentPageIndex === pageIndex
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className="h-8 w-8 p-0"
                                            onClick={() =>
                                                table.setPageIndex(pageIndex)
                                            }
                                        >
                                            <span>{pageIndex + 1}</span>
                                        </Button>
                                    );
                                },
                            )}
                        </div>

                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
