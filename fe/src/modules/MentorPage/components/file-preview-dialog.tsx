import { saveAs } from "file-saver";
import { Download, FileText, Music } from "lucide-react";
import React, { useEffect, useState } from "react";
import FileViewer from "react-file-viewer";

import { FullscreenLoading } from "@/common/components/loading-spinner";
import { Button } from "@/common/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";

type FilePreviewDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    previewFile: {
        file: File;
        url: string;
        type: string;
    } | null;
    previewError: boolean;
    onPreviewError: () => void;
};

const FilePreviewDialog: React.FC<FilePreviewDialogProps> = ({
    open,
    onOpenChange,
    previewFile,
    previewError,
    onPreviewError,
}) => {
    const [loading, setLoading] = useState(false);
    const [viewerError, setViewerError] = useState(false);

    // Reset error state when file changes
    useEffect(() => {
        if (previewFile) {
            setViewerError(false);
            setLoading(true);

            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [previewFile]);

    useEffect(() => {
        if (open && previewFile) {
            setLoading(true);

            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [open, previewFile]);

    const handleDownloadFile = () => {
        if (previewFile) {
            saveAs(previewFile.url, previewFile.file.name);
        }
    };

    const handleViewerError = (error: unknown) => {
        console.error("Error in file viewer:", error);
        setLoading(false);
        setViewerError(true);
        onPreviewError();
    };

    if (!previewFile) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        File Preview: {previewFile.file.name}
                    </DialogTitle>
                    <DialogDescription>
                        {previewFile.file.type} -{" "}
                        {(previewFile.file.size / 1024 / 1024).toFixed(2)} MB
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-auto">
                    <div className="flex h-full w-full items-center justify-center p-4">
                        {previewFile.type === "image" ||
                        ["png", "jpeg", "jpg", "gif", "bmp"].includes(
                            previewFile.type,
                        ) ? (
                            <>
                                {loading && (
                                    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                                            <p>Loading image...</p>
                                        </div>
                                    </div>
                                )}
                                <img
                                    src={previewFile.url}
                                    alt={previewFile.file.name}
                                    onLoad={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        setViewerError(true);
                                    }}
                                    className="max-h-[70vh] max-w-full rounded-md object-contain dark:border dark:border-gray-700"
                                />
                            </>
                        ) : previewFile.type === "video" ||
                          ["mp4", "webm"].includes(previewFile.type) ? (
                            <>
                                {loading && (
                                    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                                            <p>Loading video...</p>
                                        </div>
                                    </div>
                                )}
                                <video
                                    src={previewFile.url}
                                    controls
                                    onLoadedData={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        setViewerError(true);
                                    }}
                                    className="max-h-[70vh] max-w-full rounded-md dark:bg-gray-900"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </>
                        ) : previewFile.type === "audio" ||
                          ["mp3"].includes(previewFile.type) ? (
                            <div className="bg-muted w-full max-w-md rounded-md p-8 text-center dark:bg-gray-800">
                                {loading && (
                                    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                                            <p>Loading audio...</p>
                                        </div>
                                    </div>
                                )}
                                <Music
                                    size={64}
                                    className="text-muted-foreground mx-auto mb-4"
                                />
                                <audio
                                    src={previewFile.url}
                                    controls
                                    onLoadedData={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        setViewerError(true);
                                    }}
                                    className="mb-4 w-full"
                                >
                                    Your browser does not support the audio
                                    element.
                                </audio>
                                <Button
                                    onClick={handleDownloadFile}
                                    className="mx-auto flex items-center gap-2"
                                >
                                    <Download size={16} /> Download
                                </Button>
                            </div>
                        ) : previewFile.type === "pdf" ? (
                            <>
                                {loading && (
                                    <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="border-primary mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2"></div>
                                            <p>Loading PDF...</p>
                                        </div>
                                    </div>
                                )}
                                <iframe
                                    src={previewFile.url}
                                    title={previewFile.file.name}
                                    onLoad={() => setLoading(false)}
                                    onError={() => {
                                        setLoading(false);
                                        setViewerError(true);
                                    }}
                                    className="h-[70vh] w-full rounded-md border dark:border-gray-700"
                                />
                            </>
                        ) : previewFile.type === "docx" ? (
                            previewError || viewerError ? (
                                <div className="bg-muted rounded-md p-8 text-center dark:bg-gray-800">
                                    <FileText
                                        size={64}
                                        className="text-muted-foreground mx-auto mb-4"
                                    />
                                    <p className="text-foreground mb-2">
                                        Cannot preview this file
                                    </p>
                                    <p className="text-muted-foreground mb-4 text-sm">
                                        Please download to view
                                    </p>
                                    <Button
                                        onClick={handleDownloadFile}
                                        className="flex items-center gap-2"
                                    >
                                        <Download size={16} /> Download
                                    </Button>
                                </div>
                            ) : (
                                <div className="relative h-[70vh] w-full rounded-md">
                                    {loading && (
                                        <div className="bg-background/80 absolute inset-0 z-10 flex items-center justify-center">
                                            <div className="text-center">
                                                <FullscreenLoading />
                                                <p>Loading document...</p>
                                            </div>
                                        </div>
                                    )}
                                    <FileViewer
                                        fileType={previewFile.type}
                                        filePath={previewFile.url}
                                        onError={handleViewerError}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="bg-muted rounded-md p-8 text-center dark:bg-gray-800">
                                <FileText
                                    size={64}
                                    className="text-muted-foreground mx-auto mb-4"
                                />
                                <p className="text-foreground mb-2">
                                    Preview not available for this file type
                                </p>
                                <p className="text-muted-foreground mb-4 text-sm">
                                    ({previewFile.file.type})
                                </p>
                                <Button
                                    onClick={handleDownloadFile}
                                    className="flex items-center gap-2"
                                >
                                    <Download size={16} /> Download
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    {previewFile && (
                        <Button
                            type="button"
                            variant="outline"
                            className="mr-2"
                            onClick={handleDownloadFile}
                        >
                            <Download size={16} className="mr-2" /> Download
                        </Button>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FilePreviewDialog;
