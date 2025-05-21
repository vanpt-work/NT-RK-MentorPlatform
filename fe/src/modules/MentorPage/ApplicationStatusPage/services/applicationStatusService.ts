import { httpClient } from "@/common/api/instance.axios";

export const applicationStatusService = {
    getApplicationRequestDetail: (id: string) =>
        httpClient.get(`/api/application-requests/${id}`),
};
