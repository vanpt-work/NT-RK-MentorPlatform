import { httpClient } from "@/common/api/instance.axios";

import type { ApplicationRequest, FormValues } from "../types";

export const mentorApplicationService = {
    /**
     * Tạo application mentor mới
     * @param application Dữ liệu application
     * @returns Kết quả từ API
     */
    createApplication: (application: FormValues) =>
        httpClient.post<any>("/application-requests", application),
    createApplicationWithFormData: (formData: FormData) =>
        httpClient.post<any>("/application-requests", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),

    /**
     * Cập nhật application mentor
     * @param application Dữ liệu application cần cập nhật
     * @returns Kết quả từ API
     */
    updateApplication: (application: ApplicationRequest) =>
        httpClient.put<any>("api/application-requests", application),
};
