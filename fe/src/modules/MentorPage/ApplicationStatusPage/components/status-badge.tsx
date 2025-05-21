import React from "react";

import { Badge } from "@/common/components/ui/badge";
import { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

type StatusBadgeProps = {
    status: ApplicationStatus;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const variants = {
        [ApplicationStatus.PENDING]:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        [ApplicationStatus.UNDER_REVIEW]:
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        [ApplicationStatus.APPROVED]:
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        [ApplicationStatus.REJECTED]:
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    const statusLabels = {
        [ApplicationStatus.PENDING]: "Pending",
        [ApplicationStatus.UNDER_REVIEW]: "Under Review",
        [ApplicationStatus.APPROVED]: "Approved",
        [ApplicationStatus.REJECTED]: "Rejected",
    };

    return <Badge className={variants[status]}>{statusLabels[status]}</Badge>;
};

export default StatusBadge;
