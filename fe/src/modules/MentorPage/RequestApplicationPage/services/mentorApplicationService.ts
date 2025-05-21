import { httpClient } from "@/common/api/instance.axios";

import type { ApplicationRequest, FormValues } from "../types";

export const mentorApplicationService = {
    createApplication: (application: FormValues) =>
        httpClient.post<FormValues>("/application-requests", application),
    createApplicationWithFormData: (formData: FormData) =>
        httpClient.post<FormData>("/application-requests", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
    updateApplication: (application: ApplicationRequest) =>
        httpClient.put<ApplicationRequest>(
            "api/application-requests",
            application,
        ),
};
