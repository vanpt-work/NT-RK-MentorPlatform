import {
    Download,
    Edit,
    Eye,
    FileText,
    Mail,
    PlusCircle,
    RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
import FilePreviewDialog from "@/modules/AdminPage/MentorApprovalsPage/components/file-preview-dialog";
import { ApplicationStatus } from "@/modules/AdminPage/MentorApprovalsPage/types";
import type { PreviewFile } from "@/modules/AdminPage/MentorApprovalsPage/types";
import { getFileExtension } from "@/modules/AdminPage/MentorApprovalsPage/utils/file-helpers";

import ApplicationEditForm from "./application-edit-form";
import ApplicationStatusSection from "./application-status";

import ApplicationForm from "../../RequestApplicationPage/components/application-form";
import { applicationStatusService } from "../services/applicationStatusService";
import type { CurrentUserApplication } from "../types";

export default function ApplicationStatusView() {
    const [application, setApplication] =
        useState<CurrentUserApplication | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
    const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    // Fetch application data
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response =
                await applicationStatusService.getCurrentUserApplication();

            if (response.isSuccess && response.data) {
                setApplication(response.data);
            } else {
                setApplication(null);
            }
        } catch (error: any) {
            console.error("Error fetching application:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    // Refresh application data
    const refreshData = async () => {
        setIsLoading(true);
        try {
            const response =
                await applicationStatusService.getCurrentUserApplication();

            if (response.isSuccess && response.data) {
                setApplication(response.data);
            } else {
                setApplication(null);
            }
        } catch (error: any) {
            console.error("Error refreshing application:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditApplication = () => {
        setShowEditForm(true);
    };

    const handleUpdateSuccess = () => {
        setShowEditForm(false);
        refreshData();
    };

    const handlePreviewDocument = (doc: any) => {
        const document: PreviewFile = {
            url: doc.filePath,
            type: getFileExtension(doc.fileName),
        };
        setPreviewFile(document);
        setPreviewOpen(true);
        setPreviewError(false);
    };

    const handlePreviewError = () => {
        setPreviewError(true);
    };

    // Handle create new application
    const handleCreateApplication = () => {
        if (application && application.status === ApplicationStatus.Rejected) {
            if (
                confirm(
                    "This will create a new application and you'll no longer be able to view this rejected application. Continue?",
                )
            ) {
                setApplication(null);
                setShowNewApplicationForm(true);
            }
        } else {
            setShowNewApplicationForm(true);
        }
    };

    const handleApplicationCreated = () => {
        toast.success("Application submitted successfully! Updating status...");
        setTimeout(() => {
            setShowNewApplicationForm(false);
            refreshData();
        }, 2000);
    };

    if (showEditForm && application) {
        return (
            <ApplicationEditForm
                application={application}
                onUpdateSuccess={handleUpdateSuccess}
            />
        );
    }

    if (showNewApplicationForm) {
        return (
            <ApplicationForm
                onApplicationCreated={handleApplicationCreated}
                skipApplicationCheck={true}
            />
        );
    }

    return (
        <div className="container mx-auto max-w-6xl">
            <Card className="bg-card text-card-foreground border-border overflow-hidden rounded-lg border shadow-lg">
                <CardHeader className="bg-muted/50 border-border border-b">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-foreground text-2xl font-bold">
                                Mentor Application Status
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-1">
                                Track the progress of your mentor application
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            {application &&
                                application.status ===
                                    ApplicationStatus.UnderReview && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleEditApplication}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Application
                                    </Button>
                                )}
                            {application &&
                                application.status ===
                                    ApplicationStatus.Rejected && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCreateApplication}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        New Application
                                    </Button>
                                )}
                            {application && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={refreshData}
                                    disabled={isLoading}
                                >
                                    <RefreshCw
                                        className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                                    />
                                    Refresh
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <RefreshCw className="text-primary mb-4 h-8 w-8 animate-spin" />
                            <p className="text-muted-foreground">
                                Loading application data...
                            </p>
                        </div>
                    ) : application ? (
                        <div className="space-y-8">
                            {/* User Profile Information */}
                            <Card className="bg-muted/30 mb-4">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                                        <Avatar className="h-20 w-20">
                                            {application.avatarUrl ? (
                                                <AvatarImage
                                                    src={application.avatarUrl}
                                                    alt={
                                                        application.fullName ||
                                                        "User"
                                                    }
                                                />
                                            ) : (
                                                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                                    {getInitials(
                                                        application.fullName ||
                                                            "User",
                                                    )}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h2 className="text-xl font-semibold">
                                                {application.fullName}
                                            </h2>

                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {application.mentorEmail && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="flex items-center"
                                                    >
                                                        <Mail className="mr-1 h-3 w-3" />
                                                        {
                                                            application.mentorEmail
                                                        }
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-muted-foreground mt-3 text-sm">
                                                {application.mentorExpertises &&
                                                    application.mentorExpertises
                                                        .length > 0 && (
                                                        <div className="flex flex-wrap gap-1">
                                                            {application.mentorExpertises.map(
                                                                (
                                                                    expertise,
                                                                    index,
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            index
                                                                        }
                                                                        variant="outline"
                                                                    >
                                                                        {
                                                                            expertise
                                                                        }
                                                                    </Badge>
                                                                ),
                                                            )}
                                                        </div>
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Application Status Section */}
                            <div>
                                <ApplicationStatusSection
                                    status={
                                        application.status ??
                                        ApplicationStatus.Pending
                                    }
                                    note={application.note ?? ""}
                                    createdAt={application.summitted}
                                    updatedAt={application.summitted}
                                    isReadOnly={true}
                                />

                                {application.status !==
                                    ApplicationStatus.Approved &&
                                    application.status !==
                                        ApplicationStatus.Rejected && (
                                        <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/30 dark:bg-yellow-900/20">
                                            <div className="flex">
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                                                        Note
                                                    </h3>
                                                    <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                        <p>
                                                            You cannot create a
                                                            new mentor
                                                            application when you
                                                            already have an
                                                            application
                                                            {application.status ===
                                                                ApplicationStatus.Pending &&
                                                                " pending"}
                                                            {application.status ===
                                                                ApplicationStatus.UnderReview &&
                                                                " under review"}
                                                            .
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                {application.status ===
                                    ApplicationStatus.Rejected && (
                                    <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/30 dark:bg-yellow-900/20">
                                        <div className="flex">
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                                                    Your application was
                                                    rejected
                                                </h3>
                                                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                    <p>
                                                        Please read the note
                                                        from the administrator
                                                        and create a new
                                                        application with the
                                                        required changes.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Application Details */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-semibold">
                                        Application Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="mb-2 border-b pb-2 text-lg font-medium">
                                            Education
                                        </h3>
                                        <p className="text-foreground whitespace-pre-line">
                                            {application.education}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="mb-2 border-b pb-2 text-lg font-medium">
                                            Work Experience
                                        </h3>
                                        <p className="text-foreground whitespace-pre-line">
                                            {application.workExperience}
                                        </p>
                                    </div>

                                    {application.certifications &&
                                        application.certifications.length >
                                            0 && (
                                            <div>
                                                <h3 className="mb-2 border-b pb-2 text-lg font-medium">
                                                    Certifications
                                                </h3>
                                                <ul className="list-disc space-y-2 pl-5">
                                                    {application.certifications.map(
                                                        (cert, index) => (
                                                            <li
                                                                key={index}
                                                                className="text-foreground"
                                                            >
                                                                {cert}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    <div>
                                        <h3 className="mb-2 border-b pb-2 text-lg font-medium">
                                            Motivation
                                        </h3>
                                        <p className="text-foreground whitespace-pre-line">
                                            {application.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Supporting Documents Section */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-semibold">
                                        Supporting Documents
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {(application.applicationRequestDocuments &&
                                        application.applicationRequestDocuments
                                            .length > 0) ||
                                    (application.applicationDocuments &&
                                        application.applicationDocuments
                                            .length > 0) ? (
                                        <div className="space-y-2">
                                            {(
                                                application.applicationRequestDocuments ||
                                                application.applicationDocuments ||
                                                []
                                            ).map((doc, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between rounded-md border p-3"
                                                >
                                                    <div className="flex items-center">
                                                        <FileText
                                                            size={20}
                                                            className="text-muted-foreground mr-2"
                                                        />
                                                        <span>
                                                            {doc.fileName}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                handlePreviewDocument(
                                                                    doc,
                                                                )
                                                            }
                                                        >
                                                            <Eye
                                                                size={16}
                                                                className="mr-2"
                                                            />
                                                            Preview
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => {
                                                                const link =
                                                                    document.createElement(
                                                                        "a",
                                                                    );
                                                                link.href =
                                                                    doc.filePath;
                                                                link.download =
                                                                    doc.fileName;
                                                                link.click();
                                                            }}
                                                        >
                                                            <Download
                                                                size={16}
                                                                className="mr-2"
                                                            />
                                                            Download
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card>
                                            <CardContent className="py-8 text-center">
                                                <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                                <p className="text-muted-foreground">
                                                    No supporting documents
                                                    attached to this
                                                    application.
                                                </p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground mb-4 text-lg">
                                    No application found
                                </p>
                                <Button
                                    onClick={handleCreateApplication}
                                    className="mt-2"
                                >
                                    Create Application
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* File Preview Dialog */}
            <FilePreviewDialog
                open={previewOpen}
                onOpenChange={setPreviewOpen}
                previewFile={previewFile}
                previewError={previewError}
                onPreviewError={handlePreviewError}
            />
        </div>
    );
}
