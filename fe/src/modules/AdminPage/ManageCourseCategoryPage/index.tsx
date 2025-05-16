import type { ColumnDef, Row } from "@tanstack/react-table";
import { Pencil, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/common/components/dialog/confirm-dialog";
import SearchInput from "@/common/components/input/search-input";
import DataTable from "@/common/components/table/data-table";
import DataTableColumnHeader from "@/common/components/table/data-table-column-header";
import DataTablePagination from "@/common/components/table/data-table-pagination";
import TableTopBar from "@/common/components/table/data-table-topbar";
import { Button } from "@/common/components/ui/button";
import { type QueryParameters, defaultQuery } from "@/common/types/query";
import {
    type ConfirmDialogState,
    FormMode,
    type FormSetting,
    confirmDialogStateDefault,
    formSettingDefault,
} from "@/common/types/ui";

import { columnBase } from "./components/columns";
import FormDetails from "./components/form-details";
import courseCategoryService from "./services/courseCategoryService";
import type { CourseCategoryRequest } from "./types/course-request";
import {
    type CourseCategoryDetailResponse,
    type CourseCategoryResponse,
    defaultCourseCategoryDetail,
} from "./types/course-response";

export default function ManageCourseCategoryPage() {
    const [data, setData] = useState<CourseCategoryResponse[]>([]);
    const [query, setQuery] = useState<QueryParameters>(defaultQuery);
    const [tableLoading, setTableLoading] = useState<boolean>(false);
    const [totalCount, setTotalCount] = useState(0);
    const [detail, setDetail] = useState<CourseCategoryDetailResponse>(
        defaultCourseCategoryDetail,
    );
    const [formSetting, setFormSetting] =
        useState<FormSetting>(formSettingDefault);
    const [openDeleteDialog, setOpenDeleteDialog] =
        useState<ConfirmDialogState>(confirmDialogStateDefault);

    const columns: ColumnDef<CourseCategoryResponse>[] = [
        ...columnBase,
        {
            id: "actions",
            header: ({ column }) => (
                <DataTableColumnHeader
                    className="mr-22 text-end"
                    column={column}
                    title="Action"
                />
            ),
            cell: ({ row }) => (
                <div className="flex justify-end space-x-2">
                    <Button
                        onClick={() => handleFormAction(FormMode.EDIT, row)}
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 py-0"
                    >
                        <Pencil size={14} className="mr-1" />
                        Edit
                    </Button>
                    <Button
                        onClick={() =>
                            setOpenDeleteDialog({
                                open: true,
                                id: row.original.id,
                                name: row.original.name,
                            })
                        }
                        variant="outline"
                        size="sm"
                        className="h-8 px-2 py-0"
                    >
                        <Trash size={14} className="mr-1" />
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        handleGetList();
    }, [query]);

    const handleGetList = () => {
        setTableLoading(true);
        courseCategoryService
            .getAll(query)
            .then((res) => {
                console.log("res: ", res);
                setData(res.data?.items ?? []);
                setTotalCount(res.data?.totalCount ?? 0);
            })
            .finally(() => setTableLoading(false));
    };

    const handleSearch = (search: string) => {
        setQuery({ ...query, pageNumber: 1, search: search });
    };

    const handleFormAction = (
        mode: FormMode,
        row?: Row<CourseCategoryResponse>,
    ) => {
        if (mode == FormMode.ADD) {
            setDetail(defaultCourseCategoryDetail);
        } else if (row && mode == FormMode.EDIT) {
            const id = row.original.id;
            courseCategoryService.getById(id).then((res) => {
                if (res.data) setDetail(res.data);
            });
        }
        setFormSetting({
            mode: mode,
            open: true,
        });
    };

    const handleFormSubmit = (data: CourseCategoryRequest) => {
        if (formSetting.mode == FormMode.ADD) {
            courseCategoryService.create(data).then((res) => {
                toast.success(res.data);
                handleGetList();
            });
        } else if (formSetting.mode == FormMode.EDIT) {
            courseCategoryService.update(detail!.id, data).then((res) => {
                toast.success(res.data);
                handleGetList();
            });
        }
        setFormSetting({ ...formSetting, open: false });
    };

    //DELETE HANDLER
    const handleConfirmDelete = () => {
        courseCategoryService.delete(openDeleteDialog.id).then((res) => {
            toast.success(res.data);
            handleGetList();
        });
        setOpenDeleteDialog({ ...openDeleteDialog, open: false });
    };

    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <TableTopBar
                title="Course Category"
                subtitle="Here's a list of category"
            >
                <Button
                    onClick={() => handleFormAction(FormMode.ADD)}
                    className="space-x-1"
                >
                    <span>Create</span>
                    <Plus size={18} />
                </Button>
            </TableTopBar>

            <div className="flex space-x-3">
                <SearchInput onSearch={handleSearch} />
            </div>
            <div className="space-y-4">
                <DataTable
                    data={data}
                    columns={columns}
                    loading={tableLoading}
                />
                <DataTablePagination
                    pageSizeList={[5, 8, 10]}
                    pageSize={query?.pageSize}
                    pageNumber={query?.pageNumber}
                    totalRecords={totalCount}
                    onPageNumberChanged={(pageNumber: number) =>
                        setQuery({ ...query, pageNumber: pageNumber })
                    }
                    onPageSizeChanged={(pageSize: number) =>
                        setQuery({
                            ...query,
                            pageNumber: 1,
                            pageSize: pageSize,
                        })
                    }
                />
            </div>
            <FormDetails
                title="Course Category"
                data={detail}
                onSubmit={handleFormSubmit}
                formSetting={formSetting}
                setFormSetting={setFormSetting}
            />

            <ConfirmDialog
                destructive
                open={openDeleteDialog.open}
                onOpenChange={(v) =>
                    setOpenDeleteDialog({ ...openDeleteDialog, open: v })
                }
                handleConfirm={handleConfirmDelete}
                className="max-w-md"
                title={`Delete this category: ${openDeleteDialog.name} ?`}
                desc={
                    <>
                        You are about to delete a category with the name{" "}
                        <strong>{openDeleteDialog.name}</strong>. <br />
                        This action cannot be undone.
                    </>
                }
                confirmText="Delete"
            />
        </div>
    );
}
