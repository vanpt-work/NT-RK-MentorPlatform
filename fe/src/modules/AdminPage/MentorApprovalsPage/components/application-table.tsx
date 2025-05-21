import { Eye } from "lucide-react";
import React from "react";

import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/common/components/ui/table";
import StatusBadge from "@/modules/MentorPage/ApplicationStatusPage/components/status-badge";

import type { MentorApplication } from "../types";

type ApplicationTableProps = {
    applications: MentorApplication[];
    onViewDetails: (application: MentorApplication) => void;
};

export const ApplicationTable: React.FC<ApplicationTableProps> = ({
    applications,
    onViewDetails,
}) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Expertise</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applications.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                className="text-muted-foreground py-8 text-center"
                            >
                                No applications found
                            </TableCell>
                        </TableRow>
                    ) : (
                        applications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell className="font-medium">
                                    {application.name}
                                </TableCell>
                                <TableCell>{application.email}</TableCell>
                                <TableCell>{application.appliedDate}</TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {application.expertise
                                            .slice(0, 2)
                                            .map((skill, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="outline"
                                                    className="mr-1"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        {application.expertise.length > 2 && (
                                            <Badge variant="outline">
                                                +
                                                {application.expertise.length -
                                                    2}
                                            </Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={application.status} />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            onViewDetails(application)
                                        }
                                    >
                                        <Eye size={16} className="mr-2" />
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicationTable;
