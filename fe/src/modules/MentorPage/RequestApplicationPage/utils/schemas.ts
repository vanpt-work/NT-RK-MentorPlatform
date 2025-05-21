import { z } from "zod";

import { ApplicationStatus } from "../types";

// Các file extension được hỗ trợ từ SupportFileType.cs
const ALLOWED_EXTENSIONS = {
    // Images
    images: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
    // Videos
    videos: [".mp4", ".avi", ".mov", ".wmv", ".webm"],
    // Documents
    documents: [".pdf", ".docx", ".doc", ".pptx", ".ppt", ".txt"],
};

// Tạo mảng phẳng chứa tất cả các extension được phép
const ALL_ALLOWED_EXTENSIONS = [
    ...ALLOWED_EXTENSIONS.images,
    ...ALLOWED_EXTENSIONS.videos,
    ...ALLOWED_EXTENSIONS.documents,
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const fileSchema = z.object({
    filePath: z
        .string()
        .nonempty({ message: "FilePath must not be empty." })
        .max(1000, { message: "FilePath must be at most 1000 characters." }),

    fileName: z
        .string()
        .nonempty({ message: "FileName must not be empty." })
        .max(1000, { message: "FileName must be at most 1000 characters." }),

    fileContent: z
        .instanceof(File, { message: "FileContent must be provided." })
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File size cannot exceed 10MB",
        })
        .refine(
            (file) => {
                const ext =
                    "." + file.name.split(".").pop()?.toLowerCase() || "";
                return ALL_ALLOWED_EXTENSIONS.includes(ext);
            },
            {
                message: `File extension is not supported. Allowed extensions: ${ALL_ALLOWED_EXTENSIONS.join(", ")}.`,
            },
        ),
});

export const formSchema = z.object({
    education: z
        .string()
        .nonempty({ message: "Education must not be empty." })
        .min(10, { message: "Education must be at least 10 characters." })
        .max(2000, { message: "Education must be at most 2000 characters." }),

    workExperience: z
        .string()
        .nonempty({ message: "Work experience must not be empty." })
        .min(10, { message: "Work experience must be at least 10 characters." })
        .max(2000, {
            message: "Work experience must be at most 2000 characters.",
        }),

    certifications: z.array(z.string()).optional().nullable(),

    description: z
        .string()
        .nonempty({ message: "Description must not be empty." })
        .max(2000, { message: "Description must be at most 2000 characters." }),

    status: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.PENDING),

    applicationDocuments: z.array(fileSchema).optional().nullable(),

    note: z
        .string()
        .max(2000, { message: "Note must be at most 2000 characters." })
        .optional()
        .nullable(),
});
