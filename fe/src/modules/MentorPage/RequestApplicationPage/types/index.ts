import type { UseFormReturn } from "react-hook-form";

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

export type ApplicationRequestDocument = {
    id?: string;
    filePath: string;
    fileName: string;
};

export type ApplicationRequest = {
    id?: string;
    education: string;
    workExperience: string;
    certifications?: string[] | null;
    description: string;
    status: ApplicationStatus;
    applicationDocuments?: ApplicationDocument[] | null;
    applicationRequestDocuments?: ApplicationRequestDocument[] | null;
    createdAt?: string;
    updatedAt?: string;
    summitted?: string;
    isDeleted?: boolean;
    note?: string | null;
    fullName?: string;
};
