import { Edit, FileText, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import LoadingSpinner from "@/common/components/loading-spinner";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/common/components/ui/avatar";
import { Button } from "@/common/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";
import authService from "@/common/services/authServices";
import type { CurrentUser } from "@/common/types/auth";
import type { Result } from "@/common/types/result";

import ApplicationEditForm from "./application-edit-form";
import ApplicationStatusSection from "./application-status";
import DocumentViewer from "./document-viewer";

import type { ApplicationRequest } from "../../RequestApplicationPage/types";
import { ApplicationStatus } from "../../RequestApplicationPage/types";
import { applicationStatusService } from "../services/applicationStatusService";

export default function ApplicationStatusView() {
    const [application, setApplication] = useState<ApplicationRequest | null>(
        null,
    );
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [showEditForm, setShowEditForm] = useState(false);
    const navigate = useNavigate();

    // Fetch current user data
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                setLoadingUser(true);
                const response = await authService.getCurrentUser();
                if (response.data) {
                    setCurrentUser(response.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error(
                    "Unable to load user information. Please try again later.",
                );
            } finally {
                setLoadingUser(false);
            }
        };

        fetchCurrentUser();
    }, []);

    // Fetch application data using getCurrentUserApplication
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response =
                    (await applicationStatusService.getCurrentUserApplication()) as Result<ApplicationRequest>;

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

        if (!loadingUser) {
            fetchData();
        }
    }, [loadingUser]);

    // Get initials for avatar fallback
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    const refreshData = async () => {
        setIsLoading(true);
        try {
            const response =
                (await applicationStatusService.getCurrentUserApplication()) as Result<ApplicationRequest>;
            if (response.isSuccess && response.data) {
                setApplication(response.data);
                toast.success("Application data has been updated");
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

    if (showEditForm && application) {
        return (
            <ApplicationEditForm
                application={application}
                onUpdateSuccess={handleUpdateSuccess}
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
                                    ApplicationStatus.UNDER_REVIEW && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleEditApplication}
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Application
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
                    {isLoading || loadingUser ? (
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
                                    {loadingUser ? (
                                        <div className="flex h-20 items-center justify-center">
                                            <LoadingSpinner />
                                            <p>Loading...</p>
                                        </div>
                                    ) : currentUser ? (
                                        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                                            <Avatar className="h-20 w-20">
                                                {currentUser.avatarUrl ? (
                                                    <AvatarImage
                                                        src={
                                                            currentUser.avatarUrl
                                                        }
                                                        alt={
                                                            currentUser.fullName
                                                        }
                                                    />
                                                ) : (
                                                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                                        {getInitials(
                                                            currentUser.fullName,
                                                        )}
                                                    </AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div className="flex-1 text-center sm:text-left">
                                                <h2 className="text-xl font-semibold">
                                                    {currentUser.fullName}
                                                </h2>
                                                <p className="text-muted-foreground text-sm">
                                                    {currentUser.email}
                                                </p>
                                                <p className="text-muted-foreground mb-3 text-sm">
                                                    Applicant Information
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center">
                                            <p className="text-muted-foreground">
                                                Unable to load user information.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Application Status Section */}
                            <div>
                                <ApplicationStatusSection
                                    status={
                                        application.status ??
                                        ApplicationStatus.PENDING
                                    }
                                    note={application.note ?? ""}
                                    createdAt={
                                        application.createdAt ??
                                        application.summitted
                                    }
                                    updatedAt={
                                        application.updatedAt ??
                                        application.summitted
                                    }
                                    isReadOnly={true}
                                />
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
                            <div>
                                {(application.applicationRequestDocuments &&
                                    application.applicationRequestDocuments
                                        .length > 0) ||
                                (application.applicationDocuments &&
                                    application.applicationDocuments.length >
                                        0) ? (
                                    <DocumentViewer
                                        documents={
                                            application.applicationRequestDocuments ||
                                            application.applicationDocuments ||
                                            []
                                        }
                                        isReadOnly={true}
                                    />
                                ) : (
                                    <Card>
                                        <CardContent className="py-8 text-center">
                                            <FileText className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                                            <p className="text-muted-foreground">
                                                No supporting documents attached
                                                to this application.
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="py-12 text-center">
                                <p className="text-muted-foreground mb-4 text-lg">
                                    No application found
                                </p>
                                <Button
                                    onClick={() =>
                                        navigate("/mentor/request-application")
                                    }
                                    className="mt-2"
                                >
                                    Create Application
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
