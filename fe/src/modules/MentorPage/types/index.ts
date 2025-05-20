import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import type { formSchema } from "../utils/schemas";

export enum ApplicationStatus {
    PENDING = 0,
    UNDER_REVIEW = 1,
    APPROVED = 2,
    REJECTED = 3,
}

export type FormValues = {
    education: string;
    workExperience: string;
    certifications: string[] | null;
    description: string;
    status: ApplicationStatus;
    applicationDocuments: ApplicationDocument[] | null;
    note: string | null;
};

export type FormContextType = UseFormReturn<FormValues>;

export type SectionProps = {
    form: FormContextType;
    calculateProgress?: () => void;
};

export type ApplicationDocument = {
    id?: string;
    filePath: string;
    fileName: string;
    fileContent: File;
    applicationRequestId?: string;
};

export type ApplicationRequest = {
    education: string;
    workExperience: string;
    certifications?: string[] | null;
    description: string;
    status: ApplicationStatus;
    applicationDocuments?: ApplicationDocument[] | null;
    createdAt?: string;
    updatedAt?: string;
    isDeleted?: boolean;
    note?: string | null;
};
