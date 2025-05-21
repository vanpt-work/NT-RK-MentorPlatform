import { Check, Eye, FileText, RefreshCw, X } from "lucide-react";
import React from "react";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/common/components/ui/avatar";
import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";
import StatusBadge from "@/modules/MentorPage/ApplicationStatusPage/components/status-badge";
import { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

import type { Document, MentorApplication } from "../types";

type ApplicationDetailsProps = {
    application: MentorApplication;
    onPreviewDocument: (document: Document) => void;
    onRequestUpdate: () => void;
    onApprove: () => void;
    onReject: () => void;
};

export const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
    application,
    onPreviewDocument,
    onRequestUpdate,
    onApprove,
    onReject,
}) => {
    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="space-y-4">
            {/* Applicant Information Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Applicant Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                        <Avatar className="h-20 w-20">
                            {application.avatarUrl ? (
                                <AvatarImage
                                    src={application.avatarUrl}
                                    alt={application.name}
                                />
                            ) : (
                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                    {getInitials(application.name)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-xl font-semibold">
                                {application.name}
                            </h2>
                            <p className="text-muted-foreground mb-3 text-sm">
                                {application.email}
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                                {application.expertise.map((skill, index) => (
                                    <Badge key={index} variant="secondary">
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="text-right">
                            <StatusBadge status={application.status} />
                            <p className="text-muted-foreground mt-2 text-xs">
                                Applied: {application.appliedDate}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notes Card - Show if there are notes */}
            {application.notes && (
                <Card className="border-blue-200 dark:border-blue-900">
                    <CardHeader className="pb-2">
                        <CardTitle className="flex items-center text-base font-medium">
                            Admin Notes
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <p className="text-sm whitespace-pre-line">
                            {application.notes}
                        </p>
                    </CardContent>
                </Card>
            )}

            {/* Decision Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Application Decision</CardTitle>
                    <CardDescription>
                        Update the status of this mentor application
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {application.status === ApplicationStatus.PENDING && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <Button
                                    onClick={onRequestUpdate}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <RefreshCw size={16} className="mr-2" />
                                    Request Update
                                </Button>
                                <Button onClick={onApprove} className="flex-1">
                                    <Check size={16} className="mr-2" />
                                    Approve
                                </Button>
                                <Button
                                    onClick={onReject}
                                    variant="destructive"
                                    className="flex-1"
                                >
                                    <X size={16} className="mr-2" />
                                    Reject
                                </Button>
                            </div>
                        )}

                        {application.status ===
                            ApplicationStatus.UNDER_REVIEW && (
                            <div className="p-6 text-center">
                                <RefreshCw
                                    size={24}
                                    className="mx-auto mb-2 text-blue-500"
                                />
                                <p className="mb-1 font-medium">
                                    Application Under Review
                                </p>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    The applicant has been asked to update their
                                    application. You cannot approve or reject
                                    until they resubmit.
                                </p>
                                {application.notes && (
                                    <div className="bg-muted rounded-md p-3 text-left text-sm">
                                        <p className="mb-1 font-medium">
                                            Update Request Notes:
                                        </p>
                                        <p className="whitespace-pre-line">
                                            {application.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {application.status === ApplicationStatus.APPROVED && (
                            <div className="p-6 text-center">
                                <Check
                                    size={24}
                                    className="mx-auto mb-2 text-green-500"
                                />
                                <p className="mb-1 font-medium">
                                    Application Approved
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    This application has been approved and the
                                    applicant has been granted mentor access.
                                </p>
                            </div>
                        )}

                        {application.status === ApplicationStatus.REJECTED && (
                            <div className="p-6 text-center">
                                <X
                                    size={24}
                                    className="mx-auto mb-2 text-red-500"
                                />
                                <p className="mb-1 font-medium">
                                    Application Rejected
                                </p>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    This application has been rejected.
                                </p>
                                {application.notes && (
                                    <div className="bg-muted rounded-md p-3 text-left text-sm">
                                        <p className="mb-1 font-medium">
                                            Rejection Reason:
                                        </p>
                                        <p className="whitespace-pre-line">
                                            {application.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Education Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-line">
                        {application.education}
                    </p>
                </CardContent>
            </Card>

            {/* Work Experience Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-line">
                        {application.workExperience}
                    </p>
                </CardContent>
            </Card>

            {/* Certifications Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <ul className="list-disc space-y-2 pl-5">
                            {application.certifications.map((cert, index) => (
                                <li key={index} className="text-foreground">
                                    {cert}
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* Motivation Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Motivation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-line">
                        {application.description}
                    </p>
                </CardContent>
            </Card>

            {/* Supporting Documents Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Supporting Documents</CardTitle>
                    <CardDescription>
                        Review the documents submitted by the applicant
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {application.documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between rounded-md border p-3"
                            >
                                <div className="flex items-center">
                                    <FileText
                                        size={20}
                                        className="text-muted-foreground mr-2"
                                    />
                                    <span>{doc.name}</span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPreviewDocument(doc)}
                                >
                                    <Eye size={16} className="mr-2" />
                                    Preview
                                </Button>
                            </div>
                        ))}
                        {application.documents.length === 0 && (
                            <p className="text-muted-foreground">
                                No documents submitted
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ApplicationDetails;
