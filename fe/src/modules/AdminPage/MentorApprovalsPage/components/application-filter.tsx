import { Filter, Search } from "lucide-react";
import React from "react";

import { Input } from "@/common/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

type ApplicationFilterProps = {
    statusFilter: string;
    searchQuery: string;
    onFilterChange: (value: string) => void;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ApplicationFilter: React.FC<ApplicationFilterProps> = ({
    statusFilter,
    searchQuery,
    onFilterChange,
    onSearchChange,
}) => {
    return (
        <div className="mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex w-full items-center gap-2 sm:w-auto">
                <Filter size={16} />
                <Select value={statusFilter} onValueChange={onFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Applications</SelectItem>
                        <SelectItem
                            value={ApplicationStatus.PENDING.toString()}
                        >
                            Pending
                        </SelectItem>
                        <SelectItem
                            value={ApplicationStatus.UNDER_REVIEW.toString()}
                        >
                            Under Review
                        </SelectItem>
                        <SelectItem
                            value={ApplicationStatus.APPROVED.toString()}
                        >
                            Approved
                        </SelectItem>
                        <SelectItem
                            value={ApplicationStatus.REJECTED.toString()}
                        >
                            Rejected
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="relative w-full sm:w-auto">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                    type="search"
                    placeholder="Search applications..."
                    className="w-full pl-8 sm:w-[300px]"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </div>
        </div>
    );
};

export default ApplicationFilter;
