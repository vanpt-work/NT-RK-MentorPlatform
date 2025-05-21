import type { ApplicationStatus } from "@/modules/MentorPage/RequestApplicationPage/types";

// Types for mentor approval
export type Document = {
    id: string;
    name: string;
    type: string;
    url: string;
    file: File;
};

export type MentorApplication = {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    appliedDate: string;
    status: ApplicationStatus;
    expertise: string[];
    education: string;
    workExperience: string;
    certifications: string[];
    description: string;
    documents: Document[];
    notes?: string;
};

export type Notification = {
    type: "success" | "error";
    title: string;
    message: string;
};

export type PreviewFile = {
    file: File;
    url: string;
    type: string;
};

export type DecisionType = "approve" | "reject" | "update" | null;
