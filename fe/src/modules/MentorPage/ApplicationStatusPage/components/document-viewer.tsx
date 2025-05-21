import {
    Download,
    Eye,
    FileImage,
    FileText,
    FileVideo,
    Music,
    X,
} from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/common/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/common/components/ui/card";
import { Label } from "@/common/components/ui/label";

import FilePreviewDialog from "../../RequestApplicationPage/components/file-preview-dialog";
import type {
    ApplicationDocument,
    ApplicationRequestDocument,
} from "../../RequestApplicationPage/types";

// Định nghĩa kiểu DocumentType để hỗ trợ cả hai loại tài liệu
type DocumentType = ApplicationDocument | ApplicationRequestDocument;

type DocumentViewerProps = {
    documents: DocumentType[];
    onRemoveDocument?: (id: string) => void;
    isReadOnly?: boolean;
};

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
    documents,
    onRemoveDocument,
    isReadOnly = false,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewFile, setPreviewFile] = useState<{
        file: File;
        url: string;
        type: string;
    } | null>(null);
    const [previewError, setPreviewError] = useState(false);

    // Function to handle file view
    const handleViewDocument = (filePath: string, fileName: string) => {
        // Create a File-like object from the URL
        const fileType = getFileType(fileName);

        fetch(filePath)
            .then((response) => response.blob())
            .then((blob) => {
                const file = new File([blob], fileName, { type: blob.type });
                const url = URL.createObjectURL(file);
                setPreviewFile({
                    file,
                    url,
                    type: fileType,
                });
                setPreviewOpen(true);
                setPreviewError(false);
            })
            .catch((error) => {
                console.error("Error fetching file:", error);
                window.open(filePath, "_blank");
            });
    };

    // Function to handle file download
    const handleDownloadDocument = (filePath: string, fileName: string) => {
        const link = document.createElement("a");
        link.href = filePath;
        link.download = fileName;
        link.click();
    };

    const handlePreviewError = () => {
        setPreviewError(true);
        console.error("Error previewing file");
    };

    // Function to get file type for the preview component
    const getFileType = (fileName: string): string => {
        const extension = fileName.split(".").pop()?.toLowerCase() || "";

        switch (extension) {
            case "pdf":
                return "pdf";
            case "docx":
                return "docx";
            case "xlsx":
                return "xlsx";
            case "csv":
                return "csv";
            case "mp3":
                return "audio";
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
                return "image";
            case "mp4":
            case "webm":
                return "video";
            default:
                return "unsupported";
        }
    };

    // Function to get file icon
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split(".").pop()?.toLowerCase();

        if (!extension) return <FileText />;

        switch (extension) {
            case "pdf":
                return <FileText className="text-red-500 dark:text-red-400" />;
            case "docx":
                return (
                    <FileText className="text-blue-500 dark:text-blue-400" />
                );
            case "xlsx":
            case "csv":
                return (
                    <FileText className="text-green-500 dark:text-green-400" />
                );
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":
            case "bmp":
                return (
                    <FileImage className="text-purple-500 dark:text-purple-400" />
                );
            case "mp4":
            case "webm":
                return (
                    <FileVideo className="text-amber-500 dark:text-amber-400" />
                );
            case "mp3":
                return (
                    <Music className="text-indigo-500 dark:text-indigo-400" />
                );
            default:
                return <FileText />;
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold">
                        Supporting Documents
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {documents.length === 0 ? (
                        <p className="text-muted-foreground text-sm">
                            No documents attached.
                        </p>
                    ) : (
                        <div className="max-h-60 space-y-2 overflow-y-auto">
                            <Label>Uploaded Files</Label>
                            {documents.map((doc) => (
                                <div
                                    key={doc.id || doc.fileName}
                                    className="bg-background flex items-center justify-between rounded border p-2 dark:border-gray-700"
                                >
                                    <div className="flex max-w-[60%] items-center gap-2 truncate">
                                        {getFileIcon(doc.fileName)}
                                        <span className="truncate text-sm">
                                            {doc.fileName}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleViewDocument(
                                                    doc.filePath,
                                                    doc.fileName,
                                                )
                                            }
                                            className="h-8 px-2"
                                        >
                                            <Eye size={16} className="mr-1" />{" "}
                                            Preview
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleDownloadDocument(
                                                    doc.filePath,
                                                    doc.fileName,
                                                )
                                            }
                                            className="h-8 px-2"
                                        >
                                            <Download
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            Download
                                        </Button>
                                        {!isReadOnly && onRemoveDocument && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    onRemoveDocument(
                                                        doc.id || doc.fileName,
                                                    )
                                                }
                                                className="text-destructive hover:text-destructive/90 h-8 px-2"
                                            >
                                                <X size={16} />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
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
        </>
    );
};

export default DocumentViewer;
