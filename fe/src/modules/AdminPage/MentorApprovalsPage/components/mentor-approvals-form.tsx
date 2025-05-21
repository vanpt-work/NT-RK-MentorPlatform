import React, { useEffect, useState } from "react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/common/components/ui/alert";
import { Button } from "@/common/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import FilePreviewDialog from "@/modules/MentorPage/RequestApplicationPage/components/file-preview-dialog";
import { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

import ApplicationDetails from "./application-details";
import ApplicationFilter from "./application-filter";
import ApplicationTable from "./application-table";
import DecisionDialog from "./decision-dialog";
import { mockApplications } from "./mock-data";

import type {
    DecisionType,
    Document,
    MentorApplication,
    Notification,
    PreviewFile,
} from "../types";

export function MentorApprovalsForm() {
    const [applications, setApplications] =
        useState<MentorApplication[]>(mockApplications);
    const [filteredApplications, setFilteredApplications] =
        useState<MentorApplication[]>(mockApplications);
    const [selectedApplication, setSelectedApplication] =
        useState<MentorApplication | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [decision, setDecision] = useState<DecisionType>(null);
    const [comments, setComments] = useState("");
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);

    // File preview state
    const [previewFile, setPreviewFile] = useState<PreviewFile | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [previewError, setPreviewError] = useState(false);

    // Filter applications
    const filterApplications = () => {
        let filtered = applications;

        if (statusFilter !== "all") {
            const statusNumber = parseInt(statusFilter, 10);
            filtered = filtered.filter((app) => app.status === statusNumber);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (app) =>
                    app.name.toLowerCase().includes(query) ||
                    app.email.toLowerCase().includes(query) ||
                    app.expertise.some((exp) =>
                        exp.toLowerCase().includes(query),
                    ),
            );
        }

        setFilteredApplications(filtered);
    };

    // Handle filter change
    const handleFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Apply filters when filter or search changes
    useEffect(() => {
        filterApplications();
    }, [statusFilter, searchQuery, applications]);

    // View application details
    const handleViewDetails = (application: MentorApplication) => {
        setSelectedApplication(application);
        setIsDetailsOpen(true);
    };

    // Close details dialog
    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setSelectedApplication(null);
    };

    // Handle document preview
    const handlePreviewDocument = (document: Document) => {
        setPreviewFile({
            file: document.file,
            url: document.url,
            type: document.type,
        });
        setIsPreviewOpen(true);
    };

    // Handle preview error
    const handlePreviewError = () => {
        setPreviewError(true);
    };

    // Open confirm dialog
    const handleOpenConfirmDialog = (
        action: "approve" | "reject" | "update",
    ) => {
        setDecision(action);
        setIsConfirmDialogOpen(true);
    };

    // Close confirm dialog
    const handleCloseConfirmDialog = () => {
        setIsConfirmDialogOpen(false);
        setDecision(null);
        setComments("");
    };

    // Submit decision
    const handleSubmitDecision = () => {
        if (!selectedApplication || !decision) return;

        let newStatus: ApplicationStatus;

        switch (decision) {
            case "approve":
                newStatus = ApplicationStatus.APPROVED;
                break;
            case "reject":
                newStatus = ApplicationStatus.REJECTED;
                break;
            case "update":
                newStatus = ApplicationStatus.UNDER_REVIEW;
                break;
            default:
                newStatus = ApplicationStatus.PENDING;
        }

        // Update application status and notes
        const updatedApplications = applications.map((app) =>
            app.id === selectedApplication.id
                ? { ...app, status: newStatus, notes: comments || app.notes }
                : app,
        );

        setApplications(updatedApplications);

        // Show notification
        setNotification({
            type: decision === "reject" ? "error" : "success",
            title:
                decision === "approve"
                    ? "Application Approved"
                    : decision === "reject"
                      ? "Application Rejected"
                      : "Update Requested",
            message:
                decision === "approve"
                    ? `${selectedApplication.name}'s application has been approved.`
                    : decision === "reject"
                      ? `${selectedApplication.name}'s application has been rejected.`
                      : `${selectedApplication.name} has been requested to update their application.`,
        });

        // Hide notification after 5 seconds
        setTimeout(() => {
            setNotification(null);
        }, 5000);

        // Close dialogs
        handleCloseConfirmDialog();
        handleCloseDetails();
    };

    return (
        <div className="space-y-4">
            {/* Notification */}
            {notification && (
                <Alert
                    variant={
                        notification.type === "success"
                            ? "default"
                            : "destructive"
                    }
                    className="mb-4"
                >
                    <AlertTitle>{notification.title}</AlertTitle>
                    <AlertDescription>{notification.message}</AlertDescription>
                </Alert>
            )}

            {/* Filters and search */}
            <ApplicationFilter
                statusFilter={statusFilter}
                searchQuery={searchQuery}
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearch}
            />

            {/* Applications table */}
            <ApplicationTable
                applications={filteredApplications}
                onViewDetails={handleViewDetails}
            />

            {/* Application details dialog */}
            {selectedApplication && (
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Application Details</DialogTitle>
                            <DialogDescription>
                                Reviewing application from{" "}
                                {selectedApplication.name}
                            </DialogDescription>
                        </DialogHeader>

                        <ApplicationDetails
                            application={selectedApplication}
                            onPreviewDocument={handlePreviewDocument}
                            onRequestUpdate={() =>
                                handleOpenConfirmDialog("update")
                            }
                            onApprove={() => handleOpenConfirmDialog("approve")}
                            onReject={() => handleOpenConfirmDialog("reject")}
                        />

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={handleCloseDetails}
                            >
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Confirmation dialog */}
            <DecisionDialog
                open={isConfirmDialogOpen}
                onOpenChange={setIsConfirmDialogOpen}
                decision={decision}
                comments={comments}
                onCommentsChange={(value) => setComments(value)}
                onConfirm={handleSubmitDecision}
                onCancel={handleCloseConfirmDialog}
            />

            {/* File preview dialog */}
            <FilePreviewDialog
                open={isPreviewOpen}
                onOpenChange={setIsPreviewOpen}
                previewFile={previewFile}
                previewError={previewError}
                onPreviewError={handlePreviewError}
            />
        </div>
    );
}
