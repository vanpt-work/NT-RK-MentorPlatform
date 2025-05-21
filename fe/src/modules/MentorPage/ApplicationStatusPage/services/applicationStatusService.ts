import { httpClient } from "@/common/api/instance.axios";

export const applicationStatusService = {
    getCurrentUserApplication: () =>
        httpClient.get(`/application-requests/current-user`),

    updateApplication: (formData: FormData) =>
        httpClient.put(`/application-requests`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
};
